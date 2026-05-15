// useShareViewModel - thin hook over the share usecase.
// Returns a fire-and-forget `share(verdict, target)` plus a status string for haptic + toast wiring.

import { useCallback, useState } from 'react';
import { container } from '../../../../core/di/container';
import { isOk } from '../../../../core/errors/result';
import type { ShareableVerdict } from '../../domain/entities/shareable-verdict';

type ShareStatus = 'idle' | 'sharing' | 'shared' | 'error';

interface UseShareViewModel {
  status: ShareStatus;
  share: (verdict: ShareableVerdict, captureTarget: unknown) => Promise<void>;
}

export function useShareViewModel(): UseShareViewModel {
  const [status, setStatus] = useState<ShareStatus>('idle');

  const share = useCallback(
    async (verdict: ShareableVerdict, captureTarget: unknown) => {
      setStatus('sharing');
      const usecase = container.shareVerdictCardUseCase();
      const result = await usecase.execute(verdict, captureTarget);
      if (isOk(result)) {
        setStatus(result.value.kind === 'shared' ? 'shared' : 'idle');
      } else {
        setStatus('error');
      }
      setTimeout(() => setStatus('idle'), 1500);
    },
    [],
  );

  return { status, share };
}
