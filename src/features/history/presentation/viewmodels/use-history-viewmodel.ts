// HistoryViewModel - loads scan records, refreshes on focus, exposes loading state.

import { useCallback, useEffect, useMemo, useState } from 'react';
import { container } from '../../../../core/di/container';
import { isOk } from '../../../../core/errors/result';
import type { ScanRecord } from '../../domain/entities/scan-record';

interface UseHistoryViewModel {
  records: ScanRecord[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useHistoryViewModel(): UseHistoryViewModel {
  const [records, setRecords] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const useCase = useMemo(() => container.listHistoryUseCase(), []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await useCase.execute();
    if (isOk(result)) {
      setRecords(result.value);
    } else {
      setError(result.failure.message);
    }
    setLoading(false);
  }, [useCase]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { records, loading, error, refresh };
}
