// ScannerScreen - the camera + capture + verdict experience.
// State machine: permission -> idle -> capturing -> reading -> verdict (or error).

import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { CameraView } from 'expo-camera';
import { tokens } from '../../../../core/theme/tokens';
import { Button } from '../../../../shared/widgets/button';
import { BuddyMascot } from '../../../../shared/widgets/buddy-mascot';
import { ShutterButton } from '../widgets/shutter-button';
import { ViewfinderOverlay } from '../widgets/viewfinder-overlay';
import { useScannerViewModel } from '../viewmodels/use-scanner-viewmodel';
import { VerdictScreen } from './verdict-screen';
import { AllergenProfile } from '../../domain/entities/allergen-profile';

interface ScannerScreenProps {
  allergens: ReadonlyArray<string>;
  onBack: () => void;
}

export function ScannerScreen({ allergens, onBack }: ScannerScreenProps) {
  const profile = AllergenProfile.withAllergens(allergens);
  const vm = useScannerViewModel({ profile });

  return (
    <View style={styles.container}>
      {vm.state.kind === 'permission-loading' && <PermissionLoadingState />}
      {vm.state.kind === 'permission-denied' && (
        <PermissionDeniedState onRetry={vm.requestPermission} onBack={onBack} />
      )}
      {(vm.state.kind === 'idle' || vm.state.kind === 'capturing' || vm.state.kind === 'reading') && (
        <ViewfinderState
          allergenCount={allergens.length}
          isBusy={vm.state.kind !== 'idle'}
          busyLabel={vm.state.kind === 'reading' ? 'Reading...' : 'Capturing...'}
          onCapture={vm.capture}
          onBack={onBack}
          cameraRef={vm.cameraRef as React.RefObject<CameraView>}
        />
      )}
      {vm.state.kind === 'verdict' && (
        <VerdictScreen verdict={vm.state.verdict} onScanAgain={vm.resetToIdle} />
      )}
      {vm.state.kind === 'error' && (
        <ErrorState message={vm.state.message} onRetry={vm.resetToIdle} onBack={onBack} />
      )}
    </View>
  );
}

function PermissionLoadingState() {
  return (
    <View style={styles.centerState}>
      <BuddyMascot size={100} mood="thinking" />
      <Text style={styles.stateBody}>Getting the camera ready.</Text>
    </View>
  );
}

function PermissionDeniedState({ onRetry, onBack }: { onRetry: () => void; onBack: () => void }) {
  return (
    <View style={styles.centerState}>
      <BuddyMascot size={100} mood="warning" />
      <Text style={styles.stateEyebrow}>CAMERA OFF</Text>
      <Text style={styles.stateHeadline}>I need to see the product.</Text>
      <Text style={styles.stateBody}>
        Grant camera access in your settings so I can read package labels.
      </Text>
      <View style={styles.stateActions}>
        <Button label="Try again" onPress={onRetry} fullWidth size="lg" />
        <Button label="Back" onPress={onBack} variant="ghost" size="sm" />
      </View>
    </View>
  );
}

function ErrorState({
  message,
  onRetry,
  onBack,
}: {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}) {
  return (
    <View style={styles.centerState}>
      <BuddyMascot size={100} mood="warning" />
      <Text style={styles.stateEyebrow}>HMM</Text>
      <Text style={styles.stateHeadline}>That didn't work.</Text>
      <Text style={styles.stateBody}>{message}</Text>
      <View style={styles.stateActions}>
        <Button label="Try again" onPress={onRetry} fullWidth size="lg" />
        <Button label="Back" onPress={onBack} variant="ghost" size="sm" />
      </View>
    </View>
  );
}

function ViewfinderState({
  allergenCount,
  isBusy,
  busyLabel,
  onCapture,
  onBack,
  cameraRef,
}: {
  allergenCount: number;
  isBusy: boolean;
  busyLabel: string;
  onCapture: () => void;
  onBack: () => void;
  cameraRef: React.RefObject<CameraView>;
}) {
  const isWeb = Platform.OS === 'web';

  return (
    <View style={styles.viewfinderRoot}>
      {isWeb ? (
        <View style={styles.webCameraPlaceholder}>
          <BuddyMascot size={90} mood="idle" />
          <Text style={styles.webCameraText}>Camera preview</Text>
          <Text style={styles.webCameraSubtext}>
            Live camera shows on iOS + Android. Tap the shutter to simulate a scan.
          </Text>
        </View>
      ) : (
        <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />
      )}

      <ViewfinderOverlay hint={`Center the label . ${allergenCount} on watch`} />

      <View style={styles.topBar}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.iconButton}>
          <Text style={styles.iconButtonText}>Back</Text>
        </Pressable>
      </View>

      <View style={styles.shutterRow}>
        <ShutterButton onPress={onCapture} busy={isBusy} disabled={isBusy} />
        {isBusy && (
          <Animated.View
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(150)}
            style={styles.capturingBadge}
          >
            <Text style={styles.capturingBadgeText}>{busyLabel}</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.ink,
  },
  centerState: {
    flex: 1,
    backgroundColor: tokens.color.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.space[5],
    gap: tokens.space[3],
  },
  stateEyebrow: {
    fontSize: tokens.type.sizes.sm,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.brand[600],
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: tokens.type.family,
    paddingTop: tokens.space[3],
  },
  stateHeadline: {
    fontSize: tokens.type.sizes.xl,
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.ink,
    textAlign: 'center',
    fontFamily: tokens.type.family,
  },
  stateBody: {
    fontSize: tokens.type.sizes.base,
    color: tokens.color.inkSoft,
    textAlign: 'center',
    lineHeight: tokens.type.sizes.base * tokens.type.lineHeight.normal,
    fontFamily: tokens.type.family,
    maxWidth: 280,
  },
  stateActions: {
    alignSelf: 'stretch',
    paddingTop: tokens.space[4],
    gap: tokens.space[2],
    alignItems: 'center',
  },
  viewfinderRoot: {
    flex: 1,
    backgroundColor: tokens.color.ink,
  },
  webCameraPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space[2],
  },
  webCameraText: {
    fontSize: tokens.type.sizes.base,
    color: tokens.color.surface,
    fontWeight: tokens.type.weights.medium,
    fontFamily: tokens.type.family,
  },
  webCameraSubtext: {
    fontSize: tokens.type.sizes.sm,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    paddingHorizontal: tokens.space[5],
    fontFamily: tokens.type.family,
  },
  topBar: {
    position: 'absolute',
    top: tokens.space[4],
    left: tokens.space[4],
    right: tokens.space[4],
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconButton: {
    paddingVertical: tokens.space[2],
    paddingHorizontal: tokens.space[3],
    borderRadius: tokens.radius.full,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  iconButtonText: {
    color: tokens.color.surface,
    fontSize: tokens.type.sizes.sm,
    fontWeight: tokens.type.weights.medium,
    fontFamily: tokens.type.family,
  },
  shutterRow: {
    position: 'absolute',
    bottom: tokens.space[6],
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: tokens.space[2],
  },
  capturingBadge: {
    paddingHorizontal: tokens.space[3],
    paddingVertical: tokens.space[1],
    borderRadius: tokens.radius.full,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  capturingBadgeText: {
    color: tokens.color.surface,
    fontSize: tokens.type.sizes.sm,
    fontWeight: tokens.type.weights.medium,
    fontFamily: tokens.type.family,
  },
});
