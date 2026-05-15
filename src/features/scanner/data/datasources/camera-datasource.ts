// CameraDataSource - the only place the camera SDK is touched.
// Behind this is expo-camera today, react-native-vision-camera + frame processors later.
// Slice 3 uses single-frame capture; slice 4+ adds burst for multi-frame composition.

import { Camera, CameraView } from 'expo-camera';

export type CameraPermission = 'granted' | 'denied' | 'undetermined';

export class CameraDataSource {
  async requestPermission(): Promise<CameraPermission> {
    const result = await Camera.requestCameraPermissionsAsync();
    if (result.status === 'granted') return 'granted';
    if (result.status === 'denied') return 'denied';
    return 'undetermined';
  }

  async getPermission(): Promise<CameraPermission> {
    const result = await Camera.getCameraPermissionsAsync();
    if (result.status === 'granted') return 'granted';
    if (result.status === 'denied') return 'denied';
    return 'undetermined';
  }
}

// Re-export the view so the screen uses it directly without breaching SOLID.
// (Camera ViewModel + screen consume CameraView for actual rendering; data source
//  owns permission state.)
export { CameraView };
