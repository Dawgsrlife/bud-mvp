// BUD MVP. App entry.
// Root component. Routes between loading, onboarding, home, and scanner.

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
import { ScannerScreen } from './src/features/scanner/presentation/screens/scanner-screen';
import { PhoneFrame } from './src/shared/widgets/phone-frame';

type Route =
  | { kind: 'loading' }
  | { kind: 'onboarding' }
  | { kind: 'home'; allergenCount: number }
  | { kind: 'scanner'; allergenCount: number };

export default function App() {
  const [route, setRoute] = useState<Route>({ kind: 'loading' });

  const loadProfile = async () => {
    const loadUseCase = container.loadProfileUseCase();
    const result = await loadUseCase.execute();
    if (isOk(result) && result.value.allergens.length > 0) {
      setRoute({ kind: 'home', allergenCount: result.value.allergens.length });
    } else {
      setRoute({ kind: 'onboarding' });
    }
  };

  useEffect(() => {
    void loadProfile();
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <PhoneFrame>
          <SafeAreaView style={styles.safe}>
            <StatusBar style="dark" />
            {route.kind === 'loading' && (
              <View style={styles.center}>
                <ActivityIndicator color={tokens.color.brand[500]} />
              </View>
            )}
            {route.kind === 'onboarding' && (
              <OnboardingScreen onDone={() => void loadProfile()} />
            )}
            {route.kind === 'home' && (
              <HomeScreen
                allergenCount={route.allergenCount}
                onScan={() =>
                  setRoute({ kind: 'scanner', allergenCount: route.allergenCount })
                }
                onResetProfile={() => setRoute({ kind: 'onboarding' })}
              />
            )}
            {route.kind === 'scanner' && (
              <ScannerScreen
                allergenCount={route.allergenCount}
                onBack={() =>
                  setRoute({ kind: 'home', allergenCount: route.allergenCount })
                }
              />
            )}
          </SafeAreaView>
        </PhoneFrame>
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
