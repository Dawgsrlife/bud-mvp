// ScannerViewModel - holds camera permission state + capture state.
// Slice 3 scope: permission, viewfinder open, capture-button press feedback, captured/retake states.
// Slice 4 will add OCR + verdict; slice 5 wires Claude.

import { useCallback, useEffect, useRef, useState } from 'react';
import { CameraDataSource } from '../../data/datasources/camera-datasource';
import type { CameraPermission } from '../../data/datasources/camera-datasource';

export type ScannerState =
  | { kind: 'permission-loading' }
  | { kind: 'permission-denied' }
  | { kind: 'idle' }
  | { kind: 'capturing' }
  | { kind: 'captured'; uri: string };

interface UseScannerViewModel {
  state: ScannerState;
  cameraRef: React.RefObject<unknown>;
  requestPermission: () => Promise<void>;
  capture: () => Promise<void>;
  retake: () => void;
}

const cameraDataSource = new CameraDataSource();

export function useScannerViewModel(): UseScannerViewModel {
  const [state, setState] = useState<ScannerState>({ kind: 'permission-loading' });
  const cameraRef = useRef<unknown>(null);

  useEffect(() => {
    void (async () => {
      const permission = await cameraDataSource.getPermission();
      applyPermission(permission);
    })();
  }, []);

  const applyPermission = (permission: CameraPermission) => {
    if (permission === 'granted') setState({ kind: 'idle' });
    else if (permission === 'denied') setState({ kind: 'permission-denied' });
    else setState({ kind: 'permission-loading' });
  };

  const requestPermission = useCallback(async () => {
    setState({ kind: 'permission-loading' });
    const permission = await cameraDataSource.requestPermission();
    applyPermission(permission);
  }, []);

  const capture = useCallback(async () => {
    const ref = cameraRef.current as
      | { takePictureAsync?: (opts?: { quality?: number }) => Promise<{ uri: string }> }
      | null;
    if (!ref?.takePictureAsync) return;
    setState({ kind: 'capturing' });
    try {
      const photo = await ref.takePictureAsync({ quality: 0.8 });
      setState({ kind: 'captured', uri: photo.uri });
    } catch {
      setState({ kind: 'idle' });
    }
  }, []);

  const retake = useCallback(() => {
    setState({ kind: 'idle' });
  }, []);

  return { state, cameraRef, requestPermission, capture, retake };
}
