# Chapter 04. Logo and identity

**Last touched:** 2026-05-15. Draft, iterating.

## Current state (v0)

BUD has **no real logo lockup yet.** The current wordmark in `App.tsx` is just the text "BUD" rendered in Inter Bold, brand-600, eyebrow-style at all-caps with +1.2 letter-spacing.

This chapter sketches where the logo system goes next. The mascot ("Bud" character) is locked at v0 (round body + 2 black eyes + small antenna with glowing tip). The wordmark + lockup decisions are open.

## Logo system (proposed v1)

A real logo system needs **5 lockups**:

1. **Primary wordmark** — "BUD" in Inter Display, custom-tuned letterspacing. Used in app header, web landing, partner docs.
2. **Mascot mark** — round Bud character, isolated, no text. Used in app icon, social avatar, favicon.
3. **Horizontal lockup** — mascot on left, "BUD" wordmark on right. Used in headers + email signatures.
4. **Stacked lockup** — mascot on top, "BUD" wordmark below. Used in vertical contexts (Instagram story header, business card top).
5. **Tagline lockup** — stacked or horizontal + tagline "The buddy you always needed." underneath. Used in marketing hero contexts only.

## Wordmark direction (5 options to try)

The wordmark wants to feel **confident + warm + technical**. Not just bold sans like Stripe. Not script. Not display-y.

| Option | Treatment | Vibe |
|---|---|---|
| **A. Inter Display Bold, -2% tracking** | All-caps, brand-600 | Linear-clean, current default |
| **B. Inter Display Black, -3% tracking, lowercase** | "bud" lowercase, ink color | Friendly, hand-on-shoulder |
| **C. Custom drawn "BUD" with rounded U** | Sans, but with the U redrawn to evoke a chip / scanner bracket | Identity custom, defensible |
| **D. Sentinel or PP Editorial New for the wordmark** | Serif + small caps | Editorial / premium-luxury angle |
| **E. Mono-spaced (JetBrains Mono / IBM Plex Mono) wordmark** | "BUD" in mono | Developer-tool aesthetic (off-brand for consumer but interesting) |

**Recommendation:** Start with A (default), test B (lowercase) for social, test C (custom U) for app icon. D + E are off-brand.

## App icon (5 directions)

The hardest single asset in the whole brand. Apple's app icon grid is the most-scrutinized 60×60 pixels of brand work.

| Direction | Center element | Background |
|---|---|---|
| **1. Bud face icon** | Mascot face (round body + 2 eyes + antenna), centered, fills ~70% | Brand-50 (subtle green tint) on iOS rounded square |
| **2. Wordmark icon** | "BUD" in white, centered, Inter Display Bold | Ink (#0A0A0A) flat |
| **3. Abstract symbol** | A custom mark (e.g., a stylized open eye, or the letter U morphed into a scanning bracket) | Brand-500 flat |
| **4. Mascot in eye-shape** | The Bud character but with its body drawn as an eye outline, signaling "open eye, sees the label" | Brand-50 |
| **5. Letter-form icon** | Single letter "B" stylized | Ink flat |

**Recommendation:** Direction 1 (Bud face). Direction 4 (mascot in eye) is the killer if we have a designer in Phase 2. Direction 5 (single letter) is the safe fallback.

## Social avatar (Instagram / TikTok)

Always **Direction 1** (Bud face), no wordmark. Reason: at 30×30 thumbnail size on TikTok, the wordmark is illegible. The face is recognizable instantly.

## Favicon (web)

Same Direction 1 mascot face, rendered at 32×32 + 16×16 ICO. Avoid the wordmark; it can't shrink to 16px legibly.

## Clear space + minimum sizes

**Clear space (around the lockup):** at least 1× the height of the lowercase "u" in the wordmark on all 4 sides. No other element may breach this zone.

**Minimum sizes:**
- Primary wordmark: 60px wide minimum digital, 20mm minimum print
- Mascot mark: 32px minimum digital (drops below this only as favicon)
- Horizontal lockup: 120px wide minimum
- Stacked lockup: 80px wide minimum

## What to never do with the logo

1. Don't recolor outside `tokens.color.brand.*` or `tokens.color.ink`
2. Don't apply gradients
3. Don't apply drop shadows (one shadow ever, in the mascot's body shadow already specified)
4. Don't rotate
5. Don't crop the mascot (always full circle visible)
6. Don't replace the wordmark font with a substitute
7. Don't stretch
8. Don't put on busy photographic backgrounds — always use a solid surface or tint

## Trademark + namespace

- **App identifier:** `io.zedsio.bud` (locked in `app.json`)
- **Web:** bud.quest (purchased + landing live)
- **Social handles:** @bud.scan (Instagram, TBD), @budscan (TikTok, TBD) — confirm + claim before Kickstarter
- **Trademark:** USPTO + CIPO filing planned post-Kickstarter (June 30 2026)

## Iteration log

### v4 (2026-05-15) — first sketch of the logo system, all directions still open
