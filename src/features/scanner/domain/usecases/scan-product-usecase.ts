/**
 * ScanProductUseCase - one business action.
 *
 * SOLID:
 * - Single Responsibility: orchestrates one scan flow.
 * - Dependency Inversion: depends on the abstract ScannerRepository, not the impl.
 */

import type { Result } from '../../../../core/errors/result';
import type { AllergenProfile } from '../entities/allergen-profile';
import type { Verdict } from '../entities/verdict';
import type { ScannerRepository, ScanFailure } from '../repositories/scanner-repository';

export class ScanProductUseCase {
  constructor(private readonly scannerRepository: ScannerRepository) {}

  execute(
    imageBytes: ReadonlyArray<Uint8Array>,
    profile: AllergenProfile,
  ): Promise<Result<Verdict, ScanFailure>> {
    return this.scannerRepository.scan(imageBytes, profile);
  }
}
