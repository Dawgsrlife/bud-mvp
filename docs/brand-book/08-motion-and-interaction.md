# Chapter 08. Motion and interaction

**Last touched:** 2026-05-15.

## The motion thesis

**Everything settles. Nothing snaps.** Spring physics on every transition. Linear easing is banned for user-facing motion.

This is the single biggest visual difference between BUD and a generic-AI-slop competitor. The motion gives the brand its tactile authority.

## The four spring presets

Living in `tokens.motion.spring`:

```typescript
spring: {
  default: { damping: 22, stiffness: 200 },   // standard UI transitions
  bouncy:  { damping: 12, stiffness: 180 },   // celebrations, mascot moods
  gentle:  { damping: 26, stiffness: 160 },   // press feedback, large surfaces
  // (future) snappy: { damping: 18, stiffness: 260 },   // toolbars, modals
}
```

| Spring | Personality | Use cases |
|---|---|---|
| `default` | Composed, settles confidently | Page transitions, sheet presents, button entries |
| `bouncy` | Excited, celebratory | Mascot happy bounce, verdict-compatible reveal, confetti |
| `gentle` | Calm, hand-on-shoulder | Press feedback (button scale-down), large card slides |
| `snappy` (TBD) | Crisp, decisive | Toolbars, tab switches, sheet handles |

## Duration presets

For things that can't use springs (color fades, opacity), use durations from `tokens.motion.duration`:

| Token | ms | Used for |
|---|---|---|
| `fast` | 150 | Press feedback color, status pill backgrounds |
| `med` | 250 | Step transitions, screen fades |
| `slow` | 400 | Hero entries, dramatic verdict reveals |

Never use raw ms outside this scale. If you need 300ms, use 250 (med). If you need 500ms, use 400 (slow).

## Easing

- **Springs win.** Default to spring.
- **When you must use easing:** `Easing.inOut(Easing.quad)` for ambient loops (mascot bob), `Easing.out(Easing.cubic)` for entries.
- **Banned:** `Easing.linear`, `Easing.bounce` (Material default, reads cheap).

## Press feedback (locked)

Every tappable element follows this pattern:

```typescript
onPressIn:  scale -> 0.97 (gentle spring) + 50ms haptic.selection()
onPressOut: scale -> 1.00 (default spring)
onPress:    user callback, OPTIONALLY a stronger haptic if it's a destructive
            or important action
```

**The shutter button** uses a stronger pattern (bouncy spring, scaleDown to 0.82) because the moment matters.

**Disabled buttons** still receive the scale animation but at half the magnitude, with 0.4 opacity. They never look frozen.

## Haptics (locked)

`useHaptic()` hook abstracts platform. Native iOS gets real feedback; web + simulator are no-ops.

| Haptic | When |
|---|---|
| `selection` | Toggle, chip press, navigation tap |
| `light` | Default button press |
| `medium` | Shutter press, capture moment |
| `heavy` | Destructive confirm (reset profile, delete scan) |
| `success` | Compatible verdict shows |
| `warning` | Caution verdict shows |
| `error` | Avoid verdict shows |

Haptics fire on the moment of confirmation, not on press-in.

## Screen transitions

| Transition | Implementation | Used for |
|---|---|---|
| Within-screen step changes | Reanimated `FadeIn` + `FadeOut` (280ms in, 160ms out) | Onboarding step 1 -> 2 -> 3 |
| Push to next screen | React Navigation default iOS slide (slice 7 introduces this) | Home -> Scanner -> Verdict |
| Modal sheet present | Spring slide from bottom, rubber-band drag-to-dismiss | Slice 6+ profile edit, history detail |
| Verdict reveal | Cascade: mascot fade-in 280ms, headline FadeInUp 320ms delayed 80ms, card SlideInDown 300ms delayed 160ms | Verdict screen entry |

## Mascot animations (locked detail)

### Idle bob

```
ambient loop, 1.5s out, 1.5s in
translateY: 0 -> -4 -> 0
Easing: inOut(quad) both directions
repeat: infinite
```

### Happy bounce on entry

```
eyeScaleY: 1 -> 0.2 -> 1
spring: bouncy
duration: ~400ms total
```

### Thinking pulse

```
antenna glow brightness: 0.4 -> 1.0 -> 0.4
duration: 1.2s cycle
opacity-only (no scale)
```

### Warning wide-eye

```
eyeScale: 1 -> 1.3 (held)
spring: gentle
no return until mood changes
```

## Skeleton loaders (slice 6+)

Skeletons match the final layout shape. Shimmer animates left-to-right at 1.2s cycle, 30% width gradient, surface to brand-50 to surface.

**Never use** `ActivityIndicator` (RN default spinner) in shipped UI. Only acceptable in `App.tsx` for the initial load-profile flash, because it appears for &lt;200ms.

## Confetti (slice 8)

Only fires on:
- Onboarding completion (subtle, 8 particles, brand-tinted)
- Compatible verdict for the first 3 days of a new user (Duolingo-style retention nudge)

**Never** on every compatible verdict. Confetti dilution kills the moment.

## Reduced motion respect

iOS + Android system setting "Reduce Motion." When ON:
- Spring transitions degrade to instant
- Fades shorten from 280ms to 120ms
- Bob animation pauses
- Confetti suppressed

Implementation: `useReducedMotion()` hook from `react-native-reanimated`. Slice 6+.

## Reference: motion that gets it right

1. **Phantom Wallet** swap sheet — rubber-band drag, spring rest, weighted entries
2. **Linear iOS** issue create — Cmd-K style sheet with spring
3. **Wealthsimple** account view — number tickers + smooth color transitions on dip/rise
4. **Atomato (Atomic Habits app)** — completion celebration cascade
5. **iOS Camera app** shutter — the medium haptic + the slight visual flash. We're emulating this for our shutter.

## Anti-patterns

- Bouncing buttons (Material 3 default amplitude) → looks cheap
- Confetti on every action → dilutes
- Loading spinners blocking the whole screen → use skeleton
- Modal-over-modal stacks → never
- Instant snaps (zero duration) → users miss the relationship
- Animation longer than 600ms in steady-state UI → impatient users

## Iteration log

### v4 (2026-05-15) — first chapter, four spring presets locked, mascot animation details specced
