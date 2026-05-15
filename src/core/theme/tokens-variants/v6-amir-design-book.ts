// Variant 6 - Canonical design book by Amir (LOCKED 2026-05-15).
// Replaces my earlier v5 estimates with exact hex values from Amir's
// DESIGN-BOOK.md "Intelligent Sanctuary" palette.
//
// Eye contrast issue from v5: deep sage on charcoal eyes was too low-contrast
// to read at small sizes. Fix: eyes are now `inkBrand` (deep sage) on a
// sage-mint body, which is the canonical Bud avatar.
//
// Naming maps Amir's design tokens onto our tokens schema:
//   bg          = Amir.oat          #fcf9f2
//   surface     = Amir.surfaceLow   #f6f3ec
//   ink         = Amir.charcoal     #1a1a1a
//   brand[500]  = Amir.deepSage     #1d4433  (headlines, CTAs, wordmark, Compatible)
//   brand[400]  = Amir.primaryCont  #355c49  (CTA gradient top)
//   brand[100]  = Amir.sageMint     #bfd8c5  (mascot body, soft accents)
//   accent[500] = Amir.terracotta   #c65a3d  (Avoid, warm, NEVER pure red)

export const colorVariant = {
  bg: '#fcf9f2',
  surface: '#f6f3ec',
  ink: '#1a1a1a',
  inkSoft: '#1e1d1a',
  inkMuted: '#414844',
  line: 'rgba(193,200,194,0.2)',

  brand: {
    50:  '#f6f3ec',
    100: '#bfd8c5',
    200: '#a4c8ab',
    300: '#7ba886',
    400: '#355c49',
    500: '#1d4433',
    600: '#143222',
    700: '#0f2620',
    800: '#091b16',
    900: '#04100c',
  },

  accent: {
    500: '#c65a3d',
    600: '#9e4630',
  },

  status: {
    ok:     '#1d4433',
    warn:   '#c65a3d',
    danger: '#1a1a1a',
    info:   '#355c49',
  },
} as const;
