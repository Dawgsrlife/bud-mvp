// VerdictScreen - the moment of truth.
// Brand discipline: restrained card + tinted accent. No status-color flood (Yuka territory).
// Three variants share one layout; only the headline word + accent color change.
//
// Slice 7 adds a "Share" CTA that snapshots an offscreen-rendered VerdictShareCard
// to PNG and hands it to the OS share sheet. Card rendered offscreen so the on-screen
// layout stays untouched while the export looks pristine.

import { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp, SlideInDown } from 'react-native-reanimated';
import { tokens } from '../../../../core/theme/tokens';
import { BuddyMascot } from '../../../../shared/widgets/buddy-mascot';
import { Button } from '../../../../shared/widgets/button';
import { VerdictShareCard } from '../../../share/presentation/widgets/verdict-share-card';
import { useShareViewModel } from '../../../share/presentation/viewmodels/use-share-viewmodel';
import type { ShareableVerdict } from '../../../share/domain/entities/shareable-verdict';
import { ReportSheet } from '../../../reports/presentation/widgets/report-sheet';
import type { Verdict, VerdictKind } from '../../domain/entities/verdict';

interface VerdictScreenProps {
  verdict: Verdict;
  productName?: string | null;
  productId?: string | null;
  onScanAgain: () => void;
}

const COPY_BY_KIND: Record<
  VerdictKind,
  { headline: string; mood: 'happy' | 'warning' | 'thinking'; accent: string; tone: string }
> = {
  compatible: {
    headline: 'No declared allergens on your profile.',
    mood: 'happy',
    accent: tokens.color.status.ok,
    tone: 'Compatible',
  },
  avoid: {
    headline: 'Skip this.',
    mood: 'warning',
    accent: tokens.color.status.danger,
    tone: 'Avoid',
  },
  caution: {
    headline: 'Your call.',
    mood: 'thinking',
    accent: tokens.color.status.warn,
    tone: 'Uncertain',
  },
  unknown: {
    headline: "Couldn't tell.",
    mood: 'thinking',
    accent: tokens.color.inkMuted,
    tone: 'Unknown',
  },
};

export function VerdictScreen({
  verdict,
  productName = null,
  productId = null,
  onScanAgain,
}: VerdictScreenProps) {
  const copy = COPY_BY_KIND[verdict.kind];
  const showTriggered = verdict.triggeredAllergens.length > 0;
  const showMayContain = verdict.mayContainAllergens.length > 0;

  const shareCardRef = useRef<View>(null);
  const { status: shareStatus, share } = useShareViewModel();
  const [reportOpen, setReportOpen] = useState(false);

  const handleShare = async () => {
    const node = shareCardRef.current;
    if (!node) return;
    const shareable: ShareableVerdict = {
      kind: verdict.kind,
      headline: copy.headline,
      productName,
      triggeredAllergens: verdict.triggeredAllergens,
      mayContainAllergens: verdict.mayContainAllergens,
      capturedAt: new Date(),
    };
    await share(shareable, node);
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(280)} style={styles.hero}>
        <BuddyMascot size={120} mood={copy.mood} />
        <Animated.View entering={FadeInUp.duration(320).delay(80)} style={styles.headerText}>
          <View style={[styles.tonePill, { backgroundColor: copy.accent + '1A', borderColor: copy.accent + '40' }]}>
            <View style={[styles.toneDot, { backgroundColor: copy.accent }]} />
            <Text style={[styles.toneLabel, { color: copy.accent }]}>{copy.tone.toUpperCase()}</Text>
          </View>
          <Text style={styles.headline}>{copy.headline}</Text>
          <Text style={styles.reason}>{verdict.reason}</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View entering={SlideInDown.duration(300).delay(160)} style={styles.detailCard}>
        {showTriggered && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Detected</Text>
            <View style={styles.tagWrap}>
              {verdict.triggeredAllergens.map((a) => (
                <View key={a} style={[styles.tag, { borderColor: tokens.color.status.danger }]}>
                  <Text style={[styles.tagText, { color: tokens.color.status.danger }]}>{a}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        {showMayContain && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>May contain</Text>
            <View style={styles.tagWrap}>
              {verdict.mayContainAllergens.map((a) => (
                <View key={a} style={[styles.tag, { borderColor: tokens.color.status.warn }]}>
                  <Text style={[styles.tagText, { color: tokens.color.status.warn }]}>{a}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Confidence</Text>
          <Text style={styles.detailValue}>{Math.round(verdict.confidence * 100)}%</Text>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Button
          label={
            shareStatus === 'sharing'
              ? 'Preparing card...'
              : shareStatus === 'shared'
                ? 'Shared'
                : 'Share verdict'
          }
          onPress={handleShare}
          variant="secondary"
          fullWidth
          size="md"
          disabled={shareStatus === 'sharing'}
        />
        <Button label="Scan another" onPress={onScanAgain} fullWidth size="lg" />
        {productId && (
          <Button
            label="Report this verdict"
            onPress={() => setReportOpen(true)}
            variant="ghost"
            fullWidth
            size="sm"
          />
        )}
      </View>

      <ReportSheet
        visible={reportOpen}
        productId={productId}
        onClose={() => setReportOpen(false)}
      />

      {/* Offscreen capture target. Pointer-events: none + opacity: 0 keeps it
          invisible while still being rendered (view-shot needs a real layout). */}
      <View style={styles.offscreen} pointerEvents="none">
        <VerdictShareCard
          ref={shareCardRef}
          verdict={{
            kind: verdict.kind,
            headline: copy.headline,
            productName,
            triggeredAllergens: verdict.triggeredAllergens,
            mayContainAllergens: verdict.mayContainAllergens,
            capturedAt: new Date(),
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
    paddingHorizontal: tokens.space[5],
    paddingTop: tokens.space[5],
    paddingBottom: tokens.space[5],
  },
  hero: {
    alignItems: 'center',
    gap: tokens.space[4],
    paddingTop: tokens.space[3],
  },
  headerText: {
    alignItems: 'center',
    gap: tokens.space[2],
    maxWidth: 320,
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
    fontSize: tokens.type.sizes['2xl'],
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.ink,
    lineHeight: tokens.type.sizes['2xl'] * tokens.type.lineHeight.tight,
    letterSpacing: tokens.type.letterSpacing.tight,
    textAlign: 'center',
    fontFamily: tokens.type.family,
  },
  reason: {
    fontSize: tokens.type.sizes.lg,
    color: tokens.color.inkSoft,
    textAlign: 'center',
    lineHeight: tokens.type.sizes.lg * tokens.type.lineHeight.normal,
    fontFamily: tokens.type.family,
  },
  detailCard: {
    marginTop: tokens.space[5],
    padding: tokens.space[4],
    borderRadius: tokens.radius.lg,
    backgroundColor: tokens.color.surface,
    borderWidth: 1,
    borderColor: tokens.color.line,
    gap: tokens.space[3],
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
  detailValue: {
    fontSize: tokens.type.sizes.base,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.ink,
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
    marginTop: 'auto',
    gap: tokens.space[2],
  },
  offscreen: {
    position: 'absolute',
    left: -9999,
    top: 0,
    opacity: 0,
  },
});
