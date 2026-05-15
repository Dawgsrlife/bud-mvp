# BUD Hackathon-Killer Plan

**Date:** 2026-05-15. Synthesized from 3 parallel research agents (feature framework, self-healing DB + LLM costs, YC + hackathon judging psychology).

## The 3 killer features (locked)

### 1. Ghost Scan (the wedge)
**Pitch:** Point camera at any product. Burst-frame OCR + LLM verdict in ~1.2 seconds. The exact ingredient that triggers your allergy is circled in red on the live label.

**The 15-second demo:** Hold up trail mix. 3 burst shutter ticks. Frame freezes. Red box snaps around "may contain peanuts." Bud mascot face turns red. "STOP. Peanuts (you set this as life-threatening)."

**Why defensible:** Yuka/Fig do barcode lookup. We read the actual label, in real time, on-device.

**Stack:**
- `react-native-vision-camera` v4 frame processors, 3 burst frames at 400ms spacing
- Apple Vision `RecognizeTextRequest` (iOS) + ML Kit Text Recognition v2 (Android), both free + on-device
- Edge Function batches 3 OCR strings + low-res image → Claude Haiku 4.5 with cached system prompt
- Round trip ~900-1400 ms

### 2. Crowd Memory (the moat)
**Pitch:** When 10 strangers scan the same product, BUD knows it better than the manufacturer's site. Live counter: "847 others have scanned this. Last ingredient change: April 18, 2026. Confidence: 99.3%."

**The 15-second demo:** Two phones scan the same product on stage. Second phone in airplane mode still gets a verdict from the cached community entry. "Wikipedia for grocery labels."

**Why defensible:** Pure network effect. Every scan compounds the moat.

**Stack:** Supabase products + product_scans + product_reports + user_reputation tables (schema in `supabase/migrations/0001_initial_schema.sql`). Wikipedia-style consensus algorithm. pgvector embeddings on OCR text for dedup across spelling variations.

### 3. Verdict Cards (the share loop)
**Pitch:** Every scan generates a shareable card with the product photo, traffic-light verdict, and Bud mascot reaction. One tap → iMessage / WhatsApp share-sheet.

**The 15-second demo:** Scan a granola bar for child with tree-nut allergy. Card renders red Bud face: "NOT SAFE for Mia. Contains: almonds, cashews." Tap → second phone receives the SMS preview live.

**Why defensible:** k-factor &gt; 1. Every avoid verdict is a free user-acquisition pixel. Hult Prize judges love viral consumer love.

**Stack:** `react-native-view-shot` + Skia card render + Moti for Bud mood animation. Deep link back to BUD app for the recipient.

---

## Self-healing database (consensus algorithm)

Schema already shipped at `supabase/migrations/0001_initial_schema.sql`. Algorithm:

1. **Scan #1:** product row created, `status = pending`, `scan_count = 1`, weight contributed = `ocr_confidence × user_reputation`. If weight < 0.4 → recorded but doesn't count toward consensus.
2. **Scan #5+:** matched via `(barcode exact OR pHash within Hamming-6 OR trigram similarity > 0.7 on normalized name)`. Each matched scan votes. `consensus_score = agree_count / sum(weights)`.
3. **Promotion:** `scan_count >= 5 AND consensus_score >= 0.75 AND weighted_avg(ocr_confidence) >= 0.85 AND no anomaly flag` → `status = verified`.
4. **Quarantine:** 10% report rate within rolling 7 days OR &gt;5 conflicting scans in 1 hour → `status = quarantined`, paused from consensus.
5. **Realtime push:** Supabase Realtime subscribes clients to `products:status=verified` filtered by IDs they recently scanned. When a pending product promotes, every connected user with a pending scan of it gets the update instantly.

Precedent: Wikipedia (Adler & de Alfaro 2007), Stack Overflow vote-weighted scoring, Open Food Facts contributor weighting.

## Anti-poisoning (Mal's flag)

- **Rate limit:** 200 scans/user/day, hard cap
- **Confidence floor:** OCR confidence < 0.4 → weight = 0 (records but ignored)
- **Reputation:** new users start 1.0, +0.05 per accepted scan, -0.5 per upheld troll report, < 0.2 = shadowban
- **Sybil resistance:** phone-verified or Apple/Google SSO required; new accounts at weight 0.3 for first 24h
- **Adversarial sweep:** weekly Edge Function pulls 100 random recent claims, runs Haiku to flag obvious bad data, auto-rejects with -25 reputation hit

---

## LLM cost economics

Per-scan workload: ~3000 system tokens (cached) + 500 user input + 150 output.

| Model | Per-scan | 1K/day | 10K/day | 100K/day |
|---|---|---|---|---|
| **Claude Haiku 4.5** (with caching) | $0.00155 | $46.50/mo | $465/mo | $4,650/mo |
| **Gemini 2.5 Flash** (with caching) | $0.000615 | $18.45/mo | $184/mo | $1,845/mo |
| **Gemini 2.5 Flash-Lite** (with caching) | $0.00014 | $4.20/mo | $42/mo | $420/mo |
| **Self-hosted Llama 3.1 8B on H100 spot 24/7** | varies | $1,072/mo fixed | $1,072/mo | $1,072/mo |

### Routing logic (locked)

```
PRIMARY (safety-critical, allergen-anaphylaxis tier):
  -> Claude Haiku 4.5 (audited reasoning, prompt-cached)

DEFAULT (nutrition score, general queries):
  -> Gemini 2.5 Flash-Lite (cost-optimized)

ESCALATION (confidence after primary < 0.7, ambiguous):
  -> Claude Sonnet 4.6 (~5% of traffic)

FALLBACK (Anthropic rate-limited or down):
  -> Gemini 2.5 Flash
```

### Tipping point: when to go local

**Stay on cloud APIs until ~255K scans/day (≈ 7.7M scans/month).** Below that, even spot H100 self-hosting is more expensive amortized than Flash-Lite.

When we cross 255K/day:
- Fine-tune **Llama 3.1 8B** on the accumulated BUD scan dataset (we'll have labels from every verdict)
- Deploy on H100 spot, vLLM
- Hybrid forever: local Llama for OCR-reconciliation + ingredient extraction; Claude Haiku stays in the cloud for safety-verdict reasoning (small portion of cost, high portion of trust)

---

## Computer vision specifics

- **OCR:** native, on-device, free. Apple `RecognizeTextRequest` (iOS 18+ `.accurate` path) + ML Kit v2 (Android). ~95% character accuracy on flat printed labels.
- **Burst:** 3 frames at 400ms via VisionCamera frame processor. All 3 OCR'd locally.
- **Multi-frame reconciliation:** LLM does it. Send all 3 OCR strings + confidences to Claude with prompt "Reconcile these 3 OCR passes of the same curved label. Return canonical ingredient list." Consensus Entropy approach (arXiv 2504.11101).
- **Low-confidence escalation:** if any allergen-adjacent word has post-vote confidence < 0.85, escalate that frame only to Gemini 2.5 Flash with vision (image input, not text).
- **OpenCV:** skip for MVP. Add `react-native-fast-opencv` only in Phase 2 if real curve dewarping demanded by user testing.
- **Cloud Vision API:** only as tiebreaker for &lt; 2% of scans. Otherwise free native is fine.

---

## AR strategy

**Demoable in 2 weeks (MVP):**
- "Tap-to-anchor" overlay using `expo-gl` + 2D Skia overlay
- User taps product in live camera feed, Skia draws red allergen pin at tap location
- Persisted across frames via lightweight feature matching

**Native AR path (Phase 2):**
- **iOS:** ARKit `ARImageTrackingConfiguration` + RealityKit. Pin Bud's 3D mascot onto detected product labels. Free, on-device. Custom Expo native module (~10-day spike).
- **Android:** ARCore Augmented Images API.
- **Web AR:** Niantic sunset 8th Wall in Feb 2026, open-sourced under MIT as XR Engine. Use XR Engine for free WebAR or skip web AR entirely for MVP.

**Phase 3:** Vision Pro / smart glasses port. Reuses the same skeleton-pose pipeline as the future BUD gym vision (Mal's R3F + MediaPipe + Move AI stack).

---

## What wins demos in 2026 (judging psychology)

1. **The 5-second hook:** open with the body, not "Hi, we're BUD." Best opener for BUD: a child's anaphylaxis story (find one in the network) → BUD's logo flashes → audience leans in.
2. **The "AI shows up unexpectedly" moment:** real-time FDA recall database cross-reference + cross-contamination risk from manufacturing facility data. Show a clean-label product flag red because parent company had a peanut recall 6 weeks ago.
3. **The data flywheel narrative:** "Every scan makes the next scan smarter. No GPT call gives you that." This is the only AI moat VCs respect in 2026.
4. **The boring-but-huge reframe:** Don't pitch food allergies (small). Pitch "the personal trust layer for everything you put in your body." Allergies are the wedge. Medications, supplements, pregnancy-safe, kidney-diet, diabetic compliance follow. $200B market, not a niche.

## What kills demos in 2026 (anti-patterns)

- "AI-powered" / "revolutionary" / "disrupt" / "platform" / "ecosystem"
- Reading slides
- Co-founders talking over each other
- Generic problem statement instead of specific story
- Demos that don't work live (always have a 15-sec recorded backup)
- Going past time

## The closeable narrative arc

**2-min:**
- Hook (allergy child story, 15s)
- Live scan demo (45s)
- Moat in one line: "every scan makes the next smarter" (15s)
- Ask (15s) — "We close on YC S26 / pre-seed / clinic partner in [city]"

**Closer:**
> "In 18 months, every allergy parent in North America will check BUD before they check the label. We're not asking if. We're asking who's coming with us."

---

## YC / competition-specific framing

| Track | Required framing |
|---|---|
| **YC S26 late app** | Founder-market fit > idea. UofT/York CS+EE + a real allergy story. Boring-huge market reframe (trust layer, not allergen app). Apply with weekly Update entries to build momentum. |
| **Hult Prize** | SDG 3 + SDG 2 explicit. Lead with anaphylactic death stats (200/yr US). End with "by 2030 we prevent X deaths." |
| **Next 36** | Canadian commerce advantage. Reframe Canada-first as regulatory (Health Canada labeling stricter than FDA = cleaner training data). |
| **Futurpreneur** (Andrew Ko already in convo) | Cash-flow viability + founder coachability. Show a 24-month financial model freemium → clinic licensing. |

## Pre-launch traction signals that move the needle

- Waitlist count alone is weak. Pair with **why**: viral TikTok, allergy-mom Facebook group of 50K, etc.
- Strong: signed LOIs from 2-3 allergy clinics, pediatric allergist quoted in-app
- Manual Wizard-of-Oz scans done for 30 real families with retention data

---

## Per-slice "wow" moments mapped to MVP build

| Slice | Wow moment |
|---|---|
| **5. Camera + on-device OCR** | Triple-shutter sound + freeze-frame with text bounding boxes lighting up character-by-character |
| **6. Edge Function + Claude verdict** | 1.2-second turnaround from frozen frame to red verdict card with the exact ingredient circled in red |
| **7. Crowd Memory write-back** | "847 others have scanned this" counter ticking up live as a second test phone scans simultaneously |
| **8. Verdict Card share** | Bud's mood animation cross-fading from worried to angry, share-sheet pop, SMS preview rendering on second phone |

---

## Open questions for Alex

- [ ] **The anaphylaxis story:** find one in your network (allergy-mom FB group, allergist contact, anyone's kid). The pitch hinges on a real human name + date.
- [ ] **Clinic LOI outreach:** can you ask Zehra (McGill Dobson) for clinic intros? She mentioned 2 unnamed VCs who won't intro until traction shown - clinic LOI is the traction.
- [ ] **TikTok seeding plan:** the Phantom Wallet / Atomato polish + Bud's mascot face turning red = made-for-TikTok content. Who's making the first 10 videos?
- [ ] **Wizard-of-Oz pilot:** 30 real families, manual verdicts via Telegram bot before MVP ships. Possible to start this weekend?

## Sources (for the brand book footer + the YC application)

- Claude / Gemini API pricing (anthropic.com/pricing, ai.google.dev/gemini-api/docs/pricing)
- VNRecognizeTextRequest (developer.apple.com/documentation/vision/vnrecognizetextrequest)
- react-native-vision-camera frame processors docs
- Supabase Realtime + pgvector docs
- Consensus Entropy paper arXiv 2504.11101
- 8th Wall open-source transition (Feb 2026)
- YC Application Video guide
- Hult Prize selection criteria
- Adler & de Alfaro 2007 (Wikipedia content-driven reputation)
