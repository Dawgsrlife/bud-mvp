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
        entering={FadeIn.duration(250)}
        exiting={FadeOut.duration(150)}
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
      <View style={styles.heroBlock}>
        <BuddyMascot size={160} mood="idle" />
      </View>
      <Text style={styles.eyebrow}>BUD</Text>
      <Text style={styles.headline}>Hi. I'm Bud.</Text>
      <Text style={styles.subhead}>
        Point your phone at a grocery product. I'll tell you if it's safe for you.
      </Text>
      <Text style={styles.body}>
        First, let me know what to watch out for.
      </Text>
      <View style={styles.footer}>
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
      <Text style={styles.eyebrow}>STEP 1 OF 2</Text>
      <Text style={styles.headline}>What should I watch for?</Text>
      <Text style={styles.subhead}>
        Tap any allergens or restrictions that apply. You can change these any time.
      </Text>
      <ScrollView contentContainerStyle={styles.chipGrid} showsVerticalScrollIndicator={false}>
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
        <Button
          label={selected.size === 0 ? 'Skip for now' : `Continue (${selected.size})`}
          onPress={onNext}
          fullWidth
          size="lg"
        />
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
      <View style={styles.heroBlock}>
        <BuddyMascot size={120} mood="happy" />
      </View>
      <Text style={styles.eyebrow}>STEP 2 OF 2</Text>
      <Text style={styles.headline}>Got it.</Text>
      <Text style={styles.subhead}>
        {selectedList.length === 0
          ? "You haven't flagged anything yet. That's fine. Add allergens any time."
          : `I'll watch for these in every product you scan:`}
      </Text>
      {selectedList.length > 0 && (
        <View style={styles.summary}>
          {selectedList.map((a) => (
            <Text key={a} style={styles.summaryItem}>
              .  {a}
            </Text>
          ))}
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.footer}>
        <Button label="Edit" onPress={onBack} variant="ghost" size="md" />
        <Button
          label={isSaving ? 'Saving.' : 'Start scanning'}
          onPress={onConfirm}
          disabled={isSaving}
          fullWidth
          size="lg"
        />
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
    paddingTop: tokens.space[6],
    paddingBottom: tokens.space[5],
    gap: tokens.space[3],
  },
  heroBlock: {
    alignItems: 'center',
    paddingVertical: tokens.space[5],
  },
  eyebrow: {
    fontSize: tokens.type.sizes.sm,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.brand[600],
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: tokens.type.family,
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
  body: {
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
    paddingVertical: tokens.space[4],
  },
  summary: {
    paddingVertical: tokens.space[3],
    gap: tokens.space[1],
  },
  summaryItem: {
    fontSize: tokens.type.sizes.lg,
    color: tokens.color.ink,
    fontWeight: tokens.type.weights.medium,
    fontFamily: tokens.type.family,
  },
  error: {
    color: tokens.color.status.danger,
    fontSize: tokens.type.sizes.sm,
    paddingTop: tokens.space[2],
    fontFamily: tokens.type.family,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    gap: tokens.space[3],
    alignItems: 'center',
  },
});
