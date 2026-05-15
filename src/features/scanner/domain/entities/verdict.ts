/**
 * Verdict — pure domain entity. Zero framework imports.
 *
 * SOLID: Single Responsibility. This file describes WHAT a verdict is, nothing else.
 */

export type VerdictKind = 'compatible' | 'avoid' | 'caution' | 'unknown';

export interface Verdict {
  readonly kind: VerdictKind;
  readonly reason: string;
  readonly triggeredAllergens: ReadonlyArray<string>;
  readonly mayContainAllergens: ReadonlyArray<string>;
  readonly confidence: number;
}

export const Verdict = {
  compatible: (reason = 'No allergens detected'): Verdict => ({
    kind: 'compatible',
    reason,
    triggeredAllergens: [],
    mayContainAllergens: [],
    confidence: 1,
  }),

  avoid: (triggered: ReadonlyArray<string>, reason: string, confidence = 1): Verdict => ({
    kind: 'avoid',
    reason,
    triggeredAllergens: triggered,
    mayContainAllergens: [],
    confidence,
  }),

  caution: (mayContain: ReadonlyArray<string>, reason: string, confidence = 0.8): Verdict => ({
    kind: 'caution',
    reason,
    triggeredAllergens: [],
    mayContainAllergens: mayContain,
    confidence,
  }),

  unknown: (reason = 'Could not determine compatibility'): Verdict => ({
    kind: 'unknown',
    reason,
    triggeredAllergens: [],
    mayContainAllergens: [],
    confidence: 0,
  }),
};
