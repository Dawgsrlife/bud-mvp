# Chapter 05. Color

**Last touched:** 2026-05-15.

## The color discipline

**85% of any screen is neutral.** Off-white background + near-black text. The eye rests on neutrals. Brand color shows up only on CTAs, status, and brand moments. Accent color shows up only for danger / avoid states.

This is the most violated brand rule in fintech and health apps. Yuka, Fig, MyFitnessPal all flood color across the screen. **BUD does not.** Wealthsimple, Linear, Phantom Wallet all hold the line. **BUD holds the line.**

## Current palette (v1-emerald, default)

### Neutrals

| Token | Hex | Used for |
|---|---|---|
| `color.bg` | `#FAFAFA` | App background (95% of pixels) |
| `color.surface` | `#FFFFFF` | Cards, sheets, elevated surfaces |
| `color.ink` | `#0A0A0A` | Primary text, primary button background |
| `color.inkSoft` | `#3A3A3A` | Secondary text |
| `color.inkMuted` | `#6E6E6E` | Tertiary text, hints |
| `color.line` | `#E5E5E5` | Borders, dividers, chip outlines |

### Brand (the green)

| Token | Hex | Used for |
|---|---|---|
| `color.brand.50` | `#F0F9F4` | Subtle backgrounds, sheet tints |
| `color.brand.100` | `#DCF1E6` | (unused for now) |
| `color.brand.500` | `#1FAB5C` | Mascot, brand moments |
| `color.brand.600` | `#168A4A` | Eyebrow labels |

### Accent (the red)

| Token | Hex | Used for |
|---|---|---|
| `color.accent.500` | `#FF6B6B` | (reserved, currently unused) |
| `color.accent.600` | `#E54545` | (reserved) |

### Status

| Token | Hex | Used for |
|---|---|---|
| `color.status.ok` | `#1FAB5C` | Compatible verdict pill + dot |
| `color.status.warn` | `#F59E0B` | Caution verdict pill + dot |
| `color.status.danger` | `#DC2626` | Avoid verdict pill + dot |
| `color.status.info` | `#3B82F6` | (reserved for tips) |

## The ladder (live preview)

We have 4 brand-color variants. Swap one import line in `src/core/theme/tokens.ts`:

```typescript
import { colorVariant } from './tokens-variants/v1-emerald';        // current
//import { colorVariant } from './tokens-variants/v2-toronto-deep'; // deeper, evergreen
//import { colorVariant } from './tokens-variants/v3-phantom-mono'; // monochrome + amber accent
//import { colorVariant } from './tokens-variants/v4-wealthsimple-cream'; // cream + deep plum
```

| Variant | Vibe | Risk | Best for |
|---|---|---|---|
| **v1-emerald** (current) | Safety-green, Yuka-adjacent | Reads close to Yuka. Brand confusion. | Quickly signals "fresh / safe" |
| **v2-toronto-deep** | Evergreen, calmer, clinical | More boring than v1. Less consumer-grocery vibe. | Distinct from competitors, premium-feel |
| **v3-phantom-mono** | Monochrome ink + warm amber | Less "health app" recognizable | Maximum restraint. Premium SaaS energy. |
| **v4-wealthsimple-cream** | Cream + deep plum + caramel | Reads as luxury / finance, not health | If BUD positions as "premium second opinion" not "grocery utility" |

**Decision pending.** See `../design/brand-book-v3.md` for the open question.

## Color usage rules (locked)

1. **One brand color per screen.** Never two.
2. **Color on CTAs, status, brand moments.** Never decorative.
3. **No gradients on buttons or backgrounds** (especially purple-to-pink, the #1 AI slop tell).
4. **No status-color flood** (Yuka territory). Status colors live in pills + tags + dots, not page backgrounds.
5. **One shadow per elevated element.** No stacked shadows.
6. **Status pills use 10% tint + 25% border.** Example: `accent + '1A'` background, `accent + '40'` border.

## Accessibility (WCAG AA minimum)

- All text on `bg` (#FAFAFA) must be at least `inkMuted` (#6E6E6E) → contrast ratio 5.04:1 ✅
- All text on `surface` (#FFFFFF) must be at least `inkMuted` → 5.41:1 ✅
- Brand-600 (#168A4A) on `bg` for the eyebrow → 4.93:1 ✅ (just clears AA-large, watch this on smaller sizes)
- Status colors on white surface: ok 4.95:1, warn 2.69:1 ⚠ (warn text needs `warn 700` or darker. **Open issue.**)
- All touch targets minimum 44×44 (iOS HIG)

## Dark mode (deferred to Phase 2)

Not in MVP. When we ship it:
- `bg` → `#0B0B0B`
- `surface` → `#161616`
- `ink` → `#FAFAFA`
- Brand colors adapt to `brand.300` shades (lighter for dark mode contrast)

## Hex reference snippets

For copy / pasting into Figma / mockup tools:

```
Background:   #FAFAFA
Surface:      #FFFFFF
Ink:          #0A0A0A
Ink Soft:     #3A3A3A
Ink Muted:    #6E6E6E
Line:         #E5E5E5

Brand 500:    #1FAB5C
Brand 600:    #168A4A
Brand 700:    #106A39

Status OK:    #1FAB5C
Status Warn:  #F59E0B
Status Danger:#DC2626
```

## Iteration log

### v4 (2026-05-15) — split off, ladder table added, accessibility notes added
