# BUD Brand Book - Draft v2

**Status:** DRAFT v2 of ~15. Iterating on v1 from first browser pass.
**Last touched:** 2026-05-15 after first visual review with Alex.

## What changed from v1

1. **Welcome + confirm + home screens now use a centered hero composition** under the mascot. Allergens step keeps left-aligned headers because grid items need visual anchors.
2. **PhoneFrame component added** for web preview. Design judged at phone proportions, not desktop-stretched.
3. **Brand color ladder generated** (v1-v4). Live preview by changing one import.
4. **Confirm step's allergen summary** got a card treatment (surface + line + brand-green dot) instead of bare bullet text.
5. **Open question retired:** "Should the brand be center-aligned or left?" Answer locked: center hero, left content.

## Open questions for v3

- [ ] **Pick a brand color variant.** Switch tokens.ts between v1/v2/v3/v4 and screenshot each. Decision after side-by-side review.
- [ ] **Mascot personality test.** Current Bud has antenna + 2 eyes. Should he have a mouth? Eyebrows? Arms? Or stay pure round-with-eyes? (Atomato has more features, Phantom has none.)
- [ ] **Status bar / system chrome on phone frame.** Right now there's nothing - bare phone with notch. Should we mock a 9:41 / battery indicator? (Linear does, Wealthsimple doesn't.)
- [ ] **Empty state for home screen.** Currently shows "Camera coming next" disabled button. Real empty state needs a primary CTA that does something.
- [ ] **Onboarding step 1 of 2 vs step 1 of 3 vs no step counter.** Currently "STEP 1 OF 2" labels. Should welcome have its own counter too? (Probably no.)
- [ ] **Welcome screen first impression.** Big mascot or smaller mascot + bigger text? Right now both compete.
- [ ] **Tagline test.** "The buddy you always needed" works. Alternates to test: "Eat with confidence." / "Your second opinion." / "Know before you buy."

## Polish lock-ins from v1 still standing

- Typography (Inter, 6-step scale, 3-weight discipline)
- Motion (spring physics, no linear easing)
- Color discipline (85% neutral, 1 brand, 1 accent, no decorative color)
- Iconography (Lucide only, 1.5px stroke)
- Voice (direct, specific, no buzzwords, no em dashes)
- No stock photography
- No 3D-rendered food

## Component sketches done

- `src/shared/widgets/buddy-mascot.tsx` (v0 round-with-eyes + idle bob + mood-aware eye scale)
- `src/shared/widgets/button.tsx` (primary/secondary/ghost, spring press)
- `src/shared/widgets/allergen-chip.tsx` (pill, spring scale, color interpolation on select)
- `src/shared/widgets/phone-frame.tsx` (web-only iPhone chrome)

## Next slice (3): camera + scan UI

Brand decisions that need to be made BEFORE slice 3:
- Camera viewfinder overlay style: minimal (just a focus square) or instructional (corners + tip text)
- Shutter button: ring style (Phantom), filled (Apple), or branded (custom Bud-themed)
- Captured-state preview: thumbnail + retake button or auto-process

Locked direction: Shutter = ring style. Viewfinder = minimal focus square + gentle hint text on first scan only.
