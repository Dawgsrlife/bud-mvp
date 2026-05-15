import type { Result } from '../../../../core/errors/result';
import type { Failure } from '../../../../core/errors/failure';
import type { ScanRecord } from '../entities/scan-record';
import type { HistoryRepository } from '../repositories/history-repository';

export class ListHistoryUseCase {
  constructor(private readonly historyRepository: HistoryRepository) {}

  execute(limit?: number): Promise<Result<ScanRecord[], Failure>> {
    return this.historyRepository.list(limit);
  }
}
