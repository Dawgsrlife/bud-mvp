// SnapshotDataSource - thin wrapper over react-native-view-shot.
// Captures a React Native view subtree to a PNG file URI.
//
// react-native-view-shot's captureRef accepts either a numeric node tag or a
// component ref. We pass through whatever the caller has; the domain side
// treats it as opaque.

import { captureRef } from 'react-native-view-shot';

export class SnapshotDataSource {
  async captureToPng(target: unknown, fileName: string): Promise<string> {
    // captureRef's TS type wants `Component | number | RefObject<T>` here.
    // The domain boundary deliberately strips type info because alternative
    // implementations (Skia surface, html2canvas on web) would take different shapes.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return captureRef(target as any, {
      format: 'png',
      quality: 1,
      result: 'tmpfile',
      fileName,
    });
  }
}
