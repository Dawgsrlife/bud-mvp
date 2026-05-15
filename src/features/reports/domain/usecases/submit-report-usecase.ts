import type { Result } from '../../../../core/errors/result';
import type { Failure } from '../../../../core/errors/failure';
import type { ProductReportInput } from '../entities/report';
import type { ReportRepository } from '../repositories/report-repository';

export class SubmitReportUseCase {
  constructor(private readonly repo: ReportRepository) {}
  execute(input: ProductReportInput): Promise<Result<{ id: string }, Failure>> {
    return this.repo.submit(input);
  }
}
