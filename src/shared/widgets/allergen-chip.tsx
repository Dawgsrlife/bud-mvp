// Selectable chip. Spring scale + color transition on tap.
// Used for the Big 9 allergen selection during onboarding + later in profile edit.

import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { tokens } from '../../core/theme/tokens';

interface AllergenChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function AllergenChip({ label, selected, onPress }: AllergenChipProps) {
  const scale = useSharedValue(1);
  const selectedAnim = useSharedValue(selected ? 1 : 0);

  if (selected && selectedAnim.value === 0) {
    selectedAnim.value = withTiming(1, { duration: tokens.motion.duration.fast });
  } else if (!selected && selectedAnim.value === 1) {
    selectedAnim.value = withTiming(0, { duration: tokens.motion.duration.fast });
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      selectedAnim.value,
      [0, 1],
      [tokens.color.surface, tokens.color.ink],
    ),
    borderColor: interpolateColor(
      selectedAnim.value,
      [0, 1],
      [tokens.color.line, tokens.color.ink],
    ),
  }));

  const labelAnimated = useAnimatedStyle(() => ({
    color: interpolateColor(
      selectedAnim.value,
      [0, 1],
      [tokens.color.ink, tokens.color.surface],
    ),
  }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.94, tokens.motion.spring.gentle);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, tokens.motion.spring.default);
      }}
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
    >
      <Animated.View style={[styles.chip, animatedStyle]}>
        <Animated.Text style={[styles.label, labelAnimated]}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: tokens.space[4],
    paddingVertical: tokens.space[3],
    borderRadius: tokens.radius.full,
    borderWidth: 1,
  },
  label: {
    fontSize: tokens.type.sizes.base,
    fontWeight: tokens.type.weights.medium,
    fontFamily: tokens.type.family,
  },
});
