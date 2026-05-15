// ConsensusEvent - a real-time update from the crowd consensus engine.
// Pure data; no Supabase types leak past this boundary.

export type ProductStatus = 'pending' | 'verified' | 'quarantined' | 'disputed';

export interface ConsensusEvent {
  readonly productId: string;
  readonly displayName: string | null;
  readonly status: ProductStatus;
  readonly scanCount: number;
  readonly ocrConfidenceAvg: number;
  readonly receivedAt: Date;
}
