// Variant 5 - Amir's website + transactional email aesthetic (LOCKED 2026-05-15).
// Forest deep green + cream + serif-italic-display direction.
// Eyeballed from the bud.quest waitlist confirmation email screenshots.
// Reconciles the print-card direction (Amir's call) with the app's brand book.
//
// Pairs with a serif italic display family for hero moments. Bud capitalized as
// 'Bud' (sentence case), NOT 'BUD' all-caps. See chapter 17 brand divergence
// log for the decision history.

export const colorVariant = {
  // Cream / warm off-white backgrounds (NOT cool #FAFAFA)
  bg: '#F7F1E6',
  surface: '#F2EBDE',
  ink: '#1C2A22',
  inkSoft: '#3D4A40',
  inkMuted: '#6F7A6F',
  line: '#DCD5C5',

  // Brand: dark forest green (closer to v2-toronto-deep but deeper)
  brand: {
    50: '#EFEDE6',
    100: '#D5D9D1',
    200: '#A6B5A8',
    300: '#6F8C77',
    400: '#3F6650',
    500: '#1F4A33',
    600: '#163826',
    700: '#0F2A1B',
    800: '#091C12',
    900: '#04100A',
  },

  // Accent: warm amber (the "Uncertain" pill color from the email)
  accent: {
    500: '#C68A2E',
    600: '#9E6E20',
  },

  status: {
    ok: '#1F4A33',      // forest, matches brand 500
    warn: '#C68A2E',    // amber (the email's "Uncertain")
    danger: '#9E3A33',  // deep red (the email's "Avoid")
    info: '#3B6B8C',
  },
} as const;
