# Supabase backend for BUD

The mobile client never sees API keys. All LLM calls go through Edge Functions which hold the keys server-side.

## Structure

```
supabase/
├── migrations/
│   └── 0001_initial_schema.sql  ← products, scans, reports, aliases, truth_signals, user_reputation
├── functions/
│   └── verdict/                  ← Edge Function: OCR text + profile -> Verdict (Claude / Gemini)
└── README.md
```

## Project info

- Project: BUD (separate Supabase project from any other Zedsio work)
- Keys: `_secrets/bud-api-keys.md` (NEVER commit)
- Currently used: waitlist signup logging
- To be used: products database + verdict Edge Function

## Migration commands

```bash
# Apply schema (run from inside this directory)
supabase db push

# Generate types for the mobile client
supabase gen types typescript --project-id <project-ref> > ../src/core/network/database.types.ts
```

If `supabase` CLI not installed: `brew install supabase/tap/supabase` (mac) or `npm i -g supabase` (cross-platform).

## Edge Function commands

```bash
supabase functions deploy verdict --no-verify-jwt false
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase secrets set GEMINI_API_KEY=...
```

## RLS philosophy

- **Products** are world-readable when status = verified or pending. Service role writes (Edge Function path).
- **Scans** are owner-only read + insert. No one sees anyone else's scan history.
- **Reports** are owner-readable, anyone-fileable.
- **Aliases + truth_signals** are world-readable, service-role writable.
- **User reputation** is self-only readable.

## Self-healing consensus (the magic)

1. User scans product → Edge Function reads OCR text → calls Claude → returns Verdict
2. Edge Function ALSO upserts `products` row keyed on `normalized_name`
3. If product is new → `scan_count = 1`, `status = 'pending'`
4. If product has 5+ matching scans with high OCR confidence → `status = 'verified'`
5. If product has >= 10 reports → `status = 'quarantined'`, paused from consensus until reviewed
6. User reputation grows as their scans contribute to consensus that gets verified. Trust score gates how fast their data moves the consensus needle.

Wikipedia-style trust model. Mal's anti-poisoning rules baked in at the user-reputation layer.
