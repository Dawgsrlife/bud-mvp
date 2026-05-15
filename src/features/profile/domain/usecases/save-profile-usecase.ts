// SaveProfileUseCase - one business action.

import type { Result } from '../../../../core/errors/result';
import type { Failure } from '../../../../core/errors/failure';
import type { AllergenProfile } from '../../../scanner/domain/entities/allergen-profile';
import type { ProfileRepository } from '../repositories/profile-repository';

export class SaveProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  execute(profile: AllergenProfile): Promise<Result<void, Failure>> {
    return this.profileRepository.save(profile);
  }
}
