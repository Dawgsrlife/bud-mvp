import type { Result } from '../../../../core/errors/result';
import type { Failure } from '../../../../core/errors/failure';
import type { ProductReportInput } from '../entities/report';

export interface ReportRepository {
  submit(input: ProductReportInput): Promise<Result<{ id: string }, Failure>>;
}
