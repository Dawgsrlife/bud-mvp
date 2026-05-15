/**
 * BUD MVP — App entry.
 *
 * Real screens live in src/features/*/presentation/screens/. This file is the
 * navigation root. For MVP day 1, we render a placeholder LaunchScreen that
 * uses design tokens directly so we can confirm the theme is wired correctly.
 *
 * Routing migrates to expo-router once Phase 1 features start landing.
 */

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { tokens } from './src/core/theme/tokens';

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.eyebrow}>BUD</Text>
        <Text style={styles.headline}>The buddy you always needed.</Text>
        <Text style={styles.subhead}>
          MVP scaffold ready. Day 1: camera + OCR pipeline spike.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: tokens.space[5],
    justifyContent: 'center',
    gap: tokens.space[3],
  },
  eyebrow: {
    fontSize: tokens.type.sizes.sm,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.brand[600],
    letterSpacing: 1,
  },
  headline: {
    fontSize: tokens.type.sizes['2xl'],
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.ink,
    lineHeight: tokens.type.sizes['2xl'] * tokens.type.lineHeight.tight,
    letterSpacing: tokens.type.letterSpacing.tight,
  },
  subhead: {
    fontSize: tokens.type.sizes.base,
    fontWeight: tokens.type.weights.regular,
    color: tokens.color.inkSoft,
    lineHeight: tokens.type.sizes.base * tokens.type.lineHeight.normal,
  },
});
