// RealtimeDataSource - Supabase Realtime channel over postgres_changes.
// Filters server-side to UPDATEs on products rows whose id is in our watch set.

import { getSupabase } from '../../../../core/network/supabase-client';
import type {
  ConsensusEvent,
  ProductStatus,
} from '../../domain/entities/consensus-event';

interface RawProductRow {
  id: string;
  display_name: string | null;
  status: string;
  scan_count: number;
  ocr_confidence_avg: number;
}

export class RealtimeDataSource {
  subscribe(
    productIds: ReadonlyArray<string>,
    onEvent: (e: ConsensusEvent) => void,
  ): { unsubscribe: () => void } {
    if (productIds.length === 0) {
      // Nothing to watch yet. Hand back a noop subscription so the caller
      // contract stays uniform (the empty case is common during onboarding).
      return { unsubscribe: () => undefined };
    }

    const client = getSupabase();
    const channel = client
      .channel(`products-watch-${productIds.slice(0, 3).join('-')}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
          filter: `id=in.(${productIds.join(',')})`,
        },
        (payload) => {
          const row = payload.new as RawProductRow;
          if (!row?.id) return;
          onEvent({
            productId: row.id,
            displayName: row.display_name,
            status: this.parseStatus(row.status),
            scanCount: row.scan_count,
            ocrConfidenceAvg: row.ocr_confidence_avg,
            receivedAt: new Date(),
          });
        },
      )
      .subscribe();

    return {
      unsubscribe: () => {
        void client.removeChannel(channel);
      },
    };
  }

  private parseStatus(raw: string): ProductStatus {
    if (raw === 'verified' || raw === 'quarantined' || raw === 'disputed') return raw;
    return 'pending';
  }
}
