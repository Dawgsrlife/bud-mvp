import type { Result } from '../../../../core/errors/result';
import type { Failure } from '../../../../core/errors/failure';
import type { ScanRecord } from '../entities/scan-record';
import type { HistoryRepository } from '../repositories/history-repository';

export class AppendHistoryUseCase {
  constructor(private readonly historyRepository: HistoryRepository) {}

  execute(record: ScanRecord): Promise<Result<void, Failure>> {
    return this.historyRepository.append(record);
  }
}
