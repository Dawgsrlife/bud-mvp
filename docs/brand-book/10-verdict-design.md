# Chapter 10. Verdict design

**Last touched:** 2026-05-15.

The verdict screen is **the single highest-stakes surface in the entire product.** Every other screen sets it up. If the verdict reads wrong, BUD reads wrong. Get this chapter right or get nothing right.

## The three kinds

| Kind | When | Headline | Mascot mood | Accent color | Verdict pill label |
|---|---|---|---|---|---|
| `compatible` | No allergens triggered, no may-contains | "Eat freely." | happy (eye squish-bounce) | `status.ok` (green) | COMPATIBLE |
| `avoid` | One or more allergens directly in ingredients | "Skip this." | warning (wide eyes) | `status.danger` (red) | AVOID |
| `caution` | One or more allergens in "may contain" only | "Your call." | thinking (placeholder) | `status.warn` (amber) | CAUTION |
| `unknown` | OCR confidence too low, or no match either way | "Couldn't tell." | thinking | `inkMuted` | UNKNOWN |

## The layout (locked)

Single layout for all three kinds. Only **headline word**, **accent color**, and **mascot mood** change. This is intentional. Users learn one screen.

```
┌──────────────────────────────┐
│         [Bud mascot]         │
│      (size 120, centered)    │
│                              │
│       ▷ TONE PILL ◁         │
│      "Eat freely."           │  Hero (Inter Bold 2xl, ink, tight)
│   "Clean for you."           │  Reason (Inter Regular lg, ink-soft)
├──────────────────────────────┤
│  ┌────────────────────────┐  │
│  │ DETECTED               │  │ Card (surface + line border)
│  │   [Peanut] [Soy]       │  │   each tag: pill, accent-colored border + text
│  │                        │  │
│  │ MAY CONTAIN            │  │
│  │   [Tree nuts]          │  │
│  │                        │  │
│  │ CONFIDENCE             │  │
│  │ 93%                    │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │      Scan another      │  │ Primary CTA (ink button, surface text)
│  └────────────────────────┘  │
└──────────────────────────────┘
```

## Tone pill anatomy

```
┌─────────────────────┐
│ ● COMPATIBLE        │
└─────────────────────┘
   ▲    ▲
   │    └── all-caps, xs + bold + +1.2 tracking, in accent color
   └──── 6px dot in accent color
   
   Background: accent color at 10% opacity (rgba ending in 1A)
   Border:     accent color at 25% opacity (rgba ending in 40)
   Padding:    8 horizontal, 4 vertical
   Radius:     full (pill)
```

## Why NOT a status-color flood

**Yuka floods red/yellow/green across the entire screen.** It works for them, but:
1. It feels alarming. BUD's brand is calm.
2. It's the #1 visual feature an AI-slop generator would produce.
3. It looks the same as MyFitnessPal, FoodieScore, every other 2020s health app.
4. It violates our color discipline (85% neutral).

**BUD's restrained card pattern** is harder, more designed, and more trustworthy. Wealthsimple's "your portfolio is down" screen doesn't turn red. It shows a small red number. We do the same.

## Motion choreography

When the verdict screen mounts (after Reading state):

| Element | Animation | Timing |
|---|---|---|
| Mascot | FadeIn 280ms | t = 0 |
| Header block (pill + headline + reason) | FadeInUp 320ms | t = 80ms |
| Detail card | SlideInDown 300ms | t = 160ms |
| CTA | (mounts with parent) | t = 0 |

This creates a slight cascade: mascot appears, headline rises, card drops in. Reads as composed, not jumpy. Same pattern Phantom Wallet uses for swap confirmations.

## Haptics

| Verdict | Haptic |
|---|---|
| compatible | `success` (light-medium-light double tap pattern) |
| caution | `warning` (single medium tap) |
| avoid | `error` (double heavy tap) |
| unknown | (none) |

Triggered the moment the verdict state mounts.

## Copy patterns (the reasons)

Reasons should be **specific** and **short**. The user has 2 seconds to read this on the way out of the grocery aisle.

| Verdict | Pattern | Example |
|---|---|---|
| compatible | "Clean for you." or category-specific | "Clean for you." / "No allergens on your profile." |
| avoid | "Contains X." or "Contains X, Y." | "Contains peanut." / "Contains milk, soy." |
| caution | "May contain X." | "May contain tree nuts." |
| unknown | Honest about why | "I couldn't read the label clearly. Try a different angle?" |

**Never add filler.** Not "Unfortunately, this contains peanut." Not "Looks like this might be okay." Cut the qualifier.

## Confidence display

Confidence is shown as a percentage in the detail card. Treatment:
- High (≥ 90%): no annotation, just the number
- Medium (70-89%): "78% confident"
- Low (< 70%): elevate to `unknown` verdict instead of showing the verdict at low confidence

**Never round up to 100%.** Even "Clean for you" caps at 99% because there's always nonzero recognition error.

## Variants in code

```typescript
const COPY_BY_KIND: Record<VerdictKind, { ... }> = {
  compatible: { headline: 'Eat freely.', mood: 'happy', accent: status.ok, tone: 'Compatible' },
  avoid:      { headline: 'Skip this.', mood: 'warning', accent: status.danger, tone: 'Avoid' },
  caution:    { headline: 'Your call.', mood: 'thinking', accent: status.warn, tone: 'Caution' },
  unknown:    { headline: "Couldn't tell.", mood: 'thinking', accent: inkMuted, tone: 'Unknown' },
};
```

This is the single source of truth. Adding a verdict kind = update this object only.

## What MVP doesn't have yet (next iterations)

- [ ] Tap a tag to see the source ingredient text ("peanut" → "Ingredients: ... peanut oil ...")
- [ ] "Find alternatives" CTA on avoid verdicts (Phase 2: Smart Alternatives, the CPS revenue model)
- [ ] Share verdict (so users can warn family members of a discovery)
- [ ] Add to "frequently scanned" for quick re-check
- [ ] Confidence breakdown (which words confused the OCR)

## Reference: what NOT to do (red flag verdicts)

1. **Yuka's red splash screen.** Alarming. Childish.
2. **MyFitnessPal's red 200-calorie warning.** Moralizing.
3. **Generic "Warning detected!" with no specifics.** Trust-killing.
4. **Three sentences explaining what an allergen is.** Patronizing.

Reference: what TO do
1. **Wealthsimple's "your portfolio is down 2.3%" line.** Restrained, specific, no panic.
2. **Linear's failed-build red dot in the sidebar.** Tiny color, clear signal.
3. **Phantom's "transaction failed" sheet.** Calm icon, clear reason, retry button.

## Iteration log

### v4 (2026-05-15) — full chapter, locked layout + tone pill spec + motion choreography
