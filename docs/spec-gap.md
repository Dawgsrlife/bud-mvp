# Bud MVP: Spec Gap Tracker

**Companion to** `/zedsio-shared-vault/programming/bud/MVP-SPEC.md` (Amir's canonical Phase 1 spec).

**Last updated:** 2026-05-15

This doc maps every spec feature (F1-F18) to current code state. Single source of truth for "what's done, what's missing, where to pick up." Update every session.

---

## Feature gap table

Legend: ✅ done · 🟡 partial · 🔴 missing · ⚪ regulatory blocker independent of code

| # | Feature | State | Where it lives | Next move |
|---|---|---|---|---|
| F1 | Onboarding (under 90s, consent + profile + first scan) | 🟡 partial | `src/features/profile/presentation/screens/onboarding-screen.tsx` | Add consent screen (F15) as step 0. Upgrade allergen list from Big-9 → Big-11 (add Molluscs + Mustard). Add severity picker (Mild/Moderate/Anaphylaxis). Add cross-contact preference per allergen (F12). Add first-scan walkthrough. |
| F2 | Camera scan (barcode-first cascade w/ OCR fallback) | 🟡 partial | `src/features/scanner/` | Barcode detection (use `expo-camera` BarCodeScanner or `expo-barcode-scanner`). Real OCR via Expo Modules (iOS Apple Vision + Android ML Kit). Multi-frame burst. Cloud OCR fallback (Google Cloud Vision). |
| F3 | Verdict screen (3-state) | ✅ shipped | `src/features/scanner/presentation/screens/verdict-screen.tsx` | Add "Why this verdict ▾" expandable (F4). Add disclaimer footer (F16). Add Smart Swap section (F5) for Avoid/Uncertain. |
| F4 | "Why this verdict" expandable detail | 🔴 missing | (verdict-screen) | Collapsed by default. Shows: source (retailer/OFF/OCR/user), confidence tier (HIGH/MED/LOW), timestamp, allergens checked. |
| F5 | Smart Swap (1-3 alternatives) | 🔴 missing | (new edge function + new feature folder) | Build `supabase/functions/smart_swap/`. Filter same category, all user allergens NO_MATCH/FREE_FROM. Rank by confidence tier > corroboration > recency. NEVER paid placement (SOUL.md hard rule). |
| F6 | Family multi-profile | 🔴 missing | (new feature folder) | New `family_profile` Supabase table. UI: profile switcher at top of Scan tab. Add member flow in Profile tab. Single-profile MVP today needs schema migration. |
| F7 | Allergen profile management (severity + cross-contact per allergen) | 🟡 partial | `src/features/profile/presentation/screens/settings-screen.tsx` (built today, not wired) | Wire into App.tsx routing. Add severity picker (Mild/Moderate/Anaphylaxis) per allergen. Add cross-contact override per allergen. Per-profile not single-profile. |
| F8 | Scan history (50 offline, 500 with network) | ✅ shipped local-only | `src/features/history/` | Current: AsyncStorage, 200 cap. Spec asks for 50 offline + 500 server-synced. Slice 10 (Auth) unlocks server sync. WatermelonDB + SQLCipher migration for spec compliance. |
| F9 | Offline mode | 🟡 partial | (history-storage-datasource) | Last 50 product verdicts cached. Spec asks for SQLCipher-encrypted cache. AsyncStorage adequate for MVP day-1, migrate to WatermelonDB before TestFlight. |
| F10 | CFIA recall integration | 🔴 missing | (new edge function + push) | Build `supabase/functions/cfia_recall_check/`. Daily pg_cron pull of CFIA Allergen-related Recalls dataset. Match against scanned products. Expo Notifications push. Banner UI on verdict screen if active recall. |
| F11 | Bilingual EN + FR-CA UI + OCR | 🔴 missing | (no i18n layer) | Add `i18next` or `expo-localization`. Every visible string keyed. Certified French translation (NOT Google Translate per spec). OCR layer needs language detection (fastText) + bilingual lexicon already in ontology. |
| F12 | Cross-contact handling (may contain as first-class) | 🟡 partial | `verdict` edge function | Server returns `mayContainAllergens` correctly. UI does not surface per-allergen cross-contact preference. Onboarding (F1) needs the preference picker. |
| F13 | Free-from claim parsing | 🔴 missing | `verdict` edge function | Layer 1 parser must detect "peanut-free" / "sans arachide" claims via regex. Surface in evidence but NEVER substitute for ingredient check. |
| F14 | Report-an-error flow | ✅ shipped | `src/features/reports/` | Slice 11 shipped today. 4-reason bottom sheet, Supabase insert, RLS-protected. Photo upload deferred (spec says optional). |
| F15 | First-use consent screen | 🔴 missing | (new screen in onboarding flow) | Full-screen modal step 0 of onboarding. "Bud is an information tool, not a medical device." Locked copy from spec §3.2. |
| F16 | Verdict footer disclaimer | 🔴 missing | (verdict-screen) | "Based on declared ingredients. Always verify the physical package. Not medical advice." Inter 11pt, charcoal 60%. Every verdict, every time. |
| F17 | Settings (language, profile, sign out, about, privacy, terms) | 🟡 partial | `src/features/profile/presentation/screens/settings-screen.tsx` (built today, not wired) | Wire into App.tsx. Add language toggle (depends F11). Add auth controls (depends F18). Privacy + Terms in-app webview. |
| F18 | Apple Sign-In + email magic link | 🔴 missing | (Slice 10, deferred) | `supabase-js` Auth client. `expo-apple-authentication`. Magic-link via `signInWithOtp`. Anonymous-first scanning preserved. |

---

## Backend gap

| Component | State | Where | Next move |
|---|---|---|---|
| `verdict` edge function | ✅ shipped, validated 5 cases 2026-05-15 | `supabase/functions/verdict/index.ts` | Add CFIA recall lookup step (after product upsert). Add Smart Swap candidate query (after verdict). Add Layer 1 parser (deterministic) BEFORE LLM fallback per spec §4.4. Currently LLM-only. |
| `smart_swap` edge function | 🔴 missing | `supabase/functions/smart_swap/` | New. See spec §4.2 + §4.6. |
| `cfia_recall_check` edge function | 🔴 missing | `supabase/functions/cfia_recall_check/` | New. Daily pg_cron. See spec §4.2. |
| `ingest_user_submission` edge function | 🔴 missing | `supabase/functions/ingest_user_submission/` | New. Triage + reputation + manual review. See spec §4.2. |
| Big-11 allergen ontology | 🔴 missing | (new file) | `supabase/functions/_shared/allergen-ontology-canada-v1.yaml` (mirror Amir's file). Load on function init, cache in memory. |
| Layer 1 parser (deterministic AST) | 🔴 missing | (new in verdict function) | Pseudocode in spec §4.4. TypeScript implementation. Replaces LLM-direct call for high-confidence path. |
| LLM = Bedrock Claude Haiku 4.5 | 🟡 partial | (currently Gemini-only) | Spec wants AWS Bedrock ca-central-1 cross-region inference, NOT direct Anthropic API. Migrate when Bedrock account provisioned (Week 1 task). |
| Data model: Big-11 schema | 🟡 partial | `supabase/migrations/20260515193000_bud_initial_schema.sql` | Current schema has products + scans + reports. Missing: `family_profile`, `user_allergen_profile`, `ingredient_list`, `allergen_flag`, `product_allergen_verdict`, `cfia_recall`, `retailer`, `brand`, `user_submission`. Full DDL in `bud-data-architecture.md` §6 (need to ingest from Amir). |
| RLS policies on user-scoped tables | 🟡 partial | (in migration) | `product_reports` has RLS. Need `family_profile`, `user_allergen_profile`, `scan_event`, `user_submission` policies. |
| Column-level encryption (`pgsodium`) | 🔴 missing | (Supabase config) | `user_allergen_profile.severity` + custom-allergen names must be encrypted at rest per Law 25 + PHIPA. Enable `pgsodium` extension, wrap insert/select. |

---

## Compliance gap (spec §6 checklist)

| Item | State | Owner |
|---|---|---|
| Banned-word lint on every release | 🔴 missing | Me — build a CI step + commit-hook. Ban list lives in §03 voice-and-tone. |
| First-launch consent screen | 🔴 missing | Me — F15 ships this. |
| Verdict footer disclaimer | 🔴 missing | Me — F16 ships this. |
| EN + FR-CA bilingual UI | 🔴 missing | Me — F11 ships this. Certified French translator: Alex needs to find one. |
| Privacy Impact Assessment | ⚪ blocker | Alex (lawyer). Spec §1.4. |
| Person in charge of personal information (Law 25 s. 3.1) | ⚪ blocker | Alex (designate). |
| Automated decision disclosure (Law 25 s. 12.1) | ⚪ blocker | Alex (privacy policy text). |
| E&O insurance | ⚪ blocker | Alex (quote + bind). |
| Cyber insurance | ⚪ blocker | Alex (quote + bind). |
| CGL + Product Liability insurance | ⚪ blocker | Alex (quote + bind). |
| Canadian privacy/tech lawyer retained | ⚪ blocker | Alex (BLG or Torys, $5K ceiling). |
| Federal CCPC incorporation decision (Zedsio DBA vs separate) | ⚪ blocker | Amir + Alex. Spec §1.4. |
| Founder agreement (50/50, 4-year vest, 1-year cliff) | ⚪ blocker | Amir + Alex. |
| Privacy Policy + ToS bilingual + certified FR | ⚪ blocker | Alex (lawyer-written). |
| Apple Developer + Google Play accounts | 🟡 partial | Apple TBD ($99/yr). Spec §1.4. |
| Bedrock ca-central-1 cross-region inference enabled | ⚪ blocker | Amir or Alex (provision AWS account). |
| PostHog Cloud EU + Sentry Cloud EU projects | ⚪ blocker | Alex (create). |

---

## Pricing decision deferred

Spec §12: Phase 1 ships **free**. No StoreKit / RevenueCat / paid tiers in MVP. Free / Plus / Family / Full Access tiers are Phase 2.

---

## Coverage decision

Spec §7: pre-launch manual seed of **top 500 GTA SKUs** during Week 1-2 founder time. Estimated 5 days for one person. Required so launch doesn't have empty database = false-green wedge.

Recommended retailers (Alex, Week 2): GTA Loblaws + Metro + Sobeys private labels first (PC, No Name, Compliments, Selection).

---

## What to do in next session (prioritized)

**If <2 hours available — high-leverage low-risk:**

1. F15 consent screen (small, regulatory must-have)
2. F16 verdict footer disclaimer (one liner, regulatory must-have)
3. Wire Slice 12 SettingsScreen into App.tsx routing (the file is built, just not reachable)
4. Big-9 → Big-11: add Molluscs + Mustard to `BIG_NINE_ALLERGENS` constant + rename to `BIG_ELEVEN_ALLERGENS`

**If 4+ hours available — medium scope:**

5. F4 "Why this verdict" expandable (small detail-card with source, tier, timestamp)
6. F7 severity picker on each allergen + cross-contact preference picker (per spec §3.2 step 2-3)
7. F11 i18next scaffolding + English strings keyed (FR-CA can be empty until certified translator)
8. Migration to add `family_profile` table + RLS + UI for "Add family member"

**If a full day available — large scope:**

9. F18 Slice 10 Supabase Auth (Apple Sign-In + magic link, anonymous-first)
10. Layer 1 deterministic parser in `verdict` edge function (regex + ontology, no LLM)
11. Big-11 ontology YAML loaded into Edge Function (pull Amir's `allergen-ontology-canada-v1.yaml` when accessible)
12. F5 Smart Swap edge function + verdict-screen surfacing

**Always-on infra (any session, low effort):**

- Banned-word lint as a CI step (regex over `src/**/*.{ts,tsx}` + edge functions)
- WatermelonDB + SQLCipher migration plan (spec §4.1)
- Bedrock provisioning waiting on Amir/Alex (spec §10 Week 1)

---

## Files Amir referenced that we don't have yet

These live in Amir's side of the vault. Alex: ask Amir to surface via Syncthing or paste:

- `programming/bud/DESIGN-BOOK.md` (we have a copy at `docs/brand-book/00-CANONICAL-DESIGN-BOOK.md` from earlier sync — verify current vs Amir's latest)
- `bud-data-architecture.md` (allergen ontology + parser + sourcing — **critical for Layer 1 parser implementation**)
- `allergen-ontology-canada-v1.yaml` (production lexicon — **critical for Big-11 detection**)
- `bud-mvp-research-2026-04-18.md` (research synthesis, Section 1 OCR cascade + Section 2 Canadian Legal + Section 5 user research methodology)
- `SOUL.md` (the "Robin Hood" rule + soul-of-the-brand reference)
- `phase1-playbook.md`
- `product-vision.md`

---

## Tech stack additions needed (per spec §4.1)

| Currently missing | Why |
|---|---|
| `@expo-google-fonts/sora` + `@expo-google-fonts/fraunces` + `@expo-google-fonts/inter` + `@expo-google-fonts/ibm-plex-mono` | Brand book v7 four-font canon. Currently `tokens.ts` references families that aren't loaded. |
| `expo-localization` + `i18next` + `react-i18next` | F11 bilingual UI. |
| `expo-apple-authentication` | F18 Apple Sign-In. |
| `react-native-mlkit-ocr` OR custom Expo Module wrapping Apple Vision + ML Kit | F2 real OCR (Slice 8 + 8b). |
| `@nozbe/watermelondb` + `@nozbe/with-observables` + SQLCipher binding | F9 spec-compliant encrypted offline cache. |
| `expo-notifications` | F10 CFIA recall push. |
| `posthog-react-native` (EU instance) | Spec §4.1 analytics. |
| `@sentry/react-native` (EU instance) | Spec §4.1 errors. |

Plus on the Edge Function side: `pgsodium` extension enabled, `pg_cron` extension enabled, Big-11 ontology loaded at function init.

---

## What "good" looks like (spec §15)

When you hand the Phase 1 app to a tester, they should be able to:

1. Install in 60s
2. Set up allergen profile in 90s
3. Scan a No Name cereal → Compatible verdict in 2s
4. Scan a PC cookie with tree nuts → Avoid + Smart Swap to PC Free From
5. Scan French-side Compliments granola → same verdict as English side
6. Add kid's profile, switch active profile before scanning
7. See CFIA recall banner when applicable
8. Use offline at a basement Costco — last 50 scans queryable
9. Tap "Why this verdict" → see exact matched token
10. Report wrong verdict in 3 taps, human reviews within a day

At no point do they see the word "safe". At every step they see the disclaimer.

**We are roughly at step 3 of 10**, with the verdict path working end-to-end via Gemini, but missing: barcode-first, real OCR, Smart Swap, multi-profile, bilingual, recall, offline encryption, Why-this-verdict, in-app submit-review.
