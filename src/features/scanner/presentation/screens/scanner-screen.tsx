// ScannerScreen - the camera + capture experience.
// States: permission-loading, permission-denied, idle (viewfinder), capturing, captured (review).

import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { CameraView } from 'expo-camera';
import { tokens } from '../../../../core/theme/tokens';
import { Button } from '../../../../shared/widgets/button';
import { BuddyMascot } from '../../../../shared/widgets/buddy-mascot';
import { ShutterButton } from '../widgets/shutter-button';
import { ViewfinderOverlay } from '../widgets/viewfinder-overlay';
import { useScannerViewModel } from '../viewmodels/use-scanner-viewmodel';

interface ScannerScreenProps {
  allergenCount: number;
  onBack: () => void;
}

export function ScannerScreen({ allergenCount, onBack }: ScannerScreenProps) {
  const vm = useScannerViewModel();

  return (
    <View style={styles.container}>
      {vm.state.kind === 'permission-loading' && <PermissionLoadingState />}
      {vm.state.kind === 'permission-denied' && (
        <PermissionDeniedState onRetry={vm.requestPermission} onBack={onBack} />
      )}
      {(vm.state.kind === 'idle' || vm.state.kind === 'capturing') && (
        <ViewfinderState
          allergenCount={allergenCount}
          isCapturing={vm.state.kind === 'capturing'}
          onCapture={vm.capture}
          onBack={onBack}
          cameraRef={vm.cameraRef as React.RefObject<CameraView>}
        />
      )}
      {vm.state.kind === 'captured' && (
        <CapturedState uri={vm.state.uri} onRetake={vm.retake} onAccept={() => {}} />
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

function ViewfinderState({
  allergenCount,
  isCapturing,
  onCapture,
  onBack,
  cameraRef,
}: {
  allergenCount: number;
  isCapturing: boolean;
  onCapture: () => void;
  onBack: () => void;
  cameraRef: React.RefObject<CameraView>;
}) {
  const isWeb = Platform.OS === 'web';

  return (
    <View style={styles.viewfinderRoot}>
      {/* Camera surface (or web placeholder) */}
      {isWeb ? (
        <View style={styles.webCameraPlaceholder}>
          <BuddyMascot size={90} mood="idle" />
          <Text style={styles.webCameraText}>Camera preview</Text>
          <Text style={styles.webCameraSubtext}>
            Live camera shows on iOS + Android. Tap the shutter to simulate capture.
          </Text>
        </View>
      ) : (
        <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />
      )}

      <ViewfinderOverlay hint={`Center the label . watching ${allergenCount} allergens`} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.iconButton}>
          <Text style={styles.iconButtonText}>Back</Text>
        </Pressable>
      </View>

      {/* Bottom shutter row */}
      <View style={styles.shutterRow}>
        <ShutterButton onPress={onCapture} busy={isCapturing} />
        {isCapturing && (
          <Animated.View
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(150)}
            style={styles.capturingBadge}
          >
            <Text style={styles.capturingBadgeText}>Reading.</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

function CapturedState({
  uri,
  onRetake,
  onAccept,
}: {
  uri: string;
  onRetake: () => void;
  onAccept: () => void;
}) {
  const isWeb = Platform.OS === 'web';
  return (
    <View style={styles.capturedRoot}>
      {isWeb || !uri ? (
        <View style={styles.capturedWebPlaceholder}>
          <BuddyMascot size={90} mood="thinking" />
          <Text style={styles.webCameraText}>Captured (web simulated)</Text>
        </View>
      ) : (
        <Image source={{ uri }} style={styles.capturedImage} resizeMode="cover" />
      )}
      <View style={styles.capturedFooter}>
        <Text style={styles.capturedHeadline}>Looks good?</Text>
        <Text style={styles.capturedSub}>Slice 4 will hand this off to the verdict engine.</Text>
        <View style={styles.capturedActions}>
          <Button label="Retake" onPress={onRetake} variant="secondary" size="lg" />
          <View style={styles.capturedSpacer}>
            <Button label="Use this" onPress={onAccept} fullWidth size="lg" />
          </View>
        </View>
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
  capturedRoot: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  capturedImage: {
    flex: 1,
  },
  capturedWebPlaceholder: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space[2],
  },
  capturedFooter: {
    padding: tokens.space[5],
    gap: tokens.space[2],
    backgroundColor: tokens.color.bg,
  },
  capturedHeadline: {
    fontSize: tokens.type.sizes.xl,
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.ink,
    fontFamily: tokens.type.family,
  },
  capturedSub: {
    fontSize: tokens.type.sizes.base,
    color: tokens.color.inkSoft,
    fontFamily: tokens.type.family,
  },
  capturedActions: {
    flexDirection: 'row',
    gap: tokens.space[2],
    paddingTop: tokens.space[3],
  },
  capturedSpacer: {
    flex: 1,
  },
});
