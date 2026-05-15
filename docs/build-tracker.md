# BUD MVP Build Tracker

**Living document. Updated every session.** This is the canonical answer to "what's done and what's left."

**Last updated:** 2026-05-15 evening (post-v6 brand reconciliation)

---

## ✅ DONE

### Repo + tooling
- Private GitHub repo `Dawgsrlife/bud-mvp` (SSH auth, no more PAT)
- Expo SDK 54 + RN 0.81 + React 19 + TypeScript strict
- Vercel deploy of brand book at `https://bud-brand-book.vercel.app`
- Supabase project `rtmeutqbxswjfhjdlnop` linked, schema deployed, Edge Function deployed
- Combo repo location: GitHub authority + Syncthing-mirrored to Amir via zedsio-shared-vault
- ESLint boundaries plugin (blocks cross-layer imports)
- Babel config with worklets plugin (Reanimated 4 + New Arch fix)
- LAN mode dev server (ngrok-tunnel mode flaky, use LAN for iPhone)

### Frontend slices
- **Slice 1** Design system + launch screen ✅
- **Slice 2** Onboarding flow (welcome → Big 9 chips → confirm → AsyncStorage persist) ✅
- **Slice 3** Camera UI (permission states → viewfinder → corner brackets → ring shutter → captured → review) ✅
- **Slice 4** End-to-end mocked verdict pipeline (4 mock products cycled, restrained card pattern) ✅
- **Slice 5** Real Claude/Gemini verdict wiring (Edge Function called, local fallback if network fails) ✅

### Backend
- Supabase schema (products / product_scans / product_reports / product_aliases / truth_signals / user_reputation)
- Edge Function `verdict` deployed (Claude Haiku 4.5 primary + Gemini 2.5 Flash fallback, prompt-cached)
- Wikipedia-style consensus rules baked in (status `pending` → `verified` at 5 scans + 0.85 avg confidence; `quarantined` at 10% report rate)
- Anti-poisoning: user reputation weighting, rate limit, confidence floor, sybil resistance

### Brand
- Brand Book v6 (canonical, from Amir's DESIGN-BOOK.md): oat + sage-mint + deep-sage palette, four-font editorial typography (Sora + Fraunces Italic + Inter + IBM Plex Mono), three verdict states (Compatible / Avoid / Uncertain — never "Safe")
- Tokens.ts swapped to v6-amir-design-book
- Mascot fixed: sage-mint body + deep-sage eyes (was: deep green body + black eyes, invisible)
- Brand book HTML deployed to Vercel with v6 palette + Sora wordmark
- Algorithmics 27-chapter structure adapted as our 27-chapter target
- Physical/digital divergence reconciled — both now follow Amir's website + email

### Memory + accountability
- Daily 9:30 PM Giuseppe Brown reminder armed (Brez Scales Elite Roundtable, 30-day commitment)
- Sat May 16 noon RecInDa6ix meeting prep brief + reminders armed
- Sat May 16 6:15 PM NextDoor Markham dinner with Storm armed
- Sun May 17 weekly question burst armed
- Sun May 17 9 AM MVP build kickoff armed
- Thu May 21 3 PM Futurpreneur info session armed
- Mon May 18 10 AM Wizard-of-Oz Telegram pilot reminder armed

---

## 🟡 IN PROGRESS

### Frontend
- **Slice 6** Scan history + skeleton loaders + polish pass (next slice)
- **Slice 7** Verdict card share (k-factor viral loop)
- **Slice 8** Multi-frame burst capture + on-device Apple Vision OCR

### Backend engine
- **Real OCR (iOS)**: Apple Vision `RecognizeTextRequest` Expo Module wrapper — NOT BUILT
- **Real OCR (Android)**: ML Kit Text Recognition v2 — NOT BUILT
- **Multi-frame composition**: 3-burst → LLM reconciliation prompt — NOT BUILT (LLM call wired, multi-frame batch not yet)
- **Anthropic key for Edge Function**: placeholder set on Supabase secrets, real key not provided yet
- **Gemini API key restriction fix**: 403 "API_KEY_SERVICE_BLOCKED" — needs unrestricted API key (separate task #34)
- **Supabase Realtime subscription** to product `status=verified` updates: NOT WIRED
- **User reputation logic**: schema exists, no Edge Function recomputes it yet
- **Adversarial sweep cron**: NOT WIRED (weekly anti-troll review)

### Brand book
- Chapter 04 logo (drafted in MD, no Figma file yet)
- Chapter 07 iconography (Bud character treatment, expression library)
- Chapter 08 motion (spring presets, mascot animation matrix)
- Chapter 09 product brand (in-app rules)
- Chapter 11 web + landing
- Chapter 12 social (IG / TikTok templates)
- Chapter 13 outbound + email
- Chapter 14 App Store presence
- Chapter 15 brand application rules

---

## 🔴 BLOCKED / WAITING

| Item | Blocker | Owner |
|---|---|---|
| **Real Gemini verdict** | Gemini API key has restrictions blocking generativelanguage.googleapis.com | Alex (5-min Google Cloud fix, see below) |
| **Real Claude verdict** | Anthropic API key not yet pasted to Edge Function secrets | Alex (paste when ready) |
| **iPhone Expo Go preview** | ngrok outages + Tailscale interference. Toggle Tailscale OFF on iPhone for LAN to work. | Alex (toggle), then me |
| **Anaphylaxis founder story for YC narrative** | Find one real story in your network | Alex (relationships) |
| **2-3 allergy clinic LOIs** | Zehra McGill Dobson intro request | Alex (outreach) |
| **Supabase secret_key rotation** | Pasted in chat, eventually rotate | Alex (low priority, no real usage) |

---

## ⏭️ NEXT (in order)

1. **Fix Gemini key** (Alex, 5 min)
2. **Slice 6: scan history** (me, 1-2 hr)
3. **Brand book chapters 09 + 11 + 12** in parallel (me, 1 hr)
4. **Slice 7: verdict card share** (me, 2 hr)
5. **Slice 8: real Apple Vision OCR + multi-frame burst** (me + Alex test on iPhone, 3 hr)
6. **Supabase Realtime** for live consensus updates (me, 1 hr)
7. **TestFlight stub build** for Apple's 7-30 day first review window
8. **Wizard-of-Oz Telegram pilot** for pre-launch traction signal (me + Alex)

---

## 🎯 The 3 hackathon-killer features (from research)

| Feature | Status |
|---|---|
| **Ghost Scan** (burst-frame OCR + LLM verdict + ingredient highlighted in red on label) | Wired end-to-end with mocked OCR. Real OCR pending Slice 8. |
| **Crowd Memory** (Wikipedia-style consensus, "847 others scanned this", airplane-mode cached verdict) | Schema deployed. Edge Function upserts. Realtime subscription not yet wired. |
| **Verdict Cards** (shareable card with Bud mood, k>1 viral loop) | Slice 7. Not built. |

---

## 💸 LLM cost economics (from research)

| Model | Per-scan cost | At 100K scans/day |
|---|---|---|
| **Gemini 2.5 Flash-Lite** (DEFAULT) | $0.00014 | $420/mo |
| Claude Haiku 4.5 (safety-critical only) | $0.00155 | $4,650/mo if all routed here |
| Self-hosted Llama 3.1 8B on H100 spot | — | Only beats Flash-Lite at 255K+ scans/day |

Locked routing: Flash-Lite default → Haiku for allergen-anaphylaxis tier → Sonnet 4.6 escalation for confidence < 0.7.

---

## 📐 Architecture (one-liner)

Mobile (RN + Expo) → Supabase Edge Function `verdict` (Deno, holds keys) → Gemini/Claude → Verdict back to mobile + scan logged to Supabase → consensus algorithm promotes product to `verified` over time.

---

## 🔄 Sync layers

- **vault-private** (`AlexOS/vault-private/`) → GitHub Dawgsrlife/workflow (Alex only)
- **zedsio-shared-vault** (root) → Syncthing P2P to Amir + AI PC over Tailscale
- **_secrets** (`AlexOS/_secrets/`) → never syncs anywhere
- **bud-mvp** repo → GitHub Dawgsrlife/bud-mvp + Syncthing-mirrored to Amir (`.git/` excluded from sync)

---

## 📝 Open questions for Alex (asked elsewhere too)

- Title for BUD outbound: CTO BUD or COO Picione? (Zehra sees CTO, Margaret sees COO)
- Sun May 17 MVP build day plan: pair with Amir live or solo grind?
- Anaphylaxis story source for YC narrative
- Brand book TOC v6: which chapter to prioritize next?
