# Chapter 06. Typography

**Last touched:** 2026-05-15. LOCKED.

## The family

**Inter Variable** (and Inter Display for hero numbers).

- Free, open-source, Apache 2.0
- Geometric, modern, supports every weight we need
- Wide language support (covers French for Canada, future Spanish/Mandarin)
- Loaded via `@expo-google-fonts/inter` package (planned, currently using system fallback)

**Why not custom:** custom type is Phase 2 territory. Inter clears the bar for MVP + Kickstarter launch.

## The scale (locked)

6 sizes only. Discipline > variety.

| Token | px | Used for |
|---|---|---|
| `type.sizes.xs` | 12 | Status pill labels, tags, fine print |
| `type.sizes.sm` | 14 | Eyebrow labels, button text (small), helpers |
| `type.sizes.base` | 16 | Body text, button text (medium), inputs |
| `type.sizes.lg` | 20 | Subheads, button text (large), card titles |
| `type.sizes.xl` | 28 | Screen titles, error headlines |
| `type.sizes['2xl']` | 40 | Hero headlines, verdict announcements |

**No 18, 22, 24, 32, 36, 48, 64.** Tempting but forbidden.

## The weights (locked)

3 weights only.

| Token | Weight | Used for |
|---|---|---|
| `type.weights.regular` | 400 | Body text, secondary text, subheads |
| `type.weights.medium` | 500 | Labels, buttons, emphasis within body |
| `type.weights.bold` | 700 | Headlines, hero text, verdict announcements |

**No 300, 600, 900.** Tempting but forbidden.

## Line heights

| Token | Multiplier | Used for |
|---|---|---|
| `type.lineHeight.tight` | 1.2 | Headlines, hero text |
| `type.lineHeight.normal` | 1.5 | Body, subheads |
| `type.lineHeight.loose` | 1.6 | Long-form content |

## Letter spacing

| Token | Value | Used for |
|---|---|---|
| `type.letterSpacing.tight` | -0.4 (effectively -0.02em) | Headlines, hero |
| `type.letterSpacing.normal` | 0 | Body |
| (inline) | +1.0 to +1.2 | All-caps eyebrow labels (manual) |

## Hierarchy patterns (canonical)

### Hero (welcome screen, home screen, verdict)

```
EYEBROW (sm + medium + brand-600 + +1.2 letterspaced + uppercase)
Headline (2xl + bold + ink + tight line-height + tight letterspacing)
Subhead (lg + regular + ink-soft + normal line-height)
```

### Section header (within longer screens, future)

```
Eyebrow (xs + medium + ink-muted + +0.8 letterspaced + uppercase)
Section title (xl + bold + ink + tight line-height)
Description (base + regular + ink-soft + normal line-height)
```

### Card row (verdict detail card, scan history)

```
Label (xs + medium + ink-muted + +0.8 letterspaced + uppercase)
Value (base + medium + ink)
```

### Body run

```
Body (base + regular + ink-soft + normal line-height)
```

## What NOT to do

- **No italic.** Use weight for emphasis.
- **No underline** except on explicit links.
- **No mixing serif + sans.** Inter only.
- **No font sizes between scale steps.** Use the 6 sizes.
- **No weight 300 or 900** even when "it looks cooler." Weight 700 carries hero.
- **No all-caps body text.** Eyebrow labels only.

## Inter loading (Phase 1 + 2)

**Currently:** system default (San Francisco on iOS, Roboto on Android, web fallback).

**Next iteration:** add `@expo-google-fonts/inter` + load Inter_400Regular, Inter_500Medium, Inter_700Bold in `App.tsx`. Splash holds until fonts ready.

```typescript
// Future App.tsx pattern
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';

const [fontsLoaded] = useFonts({
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
});

if (!fontsLoaded) return null;
```

## Reference apps that hit the typography bar

1. **Linear iOS.** Inter Variable, tight letterspacing on headers, 2 sizes per screen max.
2. **Wealthsimple.** Numeric hero, restrained body.
3. **Stripe Press.** Web typography, generous line-height, restrained weights.
4. **Phantom Wallet.** Type-as-hero on swap screens.

## Iteration log

### v4 (2026-05-15) — split off, locked at 6-step scale + 3 weights
