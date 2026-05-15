/**
 * Theme - composed from tokens. Consumed via useTheme() or imported directly.
 *
 * Stays in core/theme. Never imported by data/ or domain/.
 */

import { tokens } from './tokens';

export const theme = {
  ...tokens,
} as const;

export type Theme = typeof theme;
