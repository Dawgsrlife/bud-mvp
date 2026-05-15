# BUD Brand Book - Draft v1

**Status:** DRAFT v1 of ~15. Iterate aggressively. This is the foundation document.
**Last touched:** 2026-05-15. Senior engineer + Kasumi-chan + Alex iteration loop.

---

## The brand promise in one sentence

**BUD is the buddy at your shoulder that says "yes, you can eat this" or "no, put it back" before you even look at the label.**

Calm. Trusted. Personal. Not corporate. Not a megaphone. A pocket second opinion.

## Brand personality (the 5 traits)

1. **Quietly confident.** Doesn't shout. Knows what it knows. Surfaces certainty when certain, doubt when honest. Never fakes.
2. **Hand-on-shoulder warmth.** The voice of a friend who happens to have a chemistry PhD. Concern is real, not performed.
3. **Specific over generic.** "Contains peanut, you flagged peanut" beats "may contain allergens." Specificity = trust.
4. **Tactile precision.** Every interaction has weight. Spring physics, haptic feedback, considered transitions. Nothing snaps. Everything settles.
5. **Generous with the user, ruthless with itself.** Free utility. No friction onboarding. Premium tier earns its money via genuinely better insight, never via withheld safety.

## The voice ladder (how BUD speaks)

| Context | Tone | Example |
|---|---|---|
| **Verdict: avoid** | Direct, factual, not alarming | "Contains peanut. Skip this." |
| **Verdict: compatible** | Quietly celebratory | "Clean for you." or "Eat freely." |
| **Verdict: caution** | Honest, transparent about confidence | "May contain tree nuts. Up to you." |
| **Onboarding** | Warm, conversational, never patronizing | "Tell me what to watch out for." |
| **Empty state** | Encouraging, never lecturing | "Scan your first product to get going." |
| **Error** | Apologetic, not blaming the user | "We couldn't read that label. Try a closer angle?" |
| **Marketing copy** | Founder-authentic, no buzzword soup | "The buddy you always needed." |

### Words BUD uses
clean, safe, skip this, eat freely, watch out, your call, up to you, let's check, second opinion, the label says, contains, may contain, your profile.

### Words BUD does NOT use
revolutionary, AI-powered, intelligent, smart, disruptive, leverage, ecosystem, platform, transform, empower, optimize, journey (in marketing), unlock, magical, seamless.

## Brand greens (PLACEHOLDER, iterate next)

Current scaffold uses BUD green `#1FAB5C`. Honest about what this picks up + what's missing:

- **Picks up:** Yuka-adjacent safety green, signals fresh-food, signals "go ahead." Reads premium because the scale (50-900) is tight.
- **Risk:** Yuka owns the red-yellow-green allergen-scoring space. Too close to their visual identity = brand confusion. Hellofresh + Whole Foods also live in this lane.
- **Iteration paths to explore (each gets its own token-file variant):**
  1. **Toronto deep green** (`#0F5132` family) - distinct from Yuka, evergreen-Canada-vibes, less consumer-grocery and more clinical/precise.
  2. **Phantom-Wallet-style monochrome + accent** (off-black main, single warm yellow/pink accent for verdicts). Maximum restraint. Atomato territory.
  3. **Linear blue** (`#5E6AD2` family). Trustworthy, distinct from food category, premium. But disconnects from "fresh/safe" semantics.
  4. **Cream + dark plum** (Wealthsimple's understated-luxury palette). Adult, considered, not health-tropey.

**Decision pending:** brand-deep-dive session with you + Amir. v1 keeps placeholder.

## Typography (LOCKED v1)

- **Type family:** Inter Variable. Free, modern, geometric, supports every weight we need.
- **Hero displays:** Inter Display (companion family with tighter tracking).
- **Scale:** 12 / 14 / 16 / 20 / 28 / 40. No 18, 22, 24, 36. Discipline.
- **Weights:** 400 regular / 500 medium / 700 bold. No 300, 600, 900.
- **Letter spacing:**
  - Body: 0
  - Headings: -0.02em (tight, premium)
  - All-caps eyebrow labels: +0.05em (looser, breathing)
- **Line height:**
  - Body: 1.5
  - Headings: 1.2
  - Long-form: 1.6
- **No italic.** Use weight for emphasis.

## Color discipline (LOCKED v1)

- 85% of any screen is neutral (off-white `#FAFAFA` background + near-black `#0A0A0A` text).
- 1 brand color appears on CTAs + status + brand moments. Nothing else.
- 1 accent color appears only on danger/avoid states. Never decorative.
- Status pills use semantic colors with NO stroke borders.
- Shadows: one shadow per elevated element, max. No stacked shadows.

## Iconography (LOCKED v1)

- **One family: Lucide.** Stroke 1.5px. No mixing with Material or Feather.
- **Custom verdict glyphs** drawn at 24/32/40 sizes for the three core states (compatible, avoid, caution).
- **No emojis as UI icons** ever.

## Motion principles (LOCKED v1)

| Principle | How BUD does it |
|---|---|
| **Everything settles** | Damped springs (stiffness 200, damping 22). No linear easing on user interactions. |
| **Touchables respond** | Scale to 0.97 on press + 50ms haptic. Every. Single. Time. |
| **Numbers roll** | Scan counts, verdict counts animate via flip counter. Not instant swaps. |
| **Skeletons over spinners** | Match the final layout shape. 1.2s left-to-right shimmer. |
| **Sheets, not modals** | Bottom sheets with rubber-band drag-to-dismiss. Center-screen alerts only for destructive confirms. |
| **Page transitions are weighted** | 250ms with spring, shared elements where it teaches the user the relationship. |
| **Empty states have personality** | One soft illustration, one sentence, one action button. Never a blank screen. |

## The buddy mascot (DRAFT, iterate next)

**Decision (locked v1):** BUD has a mascot. Personality-first brand. Atomato/Duolingo territory, not Linear/Wealthsimple territory.

**Constraints:**
- Simple enough to be recreated in Rive without a dedicated illustrator (MVP phase).
- Faceable but doesn't have to have a face in v1. Eyes-only character first.
- Round, soft, approachable. No sharp edges. Tactile.
- Genderless. Ageless.
- A single brand color (BUD green) + one warmth tone (cream).
- Animates: idle bob, success bounce, looking-around-curiously, eyes-wide-warning.

**Working name:** "Bud" (lowercase, the character has the same name as the app).

**Iteration plan:**
1. Round shape with two eyes + maybe a small antenna (v0, by me in Rive-friendly SVG)
2. Add subtle face features (no mouth) (v1)
3. Designer hire post-funding does a real character sheet (v2 / Phase 2)

## Logo (DRAFT, iterate next)

**Wordmark only for v1.** "BUD" in Inter Display Bold, tight letterspacing, BUD green.

**Lockup variants needed by next iteration:**
- Square avatar (for App Store, social profile pics)
- Horizontal wordmark
- Stacked wordmark + tagline
- App icon (iOS rounded square treatment)
- Favicon

## Photography + illustration style (DRAFT)

- **No stock photography.** Ever.
- **Real product photos in the marketing site.** Shot consistently (one light source, off-white background, slight shadow).
- **Custom illustrations** match the mascot family. Hand-drawn feel, single-color line + brand-green fill.
- **No 3D renders of food.** Reads as Pinterest-hellofresh. We are not that.

## Tone in marketing copy (LOCKED v1)

| Channel | Hero example |
|---|---|
| **Landing page hero** | "The buddy you always needed. Point. Scan. Eat freely." |
| **Email subject** | "Your new BUD profile is ready" |
| **Push notification (safe verdict)** | "Clean for you. Go ahead." |
| **Push notification (avoid verdict)** | "Skip this. Contains peanut." |
| **App Store description** | (3 sentences max, plain English, no buzzwords) |

## What the brand is NOT

- BUD is not a tracking app. We don't celebrate streaks of "clean eating" or weight loss.
- BUD is not a health authority. We don't diagnose. We don't prescribe.
- BUD is not Instagram for food. We don't have social feeds, likes, shares.
- BUD is not anxious. We don't warn about every additive. We respect the user's profile.
- BUD is not surveillance. We tell you what we know about a product, not about you.

## Iteration log

- **v1 (2026-05-15)** - initial draft. Brand greens placeholder. Mascot direction locked (yes-mascot). Typography + motion + color discipline locked. Tone-of-voice + voice-ladder locked.
- v2 ... (pending - this gets rewritten ~15 times before we lock it for the Kickstarter launch).

## Open questions for next iteration

- [ ] **Brand color decision.** Pick from the 4 ladder options (Toronto deep green / Phantom monochrome / Linear blue / Wealthsimple cream-plum) or generate 3 more.
- [ ] **Mascot first sketches.** I draw 3 round-with-eyes variants in Rive. Pick one.
- [ ] **Logo wordmark refinement.** Try 5 letterspacing/weight variants of "BUD".
- [ ] **Tagline lock.** "The buddy you always needed" vs alternatives. Test 3.
- [ ] **App icon direction.** Wordmark, mascot, or abstract symbol?
- [ ] **Brand-voice copy test.** Run 5 verdict messages through the voice ladder and check feel.
- [ ] **Photography style.** Establish 3 reference shots for product photography.

## Reference apps (study these before iteration 2)

1. **Wealthsimple iOS** - color restraint, numeric hero typography
2. **Atomato** (Atomic Habits app) - tactile cards, soft neutrals
3. **Phantom Wallet** - spring physics, mesh-gradient surfaces, sheet UX
4. **Duolingo** - mascot personality, completion celebrations, voice
5. **Linear iOS** - Inter Variable usage, type discipline
6. **Cash App** - massive numbers as hero
7. **Yuka** - what NOT to do for color discipline (over-saturated, primary-color-heavy)
