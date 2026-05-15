// The "Big 9" - FDA + Health Canada aligned allergen list.
// Locked baseline. Add more in onboarding later (sesame is the 9th, added 2023).

export const BIG_NINE_ALLERGENS = [
  'Milk',
  'Eggs',
  'Fish',
  'Shellfish',
  'Tree nuts',
  'Peanuts',
  'Wheat',
  'Soy',
  'Sesame',
] as const;

export type BigNineAllergen = (typeof BIG_NINE_ALLERGENS)[number];
