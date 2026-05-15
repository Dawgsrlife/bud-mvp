# ADR-003: Design system + animation contract

**Status:** PROPOSED
**Date:** 2026-05-15
**Decision driver:** Alex wants Wealthsimple / Phantom Wallet / Atomic Habits (Atomato) / Duolingo polish. No AI slop. Calm, intentional, premium feel. Reanimated 4 + Skia + Moti + Lottie + Rive cover ~98% of that bar.

## What "Wealthsimple-level polish" decomposes into

1. **Typography as primary design element.** One geometric sans, 3 weights max (400/500/700), generous line-height (1.4–1.6), tight letter-spacing on headers (-0.02em).
2. **Restrained color.** 1 brand hue, 1 accent, 5 neutrals. Color appears only on CTAs, status, and brand moments. 85% of screens are off-white / near-black.
3. **Spring physics on every transition.** No linear easing. Damped springs (stiffness 180-260, damping 20-24) for sheet presents, list inserts, tab switches.
4. **Numeric tickers and counters.** Money, scan counts, allergen scores animate via rolling digits, not instant swaps.
5. **Tactile press feedback.** Every touchable scales to 0.96-0.98 on press with 50ms haptic. Non-negotiable.
6. **Skeleton shimmers, never spinners.** Match the final layout shape. Shimmer animates left-to-right at 1.2s.
7. **Sheets over modals.** Bottom sheets with rubber-band drag-to-dismiss. No center-screen alerts except for destructive confirms.
8. **Empty states with personality.** A single illustration or icon, one sentence, one action. Never a blank screen.

## Animation library stack (RN)

| Need | Library | Notes |
|---|---|---|
| Spring transitions | `react-native-reanimated` v4 | `withSpring({damping: 22, stiffness: 200})` |
| Declarative animation | `moti` | wraps Reanimated; Wealthsimple-style transitions in 3 lines |
| Vector micro-animations | `rive-react-native` | state-machine-driven; designer-controlled `.riv` files |
| Lottie animations | `lottie-react-native` | fallback for vector animation when Rive overkill |
| Custom shaders / gradients | `@shopify/react-native-skia` | Phantom Wallet mesh-gradient signature |
| Shared element transitions | Reanimated `Layout` animations | built into v4 |
| Press feedback | `Pressable` + Reanimated `scale` + `expo-haptics` | `Haptics.selectionAsync()` |
| Skeleton shimmer | `moti/skeleton` | declarative |
| Rolling numbers | `react-native-animated-numbers` | or custom Reanimated `useDerivedValue` |
| Bottom sheets | `@gorhom/bottom-sheet` | only acceptable choice |
| Staggered list reveal | `moti` `MotiView` with `from`/`animate`/`delay` | |
| Confetti | `react-native-confetti-cannon` | upgrade to Skia particle system if needed |
| Gesture handler | `react-native-gesture-handler` | dependency of Reanimated 4 |

## Design tokens

**Location:** `src/core/theme/tokens.ts`. The only source of truth for colors, type, spacing, radii, motion. No hardcoded hex or px values anywhere else in the codebase.

```typescript
// src/core/theme/tokens.ts
export const tokens = {
  color: {
    bg: '#FAFAFA',
    ink: '#0A0A0A',
    inkSoft: '#3A3A3A',
    inkMuted: '#6E6E6E',
    line: '#E5E5E5',
    brand: {
      50: '#F0F9F4',
      100: '#DCF1E6',
      // ... full 50-900 scale via uicolors.app
      500: '#1FAB5C',
      900: '#0C4A2C',
    },
    accent: '#FF6B6B',
    status: { ok: '#1FAB5C', warn: '#F59E0B', danger: '#DC2626' },
  },
  type: {
    sizes: { xs: 12, sm: 14, base: 16, lg: 20, xl: 28, '2xl': 40 },
    weights: { regular: '400', medium: '500', bold: '700' },
    family: 'Inter',
  },
  space: { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 8: 48, 10: 64 },
  radius: { sm: 8, md: 12, lg: 20, full: 9999 },
  motion: {
    fast: 150,
    med: 250,
    slow: 400,
    springDefault: { damping: 22, stiffness: 200 },
    springBouncy: { damping: 12, stiffness: 180 },
  },
} as const;

export type Tokens = typeof tokens;
```

Consume via `useTheme()` hook from NativeWind, or import `tokens` directly for non-className styling.

## Typography scale

12 / 14 / 16 / 20 / 28 / 40 only. Weights 400 / 500 / 700.

Brand font: **Inter** (free, geometric, ships via `@expo-google-fonts/inter`). Optionally pair with **Inter Display** for hero numbers.

## Brand color discipline

Pick **one** brand hue. Generate 50-900 scale via [uicolors.app](https://uicolors.app). Current proposal: BUD green `#1FAB5C` (signals safety/health, distinct from Yuka's red-yellow-green allergen scoring).

Accent color (`#FF6B6B`) used only for danger/avoid states. never as decoration.

## Top 10 AI-slop tells to ban

1. Purple-to-pink gradients on buttons or backgrounds
2. Default Material 3 `FilledButton` with stock ripple
3. `border-radius` inconsistency (12 here, 16 there, 8 on inputs). use tokens only
4. No press state, button just fires. every tappable gets scale + haptic
5. Center-screen `CircularProgressIndicator` blocking the screen. use skeleton
6. Emoji as UI icons. use Lucide or Phosphor icon family consistently
7. Three-shadow stacked card elevation. one shadow max
8. Soft pastel green/red status pills with stroke borders. use tokens
9. Keyboard covers the active input. always wrap in `KeyboardAvoidingView`
10. Generic stock icons mixed (Feather + Material + Ionicons). pick ONE family

## Reference apps to study before coding

1. **Wealthsimple iOS** account screen. numeric hero + restraint
2. **Atomato (Atomic Habits app)** Dribbble shots by Mateusz Madura. soft neutrals, tactile cards
3. **Phantom Wallet** swap flow. spring sheets, rolling numbers
4. **Duolingo** lesson completion. confetti + sound + haptic + scale bounce sequence
5. **Arc Search** mobile. type-first, generous whitespace, single accent color
6. **Linear iOS**. Inter Variable, tight tracking, 2 type sizes per screen max
7. **Cash App**. massive numbers as hero, single-color brand discipline

## Real production apps using this stack

- **Coinbase Wallet** (RN + Reanimated + Skia). clears the Wealthsimple bar
- **Shopify Shop** (RN + Reanimated + Skia, Shopify maintains Skia for RN)
- **Bluesky** (Expo, open-source, production-grade architecture)
- **Discord** (RN + Reanimated)

## Approval

- [ ] Alex
- [ ] Amir
