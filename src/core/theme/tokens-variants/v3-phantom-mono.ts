// Variant 3 - Phantom Wallet style monochrome.
// Vibe: maximum restraint, off-black main with a single warm accent for verdicts.
// Atomato territory. Premium because near-zero color.

export const colorVariant = {
  bg: '#F6F5F2',
  surface: '#FFFFFF',
  ink: '#161513',
  inkSoft: '#3A3733',
  inkMuted: '#7A766F',
  line: '#E5E2DD',
  brand: {
    // Brand is the ink color itself. "Brand 500" is what other variants would call accent.
    50: '#F0EFEC',
    100: '#D9D6D0',
    200: '#B5B0A7',
    300: '#8C857B',
    400: '#5F584F',
    500: '#161513',
    600: '#0E0D0C',
    700: '#070706',
    800: '#000000',
    900: '#000000',
  },
  accent: { 500: '#E8A340', 600: '#C9871F' },
  status: { ok: '#3D7A52', warn: '#E8A340', danger: '#B43E2F', info: '#3F5C7A' },
} as const;
