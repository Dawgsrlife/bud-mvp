// LoadProfileUseCase - one business action.

import type { Result } from '../../../../core/errors/result';
import type { Failure } from '../../../../core/errors/failure';
import type { AllergenProfile } from '../../../scanner/domain/entities/allergen-profile';
import type { ProfileRepository } from '../repositories/profile-repository';

export class LoadProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  execute(): Promise<Result<AllergenProfile, Failure>> {
    return this.profileRepository.load();
  }
}
