// HomeScreen - placeholder. Slice 3 makes this the camera screen.

import { StyleSheet, Text, View } from 'react-native';
import { tokens } from '../../../../core/theme/tokens';
import { BuddyMascot } from '../../../../shared/widgets/buddy-mascot';
import { Button } from '../../../../shared/widgets/button';

interface HomeScreenProps {
  allergenCount: number;
  onResetProfile: () => void;
}

export function HomeScreen({ allergenCount, onResetProfile }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.heroBlock}>
        <BuddyMascot size={120} mood="idle" />
      </View>
      <Text style={styles.eyebrow}>BUD</Text>
      <Text style={styles.headline}>Ready to scan.</Text>
      <Text style={styles.subhead}>
        {allergenCount === 0
          ? "I'm not watching for anything yet. Tap below to set up your profile."
          : `Watching for ${allergenCount} allergen${allergenCount === 1 ? '' : 's'}.`}
      </Text>
      <View style={styles.footer}>
        <Button
          label="Camera coming next"
          onPress={() => {}}
          disabled
          fullWidth
          size="lg"
        />
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
    paddingTop: tokens.space[6],
    paddingBottom: tokens.space[5],
    gap: tokens.space[3],
  },
  heroBlock: {
    alignItems: 'center',
    paddingVertical: tokens.space[6],
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
    color: tokens.color.inkSoft,
    lineHeight: tokens.type.sizes.lg * tokens.type.lineHeight.normal,
    fontFamily: tokens.type.family,
  },
  footer: {
    marginTop: 'auto',
    gap: tokens.space[3],
    alignItems: 'center',
  },
});
