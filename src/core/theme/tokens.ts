/**
 * Design tokens — the single source of truth for color, type, spacing, radii, motion.
 * No hardcoded hex or px values anywhere else in the codebase.
 *
 * See docs/adr/0003-design-system-and-animation.md for the contract.
 */

export const tokens = {
  color: {
    // Neutrals (off-white to near-black)
    bg: '#FAFAFA',
    surface: '#FFFFFF',
    ink: '#0A0A0A',
    inkSoft: '#3A3A3A',
    inkMuted: '#6E6E6E',
    line: '#E5E5E5',

    // Brand — BUD green. Signals safety + health.
    brand: {
      50: '#F0F9F4',
      100: '#DCF1E6',
      200: '#B8E3CC',
      300: '#8FD2AC',
      400: '#5DBC85',
      500: '#1FAB5C',
      600: '#168A4A',
      700: '#106A39',
      800: '#0B4A28',
      900: '#062D18',
    },

    // Accent — used ONLY for danger/avoid states. Never decorative.
    accent: {
      500: '#FF6B6B',
      600: '#E54545',
    },

    // Status
    status: {
      ok: '#1FAB5C',
      warn: '#F59E0B',
      danger: '#DC2626',
      info: '#3B82F6',
    },
  } as const,

  type: {
    family: 'Inter',
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
