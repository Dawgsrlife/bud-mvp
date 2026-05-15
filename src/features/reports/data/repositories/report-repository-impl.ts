import { err, ok, type Result } from '../../../../core/errors/result';
import { NetworkFailure, UnknownFailure, type Failure } from '../../../../core/errors/failure';
import type { ProductReportInput } from '../../domain/entities/report';
import type { ReportRepository } from '../../domain/repositories/report-repository';
import { ReportDataSource } from '../datasources/report-datasource';

export class ReportRepositoryImpl implements ReportRepository {
  constructor(private readonly ds: ReportDataSource) {}

  async submit(input: ProductReportInput): Promise<Result<{ id: string }, Failure>> {
    try {
      const result = await this.ds.insert(input);
      return ok(result);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : '';
      if (message.toLowerCase().includes('fetch') || message.toLowerCase().includes('network')) {
        return err(new NetworkFailure(message));
      }
      return err(new UnknownFailure(cause, 'Could not submit report'));
    }
  }
}
