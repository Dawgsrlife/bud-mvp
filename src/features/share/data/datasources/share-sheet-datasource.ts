// ShareSheetDataSource - hands a local file URI to the native share sheet.
// On web, falls back to navigator.share or a download anchor.

import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

export class ShareSheetDataSource {
  async isAvailable(): Promise<boolean> {
    if (Platform.OS === 'web') {
      return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
    }
    return Sharing.isAvailableAsync();
  }

  async share(uri: string, dialogTitle: string): Promise<void> {
    if (Platform.OS === 'web') {
      // Web fallback. Best-effort; most desktop browsers can't share files.
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        await navigator.share({ title: dialogTitle, url: uri });
        return;
      }
      const a = document.createElement('a');
      a.href = uri;
      a.download = dialogTitle;
      a.click();
      return;
    }
    await Sharing.shareAsync(uri, {
      dialogTitle,
      mimeType: 'image/png',
      UTI: 'public.png',
    });
  }
}
