// ConsensusToast - tiny pop-in surface that appears when a product flips to
// 'verified' status while the user is on the verdict screen.
// Brand: oat surface + sage mint border + Plex Mono label. No screen flood.
//
// Demo moment: the user scans something pending, then 30 seconds later sees
// "Verified by 5 others" pop in. That's the Crowd Memory feature.

import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import { tokens } from '../../../../core/theme/tokens';
import type { ConsensusEvent } from '../../domain/entities/consensus-event';

interface Props {
  event: ConsensusEvent | null;
  onDismiss: () => void;
  autoDismissMs?: number;
}

export function ConsensusToast({ event, onDismiss, autoDismissMs = 4500 }: Props) {
  useEffect(() => {
    if (!event) return;
    const t = setTimeout(onDismiss, autoDismissMs);
    return () => clearTimeout(t);
  }, [event, autoDismissMs, onDismiss]);

  if (!event) return null;

  const label = labelFor(event);
  if (!label) return null;

  return (
    <Animated.View
      entering={SlideInDown.duration(300).springify().damping(18)}
      exiting={FadeOut.duration(200)}
      style={styles.wrap}
    >
      <View style={styles.dot} />
      <Text style={styles.label}>{label}</Text>
    </Animated.View>
  );
}

function labelFor(e: ConsensusEvent): string | null {
  if (e.status === 'verified') {
    return `Verified by ${e.scanCount} others`;
  }
  if (e.status === 'quarantined') {
    return 'Disputed by other scanners';
  }
  return null;
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: tokens.space[4],
    right: tokens.space[4],
    bottom: tokens.space[6],
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space[3],
    paddingHorizontal: tokens.space[4],
    paddingVertical: tokens.space[3],
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.color.surface,
    borderWidth: 1,
    borderColor: tokens.color.brand[100],
    shadowColor: tokens.color.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: tokens.color.brand[500],
  },
  label: {
    fontSize: tokens.type.sizes.sm,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.ink,
    fontFamily: tokens.type.family,
  },
});
