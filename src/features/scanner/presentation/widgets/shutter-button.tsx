// ShutterButton - ring-style capture trigger. Spring press feedback + haptic.

import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { tokens } from '../../../../core/theme/tokens';
import { useHaptic } from '../../../../shared/widgets/use-haptic';

interface ShutterButtonProps {
  onPress: () => void;
  busy?: boolean;
  disabled?: boolean;
}

export function ShutterButton({ onPress, busy = false, disabled = false }: ShutterButtonProps) {
  const inner = useSharedValue(1);
  const ring = useSharedValue(1);
  const haptic = useHaptic();

  const innerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: inner.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ring.value }],
  }));

  const handlePressIn = () => {
    inner.value = withSpring(0.82, tokens.motion.spring.bouncy);
    ring.value = withSpring(1.04, tokens.motion.spring.gentle);
  };

  const handlePressOut = () => {
    inner.value = withSpring(1, tokens.motion.spring.default);
    ring.value = withSpring(1, tokens.motion.spring.default);
  };

  const handlePress = () => {
    if (disabled || busy) return;
    haptic('medium');
    inner.value = withSequence(
      withTiming(0.7, { duration: 80 }),
      withSpring(1, tokens.motion.spring.bouncy),
    );
    onPress();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled || busy}
      accessibilityRole="button"
      accessibilityLabel="Capture"
    >
      <View style={styles.wrap}>
        <Animated.View style={[styles.ring, ringStyle, disabled && styles.dim]} />
        <Animated.View style={[styles.inner, innerStyle, disabled && styles.dim]} />
      </View>
    </Pressable>
  );
}

const SIZE = 76;
const INNER = 64;

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 3,
    borderColor: tokens.color.surface,
  },
  inner: {
    width: INNER,
    height: INNER,
    borderRadius: INNER / 2,
    backgroundColor: tokens.color.surface,
  },
  dim: {
    opacity: 0.4,
  },
});
