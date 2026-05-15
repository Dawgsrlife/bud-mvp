// HistoryRepositoryImpl - implements the domain contract over AsyncStorage.
//
// SOLID: Liskov. Returns Result<T, Failure>, never throws.

import { err, ok, type Result } from '../../../../core/errors/result';
import { UnknownFailure, type Failure } from '../../../../core/errors/failure';
import type { ScanRecord } from '../../domain/entities/scan-record';
import type { HistoryRepository } from '../../domain/repositories/history-repository';
import type { HistoryStorageDataSource } from '../datasources/history-storage-datasource';

export class HistoryRepositoryImpl implements HistoryRepository {
  constructor(private readonly storage: HistoryStorageDataSource) {}

  async list(limit?: number): Promise<Result<ScanRecord[], Failure>> {
    try {
      const all = await this.storage.readAll();
      return ok(limit ? all.slice(0, limit) : all);
    } catch (cause) {
      return err(new UnknownFailure(cause, 'Could not load scan history'));
    }
  }

  async append(record: ScanRecord): Promise<Result<void, Failure>> {
    try {
      await this.storage.prepend(record);
      return ok(undefined);
    } catch (cause) {
      return err(new UnknownFailure(cause, 'Could not save scan to history'));
    }
  }

  async clear(): Promise<Result<void, Failure>> {
    try {
      await this.storage.clear();
      return ok(undefined);
    } catch (cause) {
      return err(new UnknownFailure(cause, 'Could not clear scan history'));
    }
  }
}
