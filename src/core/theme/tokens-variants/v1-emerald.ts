// Variant 1 - Emerald BUD green (current default).
// Vibe: classic safety-green, Yuka-adjacent, premium because of the scale tightness.
// Risk: too close to Yuka, hellofresh.

export const colorVariant = {
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  ink: '#0A0A0A',
  inkSoft: '#3A3A3A',
  inkMuted: '#6E6E6E',
  line: '#E5E5E5',
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
  accent: { 500: '#FF6B6B', 600: '#E54545' },
  status: { ok: '#1FAB5C', warn: '#F59E0B', danger: '#DC2626', info: '#3B82F6' },
} as const;
