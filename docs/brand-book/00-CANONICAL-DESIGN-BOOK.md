---
title: Bud Design Book
description: Canonical brand + design system for Bud, the AI nutrition + allergen scanner. Covers identity, voice, color, typography, components, touchpoints, photography, and the regulatory layer that protects Bud from medical-device reclassification.
author: amir
co-owner: alex
version: 1.0
created: 2026-05-15
updated: 2026-05-15
status: locked-v1
applies-to: app, website, email, ads, social, print, internal docs
canonical-source-files:
  - /mnt/hdd/agents/bud/DESIGN.md
  - /mnt/hdd/agents/bud/IDENTITY.md
  - /mnt/hdd/agents/bud/SOUL.md
  - /home/amir/programming/bud/waitlist/MAILERLITE-DESIGN-V2-SPEC.md
  - /home/amir/programming/bud/waitlist/WELCOME-EMAILS.md
  - /home/amir/programming/bud/waitlist/NURTURE-PLAN.md
  - bud.quest (live)
---

# Bud — Design Book

> One reference, one source of truth. If a deliverable conflicts with this book, the book wins. Update the book before changing the deliverable.

## Foreword

Bud is an information tool, not a medical device. Every design choice in this book is shaped by two non-negotiables:

1. **People with allergies trust what we say.** A false-negative verdict is the worst possible failure. Visual, verbal, and interaction design must never overpromise.
2. **We must stay out of the Class II SaMD lane** (Health Canada SOR/98-282 Rule 10(2)). Saying "safe" reclassifies us as a regulated medical device and exposes the company to anaphylaxis tort liability. The verbal system in this book is what keeps us legal.

This book is for: Amir, Alex, any future designer, any future engineer, any contractor, and the AI assistants who help us ship.

---

## 1. Brand DNA

### Name + casing
- The product is **Bud** — Title Case in body copy. Never "BUD" all-caps in sentences. The "BUD" all-caps form is reserved for stylistic micro-tags only (small-caps treatments like "BUD READS EVERY ONE").
- Why: text-to-speech reads "BUD" as the letters "B-U-D". Title Case parses as the word "Bud".
- The agent-internal codename ("BUD" in `BUD.pdf` etc.) is fine for internal docs, but never in user-facing surfaces.

### Tagline (locked)
> **The Buddy You Always Needed.**

Lower-case "bud" works for the wordmark. Title Case for the tagline.

### One-line description
Bud is an AI nutrition app for grocery shoppers managing food allergies. You scan any package, Bud reads the ingredients and tells you whether it matches your profile.

### Positioning
- **Wedge:** reads the French side, the "may contain" line, the hidden derivatives, and Canadian private-label brands (PC, No Name, Compliments). No incumbent (Yuka, Fig, Spoonful, ContentChecked) does all four.
- **Audience:** the parent reading a label at 9pm with a toddler on one hip. The partner who's been told "trust me, it's fine." The adult newly diagnosed who suddenly has to read every label.
- **Promise:** "another set of eyes." Not safety, not protection, not prevention. We help you see what's printed and check it against your profile. The user still makes the decision.

### Brand soul (excerpted from `/mnt/hdd/agents/bud/SOUL.md`)
- **Co-founder mindset.** Not an assistant.
- **Safety is sacred.** False negatives are unacceptable. Flag uncertain results as "Uncertain", not "Compatible".
- **Trust is the currency.** Verdicts cannot be bought, ever. No paid placement in alternatives.
- **Speed is a feature.** An imperfect app in shoppers' hands beats a perfect prototype in Figma.

### What Bud is NOT
- Not a medical device.
- Not a diagnostician.
- Not a doctor / dietitian / RD.
- Not a substitute for reading the physical label.
- Not "safe", "guaranteed", "100% accurate", "FDA-approved", or "Health Canada approved".

---

## 2. Verbal Identity

### Voice principles
1. **Functional, not aspirational.** Describe what Bud does. Don't promise outcomes.
2. **Calm authority.** No exclamation marks in body copy. No hype. We sound like a knowledgeable parent, not a marketer.
3. **Specific, not vague.** "45 minutes in the snack aisle" beats "tired of label reading". Numbers, scenes, real product names.
4. **Plain English over clever.** Editorial cleanliness, not cleverness for its own sake.
5. **Parent-to-parent.** Founder voice. First person ("we built", "I'm Amir") in long-form. Functional third person ("Bud reads", "Bud checks") in product UI.
6. **Restraint.** When in doubt, say less. Generous whitespace, short sentences, no decorative qualifiers.

### Tone matrix

| Surface | Voice | Example |
|---|---|---|
| Product UI (in-app) | Functional, neutral | "Bud reads the label and checks it against your profile." |
| Marketing hero | Editorial, evocative | "The Buddy You Always Needed." |
| Email welcome | Founder, first-person | "Hey {name}, real human writing this. I'm Amir." |
| Email nurture | Specific, story-led | "45 minutes in the snack aisle, again." |
| Compliance footer | Plain, legalistic | "Bud is an information tool, not a medical device." |
| Verdict UI | Direct, three states | "Compatible. / Avoid. / Uncertain." |
| Social / ads | Tight hook + clear utility | "Reads every label, so you don't have to." |
| Support | Warm, human, calm | "Got it. We'll take a look and reply within a business day." |

### Banned words (regulatory hard rule, NEVER use in any surface)

**English:** `safe`, `safer`, `safest`, `safe to eat`, `safe for you`, `guaranteed`, `guaranteed allergen-free`, `prevents`, `prevents allergic reactions`, `100% accurate`, `our scanner never misses`, `medical-grade`, `FDA-approved`, `Health Canada approved`, `clinically proven`, `clinically validated`, `evidence-based`, `doctor-recommended`, `dietitian-approved`, `RD-vetted`, `manages your allergy`, `treats your allergy`, `monitors your condition`, `peace of mind`, `trust Bud with your life`, `never miss`, `catches everything`, `smarter than reading labels yourself`, `alerts you to danger`, `warns you before reactions`, `anaphylaxis prevention`, `avoid reactions`, `never react again`, `protect`, `protection`, `protects you`.

**French (Quebec):** `sécuritaire`, `sûr`, `garanti sans allergène`, `prévient les réactions`, `cliniquement prouvé`, `recommandé par un médecin`, `approuvé par un nutritionniste`, `tranquillité d'esprit`, `n'oublie jamais`, `attrape tout`, `alerte de danger`, `prévient les réactions`, `protège`, `protection`, `qualité médicale`.

**Why this list exists:** "safe" reclassifies Bud as Class II SaMD under SOR/98-282 Rule 10(2). Result: $60-150K + 9-18 months of regulatory work, plus exposure to tort liability if someone has an allergic reaction after a "safe" verdict. Yuka, Fig, ContentChecked all stay out of this lane by strict avoidance.

### Approved replacements

| Tempted to say | Say instead |
|---|---|
| "Tells you it's safe" | "Tells you no declared priority allergens matched your profile" |
| "Keeps you safe at the grocery store" | "Helps you identify declared allergens" |
| "Guarantees no allergens" | "Reads declared ingredients and flags matches against your profile" |
| "Safe for you" | "Cleared for your profile" / "Compatible with your profile" |
| "Prevents reactions" | (no replacement — drop the claim, describe the function instead) |
| "Medical-grade" | (drop) |
| "Smarter, safer grocery decisions" | "Smarter, more confident grocery decisions" |
| "Catches everything" | "Reads what's printed on the label" |
| "Doctor-recommended" | (drop unless literally true AND disclosed) |

### Verdict words (locked, three states only)

| State | Color cue | Used when |
|---|---|---|
| **Compatible** | Deep sage `#1d4433` on oat | No declared priority allergens match the user's profile |
| **Avoid** | Charcoal `#1a1a1a` with subtle red-warm tone, never pure red | Declared allergen present OR "may contain" with strict mode on |
| **Uncertain** | Oat with dotted sage outline, mono label | Confidence below threshold, OCR garbled, label missing, or imported product with non-CFIA labeling |

**Never invent a fourth verdict.** Never use numeric scores like Yuka. Never use "Safe" as a bare verdict label even as a button color. Color SAFE green is fine (sage-mint) as long as the label text says "Compatible" or equivalent — NEVER "Safe".

**Known live-site drift:** `bud.quest` currently uses "Caution" as the middle verdict. The spec is **"Uncertain"**. Both are regulatorily fine, but the design book locks "Uncertain" everywhere going forward, and the website should be reconciled.

### Required disclaimers

- **Every verdict screen footer:** "Based on declared ingredients. Always verify the physical package. Not medical advice."
- **First-use consent screen:** "Bud is an information tool, not a medical device."
- **Every commercial email footer:** "Bud is an information tool, not a medical device. Always verify the physical package."
- **CASL footer on email:** full Zedsio Inc. registered street address (placeholder `[STREET]` until provided), bilingual unsubscribe link, one-click unsub honored within 10 business days.

### Casing rules
- "Bud" — Title Case always in body copy
- "bud" — lowercase only in the wordmark
- "BUD" all-caps — banned in body copy. Allowed only as small-caps stylistic tags ("BUD READS EVERY ONE")
- Verdicts — uppercase mono in pill UI, sentence case in body
- Section headers in marketing — sentence case ("How it works") not Title Case ("How It Works"), except brand-tagline contexts where Title Case is locked

### Punctuation rules
- **No em dashes (`—`) and no en dashes (`–`)** in any user-facing copy. Use commas, periods, colons, parens. Hyphens (`-`) are fine.
- Oxford comma: yes.
- Question marks: yes (used sparingly, in subject lines and hooks).
- Exclamation marks: avoid in body copy.
- Curly apostrophes (`'`) preferred over straight (`'`) for typography. Required when prompting image-gen tools that strip apostrophes through bash quoting.

### Cross-cutting copy rules (loaded via memory)

- **No "Canadian" / bilingual as the primary hook.** It's a real wedge, but using it as the headline of every surface reads generic. Use it in feature descriptions ("Reads the French side") and footer/about, never as the lead.
- **No fabricated brand names on product packaging in any photo or render.** Use real Canadian private-label brands: President's Choice, No Name, Compliments, Selection, Kashi, Quaker, Schar.
- **Bud is the APP, not a product brand.** Never put "Bud" on a box, jar, bar, or wrapper in any photo. Bud only appears on the phone screen.

---

## 3. Visual Identity — Consumer System

> The product, website, app, email, ads, social, print, and packaging all use this single Consumer System. The Investor Dashboard mode in §7 is a separate, contained aesthetic.

### Creative North Star: The Intelligent Sanctuary

"Warm Clinical." Editorial precision crossed with organic wellness. Premium-magazine restraint over SaaS-template rigor. Trust through tonal layering and whitespace, not through borders, badges, or heavy warnings. The interface should feel like sheets of fine paper resting on a desk, not boxes in a grid.

References (study these): Aesop pharmacy, Le Labo, The Gentlewoman, Kinfolk, Cereal Magazine, Bon Appétit Healthyish, Aman Resorts collateral.

### Core principles
1. **No-Line Rule.** Don't use 1px solid borders to section UI. Separate sections with background tone shifts (`#fcf9f2` to `#f6f3ec`) and whitespace.
2. **Intentional Asymmetry.** Break the standard template. One card in every grid should be offset or have a unique aspect ratio.
3. **Tonal Layering.** Surface hierarchy via stacked oat / mint / sage backgrounds and ambient shadows, never via heavy borders or strong drop shadows.
4. **Generous Whitespace.** Premium brands "waste" space intentionally. Spacing scale runs `0.5rem` to `5.5rem`.
5. **Editorial typography.** Mixed serif italic + geometric sans + mono. Never single-family stacks.

### Color palette (locked)

#### Primary
| Token | Hex | Where |
|---|---|---|
| **Oat** | `#fcf9f2` | Primary background everywhere |
| **Surface low** | `#f6f3ec` | Secondary section background (no-line rule alternative to borders) |
| **Surface lowest** | `#ffffff` | Interactive cards (when contrast needed) |
| **Deep sage** | `#1d4433` | Headlines, CTAs, wordmark, Compatible pill fill |
| **Primary container** | `#355c49` | Top of vertical-gradient CTA buttons |
| **Sage mint** | `#bfd8c5` | Soft accent panels, CTA pills, verdict highlights, mint background blocks |
| **Charcoal / primary text** | `#1e1d1a` (or `#1a1a1a`) | Body text, dark mode background. Never pure black `#000000`. |

#### Semantic
| Token | Hex | Used for |
|---|---|---|
| **Success green** | `#2f7d57` | Positive states, completion ticks (rare, sage-mint usually does this work) |
| **Terracotta** | `#c65a3d` | Error / Avoid accent. Warm, never pure red `#FF0000`. |
| **Outline variant** | `#c1c8c2` @ 20% opacity | "Ghost border" fallback for inputs only |
| **On-surface variant** | `#414844` | Watermark text textures, large rotated background ingredient lists |

#### Dark mode (Apple Mail iOS 18, Outlook.com, app dark mode)
| Token | Hex | Used for |
|---|---|---|
| Paper | `#1a1a1a` | Dark background |
| Ink | `#fcf9f2` | Dark-mode text (NEVER pure white `#ffffff` — iOS auto-inverts it to muddy grey) |
| Card | `#0f2620` | Dark sage card surface (NOT mint) |
| Muted | `#bfd8c5` | Dark-mode muted accent |
| Border | `#2a2a2a` | Dark-mode ghost border |

### Typography

Four fonts. All Google Fonts. No exceptions.

| Role | Font | Weight | Used for |
|---|---|---|---|
| **Hero display + headlines + CTAs** | **Sora** | 600 (SemiBold) | Wordmark, hero titles, section headers, CTA labels, button text |
| **Editorial emphasis + tagline** | **Fraunces** | 400 (Italic) | The locked tagline, pull quotes, "Micro-Insights" inside body text |
| **Body + sub-lines + sentences** | **Inter** | 400 (regular), 500 (medium) | Body copy everywhere, sub-headlines, compliance footer, form labels |
| **Verdicts + labels + data + URLs** | **IBM Plex Mono** | 400, 500 | Verdict pill text, URLs, email addresses, timestamps, biometric data, ingredient list, "HOW IT WORKS" tracked uppercase headers |

#### Font fallback stacks (for engineering)
```
Sora:           'Sora', 'Helvetica Neue', Helvetica, Arial, sans-serif
Inter:          'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif
Fraunces:       'Fraunces', Georgia, 'Iowan Old Style', 'Times New Roman', Times, serif  + font-style: italic
IBM Plex Mono:  'IBM Plex Mono', 'SF Mono', Menlo, Consolas, 'Courier New', monospace
```

#### Type scale
| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `display-lg` | 40-44px | 1.1 | Sora 600, tight letterspacing -0.02em | Hero headlines |
| `display-md` | 32-36px | 1.1 | Sora 600 | Section heroes |
| `headline-lg` | 28-32px | 1.15 | Sora 600 | Section headers |
| `headline-sm` | 22-24px | 1.2 | Sora 600 | Sub-section headers |
| `pull-quote` | 28-36px | 1.25 | Fraunces Italic, deep sage | Pull quotes, emotional accents |
| `editorial-sub` | 20-28px | 1.3 | Fraunces Italic | Editorial sub-lines under hero |
| `body-lg` | 16-18px | 1.6 | Inter 400 | Long-form text (default) |
| `body-md` | 14-15px | 1.55 | Inter 400 | Forms, secondary text |
| `verdict-pill` | 12-14px | 1 | IBM Plex Mono 500, tracking 0.04-0.08em, uppercase | Verdict pills, mono tags |
| `label-md` | 12-13px | 1.4 | IBM Plex Mono 500, tracking 0.04em | Data labels |
| `cta-label` | 14-16px | 1.2 | Sora 600 | Button text |
| `footer-fine` | 10-12px | 1.6 | Inter 400, 60% opacity | Compliance footer |

#### Canva font mapping
Canva's free library does **not** include Sora. Two options:
1. Use **Space Grotesk Semibold** as a Canva-only substitute (closest geometric match, free in Canva)
2. Upload Sora SemiBold TTF as a brand font (requires Canva Pro Brand Kit)

The spec stays Sora everywhere outside Canva (code, print, render). Space Grotesk is a Canva-tool-only substitute.

### Wordmark

- The wordmark is the word **bud** lowercase, set in Sora 600 deep sage `#1d4433` on oat backgrounds, or in oat `#fcf9f2` on sage backgrounds.
- Clear space around the wordmark: at least 1× the cap-height in all four directions.
- Minimum size in print: 8pt cap-height. Below that, the wordmark loses optical weight.
- Logo files on disk: `/mnt/hdd/agents/bud/bud-logo.jpg`, `/mnt/hdd/agents/bud/bud-logo-transparent.png`.
- **Never** place the wordmark on a product (jar, box, bar, wrapper). Bud is the app, not a packaged product.
- **Never** invert the wordmark to pure white on dark — use `#fcf9f2` oat instead (iOS dark mode auto-inverts pure white to muddy grey).

### Elevation + depth

- **Ambient shadow** (for floating pill navigation, high-priority cards): 32px blur, 4% opacity, color `#274e3c` (tinted sage). Feels like natural shadow in a sunlit room, not a digital drop shadow.
- **Ghost border** (only when accessibility requires): `outline-variant #c1c8c2` at 20% opacity. Felt, not seen.
- **Glassmorphism** for floating UI elements (nav pill, tooltips): `surface-container-lowest` at 80% opacity with 20px backdrop blur.
- **Scan-line overlay** (hero sections, data visualizations only): 2px repeating horizontal scan-line at 3% opacity. Use sparingly; reinforces "Organic Tech" but feels gimmicky if overused.

### Spacing system

Scale: `0.5rem` (8px) — `1rem` (16px) — `1.5rem` (24px) — `2rem` (32px) — `3rem` (48px) — `4rem` (64px) — `5.5rem` (88px).

Use the larger end for premium feel. Don't be afraid of empty space.

### Photography direction

**Aesthetic:** Bon Appétit Healthyish meets Cereal Magazine. Documentary, naturalistic, restrained.

**Rules:**
- Real natural daylight, no studio softboxes, no harsh fluorescents.
- Warm oat + soft sage color palette in scene.
- Real Canadian private-label products visible (PC, No Name, Compliments). Never invented brands.
- Real humans, not stock-photo models. Asymmetric features, real lighting, real expressions, slight imperfections.
- **No faces visible** in most shots (hands, over-the-shoulder, POV, still life). Avoids the "AI plastic-doll" trap and gives editorial calm.
- Asymmetric composition. Subject anchors one third, the other two-thirds carry negative space for typography.
- Lay-flat top-down works for product brochures and packaging shots. Mid-shot documentary for human scenes.

**Banned in photography:**
- Glossy plastic-doll AI skin
- Painterly / oil-paint look
- Cartoon stylization
- Symmetrical / centered subject
- Studio softbox lighting
- Stock-photo smile straight to camera
- Golden-hour fantasy glow
- Surreal soft-fantasy lighting
- Faces visible (default — only allow when there's a specific editorial reason)
- Invented brand packaging
- Bud branding on any packaging

### Motion

- Subtle and slow. Default ease: `cubic-bezier(0.4, 0, 0.2, 1)` over 300ms.
- Floating animation for hero elements: vertical translate `-12px` over 4s, ease-in-out, infinite. Restrained.
- Pulse glow for primary CTAs only, never on secondary or tertiary. Sage glow, never green-neon.
- Fade-in-up on scroll for sections, stagger 0.1-0.5s between elements.
- No bouncy spring physics. No confetti. No micro-interactions that beg for attention.

---

## 4. Design Tokens (machine-readable)

For engineering. Copy directly into `tailwind.config.ts` / `theme.ts` / iOS Color Asset Catalog.

```ts
export const budTokens = {
  color: {
    // Primary surface
    oat: '#fcf9f2',
    surfaceLow: '#f6f3ec',
    surfaceLowest: '#ffffff',

    // Brand
    deepSage: '#1d4433',
    primaryContainer: '#355c49',
    sageMint: '#bfd8c5',

    // Text
    charcoal: '#1a1a1a',
    primaryText: '#1e1d1a',
    bodyMuted: 'rgba(26, 26, 26, 0.7)',
    fineMuted: 'rgba(26, 26, 26, 0.6)',

    // Semantic
    successGreen: '#2f7d57',
    terracotta: '#c65a3d',
    outlineVariant: '#c1c8c2',
    onSurfaceVariant: '#414844',

    // Dark mode
    darkPaper: '#1a1a1a',
    darkInk: '#fcf9f2',
    darkCard: '#0f2620',
    darkMuted: '#bfd8c5',
    darkBorder: '#2a2a2a',

    // Verdict states
    verdictCompatibleBg: '#1d4433',       // sage on oat
    verdictCompatibleFg: '#fcf9f2',
    verdictAvoidBg: '#1a1a1a',            // charcoal pill, never pure red
    verdictAvoidFg: '#fcf9f2',
    verdictUncertainBg: '#fcf9f2',        // oat with dotted sage outline
    verdictUncertainOutline: '#1d4433',
    verdictUncertainFg: '#1d4433',
  },

  font: {
    sora: "'Sora', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fraunces: "'Fraunces', Georgia, 'Iowan Old Style', 'Times New Roman', serif",
    inter: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    mono: "'IBM Plex Mono', 'SF Mono', Menlo, Consolas, monospace",
  },

  weight: {
    sora: 600,
    interRegular: 400,
    interMedium: 500,
    frauncesItalic: 400,
    monoRegular: 400,
    monoMedium: 500,
  },

  size: {
    displayLg: '44px',
    displayMd: '36px',
    headlineLg: '30px',
    headlineSm: '24px',
    pullQuote: '32px',
    editorialSub: '24px',
    bodyLg: '16px',
    bodyMd: '14px',
    verdictPill: '13px',
    labelMd: '12px',
    ctaLabel: '15px',
    footerFine: '11px',
  },

  spacing: {
    0.5: '8px',
    1: '16px',
    1.5: '24px',
    2: '32px',
    3: '48px',
    4: '64px',
    5.5: '88px',
  },

  radius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    pill: '999px',
  },

  shadow: {
    ambient: '0 12px 32px rgba(39, 78, 60, 0.04)',
    elevated: '0 16px 48px rgba(39, 78, 60, 0.06)',
    glass: '0 2px 16px rgba(39, 78, 60, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
  },

  motion: {
    easeStandard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    durationFast: '180ms',
    durationStandard: '300ms',
    durationSlow: '600ms',
  },
};
```

---

## 5. Component Library

### Verdict Pill (the differentiator — most important component)

The pill is the single most recognizable Bud UI element. Three states only.

```
COMPATIBLE         deep sage #1d4433 fill, oat text, IBM Plex Mono 500 uppercase, tracking 0.06em, pill radius 999px, padding 6×12px
AVOID              charcoal #1a1a1a fill, oat text, same type spec
UNCERTAIN          oat fill, dotted 1.5px sage #1d4433 outline, sage text, same type spec
```

- Pill never alone. Always paired with a body line describing what was checked: "No declared priority allergens matched your profile."
- Pill never says "Safe" even though sage is green. The label text is "Compatible".
- Mobile size: 24-28px tall. Web/larger: 28-32px tall.

### Primary CTA (Tactile button)

```
Background:      linear-gradient(180deg, #355c49 0%, #1d4433 100%)
Color:           oat #fcf9f2
Font:            Sora 600, 15-16px
Padding:         14×32px
Border-radius:   6px (default) or 999px (pill CTA in marketing)
Inset highlight: 1px white at 10% opacity, top
Shadow:          2px deep green at bottom (tactile depth)
Hover:           translateY(-2px), shadow expands to 8×30px rgba(29, 68, 51, 0.4)
Active state:    no transform, inner shadow 0 2px 4px rgba(0,0,0,0.1)
```

The button should feel like a high-quality medical-device button, not a flat web rectangle.

### Sage-Mint Pill (Marketing CTA)

For social and ad creatives. Lighter, softer than the primary CTA.

```
Background:      sage-mint #bfd8c5 at 40-100% opacity
Color:           deep sage #1d4433 or charcoal #1a1a1a (depending on opacity)
Font:            Sora 600, 14-16px
Padding:         12×24px
Border-radius:   999px (always full pill)
Use:             "Join the waitlist · bud.quest", "Read with Bud"
```

### Frosted Pill Navigation (web)

```
Background:      surface-low #f6f3ec at 85% opacity
Backdrop-filter: blur(20px)
Border-radius:   999px
Padding:         8×16px per nav item
Active state:    soft-sage-highlight #e6efe8 background with deep-sage #1d4433 dot indicator
```

### Asymmetric Bento Grid Card

- 3-column and 2-column spans intentionally mixed
- No divider lines — gutter is `spacing-6` (32px)
- One card in every grid is "intentionally offset" by `spacing-2` (32px) or has a unique aspect ratio
- Card fill: `surface-lowest #ffffff` on `oat #fcf9f2` background (subtle elevation via background-shift, not shadow)

### Input field (when accessibility requires a visible boundary)

```
Background:      surface-lowest #ffffff
Border:          1.5px solid outline-variant #c1c8c2 at 20% opacity (felt, not seen)
Border-radius:   6px
Padding:         12×16px
Font:            Inter 400 16px (prevents iOS zoom-on-focus)
Focus:           border-color shifts to deep-sage #1d4433 at 60% opacity, no outline glow
```

### Compliance Footer Block

Mandatory on every commercial email, every web page footer, every marketing piece.

```
Bud is an information tool, not a medical device. Always verify the physical package.
Zedsio Inc., [registered street], Toronto, ON [postal], Canada.
Unsubscribe · Update preferences · Privacy

Vous recevez ce courriel parce que vous vous êtes inscrit à la liste d'attente Bud sur bud.quest.
Bud est un outil d'information, pas un dispositif médical. Vérifiez toujours l'emballage physique.
Envoyé par Zedsio Inc., [adresse], Toronto (Ontario) [code postal], Canada.
Se désabonner · Modifier les préférences · Confidentialité
```

Font: Inter 11-12pt, 60% opacity. Bilingual blocks equal prominence per Bill 96 (French Language Charter, effective June 1, 2025).

---

## 6. Touchpoints

### 6.1 Consumer Website (bud.quest)

- Stack: Next.js 14 Pages Router + JS. Repo: `github.com/Am1r8/Bud-Health-V2`. Deploys on Vercel.
- Default to the Consumer System (oat / sage / mint, Sora + Fraunces Italic + Inter + IBM Plex Mono).
- **Live verdict copy uses "Caution"** — known drift. Reconcile to **"Uncertain"** to match the canonical spec.
- Pages: Home, How It Works, Truth Reports, Extension, Pricing, Beta Waitlist, FAQ, Privacy. Bilingual mirrors at `/fr/*`.
- CTAs on web: "Join the Beta" (primary), "Scan your first label free", "See how it works".
- Meta pixel `3481106278712577` firing site-wide.

### 6.2 Email (MailerLite marketing + Resend transactional)

Reference implementation: `/home/amir/programming/bud/waitlist/MAILERLITE-DESIGN-V2-SPEC.md`.

7 reusable React Email components: `BudHeader`, `BudHero`, `BudBody`, `BudQuote`, `BudVerdict`, `BudCTA`, `BudFooter`. Each is a 600px-wide `<table role="presentation">` block.

**Senders (locked):**
- Marketing: `"Amir at Bud" <hello@bud.quest>` (MailerLite, friendly-from drives +15-30% open rate)
- Transactional: `"Bud" <welcome@bud.quest>` (Resend)
- Reply-to always `hello@bud.quest`. Never `noreply@`.

**Cadence (locked):** 2/week, Tuesday + Friday at 10:00 ET. EN audience Tuesdays, FR-CA Fridays at 11:00 ET (catches QC lunch).

**Welcome series** (3 emails Day 0 / Day 2 / Day 7): see `/home/amir/programming/bud/waitlist/WELCOME-EMAILS.md`.

**Nurture map** (16 emails, 8 weeks): see `/home/amir/programming/bud/waitlist/NURTURE-PLAN.md`.

**Compliance rules:**
- Bilingual footer per Bill 96 (equal prominence, not a small "FR" toggle)
- CASL: express opt-in checkbox, never pre-checked, full Zedsio registered address
- Quebec Law 25: PII collection disclosed
- Banned-word lint pre-send: see lint list in §2

### 6.3 Social — Instagram Posts (1080×1080)

Pipeline: `bud_imagegen.sh "<prompt>" --square`.

Default split per "make me posts": 3 infographic + 3 cinematographic.

Visual rules:
- Real Canadian PC private-label product visible in scene
- Real human (no AI-glossy-skin)
- Sora Bold hero + Fraunces Italic sub-line
- Sage-mint pill CTA at bottom (`#bfd8c5`)
- Asymmetric text placement (upper-left or upper-right)

Locked hashtag stack (use 4-bucket template): `#FoodAllergy #FoodAllergyAwareness #FoodAllergyCanada #AllergyMom #AllergicLiving #BudQuest`.

### 6.4 Social — Instagram Stories (1080×1920)

Cinematic editorial, NOT design-system glass cards. References: Aftersun (Gregory Oke), A24 print campaigns, Magnum photo essays.

Two valid hero modes:
- **Mode 1 default:** Sora Bold hero + Fraunces Italic sub-line + sage-mint CTA pill
- **Mode 2 cinematic:** Fraunces Bold Italic hero + small-caps tags + text-only signature (no pill)

Full spec: `feedback/bud-ig-stories-style-locked.md`.

### 6.5 Meta Ads (Lead Ads + Pixel Seasoning)

- All UGC video, no studio polish (the "real friend filmed this in their kitchen" feel)
- iPhone HEVC `.MOV` → ffmpeg to H.264 `.mp4` before upload (HEVC silently breaks Meta auto-crop)
- "Text improvements", "Enhance CTA", "Add video effects" — ALL OFF on every ad (paraphraser drifts banned words)
- Restricted Words field in Ads Manager as defense-in-depth
- Pixel `3481106278712577` + waitlist conversion event named `waitlist_signup` (NOT `Submit lead form` — stricter ad review)

### 6.6 Print (cards, brochures, packaging when we get there)

- Stock: 14pt uncoated cream cardstock, matte finish. NEVER soft-touch (too pharma-flat), NEVER glossy.
- Color: print in 4-color CMYK. Deep sage `#1d4433` benefits from Pantone 2417 C spot color when budget allows (sage drifts purple-grey in pure CMYK).
- QR codes: real `qrencode -t PNG -s 12 -m 2` output, deep sage on oat tile, never the AI-rendered placeholder. Include UTM tracking on the link.
- Bleed: 0.125" all edges. Trim marks required.

Current locked print pieces (see `projects/bud-clinic-brochure-checkpoint-2026-05-15.md` for full state):
- Business card 3.5×2 horizontal (Aesop apothecary minimal layout)
- Doctor-office brochure 6.6×4.6 landscape (two-color split front + Aesop dense-type back)

### 6.7 App UI (iOS, future Android)

Stack target: Expo SDK 54 + RN 0.76 new arch (per `bud-mvp-research-2026-04-18`).

App-specific rules:
- Pull verdict pill into the camera view at the bottom-third, never the center (camera obscures)
- Three-tab nav at bottom: Scan / Profile / History. No more, no hamburger menu.
- Family profile switcher visible at top of every screen (not buried in settings)
- WCAG AA + VoiceOver / TalkBack labels on every interactive element
- 48dp minimum touch targets
- 2.5.1 single-pointer compliance (no multi-finger required)
- First-launch consent screen: "Bud is an information tool, not a medical device." (mandatory before any scan)
- Verdict screen footer: "Based on declared ingredients. Always verify the physical package. Not medical advice." (mandatory on every verdict)

### 6.8 Internal docs + investor materials

Internal docs that don't reach end users (Notion, this design book, Google Docs) can use lighter restraint. Investor pitch dashboard has its own aesthetic — see §7.

---

## 7. Investor Dashboard Mode (separate aesthetic, contained)

The investor pitch dashboard at `/home/amir/programming/bud/dashboard/` uses a **completely separate visual system** from the Consumer System. This is intentional. Investor materials need to read "tech, scaling, premium B2B startup" while consumer materials need to read "calm, human, sanctuary."

**Investor Dashboard system:**
- Dark mode primary background `#0a0a0f` (near-black with purple cast)
- Brand green `#22c55e` (Tailwind green-500) — much brighter than the consumer deep sage
- Glassmorphism cards with backdrop-blur 20px
- Animated gradient borders (4s linear rotation), pulse-glow CTAs, floating animations
- Typography: Inter body + Space Grotesk display (geometric replacement for Sora in dark-tech aesthetic) + JetBrains Mono labels
- Particle backgrounds, scan-line overlays, gradient-text headers

**Why separate:** investors expect SaaS-Apple-Stripe aesthetic. Consumers (especially parents managing allergies) need the opposite — calm, restrained, human.

**Boundary:** the investor dashboard system applies ONLY to:
- `~/programming/bud/dashboard/` (the investor dashboard)
- `~/programming/bud/investor-pitch/` (the 10-slide deck)
- `~/programming/bud/hult-pitch-archived/` (the Hult 2026 deck)

It does NOT apply to: the app, the website, email, ads, social, print, packaging, or any consumer-facing surface. Don't mix the two systems in a single deliverable.

---

## 8. Compliance Layer (always-on, regulatory)

This section enforces what keeps Bud out of Class II SaMD reclassification and out of CASL / Bill 96 / Law 25 enforcement.

### 8.1 Health Canada SaMD lane

To stay in the "information tool" lane and out of Class II SaMD (SOR/98-282 Rule 10(2)):

1. **Never use "safe", "guaranteed", "prevents"** (full list in §2).
2. **Never offer severity scoring or risk ratings.** No "high-risk day for you", no numerical safety score.
3. **Never give medical advice or treatment guidance.** Reading ingredients is not advising.
4. **Always pair every verdict with the disclaimer:** "Based on declared ingredients. Always verify the physical package. Not medical advice."
5. **First-use consent screen mandatory:** "Bud is an information tool, not a medical device."

### 8.2 CASL (Canadian Anti-Spam Law)

- Express opt-in checkbox required on lead forms, NEVER pre-checked
- Lifetime consent valid only while user hasn't unsubscribed
- Every commercial email must carry: legal sender name (Zedsio Inc.), physical mailing address (real street + city + province + postal — NOT placeholder like "Toronto, Canada"), and an unsubscribe link
- One-click unsubscribe required, functional for 60+ days post-send, honored within 10 business days
- Penalty ceiling: CAD $10M per violation. Directors personally liable.

### 8.3 Bill 96 (Quebec Charter of French Language)

- Effective June 1, 2025
- French must have **equivalent prominence** in: UI, ToS, privacy, push notifications, emails, support, App Store listing
- Not a small "FR" toggle hidden in a corner — equal prominence means equal visual weight and equal placement
- Penalty: CAD $3K-$30K per violation, doubled on repeat

### 8.4 Quebec Law 25 (Privacy)

- CAI actively enforcing
- Penalties: up to 4% global revenue or CAD $25M
- Required: PIA before launch, designate a "Person in charge of protection of personal information", automated decision disclosure, AES-256 encryption at rest + TLS 1.3 in transit
- Allergen profile stays **on-device only** in MVP (marketing asset, privacy-first)
- Analytics: PostHog Cloud EU (NOT Mixpanel / Amplitude / GA — all US-cloud and violate Law 25)
- No OneSignal (privacy policy permits data reuse)

### 8.5 EU AI Act Article 50 (effective August 2, 2026)

If any EU subscriber receives content with AI-generated imagery (Higgsfield, gpt-image-2, etc.):
- Must mark machine-readably (C2PA), OR
- Add visible "may contain AI-generated content" footer disclosure

Current pipeline strips C2PA via `strip_ai_metadata.sh` for Instagram un-labeling. Conflict needs resolving before Aug 2, 2026.

### 8.6 Tort / liability

- Bind insurance BEFORE any user data touches code:
  - E&O ($1,100-2,500/yr)
  - Cyber ($1,800-3,500/yr)
  - CGL ($500-1,200/yr)
  - Product Liability ($1,500-4,000/yr)
- User-submission pipeline is highest exposure — reputation-weighting + stricter-wins partial mitigation only. Counsel: Borden Ladner Gervais or Torys.

---

## 9. Photography Direction (detailed)

### Default mode: Bon Appétit Healthyish documentary

**Subject:**
- Hand or over-the-shoulder POV at a real Canadian grocery shelf or warm home kitchen
- Real PC / No Name / Compliments product label held at reading distance, ingredient text visible
- iPhone in hand showing Bud app verdict screen (when product UI is in scene)

**Light:**
- Natural daylight raking from one side (upper-left default)
- Cool fluorescent (4500K) for grocery store scenes
- Warm window light for kitchen scenes
- No softbox studio lighting
- No golden-hour fantasy glow
- Subtle long shadows acceptable, sharp hard shadows not

**Composition:**
- Asymmetric. Subject in lower-right or left third. Other two-thirds = negative space for typography.
- Generous breathing room around typography
- Documentary feel: slight imperfection (a dangling price tag, a flyaway hair, a slightly motion-blurred cart wheel in deep background)

**Color in scene:**
- Warm oat creams + soft sage greens dominate
- Canadian brand colors integrate naturally (PC yellow, No Name black-and-yellow)
- Avoid over-saturated colors

**People:**
- No faces in default mode. Hands, over-the-shoulder, POV.
- When face IS needed (founder story, occasional Stories), use real-looking, asymmetric features, real expressions, natural skin.
- Never: AI plastic-doll skin, glossy renders, stock-photo smile, cartoon stylization, painterly look, surreal lighting.

### Banned in photography
- Invented brand packaging
- Bud branding on any packaging
- Symmetrical / centered subject
- Studio softbox lighting
- Golden-hour fantasy glow
- Stock-photo smile to camera
- AI-illustration aesthetic, cartoon shading, over-saturated colors
- Dreamlike haze, painterly brush textures
- Glassmorphism floating UI verdict pills as hero element (this is the v2 design-system look, rejected 2026-05-09)

### Image generation

Tool: `/mnt/hdd/agents/shared/scripts/bud_imagegen.sh` (gpt-image-2 via Codex CLI).

```
bud_imagegen.sh "<prompt>" --portrait    # 9:16 Stories
bud_imagegen.sh "<prompt>" --landscape   # 16:9 Feed
bud_imagegen.sh "<prompt>" --square      # 1:1 Posts (downscales to 1080×1080)
```

Hard rules:
- Sequential only (`&&`), never parallel (`&`) — parallel-fishing bug duplicates outputs
- AI metadata auto-stripped via `strip_ai_metadata.sh` before delivery (kills C2PA / IPTC labels Instagram uses to detect AI)
- Default destination: Telegram chat `977259766` as `sendDocument` (no compression)
- Optional approval pipeline: `BUD_IMAGEGEN_APPROVAL=1` routes through 4-button Telegram approval (Approve / Regen / Edit / Reject)

---

## 10. Quick Reference

### Color hex cheat sheet
```
Oat              #fcf9f2
Surface low      #f6f3ec
Deep sage        #1d4433
Primary cont.    #355c49
Sage mint        #bfd8c5
Charcoal         #1a1a1a / #1e1d1a
Terracotta       #c65a3d
Success green    #2f7d57
Dark paper       #1a1a1a
Dark ink         #fcf9f2
Dark card        #0f2620
```

### Font cheat sheet
| Use | Font | Weight |
|---|---|---|
| Wordmark, CTAs, headings | Sora | 600 |
| Tagline, pull quotes | Fraunces | Italic |
| Body, sub-lines | Inter | 400 |
| URLs, verdicts, mono | IBM Plex Mono | 400-500 |

### Canva substitutes
| Spec font | Canva (free) |
|---|---|
| Sora 600 | Space Grotesk Semibold |
| Fraunces Italic | Fraunces (click I to italicize) |
| Inter | Inter |
| IBM Plex Mono | IBM Plex Mono |

### Verdict words (locked)
**Compatible / Avoid / Uncertain**

Site drift to reconcile: bud.quest uses "Caution" instead of "Uncertain". Update website to match book.

### Banned word list (top hits — full list in §2)
safe, safer, guaranteed, prevents, 100%, medical-grade, FDA-approved, Health Canada approved, protects, clinically proven, doctor-recommended, peace of mind, never miss, catches everything, manages your allergy, treats, monitors, diagnoses, cure, treatment, anaphylaxis prevention, avoid reactions.

### Approved value-prop phrases (start from here when writing)
- "Reads the label so you don't have to."
- "Another set of eyes."
- "A second pair of eyes for the grocery aisle."
- "Helps you identify declared allergens."
- "Compatible, Avoid, or Uncertain."
- "Based on declared ingredients."
- "Always verify the physical package."
- "An information tool, not a medical device."

### Locked tagline
**The Buddy You Always Needed.**

### Always-on disclaimers
- Verdict screen: "Based on declared ingredients. Always verify the physical package. Not medical advice."
- First-use: "Bud is an information tool, not a medical device."
- Email footer: bilingual, full Zedsio registered address, unsubscribe link.

---

## 11. Open Items / Known Drift

| Item | Where | Action | Owner |
|---|---|---|---|
| Live verdict word "Caution" on `bud.quest` | Public site | Reconcile to "Uncertain" | Web |
| `bud.quest` Day 17 ad campaigns refer to old waitlist count (1,000 stretch goal) | Marketing pages | Update once 1,000 hit | Marketing |
| Zedsio Inc. full registered street address | All email/footer/print | Replace `[STREET]` placeholder | Amir (legal) |
| EU AI Act Article 50 enforcement | Image pipeline | Decide: reverse C2PA strip for EU-destined OR add visible AI disclosure | Pre-Aug 2, 2026 |
| Investor dashboard system isolated from consumer system | Repo audit | Ensure no leakage in shared components | Engineering |
| Sora font in Canva | Marketing ops | Decide: Space Grotesk substitute OR upload Sora as brand font | Marketing |

---

## Appendix A — Canonical source files

| Source | Path | What it is |
|---|---|---|
| Brand DNA | `/mnt/hdd/agents/bud/IDENTITY.md` | Mission, success criteria, founder voice |
| Brand soul | `/mnt/hdd/agents/bud/SOUL.md` | Personality, philosophy, decision frame |
| Design system v1 | `/mnt/hdd/agents/bud/DESIGN.md` | "Intelligent Sanctuary" foundation |
| Email design v2 spec | `/home/amir/programming/bud/waitlist/MAILERLITE-DESIGN-V2-SPEC.md` | Implementation spec for MailerLite + Resend |
| Welcome series (EN+FR) | `/home/amir/programming/bud/waitlist/WELCOME-EMAILS.md` | Locked welcome copy |
| 8-week nurture plan | `/home/amir/programming/bud/waitlist/NURTURE-PLAN.md` | 16-email cadence, subject lines, send times |
| Live consumer site | `https://bud.quest` | Public reference (note: "Caution" drift) |
| Logo files | `/mnt/hdd/agents/bud/bud-logo*.{jpg,png}` | Wordmark assets |
| Knowledge base (research PDFs) | `/mnt/hdd/agents/bud/knowledge/` | 25+ research docs |
| Allergen ontology YAML | `/home/amir/programming/bud/research/allergen-ontology-canada-v1.yaml` | 2112-line synonym graph |
| Data architecture | `/home/amir/programming/bud/research/bud-data-architecture.md` | 13-section technical doc |

## Appendix B — Cross-cutting rule files (memory)

These all live in `~/obsidian-vault/Claude-Memory/feedback/`. They are read alongside this book before any BUD work.

| Rule file | What it enforces |
|---|---|
| `bud-never-say-safe.md` | The full banned word list (EN + FR) and approved replacements |
| `bud-no-canadian-primary-hook.md` | Don't lead with "Canadian" / bilingual as the headline hook |
| `ai-voice-brand-casing.md` | "Bud" Title Case, never "BUD" all-caps in body |
| `bud-ig-posts-pipeline-locked.md` | Workflow for "make me posts" requests |
| `bud-ig-stories-style-locked.md` | Stories cinematic aesthetic spec |
| `bud-ig-hashtag-standard.md` | IG hashtag template |
| `bud-imagegen-bwrap-fallback.md` | Image gen sandbox failure mode |
| `bud-imagegen-parallel-fishing-bug.md` | Sequential only, never parallel |
| `ai-metadata-strip-pipeline.md` | C2PA / EXIF auto-strip before delivery |
| `meta-ad-paraphrase-enhancements-off.md` | Meta ad UI toggles |
| `iphone-hevc-meta-ads.md` | HEVC → H.264 ffmpeg before upload |
| `no-em-dashes.md` | No em or en dashes in user-facing copy |

## Appendix C — Active project state pointers

| Project | Status | Memory file |
|---|---|---|
| Doctor-office cards + brochure | Copy locked, awaiting print pass | `projects/bud-clinic-brochure-checkpoint-2026-05-15.md` |
| Email pipeline master synthesis | Tool stack purchased, automation in draft | `projects/bud-pipeline-master-synthesis-2026-05-15.md` |
| Email pipeline architecture v2 | Spec locked | `projects/bud-email-pipeline-2026-05-12.md` |
| Day-17 ad performance | UGC-6 unicorn $1.81 CPL, scaling | `projects/bud-ads-day17-checkpoint-2026-05-14.md` |
| Google Workspace + meet.bud.quest | LIVE | `projects/bud-google-workspace-2026-05-09.md` |
| Investor pitch deck | Complete, sent to Telegram | `projects/bud-investor-pitch.md` |

---

## Changelog

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-05-15 | Amir + Claude | Initial consolidation. Synthesized DESIGN.md + IDENTITY.md + SOUL.md + MAILERLITE-DESIGN-V2-SPEC.md + WELCOME-EMAILS.md + NURTURE-PLAN.md + live bud.quest scrape + all cross-cutting BUD feedback rules into single source of truth. Flagged Caution/Uncertain drift on live site. Separated Consumer System from Investor Dashboard system. |

---

**This book is the canonical reference. If you're about to produce a BUD design output and it conflicts with the book, update the book first OR ask Amir to override. Drift is allowed only via versioned changelog entry, never silently.**
