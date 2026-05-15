// useHaptic - native haptic on touchable interactions.
// Web + iOS Simulator are no-ops (expo-haptics handles this).

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

type HapticStyle = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

export function useHaptic() {
  return (style: HapticStyle = 'light') => {
    if (Platform.OS === 'web') return;
    try {
      if (style === 'selection') {
        void Haptics.selectionAsync();
      } else if (style === 'success' || style === 'warning' || style === 'error') {
        const map = {
          success: Haptics.NotificationFeedbackType.Success,
          warning: Haptics.NotificationFeedbackType.Warning,
          error: Haptics.NotificationFeedbackType.Error,
        } as const;
        void Haptics.notificationAsync(map[style]);
      } else {
        const map = {
          light: Haptics.ImpactFeedbackStyle.Light,
          medium: Haptics.ImpactFeedbackStyle.Medium,
          heavy: Haptics.ImpactFeedbackStyle.Heavy,
        } as const;
        void Haptics.impactAsync(map[style]);
      }
    } catch {
      // Silent fail - haptics are nice-to-have, never block UX
    }
  };
}
