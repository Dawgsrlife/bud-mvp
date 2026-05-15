// ProfileRepository - abstract contract for user's allergen profile persistence.
// SOLID: Interface Segregation. Profile-only concerns. Scanner + history live elsewhere.

import type { Result } from '../../../../core/errors/result';
import type { Failure } from '../../../../core/errors/failure';
import type { AllergenProfile } from '../../../scanner/domain/entities/allergen-profile';

export interface ProfileRepository {
  load(): Promise<Result<AllergenProfile, Failure>>;
  save(profile: AllergenProfile): Promise<Result<void, Failure>>;
  clear(): Promise<Result<void, Failure>>;
}
