// ConsensusRepository - contract for streaming product status changes.
// The presentation layer never knows about Supabase Realtime channels directly.

import type { ConsensusEvent } from '../entities/consensus-event';

export type ConsensusSubscription = { unsubscribe: () => void };

export interface ConsensusRepository {
  subscribeToProducts(
    productIds: ReadonlyArray<string>,
    onEvent: (e: ConsensusEvent) => void,
  ): ConsensusSubscription;
}
