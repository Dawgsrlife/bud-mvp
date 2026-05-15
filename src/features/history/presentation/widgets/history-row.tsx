// HistoryRow - a single past scan in the history list.
// Status colors per Amir's canonical brand: status.ok / status.warn / status.danger.
// Verdict word always one of "Compatible / Avoid / Uncertain" — NEVER "Safe".

import { StyleSheet, Text, View } from 'react-native';
import { tokens } from '../../../../core/theme/tokens';
import type { ScanRecord } from '../../domain/entities/scan-record';
import type { VerdictKind } from '../../../scanner/domain/entities/verdict';

interface HistoryRowProps {
  record: ScanRecord;
}

const TONE_BY_KIND: Record<
  VerdictKind,
  { label: string; accent: string; bgTint: string }
> = {
  compatible: {
    label: 'COMPATIBLE',
    accent: tokens.color.status.ok,
    bgTint: 'rgba(29, 68, 51, 0.08)',
  },
  caution: {
    label: 'UNCERTAIN',
    accent: tokens.color.status.warn,
    bgTint: 'rgba(198, 90, 61, 0.08)',
  },
  avoid: {
    label: 'AVOID',
    accent: tokens.color.status.danger,
    bgTint: 'rgba(26, 26, 26, 0.06)',
  },
  unknown: {
    label: 'UNCERTAIN',
    accent: tokens.color.inkMuted,
    bgTint: 'rgba(65, 72, 68, 0.06)',
  },
};

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMin = Math.round((now - then) / 60_000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function HistoryRow({ record }: HistoryRowProps) {
  const tone = TONE_BY_KIND[record.verdictKind];

  return (
    <View style={styles.row}>
      <View style={[styles.tonePill, { backgroundColor: tone.bgTint, borderColor: tone.accent + '40' }]}>
        <View style={[styles.dot, { backgroundColor: tone.accent }]} />
        <Text style={[styles.tonePillText, { color: tone.accent }]}>{tone.label}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.product} numberOfLines={1}>
          {record.productDisplayName ?? 'Unnamed product'}
        </Text>
        <Text style={styles.reason} numberOfLines={1}>
          {record.verdictReason}
        </Text>
      </View>

      <Text style={styles.timestamp}>{formatRelative(record.scannedAt)}</Text>
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
  tonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space[1],
    paddingHorizontal: tokens.space[2],
    paddingVertical: 4,
    borderRadius: tokens.radius.full,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tonePillText: {
    fontSize: tokens.type.sizes.xs,
    fontWeight: tokens.type.weights.bold,
    letterSpacing: 0.8,
    fontFamily: tokens.type.family,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  product: {
    fontSize: tokens.type.sizes.base,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.ink,
    fontFamily: tokens.type.family,
  },
  reason: {
    fontSize: tokens.type.sizes.sm,
    color: tokens.color.inkSoft,
    fontFamily: tokens.type.family,
  },
  timestamp: {
    fontSize: tokens.type.sizes.xs,
    color: tokens.color.inkMuted,
    fontFamily: tokens.type.family,
  },
});
