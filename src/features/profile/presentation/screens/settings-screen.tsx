// SettingsScreen - profile editing + about + reset.
// Brand discipline: oat background, ink text, deep-sage CTAs. No screen-flood
// status colors. SaMD disclaimer block is mandatory (regulatory positioning).
//
// Saving runs through SaveProfileUseCase; on success we surface a pill
// confirmation then return to home (the navigation is owned by App.tsx).

import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { container } from '../../../../core/di/container';
import { isOk } from '../../../../core/errors/result';
import { tokens } from '../../../../core/theme/tokens';
import { AllergenChip } from '../../../../shared/widgets/allergen-chip';
import { Button } from '../../../../shared/widgets/button';
import { BIG_NINE_ALLERGENS } from '../../domain/entities/big-nine-allergens';

interface Props {
  onBack: () => void;
  onProfileSaved: (allergens: ReadonlyArray<string>) => void;
  onResetProfile: () => void;
}

type Status = 'idle' | 'saving' | 'saved' | 'error';

export function SettingsScreen({ onBack, onProfileSaved, onResetProfile }: Props) {
  const [selected, setSelected] = useState<ReadonlyArray<string>>([]);
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    void (async () => {
      const loadUseCase = container.loadProfileUseCase();
      const r = await loadUseCase.execute();
      if (isOk(r)) setSelected(r.value.allergens);
    })();
  }, []);

  const toggle = (allergen: string) => {
    setSelected((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen],
    );
  };

  const save = async () => {
    setStatus('saving');
    const saveUseCase = container.saveProfileUseCase();
    const r = await saveUseCase.execute({ allergens: selected });
    if (isOk(r)) {
      setStatus('saved');
      onProfileSaved(selected);
      setTimeout(() => setStatus('idle'), 1200);
    } else {
      setStatus('error');
    }
  };

  const confirmReset = () => {
    Alert.alert(
      'Reset profile?',
      'This wipes your allergen profile and the welcome flow runs again. History stays.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: onResetProfile },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button label="Back" onPress={onBack} variant="ghost" size="sm" />
        <Text style={styles.title}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Section title="Your allergen profile">
          <Text style={styles.sub}>
            Tap any allergen to toggle. Bud will watch for these on every label.
          </Text>
          <View style={styles.chips}>
            {BIG_NINE_ALLERGENS.map((a) => (
              <AllergenChip
                key={a}
                label={a}
                selected={selected.includes(a)}
                onToggle={() => toggle(a)}
              />
            ))}
          </View>
          <Button
            label={
              status === 'saving'
                ? 'Saving...'
                : status === 'saved'
                  ? 'Saved'
                  : status === 'error'
                    ? 'Try again'
                    : 'Save profile'
            }
            onPress={save}
            disabled={selected.length === 0 || status === 'saving'}
            fullWidth
            size="lg"
          />
        </Section>

        <Section title="About Bud">
          <Text style={styles.body}>
            Bud reads what's printed on a product label and tells you whether any of the
            declared ingredients match your allergen profile. It's a second opinion to
            help you decide, faster.
          </Text>
        </Section>

        <Section title="Not a medical device">
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              Bud is an information tool, not a medical device. It does not diagnose,
              treat, or prevent allergic reactions. It reports what the label declares.
              Always read the label yourself if you have a severe allergy. If you may
              have anaphylaxis, carry your epinephrine and follow your allergist's
              guidance.
            </Text>
          </View>
        </Section>

        <Section title="Privacy">
          <Text style={styles.body}>
            Your profile lives on this device. Scans get sent to Bud's servers so the
            verdict engine and the crowd-consensus database can do their work; no name,
            no email, no phone number is attached.
          </Text>
        </Section>

        <Section title="Build">
          <Text style={styles.kv}>App version</Text>
          <Text style={styles.kvVal}>1.0.0 (MVP)</Text>
          <Text style={styles.kv}>Backend</Text>
          <Text style={styles.kvVal}>Supabase + Gemini 2.5 Flash + Claude Haiku 4.5</Text>
        </Section>

        <View style={styles.dangerZone}>
          <Button
            label="Reset allergen profile"
            onPress={confirmReset}
            variant="ghost"
            fullWidth
            size="md"
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
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
  headerSpacer: { width: 64 },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: tokens.type.sizes.lg,
    fontWeight: tokens.type.weights.bold,
    color: tokens.color.ink,
    fontFamily: tokens.type.family,
  },
  body: {
    paddingHorizontal: tokens.space[5],
    paddingBottom: tokens.space[8],
    gap: tokens.space[5],
  },
  section: {
    gap: tokens.space[2],
  },
  sectionTitle: {
    fontSize: tokens.type.sizes.xs,
    fontWeight: tokens.type.weights.medium,
    color: tokens.color.inkMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontFamily: tokens.type.family,
  },
  sectionBody: {
    gap: tokens.space[3],
  },
  sub: {
    fontSize: tokens.type.sizes.sm,
    color: tokens.color.inkSoft,
    fontFamily: tokens.type.family,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.space[2],
  },
  disclaimer: {
    padding: tokens.space[4],
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.color.surface,
    borderWidth: 1,
    borderColor: tokens.color.line,
  },
  disclaimerText: {
    fontSize: tokens.type.sizes.sm,
    lineHeight: tokens.type.sizes.sm * tokens.type.lineHeight.loose,
    color: tokens.color.inkSoft,
    fontFamily: tokens.type.family,
  },
  kv: {
    fontSize: tokens.type.sizes.xs,
    color: tokens.color.inkMuted,
    fontFamily: tokens.type.family,
    marginTop: tokens.space[2],
  },
  kvVal: {
    fontSize: tokens.type.sizes.sm,
    color: tokens.color.ink,
    fontFamily: tokens.type.family,
  },
  dangerZone: {
    marginTop: tokens.space[4],
    paddingTop: tokens.space[4],
    borderTopWidth: 1,
    borderTopColor: tokens.color.line,
  },
});
