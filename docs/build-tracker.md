# BUD MVP Build Tracker

**Living document. Updated every session.** Canonical answer to "what's done and what's left."

**Last updated:** 2026-05-15 late evening (post-Slice 7 + Slice 11 + Amir v7 brand sync)

---

## ✅ DONE

### Repo + tooling
- Private GitHub repo `Dawgsrlife/bud-mvp` (SSH auth, no more PAT)
- Expo SDK 54 + RN 0.81 + React 19 + TypeScript strict
- Vercel deploy of brand book at `https://bud-brand-book.vercel.app` (v7)
- Supabase project `rtmeutqbxswjfhjdlnop` linked, schema deployed, Edge Function deployed
- Combo repo location: GitHub authority + Syncthing-mirrored to Amir via zedsio-shared-vault
- ESLint boundaries plugin (blocks cross-layer imports)
- Babel config with worklets plugin (Reanimated 4 + New Arch fix)
- LAN mode dev server

### Frontend slices
- **Slice 1** Design system + launch screen ✅
- **Slice 2** Onboarding (welcome → Big 9 chips → confirm → AsyncStorage) ✅
- **Slice 3** Camera UI (permission states → viewfinder → ring shutter → captured → review) ✅
- **Slice 4** Mocked end-to-end verdict pipeline ✅
- **Slice 5** Real Claude/Gemini verdict via Edge Function ✅
- **Slice 6** Scan history + skeletons + empty/error states ✅
- **Slice 7** Verdict card share (Skia-free, view-shot PNG + native share sheet, k-factor loop) ✅
- **Slice 11** Report + dispute flow (4-reason bottom sheet, Supabase insert into product_reports, RLS-protected) ✅

### Backend
- Supabase schema (products / product_scans / product_reports / product_aliases / truth_signals / user_reputation)
- Edge Function `verdict` deployed (Claude Haiku 4.5 primary + Gemini 2.5 Flash fallback, prompt-cached)
- Wikipedia-style consensus rules baked in
- Anti-poisoning: user reputation weighting, rate limit, confidence floor, sybil resistance

### Brand · Design Book v7 (2026-05-15)
- HTML book at https://bud-brand-book.vercel.app fully reconciled to canonical DESIGN-BOOK.md
- §10 Verdict: "CAUTION" renamed "UNCERTAIN" everywhere; compatible copy moved off regulatory-landmine phrases ("Eat freely." / "Clean for you." stripped, added to ban list with reasoning)
- §05 Color: Consumer System swap (oat #fcf9f2 + surface #f6f3ec + charcoal #1a1a1a + deep sage #1d4433 + sage mint #bfd8c5 + terracotta #c65a3d). Status-warn #F59E0B retired (WCAG fail)
- §06 Typography: four-font canon documented (Sora 600 + Fraunces Italic + Inter + IBM Plex Mono). Retired "italic prohibited" and "no serif-sans mixing" v4 rules
- One green locked: deep sage #1d4433. Emerald #1FAB5C retired from canon
- /all-links sitemap + /sitemap.xml + /robots.txt published for OpenClaw ingestion
- 11 chapters live (01-08, 10, 16, color-ladder, all-links)

### Memory + accountability (operational)
- Daily 9:30 PM Giuseppe Brown reminder armed (Brez Scales, 30-day commitment)
- Sat May 16 noon RecInDa6ix meeting prep + reminders armed
- Sat May 16 6:15 PM NextDoor Markham dinner with Storm armed
- Sun May 17 weekly question burst armed
- Sun May 17 9 AM MVP build kickoff armed
- Thu May 21 3 PM Futurpreneur info session armed
- Mon May 18 10 AM Wizard-of-Oz Telegram pilot reminder armed
- June 17 reminder armed (2 days before unrestricted-Gemini-key deprecation June 19)

---

## 🟡 IN PROGRESS

### Frontend (next)
- **Slice 8** Real Apple Vision OCR + multi-frame burst (iOS, needs native Expo Module)
- **Slice 8b** ML Kit Text Recognition v2 (Android parity)
- **Slice 9** Supabase Realtime subscription on products.status (Crowd Memory demo moment)
- **Slice 10** Supabase Auth (anonymous first, magic-link upgrade)
- **Slice 12** Settings + profile edit + about screen (with SaMD disclaimer)

### Backend engine
- **Anthropic API key on Edge Function** (currently Gemini-only; placeholder ANTHROPIC_API_KEY needs real value)
- **User reputation recompute** Edge Function (daily cron)
- **Adversarial sweep cron** (weekly anti-troll review)
- **Supabase Realtime subscription** to products.status: NOT WIRED on client

### Brand book chapters (HTML deployment pending)
- Chapter 09 Product brand (in-app rules)
- Chapter 11 Web + landing (bud.quest)
- Chapter 12 Social (IG / TikTok templates)
- Chapter 13 Outbound + email lifecycle
- Chapter 14 App Store presence
- Chapter 15 Brand application rules + governance

### QA + ship
- Type-check (tsc --noEmit) clean across whole codebase
- ESLint --max-warnings 0 clean (including boundaries rule)
- Unit tests: verdict prompt builder, reputation math, history repo (200 cap), Result handling
- Manual iPhone smoke test (Tailscale OFF, LAN mode)
- EAS Build dev-client (.ipa) for sideload — TestFlight DEFERRED per Alex (needs $99/yr Apple Dev enrollment, App Store Connect record)

---

## 🔴 BLOCKED / WAITING

| Item | Blocker | Owner |
|---|---|---|
| **Real Claude verdict** | Anthropic API key not yet pasted to Edge Function secrets | Alex (paste when ready) |
| **iPhone Expo Go preview** | Tailscale interference. Toggle Tailscale OFF for LAN to work. | Alex (toggle), then me |
| **TestFlight submit** | Need Apple Developer account ($99/yr) + App Store Connect app record | Alex (enrollment + record) |
| **Anaphylaxis founder story for YC narrative** | Find one real story in your network | Alex (relationships) |
| **2-3 allergy clinic LOIs** | Zehra McGill Dobson intro request | Alex (outreach) |
| **Supabase secret_key rotation** | Pasted in chat, eventually rotate | Alex (low priority) |
| **Real OCR** | Needs Expo Module + EAS Build dev-client (no Expo Go support for native modules) | Me, blocked on dev-client |

---

## ⏭️ NEXT (in order, when work resumes)

1. **Wire Anthropic API key** to Edge Function secrets (Alex, 2 min) → unblocks real Claude verdicts
2. **Slice 9: Supabase Realtime** for live consensus updates (me, 1 hr)
3. **Slice 10: Supabase Auth** (anonymous → magic-link upgrade) (me, 2 hr)
4. **Slice 12: Settings + profile edit + about** (me, 2 hr) — includes SaMD disclaimer
5. **EAS Build dev-client** (.ipa) for sideload-on-iPhone testing (me, 1 hr) — TestFlight deferred
6. **Brand book chapters 09 + 11 + 12 + 13 + 14 + 15** (me, parallel-able, 3-4 hr total)
7. **Slice 8 + 8b: Real OCR** (me, 4 hr, requires native modules in dev-client)
8. **QA pass**: typecheck + lint + unit tests + iPhone manual (me, 2 hr)
9. **Engine cron**: reputation recompute + adversarial sweep (me, 2 hr)
10. **Wizard-of-Oz Telegram pilot** for pre-launch traction signal (me + Alex)

---

## TestFlight onboarding (when ready)

When Alex wants to submit to TestFlight, this is what's needed:

1. **Apple Developer Program enrollment** ($99/yr) at https://developer.apple.com/programs/. Apple Inc. needs proof of business (or enroll as individual). 24-48 hour approval.
2. **App Store Connect record**: bundle ID `io.zedsio.bud` (already locked in app.json). Name: "Bud". Primary language: English. Category: Food & Drink (NOT Medical — preserves the SaMD-avoidance posture).
3. **App Store Connect API key**: Users + Access → Keys → generate. Paste into EAS environment variables. Powers `eas submit --platform ios` automation.
4. **TestFlight build**: I run `eas build --platform ios --profile production` → `eas submit --platform ios`. ~20 min build + ~24 hr first review.
5. **Internal testers**: invite up to 100 users by email. Available immediately after build approval.
6. **External testers**: up to 10,000 emails. Needs Apple beta review (1-2 days).

---

## 🎯 The 3 hackathon-killer features

| Feature | Status |
|---|---|
| **Ghost Scan** | Wired end-to-end with mocked OCR. Real OCR pending Slice 8. |
| **Crowd Memory** | Schema deployed. Edge Function upserts. Realtime subscription NOT yet wired (Slice 9). |
| **Verdict Cards** | ✅ Slice 7 shipped. PNG export + native share sheet + "Scanned with Bud" footer. |

---

## 📐 Architecture (one-liner)

Mobile (RN + Expo) → Supabase Edge Function `verdict` (Deno, holds keys) → Gemini/Claude → Verdict back to mobile + scan logged to Supabase → consensus algorithm promotes product to `verified` over time.

---

## 🔄 Sync layers

- **vault-private** (`AlexOS/vault-private/`) → GitHub Dawgsrlife/workflow (Alex only)
- **zedsio-shared-vault** (root) → Syncthing P2P to Amir + AI PC over Tailscale
- **_secrets** (`AlexOS/_secrets/`) → never syncs anywhere
- **bud-mvp** repo → GitHub Dawgsrlife/bud-mvp + Syncthing-mirrored to Amir
