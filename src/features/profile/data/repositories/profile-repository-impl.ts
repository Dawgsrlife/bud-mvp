// ProfileRepositoryImpl - implements the domain contract.
// SOLID: Liskov. Returns Result shape always, never throws.
// SOLID: Dependency Inversion. Domain depends on the abstract contract, not this file.

import { err, ok, type Result } from '../../../../core/errors/result';
import { UnknownFailure, type Failure } from '../../../../core/errors/failure';
import { AllergenProfile } from '../../../scanner/domain/entities/allergen-profile';
import type { ProfileRepository } from '../../domain/repositories/profile-repository';
import type { ProfileStorageDataSource } from '../datasources/profile-storage-datasource';

export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(private readonly storage: ProfileStorageDataSource) {}

  async load(): Promise<Result<AllergenProfile, Failure>> {
    try {
      const profile = await this.storage.read();
      return ok(profile ?? AllergenProfile.empty());
    } catch (cause) {
      return err(new UnknownFailure(cause, 'Could not load profile'));
    }
  }

  async save(profile: AllergenProfile): Promise<Result<void, Failure>> {
    try {
      await this.storage.write(profile);
      return ok(undefined);
    } catch (cause) {
      return err(new UnknownFailure(cause, 'Could not save profile'));
    }
  }

  async clear(): Promise<Result<void, Failure>> {
    try {
      await this.storage.clear();
      return ok(undefined);
    } catch (cause) {
      return err(new UnknownFailure(cause, 'Could not clear profile'));
    }
  }
}
