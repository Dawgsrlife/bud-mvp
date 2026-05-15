# Chapter 07. Iconography and imagery

**Last touched:** 2026-05-15.

## Icon family (locked)

**Lucide.** One family for the entire app + marketing. Stroke 1.5px. No mixing.

Reason: Lucide is the open-source successor to Feather Icons, has the widest set (~1500 icons), ships in React Native via `lucide-react-native`, and has Linear / Cal.com pedigree.

**Banned:** mixing Lucide with Material Symbols, with Phosphor, with Heroicons, with Feather, with Ionicons. Pick one and hold the line.

## Custom glyphs

Three verdict-state glyphs are custom-drawn (not from Lucide) because the brand owns this moment:

| State | Glyph | Treatment |
|---|---|---|
| `compatible` | Open-eye shape (Bud sees clearly) | Brand-500 stroke, brand-100 fill |
| `avoid` | Closed eye / blocked eye shape | Status-danger stroke, status-danger 10% fill |
| `caution` | Half-open eye | Status-warn stroke, status-warn 10% fill |

These live in `src/shared/widgets/verdict-glyph.tsx` (TBD, slice 6). Until then, the tone pill + tag pattern carries the verdict communication.

## Sizes

| Size | Used for |
|---|---|
| 16px | Small inline icons (chip prefix, list item leading) |
| 20px | Body inline (button leading icons, breadcrumb) |
| 24px | Default UI icons (tab bar, navigation, action buttons) |
| 32px | Hero icons (empty state illustrations, larger CTAs) |
| 40px | Verdict glyphs (the custom-drawn ones) |
| 64px+ | Decorative-only (illustration placement, never tappable) |

## Stroke + fill rules

- **Default:** Lucide stroke icons, 1.5px stroke weight, ink color
- **Active state:** swap to filled variant where Lucide provides one; otherwise increase stroke to 2px + fill at 12% opacity
- **Disabled:** opacity 0.4 over the same color
- **Brand-tinted:** brand-600 (NEVER brand-500 on white surfaces, contrast too low)

## Imagery rules (the big ones)

### What we never use

1. **Stock photography.** Ever. No iStock, no Unsplash for hero shots, no Shutterstock. If you see a corporate-stock photo on the landing page, delete it.
2. **3D-rendered food.** Reads as Pinterest-Hellofresh. We are not that.
3. **Generic AI-generated images.** Midjourney / DALL-E "person scanning grocery" outputs look identical across every health app. Skip.
4. **Photos with brand logos visible.** Even tangentially (Tide bottle in the background, Costco-branded cart). Trademark hell.

### What we do use

1. **Real product photos (when needed):** shot consistently — single light source from upper-left, off-white background, slight drop shadow at 4% opacity, 1:1 aspect ratio. Phase 2 territory.
2. **Custom illustrations:** match the mascot family. Hand-drawn feel, single-color line + brand-green fill. Used for empty states + onboarding accents.
3. **Real customer photos (Phase 2):** for testimonials. Real people, not models. Subject's permission in writing.

## Mascot system (Bud the character)

Bud is the brand's only character. He has the same authority as the wordmark. See chapter 04 for the icon variants.

### Anatomy (v0)

- Round body (perfect circle), brand-400 fill, 12% drop shadow
- Two round eyes, ink color, 12% of body diameter
- Eyes spaced at ±18% of body diameter from center
- Antenna: ink-color stem, 4% body diameter wide, 12% body diameter tall, topped with a brand-500 glowing tip at 8% body diameter
- Subtle shadow on the ground: ink at 10% opacity, 60% of body width, very thin

### Mood states (locked from brand-book v3, expanded here)

| Mood | Eye shape | Body micro-animation | Usage |
|---|---|---|---|
| `idle` | Normal scale | Gentle vertical bob (4px peak, 1.5s cycle) | Welcome, home, scanner-loading |
| `happy` | Quick squish (scaleY 0.2 -> 1, bouncy spring) | Excited bounce on entry | Onboarding confirm, slice 4 Compatible verdict |
| `thinking` | Normal scale, antenna pulses brand-500 glow at 1.2s cycle | None | Scanner-permission-loading, capturing, OCR-running |
| `warning` | Wide-eye scale (1.3x), no blink | Tilt forward 4° on entry | Permission-denied, Avoid verdict |

### Future moods (Phase 2)

`excited` (eyes large, antenna glow bright, jumping bob), `confused` (eyes asymmetric, head tilt), `sleeping` (eyes closed, antenna dim), `celebrating` (confetti, both arms up when arms are added).

### What Bud never does

- Talk (no speech bubbles in v1; voice is via copy beneath him)
- Have a mouth (v0 + v1 are mouth-less for design simplicity)
- Hold props (no clipboard, no flashlight, no shopping basket)
- Change color (always brand-400 body, brand-500 antenna)
- Appear in marketing copy where the verdict is somber (avoid screens get warning mood, not idle)

### Where Bud appears

| Surface | Bud size | Mood default |
|---|---|---|
| Welcome screen | 140px | idle |
| Onboarding confirm | 110px | happy |
| Home screen | 130px | idle |
| Scanner permission | 100px | thinking |
| Verdict screen | 120px | matches verdict.kind |
| Empty state (history) | 80px | idle |
| Error state | 100px | warning |
| Marketing hero | up to 240px | idle |

## Illustration commission planning (Phase 2)

We don't have an illustrator yet. When we do (post-Kickstarter funding), the brief is:

1. Five empty-state illustrations (history empty, profile empty, search empty, no-internet, no-camera-found)
2. Three onboarding accents (welcome, allergen-select, confirm)
3. One marketing hero illustration (Bud holding-up-a-product moment)
4. Three social-template illustrations (verdict-shared, scan-streak, new-allergen-flagged)

Style brief: same family as Bud. Round shapes. Single-color line + brand-green fills. Hand-drawn feel, not vector-flat. References: Stripe Press book covers, Linear marketing illustrations, Atomato app empty states.

## Iteration log

### v4 (2026-05-15) — first chapter version, mascot system fully specced, illustration commission scope drafted
