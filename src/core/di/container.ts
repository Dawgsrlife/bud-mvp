// DI container - the only place concrete classes meet abstractions.
// SOLID: Dependency Inversion. Single wiring point.

import { ProfileStorageDataSource } from '../../features/profile/data/datasources/profile-storage-datasource';
import { ProfileRepositoryImpl } from '../../features/profile/data/repositories/profile-repository-impl';
import { LoadProfileUseCase } from '../../features/profile/domain/usecases/load-profile-usecase';
import { SaveProfileUseCase } from '../../features/profile/domain/usecases/save-profile-usecase';
import type { ProfileRepository } from '../../features/profile/domain/repositories/profile-repository';

const profileStorageDataSource = new ProfileStorageDataSource();
const profileRepository: ProfileRepository = new ProfileRepositoryImpl(profileStorageDataSource);

export const container = {
  loadProfileUseCase: (): LoadProfileUseCase => new LoadProfileUseCase(profileRepository),
  saveProfileUseCase: (): SaveProfileUseCase => new SaveProfileUseCase(profileRepository),
};
