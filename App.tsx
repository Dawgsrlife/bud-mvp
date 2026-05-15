// BUD MVP. App entry.
// Root component. Decides between onboarding + home based on saved profile.

import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { container } from './src/core/di/container';
import { tokens } from './src/core/theme/tokens';
import { isOk } from './src/core/errors/result';
import { OnboardingScreen } from './src/features/profile/presentation/screens/onboarding-screen';
import { HomeScreen } from './src/features/scanner/presentation/screens/home-screen';

type AppState =
  | { kind: 'loading' }
  | { kind: 'onboarding' }
  | { kind: 'home'; allergenCount: number };

export default function App() {
  const [state, setState] = useState<AppState>({ kind: 'loading' });

  const loadProfile = async () => {
    const loadUseCase = container.loadProfileUseCase();
    const result = await loadUseCase.execute();
    if (isOk(result) && result.value.allergens.length > 0) {
      setState({ kind: 'home', allergenCount: result.value.allergens.length });
    } else {
      setState({ kind: 'onboarding' });
    }
  };

  useEffect(() => {
    void loadProfile();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safe}>
          <StatusBar style="dark" />
          {state.kind === 'loading' && (
            <View style={styles.center}>
              <ActivityIndicator color={tokens.color.brand[500]} />
            </View>
          )}
          {state.kind === 'onboarding' && (
            <OnboardingScreen onDone={() => void loadProfile()} />
          )}
          {state.kind === 'home' && (
            <HomeScreen
              allergenCount={state.allergenCount}
              onResetProfile={() => setState({ kind: 'onboarding' })}
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
