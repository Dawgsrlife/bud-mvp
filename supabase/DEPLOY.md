# Supabase deployment runbook for BUD

This is the **one-time wire-up** to deploy the schema + verdict Edge Function to
the BUD Supabase project (`rtmeutqbxswjfhjdlnop`, us-east-1).

## Prerequisites

- Supabase CLI 2.x (we have it via `npx supabase` already)
- Supabase project access token: get from https://supabase.com/dashboard/account/tokens
- Your Anthropic API key
- Your Gemini API key (already received)

## One-time setup

```bash
cd <bud-mvp dir>

# 1. Login (opens browser, OAuth)
npx supabase login

# 2. Link the local config to the BUD project
npx supabase link --project-ref rtmeutqbxswjfhjdlnop

# 3. Push the schema migration
npx supabase db push

# 4. Set Edge Function secrets so the verdict function can call the LLMs
#    (Replace the values with your actual keys from _secrets/bud-api-keys.md)
npx supabase secrets set ANTHROPIC_API_KEY=<paste-from-_secrets/bud-api-keys.md>
npx supabase secrets set GEMINI_API_KEY=<paste-from-_secrets/bud-api-keys.md>
# SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY + SUPABASE_ANON_KEY are
# auto-provided by Supabase to Edge Functions; don't set them here.

# 5. Deploy the verdict function
npx supabase functions deploy verdict --no-verify-jwt false

# 6. Smoke test it from your terminal
curl -X POST 'https://rtmeutqbxswjfhjdlnop.supabase.co/functions/v1/verdict' \
  -H 'Authorization: Bearer sb_publishable_IgRQ6AuVl_l_RkFB6r-vhQ_pybEC52K' \
  -H 'Content-Type: application/json' \
  -d '{
    "ocrText": "INGREDIENTS: Wheat flour, sugar, peanut oil, salt, yeast. Contains: wheat, peanut.",
    "ocrConfidence": 0.94,
    "profileAllergens": ["Peanuts"]
  }'
# Expected: a JSON Verdict with kind: 'avoid', triggeredAllergens: ['Peanuts']
```

## Redeploy after schema or function changes

```bash
# Schema:
npx supabase db push

# Function:
npx supabase functions deploy verdict

# Secrets are sticky; only re-set if rotated.
```

## Common errors

| Error | Fix |
|---|---|
| `Access token not provided` | Run `npx supabase login` |
| `Project not linked` | `npx supabase link --project-ref rtmeutqbxswjfhjdlnop` |
| `migration version conflict` | Check `migrations/` for filename collision; rename or merge |
| `function deploy timed out` | Retry. Supabase deploy is sometimes slow. |
| `401 from /v1/verdict` | Your `Authorization` header is wrong; use the `sb_publishable_...` key, not the secret key |
| `503 'both LLM providers unavailable'` | Both Anthropic + Gemini keys missing or invalid. Re-run `supabase secrets set` |

## Verification checklist after deploy

- [ ] `npx supabase migration list` shows `0001_initial_schema` applied
- [ ] In the Supabase dashboard, `Database > Tables` shows: products, product_scans, product_reports, product_aliases, truth_signals, user_reputation
- [ ] In `Edge Functions`, `verdict` shows as deployed
- [ ] In `Edge Functions > verdict > Secrets`, both `ANTHROPIC_API_KEY` and `GEMINI_API_KEY` are set
- [ ] Curl smoke test from step 6 above returns a Verdict (not an error)
- [ ] In the BUD mobile app, scan a product and see a real Gemini/Claude verdict (not the local mock)
