// Skeleton row - shimmer placeholder for history list while loading.
// Per Amir's design book: skeleton loaders match the final layout shape,
// shimmer animates left-to-right at 1.2s cycle, no ActivityIndicator spinners.

import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { tokens } from '../../../../core/theme/tokens';

export function SkeletonRow() {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
      -1,
      false,
    );
  }, [shimmer]);

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: 0.4 + shimmer.value * 0.4,
  }));

  return (
    <View style={styles.row}>
      <Animated.View style={[styles.dot, shimmerStyle]} />
      <View style={styles.text}>
        <Animated.View style={[styles.barShort, shimmerStyle]} />
        <Animated.View style={[styles.barLong, shimmerStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space[3],
    paddingHorizontal: tokens.space[4],
    paddingVertical: tokens.space[3],
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.color.surface,
    marginBottom: tokens.space[2],
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: tokens.color.brand[100],
  },
  text: {
    flex: 1,
    gap: tokens.space[1],
  },
  barShort: {
    width: '40%',
    height: 12,
    borderRadius: 4,
    backgroundColor: tokens.color.brand[100],
  },
  barLong: {
    width: '80%',
    height: 10,
    borderRadius: 4,
    backgroundColor: tokens.color.brand[100],
    opacity: 0.6,
  },
});
