// DI container - the only place concrete classes meet abstractions.
// SOLID: Dependency Inversion. Single wiring point.

import { ProfileStorageDataSource } from '../../features/profile/data/datasources/profile-storage-datasource';
import { ProfileRepositoryImpl } from '../../features/profile/data/repositories/profile-repository-impl';
import { LoadProfileUseCase } from '../../features/profile/domain/usecases/load-profile-usecase';
import { SaveProfileUseCase } from '../../features/profile/domain/usecases/save-profile-usecase';
import type { ProfileRepository } from '../../features/profile/domain/repositories/profile-repository';

import { OcrDataSource } from '../../features/scanner/data/datasources/ocr-datasource';
import { VerdictDataSource } from '../../features/scanner/data/datasources/verdict-datasource';
import { ScannerRepositoryImpl } from '../../features/scanner/data/repositories/scanner-repository-impl';
import { ScanProductUseCase } from '../../features/scanner/domain/usecases/scan-product-usecase';
import type { ScannerRepository } from '../../features/scanner/domain/repositories/scanner-repository';

const profileStorageDataSource = new ProfileStorageDataSource();
const profileRepository: ProfileRepository = new ProfileRepositoryImpl(profileStorageDataSource);

const ocrDataSource = new OcrDataSource();
const verdictDataSource = new VerdictDataSource();
const scannerRepository: ScannerRepository = new ScannerRepositoryImpl(
  ocrDataSource,
  verdictDataSource,
);

export const container = {
  loadProfileUseCase: (): LoadProfileUseCase => new LoadProfileUseCase(profileRepository),
  saveProfileUseCase: (): SaveProfileUseCase => new SaveProfileUseCase(profileRepository),
  scanProductUseCase: (): ScanProductUseCase => new ScanProductUseCase(scannerRepository),
};
