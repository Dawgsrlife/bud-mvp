/**
 * DI container - the only place concrete classes meet abstractions.
 *
 * For Amir: every feature exposes its use cases through this container. The
 * presentation layer (screens, viewmodels) ONLY imports `container`, never the
 * concrete classes. That keeps cross-layer dependencies fan-in-to-this-file,
 * which makes refactors cheap.
 *
 * To add a new feature:
 * 1. Build data sources + repository in features/<name>/data/
 * 2. Build use cases in features/<name>/domain/usecases/
 * 3. Wire concrete instances at the top of this file
 * 4. Add a factory function on `container` that returns the use case
 *
 * SOLID: Dependency Inversion in its most literal form.
 */

import { ProfileStorageDataSource } from '../../features/profile/data/datasources/profile-storage-datasource';
import { ProfileRepositoryImpl } from '../../features/profile/data/repositories/profile-repository-impl';
import { LoadProfileUseCase } from '../../features/profile/domain/usecases/load-profile-usecase';
import { SaveProfileUseCase } from '../../features/profile/domain/usecases/save-profile-usecase';
import type { ProfileRepository } from '../../features/profile/domain/repositories/profile-repository';

import { OcrDataSource } from '../../features/scanner/data/datasources/ocr-datasource';
import { VerdictDataSource } from '../../features/scanner/data/datasources/verdict-datasource';
import { RemoteVerdictDataSource } from '../../features/scanner/data/datasources/remote-verdict-datasource';
import { ScannerRepositoryImpl } from '../../features/scanner/data/repositories/scanner-repository-impl';
import { ScanProductUseCase } from '../../features/scanner/domain/usecases/scan-product-usecase';
import type { ScannerRepository } from '../../features/scanner/domain/repositories/scanner-repository';

// ---------- Profile feature ----------
const profileStorageDataSource = new ProfileStorageDataSource();
const profileRepository: ProfileRepository = new ProfileRepositoryImpl(profileStorageDataSource);

// ---------- Scanner feature ----------
const ocrDataSource = new OcrDataSource();
const verdictDataSource = new VerdictDataSource();
const remoteVerdictDataSource = new RemoteVerdictDataSource();

// useRemoteVerdict toggle: defaults to true. Set to false for fully-offline
// development (skips the Edge Function entirely). When the remote call fails
// on a real run, the repo automatically falls back to the local pattern-matcher
// so a network blip never breaks a scan.
const scannerRepository: ScannerRepository = new ScannerRepositoryImpl(
  ocrDataSource,
  verdictDataSource,
  remoteVerdictDataSource,
  { useRemoteVerdict: true },
);

// ---------- Public surface ----------
export const container = {
  loadProfileUseCase: (): LoadProfileUseCase => new LoadProfileUseCase(profileRepository),
  saveProfileUseCase: (): SaveProfileUseCase => new SaveProfileUseCase(profileRepository),
  scanProductUseCase: (): ScanProductUseCase => new ScanProductUseCase(scannerRepository),
};
