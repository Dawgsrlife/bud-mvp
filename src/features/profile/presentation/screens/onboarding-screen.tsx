// OnboardingScreen - the orchestrator for the 3-step welcome flow.
// Each step is a sub-component for clean Single Responsibility.

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';
import { tokens } from '../../../../core/theme/tokens';
import { BIG_NINE_ALLERGENS } from '../../domain/entities/big-nine-allergens';
import { AllergenChip } from '../../../../shared/widgets/allergen-chip';
import { BuddyMascot } from '../../../../shared/widgets/buddy-mascot';
import { Button } from '../../../../shared/widgets/button';
import { useOnboardingViewModel } from '../viewmodels/use-onboarding-viewmodel';

interface OnboardingScreenProps {
  onDone: () => void;
}

export function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  const vm = useOnboardingViewModel();

  return (
    <View style={styles.container}>
      <Animated.View
        key={vm.step}
        entering={FadeIn.duration(280)}
        exiting={FadeOut.duration(160)}
        layout={Layout.springify()}
        style={styles.stepWrap}
      >
        {vm.step === 'welcome' && <WelcomeStep onNext={vm.next} />}
        {vm.step === 'allergens' && (
          <AllergenStep
            selected={vm.selected}
            onToggle={vm.toggleAllergen}
            onNext={vm.next}
            onBack={vm.back}
          />
        )}
        {vm.step === 'confirm' && (
          <ConfirmStep
            selected={vm.selected}
            isSaving={vm.isSaving}
            error={vm.error}
            onConfirm={async () => {
              const ok = await vm.save();
              if (ok) onDone();
            }}
            onBack={vm.back}
          />
        )}
      </Animated.View>
    </View>
  );
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <View style={styles.step}>
      <View style={styles.welcomeHero}>
        <BuddyMascot size={140} mood="idle" />
        <View style={styles.welcomeText}>
          <Text style={[styles.eyebrow, styles.center]}>Bud</Text>
          <Text style={[styles.headline, styles.heroSerif, styles.center]}>Hi. I'm Bud.</Text>
          <Text style={[styles.subhead, styles.center]}>
            A second opinion at the shelf. Point at any product and I'll tell you if it's safe for you.
          </Text>
        </View>
      </View>
      <View style={styles.welcomeFoot}>
        <Text style={[styles.bodyMuted, styles.center]}>
          First, let me know what to watch out for.
        </Text>
        <Button label="Let's start" onPress={onNext} fullWidth size="lg" />
      </View>
    </View>
  );
}

function AllergenStep({
  selected,
  onToggle,
  onNext,
  onBack,
}: {
  selected: ReadonlySet<string>;
  onToggle: (a: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <View style={styles.step}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>STEP 1 OF 2</Text>
        <Text style={styles.headline}>What should I watch for?</Text>
        <Text style={styles.subhead}>
          Tap any allergens that apply. You can change these any time.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.chipGrid}
        showsVerticalScrollIndicator={false}
      >
        {BIG_NINE_ALLERGENS.map((allergen) => (
          <AllergenChip
            key={allergen}
            label={allergen}
            selected={selected.has(allergen)}
            onPress={() => onToggle(allergen)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Back" onPress={onBack} variant="ghost" size="md" />
        <View style={styles.footerSpacer}>
          <Button
            label={selected.size === 0 ? 'Skip for now' : `Continue (${selected.size})`}
            onPress={onNext}
            fullWidth
            size="lg"
          />
        </View>
      </View>
    </View>
  );
}

function ConfirmStep({
  selected,
  isSaving,
  error,
  onConfirm,
  onBack,
}: {
  selected: ReadonlySet<string>;
  isSaving: boolean;
  error: string | null;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const selectedList = [...selected];
  return (
    <View style={styles.step}>
      <View style={styles.confirmHero}>
        <BuddyMascot size={110} mood="happy" />
      </View>
      <View style={styles.header}>
        <Text style={[styles.eyebrow, styles.center]}>STEP 2 OF 2</Text>
        <Text style={[styles.headline, styles.center]}>Got it.</Text>
        <Text style={[styles.subhead, styles.center]}>
          {selectedList.length === 0
            ? "You haven't flagged anything yet. That's fine. Add allergens any time."
            : `I'll watch for these in every product you scan.`}
        </Text>
      </View>

      {selectedList.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.summaryList}
          showsVerticalScrollIndicator={false}
        >
          {selectedList.map((a) => (
            <View key={a} style={styles.summaryRow}>
              <View style={styles.summaryDot} />
              <Text style={styles.summaryItem}>{a}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.footer}>
        <Button label="Edit" onPress={onBack} variant="ghost" size="md" />
        <View style={styles.footerSpacer}>
          <Button
            label={isSaving ? 'Saving...' : 'Start scanning'}
            onPress={onConfirm}
            disabled={isSaving}
            fullWidth
            size="lg"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  stepWrap: {
    flex: 1,
  },
  step: {
    flex: 1,
    paddingHorizontal: tokens.space[5],
    paddingTop: tokens.space[5],
    paddingBottom: tokens.space[5],
  },
  welcomeHero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space[5],
  },
  welcomeText: {
    alignItems: 'center',
    gap: tokens.space[2],
    maxWidth: 320,
  },
  welcomeFoot: {
    gap: tokens.space[4],
    paddingTop: tokens.space[4],
  },
  confirmHero: {
    alignItems: 'center',
    paddingTop: tokens.space[2],
    paddingBottom: tokens.space[4],
  },
  header: {
    gap: tokens.space[2],
    paddingBottom: tokens.space[3],
  },
  center: {
    textAlign: 'center',
  },
  eyebrow: {
    fontSize: tokens.type.sizes.lg,
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.brand[500],
    fontFamily: tokens.type.family,
  },
  // Hero serif: matches the bud.quest waitlist email + Amir's card direction.
  heroSerif: {
    fontFamily: tokens.type.familySerif,
    fontStyle: 'italic',
    fontWeight: '700',
  },
  headline: {
    fontSize: tokens.type.sizes['2xl'],
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.ink,
    lineHeight: tokens.type.sizes['2xl'] * tokens.type.lineHeight.tight,
    letterSpacing: tokens.type.letterSpacing.tight,
    fontFamily: tokens.type.family,
  },
  subhead: {
    fontSize: tokens.type.sizes.lg,
    fontWeight: tokens.type.weights.regular,
    color: tokens.color.inkSoft,
    lineHeight: tokens.type.sizes.lg * tokens.type.lineHeight.normal,
    fontFamily: tokens.type.family,
  },
  bodyMuted: {
    fontSize: tokens.type.sizes.base,
    fontWeight: tokens.type.weights.regular,
    color: tokens.color.inkMuted,
    lineHeight: tokens.type.sizes.base * tokens.type.lineHeight.normal,
    fontFamily: tokens.type.family,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.space[2],
    paddingVertical: tokens.space[3],
  },
  summaryList: {
    gap: tokens.space[2],
    paddingVertical: tokens.space[2],
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.space[3],
    paddingVertical: tokens.space[2],
    paddingHorizontal: tokens.space[4],
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.color.surface,
    borderWidth: 1,
    borderColor: tokens.color.line,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: tokens.color.brand[500],
  },
  summaryItem: {
    fontSize: tokens.type.sizes.base,
    color: tokens.color.ink,
    fontWeight: tokens.type.weights.medium,
    fontFamily: tokens.type.family,
  },
  error: {
    color: tokens.color.status.danger,
    fontSize: tokens.type.sizes.sm,
    paddingTop: tokens.space[2],
    textAlign: 'center',
    fontFamily: tokens.type.family,
  },
  footer: {
    marginTop: tokens.space[3],
    flexDirection: 'row',
    gap: tokens.space[2],
    alignItems: 'center',
  },
  footerSpacer: {
    flex: 1,
  },
});
