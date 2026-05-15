// ScanRecord - a past scan in the user's history.
// Stored locally in AsyncStorage for the MVP. Slice 7+ syncs to Supabase via
// the same product_scans table the Edge Function already writes to.
//
// SOLID: Single Responsibility. Just the data shape.

import type { VerdictKind } from '../../../scanner/domain/entities/verdict';

export interface ScanRecord {
  readonly id: string;
  readonly scannedAt: string;
  readonly verdictKind: VerdictKind;
  readonly verdictReason: string;
  readonly productDisplayName?: string;
  readonly triggeredAllergens: ReadonlyArray<string>;
  readonly mayContainAllergens: ReadonlyArray<string>;
  readonly confidence: number;
}

export const ScanRecord = {
  fromVerdict: (input: {
    id: string;
    scannedAt?: string;
    verdictKind: VerdictKind;
    verdictReason: string;
    productDisplayName?: string;
    triggeredAllergens: ReadonlyArray<string>;
    mayContainAllergens: ReadonlyArray<string>;
    confidence: number;
  }): ScanRecord => ({
    id: input.id,
    scannedAt: input.scannedAt ?? new Date().toISOString(),
    verdictKind: input.verdictKind,
    verdictReason: input.verdictReason,
    productDisplayName: input.productDisplayName,
    triggeredAllergens: input.triggeredAllergens,
    mayContainAllergens: input.mayContainAllergens,
    confidence: input.confidence,
  }),
};
