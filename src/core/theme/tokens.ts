// Design tokens - the single source of truth for color, type, spacing, radii, motion.
// No hardcoded hex or px values anywhere else in the codebase.
//
// To swap brand variants for live comparison, change the import on the next line:
//   v1-emerald            (default, Yuka-adjacent safety green)
//   v2-toronto-deep       (calmer evergreen, more clinical)
//   v3-phantom-mono       (monochrome + warm amber accent, max restraint)
//   v4-wealthsimple-cream (cream + deep plum, premium understated)
//
// See docs/adr/0003-design-system-and-animation.md and docs/design/brand-book-v1.md.

import { colorVariant } from './tokens-variants/v5-amir-website';

export const tokens = {
  color: colorVariant,

  type: {
    // Body family: Inter (sans, free, ships via @expo-google-fonts/inter)
    family: 'Inter',
    // Hero family: serif italic for "Bud" wordmark + hero moments. Pairs with Amir's
    // website + email aesthetic. Playfair Display Italic 700 is the closest free pairing.
    // On RN, this requires @expo-google-fonts/playfair-display; web preview uses
    // Playfair Display via Google Fonts CDN.
    familySerif: 'PlayfairDisplay-BoldItalic, Georgia, serif',
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 20,
      xl: 28,
      '2xl': 40,
    },
    weights: {
      regular: '400' as const,
      medium: '500' as const,
      bold: '700' as const,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.6,
    },
    letterSpacing: {
      tight: -0.4,
      normal: 0,
    },
  } as const,

  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 24,
    6: 32,
    8: 48,
    10: 64,
  } as const,

  radius: {
    sm: 8,
    md: 12,
    lg: 20,
    full: 9999,
  } as const,

  motion: {
    duration: {
      fast: 150,
      med: 250,
      slow: 400,
    },
    spring: {
      default: { damping: 22, stiffness: 200 },
      bouncy: { damping: 12, stiffness: 180 },
      gentle: { damping: 26, stiffness: 160 },
    },
  } as const,
} as const;

export type Tokens = typeof tokens;
