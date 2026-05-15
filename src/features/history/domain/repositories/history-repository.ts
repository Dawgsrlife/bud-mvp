// HistoryRepository - abstract contract.
//
// SOLID: Interface Segregation. Only history concerns. Profile + Scanner are separate.

import type { Result } from '../../../../core/errors/result';
import type { Failure } from '../../../../core/errors/failure';
import type { ScanRecord } from '../entities/scan-record';

export interface HistoryRepository {
  list(limit?: number): Promise<Result<ScanRecord[], Failure>>;
  append(record: ScanRecord): Promise<Result<void, Failure>>;
  clear(): Promise<Result<void, Failure>>;
}
