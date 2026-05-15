// VerdictDataSource - turns OCR text + user profile into a verdict.
// Slice 4: pure local pattern-matching (no LLM call yet).
// Slice 5: swap to a Supabase Edge Function that calls Claude with prompt-cached system text.

import { Verdict } from '../../domain/entities/verdict';
import type { AllergenProfile } from '../../domain/entities/allergen-profile';

// Synonym index: map user-facing allergen labels to detection keywords in the text.
// All lowercased. Keep this small + maintainable; the LLM in slice 5 handles synonyms more flexibly.
const ALLERGEN_KEYWORDS: Record<string, ReadonlyArray<string>> = {
  Milk: ['milk', 'dairy', 'lactose', 'whey', 'casein', 'butter', 'cheese', 'cream'],
  Eggs: ['egg', 'albumin', 'ovalbumin'],
  Fish: ['fish', 'anchovy', 'salmon', 'tuna', 'cod', 'tilapia'],
  Shellfish: ['shellfish', 'shrimp', 'crab', 'lobster', 'prawn', 'oyster', 'clam', 'mussel'],
  'Tree nuts': [
    'tree nut', 'almond', 'cashew', 'walnut', 'pecan', 'pistachio', 'hazelnut', 'macadamia',
    'brazil nut',
  ],
  Peanuts: ['peanut', 'groundnut'],
  Wheat: ['wheat', 'gluten', 'spelt', 'semolina', 'durum', 'farina'],
  Soy: ['soy', 'soya', 'edamame', 'tofu', 'soy lecithin'],
  Sesame: ['sesame', 'tahini'],
};

interface MatchResult {
  triggered: string[];
  mayContain: string[];
}

function matchAllergens(text: string, profile: AllergenProfile): MatchResult {
  const lower = text.toLowerCase();
  const triggered: string[] = [];
  const mayContain: string[] = [];

  // Split "may contain" portion from main ingredients if present
  let mainSection = lower;
  let mayContainSection = '';
  const mayMatch = lower.match(/may contain[s]?:?\s*([^.]*)/);
  if (mayMatch) {
    mayContainSection = mayMatch[1] ?? '';
    mainSection = lower.slice(0, mayMatch.index ?? lower.length);
  }

  for (const allergen of profile.allergens) {
    const keywords = ALLERGEN_KEYWORDS[allergen] ?? [allergen.toLowerCase()];
    const inMain = keywords.some((k) => mainSection.includes(k));
    const inMay = keywords.some((k) => mayContainSection.includes(k));
    if (inMain) triggered.push(allergen);
    else if (inMay) mayContain.push(allergen);
  }

  return { triggered, mayContain };
}

export class VerdictDataSource {
  produce(text: string, profile: AllergenProfile, confidence: number): Verdict {
    if (profile.allergens.length === 0) {
      return Verdict.compatible('No allergens on your profile to check against.');
    }

    const { triggered, mayContain } = matchAllergens(text, profile);

    if (triggered.length > 0) {
      const list = triggered.join(', ');
      return Verdict.avoid(triggered, `Contains ${list}.`, confidence);
    }
    if (mayContain.length > 0) {
      const list = mayContain.join(', ');
      return Verdict.caution(mayContain, `May contain ${list}.`, Math.min(confidence, 0.85));
    }
    return Verdict.compatible('Cleared against your profile.');
  }
}
