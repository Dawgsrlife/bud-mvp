// ViewfinderOverlay - 4 minimal corner brackets + optional hint text.
// Slice 3 keeps it static. Slice 4 will animate the brackets as OCR locks on.

import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { tokens } from '../../../../core/theme/tokens';

interface ViewfinderOverlayProps {
  hint?: string;
  showHint?: boolean;
}

export function ViewfinderOverlay({ hint, showHint = true }: ViewfinderOverlayProps) {
  return (
    <View style={styles.wrap} pointerEvents="none">
      <View style={styles.cornerTL} />
      <View style={styles.cornerTR} />
      <View style={styles.cornerBL} />
      <View style={styles.cornerBR} />
      {showHint && hint && (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(150)}
          style={styles.hintWrap}
        >
          <Text style={styles.hintText}>{hint}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const CORNER = 28;
const STROKE = 3;
const BOX_INSET = 36;
const VERT_INSET = 140;

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerTL: {
    position: 'absolute',
    top: VERT_INSET,
    left: BOX_INSET,
    width: CORNER,
    height: CORNER,
    borderTopWidth: STROKE,
    borderLeftWidth: STROKE,
    borderColor: tokens.color.surface,
    borderTopLeftRadius: 12,
  },
  cornerTR: {
    position: 'absolute',
    top: VERT_INSET,
    right: BOX_INSET,
    width: CORNER,
    height: CORNER,
    borderTopWidth: STROKE,
    borderRightWidth: STROKE,
    borderColor: tokens.color.surface,
    borderTopRightRadius: 12,
  },
  cornerBL: {
    position: 'absolute',
    bottom: VERT_INSET,
    left: BOX_INSET,
    width: CORNER,
    height: CORNER,
    borderBottomWidth: STROKE,
    borderLeftWidth: STROKE,
    borderColor: tokens.color.surface,
    borderBottomLeftRadius: 12,
  },
  cornerBR: {
    position: 'absolute',
    bottom: VERT_INSET,
    right: BOX_INSET,
    width: CORNER,
    height: CORNER,
    borderBottomWidth: STROKE,
    borderRightWidth: STROKE,
    borderColor: tokens.color.surface,
    borderBottomRightRadius: 12,
  },
  hintWrap: {
    position: 'absolute',
    top: VERT_INSET - 36,
    paddingHorizontal: tokens.space[3],
    paddingVertical: tokens.space[2],
    borderRadius: tokens.radius.full,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  hintText: {
    color: tokens.color.surface,
    fontSize: tokens.type.sizes.sm,
    fontWeight: tokens.type.weights.medium,
    fontFamily: tokens.type.family,
  },
});
