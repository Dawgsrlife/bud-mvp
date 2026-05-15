# BUD Brand Book - Draft v3

**Status:** DRAFT v3 of ~15.
**Last touched:** 2026-05-15 after slice 3 (camera UI) lands.

## What changed from v2

1. **Scanner screen aesthetic locked.** Dark canvas (`tokens.color.ink`) with 4 white minimal corner brackets, white ring shutter, optional centered hint pill. Reads as Phantom + Apple Camera, NOT Yuka. Brand restraint holds: no decorative color on the camera surface, accent reserved for verdicts.
2. **Web preview placeholder.** Camera screen on browser shows a thoughtful mascot + neutral dark surface (NOT a broken-camera error). Mascot bridges between onboarding warmth and the camera-as-tool moment.
3. **Mood system extended.** `BuddyMascot` now responds to `idle | happy | thinking | warning`. Eyes scale per mood. Lays groundwork for verdict moments (happy = compatible, warning = avoid).
4. **Shutter button locked.** Ring style. 76px outer ring, 64px inner filled circle, 3px stroke. Bouncy spring press (damping 12), medium haptic on press. Reads tactile, premium.
5. **First haptic surfaces.** `use-haptic` hook abstracts platform. Web/simulator no-op. Native iOS gets real selection + impact + notification feedback. Every touchable from here on gets haptic.

## Brand visual hierarchy by surface

| Surface | Background | Foreground | Brand presence |
|---|---|---|---|
| **Welcome / Onboarding** | `tokens.color.bg` (off-white) | Inter ink + brand-600 eyebrow | Mascot at hero |
| **Profile chips** | bg | ink-on-surface chips, ink-on-ink-selected | Brand on selection NOT used (we use ink for selected to avoid Yuka color-coding) |
| **Home / Idle** | bg | Inter ink + brand-600 eyebrow | Mascot at hero, brand button on primary action |
| **Camera viewfinder** | `tokens.color.ink` (near-black) | white brackets + white shutter | **Zero brand color**. Camera is a tool. |
| **Verdict screens (slice 4)** | bg or status-tinted | ink + status-colored badge | Status semantics (ok/warn/danger) take over; brand recedes |

This is the discipline: brand is for navigation + warmth. Status semantics own the verdict moment.

## Mascot mood map (locked v3)

| Mood | Eye behavior | Used on |
|---|---|---|
| `idle` | normal scale, gentle bob | welcome, home, scanner-loading |
| `happy` | quick squish-bounce (0.2 -> 1) | onboarding confirm, slice 4 Compatible verdict |
| `thinking` | normal scale (placeholder, will get pulse animation later) | scanner-permission-loading, capturing, OCR-running |
| `warning` | scale 1.3 (wide eyes) | permission-denied, slice 4 Avoid verdict |

Future moods (sketched, not built): `excited`, `confused`, `sleeping` (for inactive states).

## Open questions for v4

- [ ] **Brand color decision.** Still on v1-emerald. We have v2/v3/v4 ladder variants ready. Swap one line, screenshot each, pick. **This is the next iteration's main deliverable.**
- [ ] **Mascot face evolution.** v0 has eyes + antenna only. Should v1 add a small mouth on certain moods? Eyebrows on warning? Or keep pure-eyes forever (Atomato-style)?
- [ ] **Verdict screen direction.** Two patterns to test in slice 4:
  - **Full-screen status color** (Yuka-style, red/green floods the screen). High impact, low restraint.
  - **Restrained card + tinted icon** (Wealthsimple-style, the bad number is just red, page stays neutral). Premium, calmer.
  Locked direction proposal: restrained card. Brand discipline says no status-color floods.
- [ ] **App icon direction.** Wordmark, mascot face, abstract symbol? Three sketches for v4 review.
- [ ] **Loading state design.** Currently uses ActivityIndicator from RN. Should we make a custom brand-tonal loader? (Yes, eventually. Phase 2.)
- [ ] **Status bar / system chrome inside the phone frame.** Right now there's nothing - bare phone with notch. Should we mock a 9:41 / battery indicator? Decision: NO in dev. Adds nothing for design judgment.

## Polish lock-ins (cumulative)

- Typography (Inter Variable, 6-step scale, 3-weight discipline)
- Motion (spring physics, no linear easing, mood-aware mascot)
- Color discipline (brand recedes when status semantics take over; viewfinder is brand-free)
- Iconography (Lucide-style, custom brackets/shutter, no emojis)
- Voice (direct, specific, no buzzwords, no em dashes)
- No stock photography
- No 3D-rendered food
- PhoneFrame for web preview
- Centered hero composition for hero moments

## Slices status

| Slice | Status |
|---|---|
| 1. Design system + launch screen | ✅ shipped |
| 2. Onboarding flow (welcome + Big 9 chips + confirm + persistence) | ✅ shipped |
| 3. Camera + scan UI (permission, viewfinder, shutter, captured) | ✅ shipped |
| 4. OCR + mocked verdict pipeline | next |
| 5. Real Claude verdict via Supabase Edge Function | queued |
| 6. Scan history + polish pass | queued |

## Reference apps to study before v4

1. **Yuka** verdict screen - what NOT to do (color flood)
2. **Wealthsimple** number presentation - what TO do (restrained ink + small color)
3. **Atomic Habits app (Atomato)** - completion celebration micro-animation
4. **Phantom Wallet** swap confirm sheet - tactile sheet UX
5. **Linear** issue status badges - status semantics done right
