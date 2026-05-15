// ScannerViewModel - holds camera permission, capture state, and the scan-to-verdict transition.
// Slice 4 wires in the ScanProductUseCase so capture produces a Verdict.

import { useCallback, useEffect, useRef, useState } from 'react';
import { container } from '../../../../core/di/container';
import { CameraDataSource } from '../../data/datasources/camera-datasource';
import type { CameraPermission } from '../../data/datasources/camera-datasource';
import { AllergenProfile } from '../../domain/entities/allergen-profile';
import type { Verdict } from '../../domain/entities/verdict';
import { isOk } from '../../../../core/errors/result';

export type ScannerState =
  | { kind: 'permission-prompt' }
  | { kind: 'permission-loading' }
  | { kind: 'permission-denied' }
  | { kind: 'idle' }
  | { kind: 'capturing' }
  | { kind: 'reading' }
  | { kind: 'verdict'; verdict: Verdict }
  | { kind: 'error'; message: string };

interface UseScannerViewModel {
  state: ScannerState;
  cameraRef: React.RefObject<unknown>;
  requestPermission: () => Promise<void>;
  capture: () => Promise<void>;
  resetToIdle: () => void;
}

const cameraDataSource = new CameraDataSource();

interface ViewModelInput {
  profile: AllergenProfile;
}

export function useScannerViewModel({ profile }: ViewModelInput): UseScannerViewModel {
  // Initial state shows a "Tap to grant" prompt. Browsers require a user gesture
  // before the permission dialog will open; auto-requesting on mount silently fails.
  const [state, setState] = useState<ScannerState>({ kind: 'permission-prompt' });
  const cameraRef = useRef<unknown>(null);

  useEffect(() => {
    void (async () => {
      // Check existing permission without prompting. If already granted, go straight to idle.
      const permission = await cameraDataSource.getPermission();
      if (permission === 'granted') {
        setState({ kind: 'idle' });
      } else if (permission === 'denied') {
        setState({ kind: 'permission-denied' });
      }
      // Otherwise stay on permission-prompt so user taps the CTA.
    })();
  }, []);

  const applyPermission = (permission: CameraPermission) => {
    if (permission === 'granted') setState({ kind: 'idle' });
    else if (permission === 'denied') setState({ kind: 'permission-denied' });
    else setState({ kind: 'permission-prompt' });
  };

  const requestPermission = useCallback(async () => {
    setState({ kind: 'permission-loading' });
    const permission = await cameraDataSource.requestPermission();
    applyPermission(permission);
  }, []);

  const capture = useCallback(async () => {
    // On web there's no real camera; we still walk through capturing -> reading -> verdict for design preview.
    setState({ kind: 'capturing' });

    // Optionally call the real takePictureAsync if available, then read bytes later.
    // For now we don't need actual bytes since OCR is mocked.
    try {
      const ref = cameraRef.current as
        | { takePictureAsync?: (opts?: { quality?: number }) => Promise<{ uri: string }> }
        | null;
      if (ref?.takePictureAsync) {
        await ref.takePictureAsync({ quality: 0.8 });
      }
    } catch {
      // Ignore - mocked path doesn't care
    }

    setState({ kind: 'reading' });
    const scan = container.scanProductUseCase();
    const result = await scan.execute([], profile);

    if (isOk(result)) {
      setState({ kind: 'verdict', verdict: result.value });
    } else {
      setState({ kind: 'error', message: result.failure.message });
    }
  }, [profile]);

  const resetToIdle = useCallback(() => {
    setState({ kind: 'idle' });
  }, []);

  return { state, cameraRef, requestPermission, capture, resetToIdle };
}
