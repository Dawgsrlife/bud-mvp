// useConsensusWatch - subscribes to product status flips, returns the latest
// event per product. Caller decides what to do with it (toast, badge, etc.).
//
// React rule: subscription lives across the component's lifetime; cleanup runs
// on unmount or productIds change. Stable productIds order avoids re-subscribing
// on every render.

import { useEffect, useRef, useState } from 'react';
import { container } from '../../../../core/di/container';
import type { ConsensusEvent } from '../../domain/entities/consensus-event';

type EventMap = Record<string, ConsensusEvent>;

export function useConsensusWatch(productIds: ReadonlyArray<string>): {
  events: EventMap;
  latest: ConsensusEvent | null;
} {
  const [events, setEvents] = useState<EventMap>({});
  const [latest, setLatest] = useState<ConsensusEvent | null>(null);

  // Stable key for the productIds set so React doesn't re-subscribe on every render.
  const watchKey = [...productIds].sort().join('|');
  const watchKeyRef = useRef(watchKey);
  watchKeyRef.current = watchKey;

  useEffect(() => {
    const repo = container.consensusRepository();
    const sub = repo.subscribeToProducts(productIds, (e) => {
      setEvents((prev) => ({ ...prev, [e.productId]: e }));
      setLatest(e);
    });
    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchKey]);

  return { events, latest };
}
