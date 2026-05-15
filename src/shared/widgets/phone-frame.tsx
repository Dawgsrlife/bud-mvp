// PhoneFrame - web-only chrome that simulates an iPhone-shaped viewport
// for design preview during development. On native iOS/Android this collapses
// to its children unchanged. No production cost.

import { ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { tokens } from '../../core/theme/tokens';

interface PhoneFrameProps {
  children: ReactNode;
}

// Standard iPhone 15 / 14 Pro logical viewport
const PHONE_WIDTH = 390;
const PHONE_HEIGHT = 844;

export function PhoneFrame({ children }: PhoneFrameProps) {
  if (Platform.OS !== 'web') {
    // Native: render children straight, no frame
    return <>{children}</>;
  }

  return (
    <View style={styles.stage}>
      <View style={styles.frame}>
        <View style={styles.notch} />
        <View style={styles.screen}>{children}</View>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEF0',
    padding: tokens.space[5],
  },
  frame: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
    borderRadius: 48,
    backgroundColor: tokens.color.bg,
    overflow: 'hidden',
    shadowColor: tokens.color.ink,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.18,
    shadowRadius: 40,
    borderWidth: 6,
    borderColor: '#0A0A0A',
  },
  notch: {
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
    width: 120,
    height: 32,
    borderRadius: 24,
    backgroundColor: tokens.color.ink,
    zIndex: 10,
  },
  screen: {
    flex: 1,
    paddingTop: 56,
    paddingBottom: 24,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: tokens.color.ink,
    opacity: 0.4,
    zIndex: 10,
  },
});
