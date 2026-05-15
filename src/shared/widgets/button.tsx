// Primary touchable. Spring press feedback + scaled on press.
// Single source for button behavior across the app.

import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { tokens } from '../../core/theme/tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon,
  style,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, tokens.motion.spring.gentle);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, tokens.motion.spring.default);
  };

  const containerStyle = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const labelStyle = [
    styles.labelBase,
    styles[`labelSize_${size}`],
    styles[`labelVariant_${variant}`],
    disabled && styles.labelDisabled,
  ];

  return (
    <Animated.View style={[fullWidth && styles.fullWidth, animatedStyle]}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={containerStyle}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <View style={styles.content}>
          {icon}
          <Text style={labelStyle}>{label}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: tokens.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space[2],
  },
  size_sm: {
    paddingHorizontal: tokens.space[3],
    paddingVertical: tokens.space[2],
    minHeight: 36,
  },
  size_md: {
    paddingHorizontal: tokens.space[4],
    paddingVertical: tokens.space[3],
    minHeight: 48,
  },
  size_lg: {
    paddingHorizontal: tokens.space[5],
    paddingVertical: tokens.space[4],
    minHeight: 56,
  },
  variant_primary: {
    backgroundColor: tokens.color.ink,
  },
  variant_secondary: {
    backgroundColor: tokens.color.surface,
    borderWidth: 1,
    borderColor: tokens.color.line,
  },
  variant_ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.4,
  },
  labelBase: {
    fontWeight: tokens.type.weights.medium,
    fontFamily: tokens.type.family,
  },
  labelSize_sm: {
    fontSize: tokens.type.sizes.sm,
  },
  labelSize_md: {
    fontSize: tokens.type.sizes.base,
  },
  labelSize_lg: {
    fontSize: tokens.type.sizes.lg,
  },
  labelVariant_primary: {
    color: tokens.color.surface,
  },
  labelVariant_secondary: {
    color: tokens.color.ink,
  },
  labelVariant_ghost: {
    color: tokens.color.ink,
  },
  labelDisabled: {
    color: tokens.color.inkMuted,
  },
});
