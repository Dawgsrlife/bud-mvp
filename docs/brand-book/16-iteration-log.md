# Chapter 16. Iteration log

**Last touched:** 2026-05-15.

Master append-only log of every brand-book version. Format:

```
## vN (YYYY-MM-DD)
**Scope:** what got touched
**Why:** what triggered the iteration
**Locked:** what moved from in-flight to permanent
**Open:** what's still under decision
```

---

## v4 (2026-05-15) - structured chapter split

**Scope:** Split the monolithic `../design/brand-book-v1..v3.md` files into a 16-chapter structured set under `docs/brand-book/`. Each chapter owns its own scope. Master INDEX at `00-INDEX.md`.

**Why:** Brand book reached the size where flat single-doc structure made it hard to find anything. Pentagram / Stripe-Press / Linear-style chapter structure scales to v15 without losing readability.

**Built:**
- `00-INDEX.md` (TOC + working principles + what's locked vs in-flight)
- `01-foundations.md` (brand promise, who BUD is for, what BUD is not, the 5 personality traits, the founder context)
- `02-brand-strategy.md` (wedge, moat, positioning canvas vs Yuka/Fig/Spoonful, Canada First thesis, the funnel)
- `03-voice-and-tone.md` (voice ladder, full ban list, em-dash rule, AI-tells audit, founder voice section for Alex)
- `05-color.md` (palette, ladder of 4 variants, accessibility audit at AA, dark mode deferred)
- `06-typography.md` (Inter family, 6-step scale, 3-weight discipline, hierarchy patterns)
- `10-verdict-design.md` (the highest-stakes screen, full layout spec + tone pill anatomy + motion choreography + copy patterns)
- `16-iteration-log.md` (this file)

**Locked from previous versions:**
- Typography (Inter, 6-step scale, 3 weights)
- Motion principles (spring physics, no linear easing, mood-aware mascot)
- Voice ladder + ban-list (including em-dash rule)
- Mascot mood map (idle/happy/thinking/warning)
- Verdict screen layout (restrained card, not status flood)
- Color discipline (85% neutral, 1 brand, 1 accent, no decorative color)
- No em-dashes, no stock photos, no Material defaults, no purple-to-pink gradients

**Open for next iteration (v5+):**
- Brand color decision (4 ladder variants under live test; pick one)
- Mascot face evolution (eyes-only forever vs add mouth)
- Chapters not yet written: 04 logo, 07 iconography + imagery, 08 motion (full chapter), 09 product brand, 11 web + landing, 12 social, 13 outbound + email, 14 App Store, 15 application rules

## v3 (2026-05-15)
**Scope:** Single-doc draft at `../design/brand-book-v3.md`. Mood map locked. Verdict direction proposed (restrained card, not flood).

## v2 (2026-05-15)
**Scope:** Single-doc draft at `../design/brand-book-v2.md`. PhoneFrame web preview added. Centered hero composition for hero moments.

## v1 (2026-05-15)
**Scope:** Initial single-doc draft at `../design/brand-book-v1.md`. Typography + motion + voice locked. Color + mascot + logo + tagline left open.
