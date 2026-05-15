// HomeScreen - the landing screen after onboarding. Now triggers the scanner.

import { StyleSheet, Text, View } from 'react-native';
import { tokens } from '../../../../core/theme/tokens';
import { BuddyMascot } from '../../../../shared/widgets/buddy-mascot';
import { Button } from '../../../../shared/widgets/button';

interface HomeScreenProps {
  allergenCount: number;
  onScan: () => void;
  onResetProfile: () => void;
}

export function HomeScreen({ allergenCount, onScan, onResetProfile }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <BuddyMascot size={130} mood="idle" />
        <View style={styles.text}>
          <Text style={[styles.eyebrow, styles.center]}>BUD</Text>
          <Text style={[styles.headline, styles.center]}>Ready when you are.</Text>
          <Text style={[styles.subhead, styles.center]}>
            {allergenCount === 0
              ? "I'm not watching for anything yet. Add allergens to your profile."
              : `Watching ${allergenCount} ${allergenCount === 1 ? 'allergen' : 'allergens'} in every scan.`}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="Scan a product" onPress={onScan} fullWidth size="lg" />
        <Button label="Reset profile" onPress={onResetProfile} variant="ghost" size="sm" />
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space[5],
  },
  text: {
    alignItems: 'center',
    gap: tokens.space[2],
    maxWidth: 320,
  },
  center: {
    textAlign: 'center',
  },
  eyebrow: {
    fontSize: tokens.type.sizes.sm,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.brand[600],
    letterSpacing: 1.2,
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
    color: tokens.color.inkSoft,
    lineHeight: tokens.type.sizes.lg * tokens.type.lineHeight.normal,
    fontFamily: tokens.type.family,
  },
  footer: {
    gap: tokens.space[3],
    alignItems: 'center',
  },
});
