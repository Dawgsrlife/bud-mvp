/**
 * AllergenProfile - the user's saved dietary restrictions.
 *
 * SOLID: Single Responsibility. Just data shape + factories.
 */

export type DietaryRestriction =
  | 'celiac'
  | 'keto'
  | 'vegan'
  | 'vegetarian'
  | 'halal'
  | 'kosher'
  | 'dairy-free'
  | 'low-fodmap';

export interface AllergenProfile {
  readonly allergens: ReadonlyArray<string>;
  readonly restrictions: ReadonlyArray<DietaryRestriction>;
}

export const AllergenProfile = {
  empty: (): AllergenProfile => ({
    allergens: [],
    restrictions: [],
  }),

  withAllergens: (allergens: ReadonlyArray<string>): AllergenProfile => ({
    allergens,
    restrictions: [],
  }),
};
