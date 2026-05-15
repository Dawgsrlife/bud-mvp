// ShareableVerdict - the snapshot of state a share card renders from.
// Pure data, zero framework. Decouples the card visual from the live Verdict + product entities.

import type { VerdictKind } from '../../../scanner/domain/entities/verdict';

export interface ShareableVerdict {
  readonly kind: VerdictKind;
  readonly headline: string;
  readonly productName: string | null;
  readonly triggeredAllergens: ReadonlyArray<string>;
  readonly mayContainAllergens: ReadonlyArray<string>;
  readonly capturedAt: Date;
}

export interface ShareResult {
  readonly kind: 'shared' | 'cancelled' | 'unavailable';
}
