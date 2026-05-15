// HistoryScreen - the user's past scans.
// Empty state per brand book: one mascot + one sentence + one CTA.
// Skeleton loaders while initial load (no ActivityIndicator).

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { tokens } from '../../../../core/theme/tokens';
import { Button } from '../../../../shared/widgets/button';
import { BuddyMascot } from '../../../../shared/widgets/buddy-mascot';
import { useHistoryViewModel } from '../viewmodels/use-history-viewmodel';
import { SkeletonRow } from '../widgets/skeleton-row';
import { HistoryRow } from '../widgets/history-row';

interface HistoryScreenProps {
  onBack: () => void;
  onScan: () => void;
}

export function HistoryScreen({ onBack, onScan }: HistoryScreenProps) {
  const vm = useHistoryViewModel();

  if (vm.loading) {
    return (
      <View style={styles.container}>
        <Header onBack={onBack} />
        <ScrollView contentContainerStyle={styles.list}>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </ScrollView>
      </View>
    );
  }

  if (vm.records.length === 0) {
    return (
      <View style={styles.container}>
        <Header onBack={onBack} />
        <View style={styles.emptyWrap}>
          <BuddyMascot size={120} mood="idle" />
          <Text style={styles.emptyTitle}>Nothing yet.</Text>
          <Text style={styles.emptySub}>
            Scan a product and your history will show up here.
          </Text>
          <Button label="Scan a product" onPress={onScan} fullWidth size="lg" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header onBack={onBack} />
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {vm.records.map((r) => (
          <HistoryRow key={r.id} record={r} />
        ))}
      </ScrollView>
    </View>
  );
}

function Header({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.header}>
      <Button label="Back" onPress={onBack} variant="ghost" size="sm" />
      <Text style={styles.title}>History</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.space[3],
    paddingTop: tokens.space[4],
    paddingBottom: tokens.space[3],
  },
  headerSpacer: {
    width: 64,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: tokens.type.sizes.lg,
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.ink,
    fontFamily: tokens.type.family,
  },
  list: {
    paddingHorizontal: tokens.space[4],
    paddingTop: tokens.space[2],
    paddingBottom: tokens.space[5],
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.space[5],
    gap: tokens.space[3],
  },
  emptyTitle: {
    fontSize: tokens.type.sizes.xl,
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.ink,
    fontFamily: tokens.type.family,
  },
  emptySub: {
    fontSize: tokens.type.sizes.base,
    color: tokens.color.inkSoft,
    textAlign: 'center',
    maxWidth: 280,
    fontFamily: tokens.type.family,
    marginBottom: tokens.space[3],
  },
});
