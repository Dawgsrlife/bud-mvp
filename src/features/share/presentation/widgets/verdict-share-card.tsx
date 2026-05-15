// VerdictShareCard - the visual that gets snapshotted to PNG.
// Standalone (no parent layout dependencies), so the captured PNG looks identical
// regardless of where it's mounted.
//
// Brand: oat background, deep-sage accent, restrained card. "Scanned with Bud" footer
// creates the k-factor loop without screaming.

import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { tokens } from '../../../../core/theme/tokens';
import { BuddyMascot } from '../../../../shared/widgets/buddy-mascot';
import type { ShareableVerdict } from '../../domain/entities/shareable-verdict';
import type { VerdictKind } from '../../../scanner/domain/entities/verdict';

const COPY: Record<
  VerdictKind,
  { tone: string; mood: 'happy' | 'warning' | 'thinking'; accent: string }
> = {
  compatible: { tone: 'Compatible', mood: 'happy', accent: tokens.color.status.ok },
  avoid: { tone: 'Avoid', mood: 'warning', accent: tokens.color.status.danger },
  caution: { tone: 'Uncertain', mood: 'thinking', accent: tokens.color.status.warn },
  unknown: { tone: 'Unknown', mood: 'thinking', accent: tokens.color.inkMuted },
};

interface Props {
  verdict: ShareableVerdict;
}

export const VerdictShareCard = forwardRef<View, Props>(function VerdictShareCard(
  { verdict },
  ref,
) {
  const copy = COPY[verdict.kind];
  const showTriggered = verdict.triggeredAllergens.length > 0;
  const showMay = verdict.mayContainAllergens.length > 0;

  return (
    <View ref={ref} collapsable={false} style={styles.card}>
      <View style={styles.brandRow}>
        <Text style={styles.brand}>bud</Text>
        <Text style={styles.brandTagline}>a second opinion at the shelf</Text>
      </View>

      <View style={styles.hero}>
        <BuddyMascot size={84} mood={copy.mood} />
        <View
          style={[
            styles.tonePill,
            { backgroundColor: copy.accent + '1A', borderColor: copy.accent + '40' },
          ]}
        >
          <View style={[styles.toneDot, { backgroundColor: copy.accent }]} />
          <Text style={[styles.toneLabel, { color: copy.accent }]}>
            {copy.tone.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.headline}>{verdict.headline}</Text>
        {verdict.productName && <Text style={styles.product}>{verdict.productName}</Text>}
      </View>

      {(showTriggered || showMay) && (
        <View style={styles.details}>
          {showTriggered && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Detected</Text>
              <View style={styles.tagWrap}>
                {verdict.triggeredAllergens.map((a) => (
                  <View
                    key={a}
                    style={[styles.tag, { borderColor: tokens.color.status.danger }]}
                  >
                    <Text style={[styles.tagText, { color: tokens.color.status.danger }]}>
                      {a}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {showMay && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>May contain</Text>
              <View style={styles.tagWrap}>
                {verdict.mayContainAllergens.map((a) => (
                  <View
                    key={a}
                    style={[styles.tag, { borderColor: tokens.color.status.warn }]}
                  >
                    <Text style={[styles.tagText, { color: tokens.color.status.warn }]}>
                      {a}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>Scanned with Bud</Text>
        <Text style={styles.footerUrl}>bud.quest</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: 360,
    backgroundColor: tokens.color.bg,
    borderRadius: tokens.radius.lg,
    padding: tokens.space[5],
    gap: tokens.space[4],
    borderWidth: 1,
    borderColor: tokens.color.line,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 24,
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.brand[500],
    letterSpacing: -0.5,
    fontFamily: tokens.type.family,
  },
  brandTagline: {
    fontSize: tokens.type.sizes.xs,
    color: tokens.color.inkMuted,
    fontFamily: tokens.type.family,
  },
  hero: {
    alignItems: 'center',
    gap: tokens.space[3],
  },
  tonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space[2],
    paddingHorizontal: tokens.space[3],
    paddingVertical: tokens.space[1],
    borderRadius: tokens.radius.full,
    borderWidth: 1,
  },
  toneDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  toneLabel: {
    fontSize: tokens.type.sizes.xs,
    fontWeight: tokens.type.weights.bold,
    letterSpacing: 1.2,
    fontFamily: tokens.type.family,
  },
  headline: {
    fontSize: tokens.type.sizes.xl,
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.ink,
    textAlign: 'center',
    fontFamily: tokens.type.family,
  },
  product: {
    fontSize: tokens.type.sizes.base,
    color: tokens.color.inkSoft,
    textAlign: 'center',
    fontFamily: tokens.type.family,
  },
  details: {
    gap: tokens.space[3],
    paddingTop: tokens.space[2],
    borderTopWidth: 1,
    borderTopColor: tokens.color.line,
  },
  detailRow: {
    gap: tokens.space[2],
  },
  detailLabel: {
    fontSize: tokens.type.sizes.xs,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.inkMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontFamily: tokens.type.family,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.space[2],
  },
  tag: {
    paddingHorizontal: tokens.space[3],
    paddingVertical: tokens.space[1],
    borderRadius: tokens.radius.full,
    borderWidth: 1,
  },
  tagText: {
    fontSize: tokens.type.sizes.sm,
    fontWeight: tokens.type.weights.medium,
    fontFamily: tokens.type.family,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: tokens.space[3],
    borderTopWidth: 1,
    borderTopColor: tokens.color.line,
  },
  footerLabel: {
    fontSize: tokens.type.sizes.xs,
    color: tokens.color.inkMuted,
    fontFamily: tokens.type.family,
  },
  footerUrl: {
    fontSize: tokens.type.sizes.xs,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.brand[500],
    fontFamily: tokens.type.family,
  },
});
