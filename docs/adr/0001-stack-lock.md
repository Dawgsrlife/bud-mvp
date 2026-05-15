# ADR-001: Mobile stack lock

**Status:** PROPOSED (Alex to approve)
**Date:** 2026-05-15
**Decision driver:** MVP build kickoff Sun May 17, TestFlight stub by week 2, Wealthsimple-tier polish, both founders are competent programmers but not mobile-specialists, vibe-coding with Claude Code is the dominant authoring mode.

## Decision (proposed)

**React Native + Expo SDK 53+ (New Architecture, TypeScript, custom dev client via `expo-dev-client`).**

## Three reasons in BUD's favor

1. **TestFlight-in-2-weeks is real with Expo.** EAS Build + EAS Submit handles cert/provisioning. EAS Update lets you push JS-only fixes during Apple's 7-30 day first-time review without re-submitting. Flutter has no OTA equivalent. For a slow first review, this is decisive.
2. **TypeScript + React unlocks Phase 2 (browser extension) with code reuse.** Claude verdict logic, allergen-profile types, Anthropic SDK calls, Supabase schema, and tRPC/REST clients all port directly to a Plasmo/WXT browser extension. Dart locks you out and forces a parallel TS rewrite.
3. **Claude Code is significantly stronger at TS/React than Dart/Flutter.** Training corpus is ~10x larger, Reanimated/Expo idioms are stable, iteration loop (Fast Refresh + Expo Go) is faster than Flutter hot reload for non-graphical work. For vibe coding this compounds across thousands of edits.

## Three risks + mitigations

1. **VisionCamera frame-processor + Reanimated worklet config is the #1 RN footgun.** *Mitigation:* use Expo SDK 53 with `expo-dev-client` from day 1 (skip Expo Go, you need a custom dev client anyway for VisionCamera). Pin `react-native-vision-camera` ^4, `react-native-worklets-core`, and Reanimated 4 versions explicitly. Budget 1 day to get camera + OCR pipeline working end-to-end as a spike before any UI work.
2. **Multi-frame composition for curved packaging is not a solved RN package.** *Mitigation:* don't stitch at MVP. Capture 3-5 burst frames, run OCR on each via Apple Vision (iOS) / ML Kit (Android), then merge text candidates at the LLM layer (Claude is great at de-duping fragments). True image stitching (OpenCV) comes Phase 2 if user testing demands it.
3. **Animation polish ceiling is slightly lower than Flutter's.** *Mitigation:* Reanimated 4 + Skia + Moti + Lottie covers ~98% of the Wealthsimple/Atomato bar. Use Rive for scan-success celebration + onboarding mascot. Skia handles custom shader/graphic work (gradients, mesh effects). This is the same toolchain Coinbase Wallet, Shopify Shop, Bluesky, and Discord use.

## What Flutter actually does better (honest trade-off)

Pixel-identical cross-platform UI and frame-rate consistency on Android mid-range hardware (Skia-everywhere). For an eventual India expansion this would render more consistently. `google_mlkit_text_recognition` is a single first-party blessed package; RN's OCR story is fork-and-pray. **If Amir already knew Dart, this trade would be closer. He doesn't, so it isn't.**

## Locked stack

| Layer | Choice |
|---|---|
| **Framework** | Expo SDK 53+ with New Architecture |
| **Language** | TypeScript (strict mode) |
| **Camera** | `react-native-vision-camera` v4 (frame processors) |
| **OCR** | `react-native-vision-camera-ocr-plus` (ML Kit) for v0; wrap Apple Vision via thin Expo Module on iOS if accuracy demands |
| **Client state** | Zustand |
| **Server state** | TanStack Query v5 |
| **Navigation** | Expo Router v4 (file-based) |
| **Animation** | Reanimated 4 + Moti + `@shopify/react-native-skia` + `lottie-react-native` + `rive-react-native` + `react-native-gesture-handler` |
| **Confetti** | `react-native-confetti-cannon` (upgrade to Skia particle system later if needed) |
| **Backend** | Supabase (Postgres + Auth + Edge Functions) |
| **Auth** | `expo-auth-session` |
| **Local storage** | `expo-secure-store` (profile/tokens) + `@react-native-async-storage/async-storage` (cache) + `expo-sqlite` (scan history once it grows) |
| **Image processing** | `expo-image-manipulator` (resize/crop/rotate pre-OCR) |
| **Claude SDK** | **HTTP-direct via Supabase Edge Function** (key held server-side, rate limits, logging, prompt caching). Never ship API key in-app. |
| **UI primitives** | NativeWind (Tailwind for RN) — safer than Tamagui for vibe coding |
| **Errors / analytics** | Sentry + PostHog |

## Architecture pattern

**Feature-First Clean Architecture + MVVM** (see [ADR-002](0002-architecture-pattern.md)).

Three layers: data → domain → presentation. Sliced vertically by feature (`scanner/`, `profile/`, `history/`, `symptoms/` placeholder, `receipts/` placeholder). Domain is pure TS with zero framework imports.

## Sources

- React Native vs Flutter vs Expo 2026, PkgPulse
- State of React Native: Animations
- VisionCamera docs
- react-native-vision-camera-ocr-plus
- Reanimated 4 migration docs
- Skia + Reanimated 2026 tutorial
- Expo + Supabase + TanStack Query reference architecture
- Fintech Clean Architecture in Expo, seyhunak

## Approval

- [ ] Alex
- [ ] Amir (informational; he's not the gatekeeper but the loop needs him to see this)

When approved, status flips to ACCEPTED and the date is preserved.

## Reversal cost (if we change our minds later)

Switching mobile stack after week 2 = full rewrite. Switching backend (Supabase → Firebase) = 1 week. Switching OCR provider = 1 day (it's a single datasource). Switching animation library = ongoing, not a single migration. The decision worth getting right is **mobile framework**. The rest are reversible at low cost.
