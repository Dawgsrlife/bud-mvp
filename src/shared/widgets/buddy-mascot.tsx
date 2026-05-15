// Buddy mascot v0. Round shape with two eyes. No face yet.
// SVG-in-code so we can Rive-ify later by replacing this single component.
// All visual choices come from design tokens.

import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { tokens } from '../../core/theme/tokens';

type Mood = 'idle' | 'happy' | 'thinking' | 'warning';

interface BuddyMascotProps {
  size?: number;
  mood?: Mood;
}

export function BuddyMascot({ size = 120, mood = 'idle' }: BuddyMascotProps) {
  // Idle bob, then mood-specific accents
  const bob = useSharedValue(0);
  const eyeScale = useSharedValue(1);

  useEffect(() => {
    bob.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      true,
    );
  }, [bob]);

  useEffect(() => {
    if (mood === 'happy') {
      eyeScale.value = withSequence(
        withSpring(0.2, tokens.motion.spring.bouncy),
        withSpring(1, tokens.motion.spring.default),
      );
    } else if (mood === 'warning') {
      eyeScale.value = withSpring(1.3, tokens.motion.spring.gentle);
    } else {
      eyeScale.value = withSpring(1, tokens.motion.spring.default);
    }
  }, [mood, eyeScale]);

  const bodyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bob.value }],
  }));

  const eyeStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: eyeScale.value }],
  }));

  const eyeSize = size * 0.12;
  const eyeSpacing = size * 0.18;
  const eyeY = size * 0.38;

  return (
    <Animated.View style={[styles.container, { width: size, height: size }, bodyStyle]}>
      {/* Body */}
      <View
        style={[
          styles.body,
          {
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor: tokens.color.brand[400],
          },
        ]}
      />
      {/* Shadow under */}
      <View
        style={[
          styles.shadow,
          {
            width: size * 0.6,
            height: size * 0.06,
            borderRadius: size,
            bottom: -size * 0.05,
          },
        ]}
      />
      {/* Left eye */}
      <Animated.View
        style={[
          styles.eye,
          {
            width: eyeSize,
            height: eyeSize,
            borderRadius: eyeSize,
            top: eyeY,
            left: size / 2 - eyeSpacing - eyeSize / 2,
          },
          eyeStyle,
        ]}
      />
      {/* Right eye */}
      <Animated.View
        style={[
          styles.eye,
          {
            width: eyeSize,
            height: eyeSize,
            borderRadius: eyeSize,
            top: eyeY,
            left: size / 2 + eyeSpacing - eyeSize / 2,
          },
          eyeStyle,
        ]}
      />
      {/* Small antenna */}
      <View
        style={[
          styles.antenna,
          {
            width: size * 0.04,
            height: size * 0.12,
            top: -size * 0.06,
            left: size / 2 - size * 0.02,
            backgroundColor: tokens.color.brand[600],
          },
        ]}
      />
      <View
        style={[
          styles.antennaTip,
          {
            width: size * 0.08,
            height: size * 0.08,
            borderRadius: size * 0.04,
            top: -size * 0.1,
            left: size / 2 - size * 0.04,
            backgroundColor: tokens.color.brand[500],
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    position: 'absolute',
    shadowColor: tokens.color.ink,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  shadow: {
    position: 'absolute',
    backgroundColor: tokens.color.ink,
    opacity: 0.1,
  },
  eye: {
    position: 'absolute',
    backgroundColor: tokens.color.ink,
  },
  antenna: {
    position: 'absolute',
  },
  antennaTip: {
    position: 'absolute',
    shadowColor: tokens.color.brand[500],
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
});
