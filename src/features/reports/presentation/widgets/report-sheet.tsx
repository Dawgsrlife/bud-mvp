// ReportSheet - lightweight bottom sheet for submitting a report.
// Uses a translucent backdrop + slide-up card. No external sheet library needed.
//
// Tap a reason → submit → confirmation pill → auto-close.

import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { container } from '../../../../core/di/container';
import { isOk } from '../../../../core/errors/result';
import { tokens } from '../../../../core/theme/tokens';
import { Button } from '../../../../shared/widgets/button';
import {
  REPORT_REASON_LABELS,
  type ReportReason,
} from '../../domain/entities/report';

interface Props {
  visible: boolean;
  productId: string | null;
  onClose: () => void;
}

type Status = 'idle' | 'submitting' | 'submitted' | 'error';

const REASONS: ReportReason[] = [
  'wrong-ingredients',
  'wrong-verdict',
  'outdated',
  'spam-or-irrelevant',
];

export function ReportSheet({ visible, productId, onClose }: Props) {
  const [selected, setSelected] = useState<ReportReason | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async () => {
    if (!selected || !productId) return;
    setStatus('submitting');
    const usecase = container.submitReportUseCase();
    const result = await usecase.execute({ productId, reason: selected });
    if (isOk(result)) {
      setStatus('submitted');
      setTimeout(() => {
        setStatus('idle');
        setSelected(null);
        onClose();
      }, 1200);
    } else {
      setStatus('error');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View entering={FadeIn.duration(180)} style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View entering={SlideInDown.duration(280)} style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Report this verdict</Text>
          <Text style={styles.subtitle}>
            Your report helps Bud catch wrong data faster. Anonymous.
          </Text>

          <View style={styles.reasons}>
            {REASONS.map((r) => {
              const active = selected === r;
              return (
                <Pressable
                  key={r}
                  onPress={() => setSelected(r)}
                  style={[styles.reason, active && styles.reasonActive]}
                >
                  <View
                    style={[
                      styles.radio,
                      active && { borderColor: tokens.color.brand[500] },
                    ]}
                  >
                    {active && <View style={styles.radioDot} />}
                  </View>
                  <Text style={[styles.reasonLabel, active && styles.reasonLabelActive]}>
                    {REPORT_REASON_LABELS[r]}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Button
            label={
              status === 'submitting'
                ? 'Sending...'
                : status === 'submitted'
                  ? 'Thanks for the heads-up'
                  : status === 'error'
                    ? 'Try again'
                    : 'Submit report'
            }
            onPress={handleSubmit}
            disabled={!selected || status === 'submitting' || status === 'submitted'}
            fullWidth
            size="lg"
          />
          <Button label="Cancel" onPress={onClose} variant="ghost" fullWidth size="md" />
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: tokens.color.bg,
    paddingHorizontal: tokens.space[5],
    paddingTop: tokens.space[3],
    paddingBottom: tokens.space[6],
    borderTopLeftRadius: tokens.radius.lg,
    borderTopRightRadius: tokens.radius.lg,
    gap: tokens.space[3],
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: tokens.color.line,
  },
  title: {
    fontSize: tokens.type.sizes.xl,
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.ink,
    fontFamily: tokens.type.family,
  },
  subtitle: {
    fontSize: tokens.type.sizes.sm,
    color: tokens.color.inkSoft,
    fontFamily: tokens.type.family,
  },
  reasons: {
    gap: tokens.space[2],
    marginVertical: tokens.space[2],
  },
  reason: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space[3],
    padding: tokens.space[3],
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: tokens.color.line,
    backgroundColor: tokens.color.surface,
  },
  reasonActive: {
    borderColor: tokens.color.brand[500],
    backgroundColor: tokens.color.brand[100],
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: tokens.color.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: tokens.color.brand[500],
  },
  reasonLabel: {
    fontSize: tokens.type.sizes.base,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.inkSoft,
    fontFamily: tokens.type.family,
  },
  reasonLabelActive: {
    color: tokens.color.ink,
  },
});
