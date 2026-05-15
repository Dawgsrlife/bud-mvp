// Onboarding ViewModel - holds the in-progress allergen selection + handles save.
// SOLID: presentation depends on use cases only, not data.

import { useCallback, useMemo, useState } from 'react';
import { container } from '../../../../core/di/container';
import { AllergenProfile } from '../../../scanner/domain/entities/allergen-profile';
import { isErr } from '../../../../core/errors/result';

export type OnboardingStep = 'welcome' | 'allergens' | 'confirm' | 'done';

interface UseOnboardingViewModel {
  step: OnboardingStep;
  selected: ReadonlySet<string>;
  isSaving: boolean;
  error: string | null;
  next: () => void;
  back: () => void;
  toggleAllergen: (allergen: string) => void;
  save: () => Promise<boolean>;
}

const STEP_ORDER: ReadonlyArray<OnboardingStep> = ['welcome', 'allergens', 'confirm', 'done'];

export function useOnboardingViewModel(): UseOnboardingViewModel {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveUseCase = useMemo(() => container.saveProfileUseCase(), []);

  const next = useCallback(() => {
    setStep((s) => {
      const i = STEP_ORDER.indexOf(s);
      return STEP_ORDER[Math.min(i + 1, STEP_ORDER.length - 1)] ?? s;
    });
  }, []);

  const back = useCallback(() => {
    setStep((s) => {
      const i = STEP_ORDER.indexOf(s);
      return STEP_ORDER[Math.max(i - 1, 0)] ?? s;
    });
  }, []);

  const toggleAllergen = useCallback((allergen: string) => {
    setSelected((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(allergen)) nextSet.delete(allergen);
      else nextSet.add(allergen);
      return nextSet;
    });
  }, []);

  const save = useCallback(async (): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    const profile = AllergenProfile.withAllergens([...selected]);
    const result = await saveUseCase.execute(profile);
    setIsSaving(false);
    if (isErr(result)) {
      setError(result.failure.message);
      return false;
    }
    setStep('done');
    return true;
  }, [selected, saveUseCase]);

  return { step, selected, isSaving, error, next, back, toggleAllergen, save };
}
