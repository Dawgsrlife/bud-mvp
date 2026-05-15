// supabase/functions/verdict/index.ts
//
// Edge Function: turns OCR text + user allergen profile into a Verdict.
// Holds API keys server-side. Logs to product_scans. Upserts products (self-healing).
//
// Deploy: supabase functions deploy verdict
// Secrets needed: ANTHROPIC_API_KEY, GEMINI_API_KEY (fallback)
//
// Calling from RN client:
//   const { data } = await supabase.functions.invoke('verdict', {
//     body: { ocrText, ocrConfidence, profileAllergens, locale }
//   });

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

interface VerdictRequest {
  ocrText: string;
  ocrConfidence: number;
  profileAllergens: string[];
  locale?: string;
  imageHash?: string;
}

interface Verdict {
  kind: 'compatible' | 'avoid' | 'caution' | 'unknown';
  reason: string;
  triggeredAllergens: string[];
  mayContainAllergens: string[];
  confidence: number;
  normalizedProductName: string;
  displayName: string;
  containsAllergensCanonical: string[];
  mayContainAllergensCanonical: string[];
}

const SYSTEM_PROMPT = `You are BUD, an AI grocery scanner that reads product labels and tells users with food allergies whether a product is safe.

You are given the OCR-extracted text from a product label and the user's allergen profile. Produce a JSON verdict.

Rules:
1. "kind" is one of: "compatible" (no allergens detected, no may-contain match), "avoid" (one or more profile allergens in ingredients), "caution" (only in 'may contain' / advisory), "unknown" (OCR text unclear).
2. Be specific. Cite the exact allergen detected. e.g. "Contains peanut" not "May have allergens".
3. Normalize the product name in lowercase-hyphenated form for database keying. e.g. "Wonder Bread Classic White 675g" -> "wonder-bread-classic-white-675g".
4. Use the canonical allergen names: Milk, Eggs, Fish, Shellfish, Tree nuts, Peanuts, Wheat, Soy, Sesame.
5. Map synonyms: whey/casein/lactose -> Milk. Albumin -> Eggs. Almond/cashew/walnut/pecan/pistachio/hazelnut/macadamia/brazil nut -> Tree nuts. Wheat/spelt/semolina/durum/farina -> Wheat. Soya/edamame/tofu/lecithin -> Soy. Tahini -> Sesame.
6. Distinguish "Contains: peanut" (real ingredient) from "May contain: peanut" (advisory) - they map to different verdict kinds.
7. Output STRICT JSON only, no prose.

Output schema:
{
  "kind": "compatible" | "avoid" | "caution" | "unknown",
  "reason": "string (1 sentence, specific)",
  "triggeredAllergens": ["string"],
  "mayContainAllergens": ["string"],
  "confidence": 0.0-1.0,
  "normalizedProductName": "lowercase-hyphenated-name",
  "displayName": "Title Case Display Name",
  "containsAllergensCanonical": ["Milk", "Wheat", "..."],
  "mayContainAllergensCanonical": ["Tree nuts", "..."]
}`;

/**
 * Safely extract a Verdict JSON object from an LLM response.
 * LLMs sometimes wrap JSON in markdown fences, prepend prose, or truncate
 * mid-string. Strip fences, find the largest valid {...} block, and try-parse.
 */
function parseVerdictResponse(raw: string, modelTag: string): Verdict {
  // Strip ```json ... ``` or ``` ... ``` fences
  let text = raw.trim();
  const fenced = text.match(/^```(?:json)?\s*([\s\S]+?)\s*```$/);
  if (fenced) text = fenced[1].trim();

  // Find the first { and last } and try-parse the substring
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first === -1 || last === -1 || last <= first) {
    throw new Error(`${modelTag} returned no JSON object: ${text.slice(0, 200)}`);
  }

  const candidate = text.slice(first, last + 1);
  try {
    const parsed = JSON.parse(candidate);
    // Minimal shape check so a malformed-but-parseable response doesn't
    // crash downstream consumers expecting these fields.
    if (
      typeof parsed.kind !== 'string' ||
      !['compatible', 'avoid', 'caution', 'unknown'].includes(parsed.kind) ||
      typeof parsed.reason !== 'string' ||
      typeof parsed.normalizedProductName !== 'string'
    ) {
      throw new Error(`${modelTag} JSON missing required fields`);
    }
    return parsed as Verdict;
  } catch (e) {
    throw new Error(
      `${modelTag} JSON parse failed (${(e as Error).message}). Raw: ${candidate.slice(0, 300)}`,
    );
  }
}

async function callClaude(
  ocrText: string,
  profileAllergens: string[],
  apiKey: string,
): Promise<Verdict> {
  const userPrompt = `OCR text from product label:
"""
${ocrText}
"""

User's allergen profile (watch for these):
${profileAllergens.length === 0 ? '(none flagged)' : profileAllergens.join(', ')}

Produce the JSON verdict.`;

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'prompt-caching-2024-07-31',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!resp.ok) {
    throw new Error(`Claude API error: ${resp.status} ${await resp.text()}`);
  }

  const json = await resp.json();
  const text = json.content?.[0]?.text ?? '';
  return parseVerdictResponse(text, 'claude-haiku-4-5');
}

async function callGemini(
  ocrText: string,
  profileAllergens: string[],
  apiKey: string,
): Promise<Verdict> {
  const userPrompt = `${SYSTEM_PROMPT}

OCR text from product label:
"""
${ocrText}
"""

User's allergen profile (watch for these):
${profileAllergens.length === 0 ? '(none flagged)' : profileAllergens.join(', ')}

Produce the JSON verdict.`;

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          maxOutputTokens: 1024,
          temperature: 0.1,
          responseSchema: {
            type: 'object',
            required: [
              'kind',
              'reason',
              'triggeredAllergens',
              'mayContainAllergens',
              'confidence',
              'normalizedProductName',
              'displayName',
              'containsAllergensCanonical',
              'mayContainAllergensCanonical',
            ],
            properties: {
              kind: { type: 'string', enum: ['compatible', 'avoid', 'caution', 'unknown'] },
              reason: { type: 'string' },
              triggeredAllergens: { type: 'array', items: { type: 'string' } },
              mayContainAllergens: { type: 'array', items: { type: 'string' } },
              confidence: { type: 'number' },
              normalizedProductName: { type: 'string' },
              displayName: { type: 'string' },
              containsAllergensCanonical: { type: 'array', items: { type: 'string' } },
              mayContainAllergensCanonical: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      }),
    },
  );

  if (!resp.ok) {
    throw new Error(`Gemini API error: ${resp.status} ${await resp.text()}`);
  }

  const json = await resp.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return parseVerdictResponse(text, 'gemini-2.5-flash');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'authorization, content-type',
      },
    });
  }

  try {
    const body = (await req.json()) as VerdictRequest;
    const { ocrText, ocrConfidence, profileAllergens, locale, imageHash } = body;

    if (!ocrText || typeof ocrConfidence !== 'number') {
      return Response.json({ error: 'missing ocrText or ocrConfidence' }, { status: 400 });
    }

    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
    const geminiKey = Deno.env.get('GEMINI_API_KEY');

    let verdict: Verdict;
    let modelUsed: string;

    try {
      if (!anthropicKey) throw new Error('no anthropic key');
      verdict = await callClaude(ocrText, profileAllergens ?? [], anthropicKey);
      modelUsed = 'claude-haiku-4-5';
    } catch (claudeErr) {
      console.warn('Claude failed, falling back to Gemini:', claudeErr);
      if (!geminiKey) {
        return Response.json({ error: 'both LLM providers unavailable' }, { status: 503 });
      }
      verdict = await callGemini(ocrText, profileAllergens ?? [], geminiKey);
      modelUsed = 'gemini-2.5-flash';
    }

    // Service-role Supabase client for upsert + log
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Upsert product (self-healing). Increment scan_count, average confidence.
    const { data: existing } = await supabase
      .from('products')
      .select('id, scan_count, ocr_confidence_avg')
      .eq('normalized_name', verdict.normalizedProductName)
      .maybeSingle();

    let productId: string;
    if (existing) {
      const newScanCount = existing.scan_count + 1;
      const newAvgConf =
        (existing.ocr_confidence_avg * existing.scan_count + ocrConfidence) / newScanCount;
      const { data: updated } = await supabase
        .from('products')
        .update({
          scan_count: newScanCount,
          ocr_confidence_avg: newAvgConf,
          status: newScanCount >= 5 && newAvgConf >= 0.85 ? 'verified' : 'pending',
        })
        .eq('id', existing.id)
        .select('id')
        .single();
      productId = updated!.id;
    } else {
      const { data: inserted } = await supabase
        .from('products')
        .insert({
          normalized_name: verdict.normalizedProductName,
          display_name: verdict.displayName,
          source_country: (locale ?? 'en-CA').split('-')[1] ?? 'CA',
          ocr_text_consensus: ocrText,
          ocr_confidence_avg: ocrConfidence,
          scan_count: 1,
          contains_allergens: verdict.containsAllergensCanonical,
          may_contain_allergens: verdict.mayContainAllergensCanonical,
          status: 'pending',
        })
        .select('id')
        .single();
      productId = inserted!.id;
    }

    // Log the scan (caller's auth context determines user_id via RLS)
    const authHeader = req.headers.get('authorization');
    if (authHeader) {
      const userClient = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        { global: { headers: { authorization: authHeader } } },
      );
      await userClient.from('product_scans').insert({
        product_id: productId,
        ocr_raw_text: ocrText,
        ocr_confidence: ocrConfidence,
        image_hash: imageHash,
        capture_locale: locale ?? 'en-CA',
        verdict_kind: verdict.kind,
        verdict_reason: verdict.reason,
        triggered_allergens: verdict.triggeredAllergens,
        may_contain_allergens: verdict.mayContainAllergens,
        verdict_confidence: verdict.confidence,
        profile_allergens: profileAllergens ?? [],
        contributed_to_consensus: ocrConfidence >= 0.85,
        llm_model: modelUsed,
      });
    }

    return Response.json(
      { verdict, productId, modelUsed },
      {
        headers: { 'access-control-allow-origin': '*' },
      },
    );
  } catch (e) {
    // Distinguish upstream-LLM failures from real server bugs.
    const msg = e instanceof Error ? e.message : String(e);
    const isLlmIssue =
      msg.includes('JSON parse failed') ||
      msg.includes('no JSON object') ||
      msg.includes('missing required fields') ||
      msg.includes('API error');
    return Response.json(
      { error: msg, kind: isLlmIssue ? 'upstream_llm' : 'server' },
      {
        status: isLlmIssue ? 502 : 500,
        headers: { 'access-control-allow-origin': '*' },
      },
    );
  }
});
