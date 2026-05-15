/**
 * ScannerRepository - abstract contract.
 *
 * SOLID:
 * - Interface Segregation: only scan-related methods. Profile + history live elsewhere.
 * - Dependency Inversion: domain defines this, data implements it.
 * - Liskov: every implementation returns the same Result shape, never throws.
 */

import type { Result } from '../../../../core/errors/result';
import type {
  CameraPermissionFailure,
  LowConfidenceFailure,
  NetworkFailure,
  OcrFailure,
  VerdictFailure,
} from '../../../../core/errors/failure';
import type { AllergenProfile } from '../entities/allergen-profile';
import type { Verdict } from '../entities/verdict';

export type ScanFailure =
  | CameraPermissionFailure
  | OcrFailure
  | LowConfidenceFailure
  | NetworkFailure
  | VerdictFailure;

export interface ScannerRepository {
  /**
   * Scan a captured image against the user's allergen profile.
   * Burst input (3-5 frames) gets de-duped at the LLM layer.
   */
  scan(
    imageBytes: ReadonlyArray<Uint8Array>,
    profile: AllergenProfile,
  ): Promise<Result<Verdict, ScanFailure>>;
}
