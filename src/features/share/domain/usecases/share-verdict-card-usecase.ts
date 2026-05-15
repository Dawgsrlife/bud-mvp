// ShareVerdictCardUseCase - one-line orchestration.
// Why a usecase at all: keeps the viewmodel framework-free and easy to test.

import type { Result } from '../../../../core/errors/result';
import type { Failure } from '../../../../core/errors/failure';
import type { ShareResult, ShareableVerdict } from '../entities/shareable-verdict';
import type { ShareRepository } from '../repositories/share-repository';

export class ShareVerdictCardUseCase {
  constructor(private readonly repo: ShareRepository) {}

  async execute(
    verdict: ShareableVerdict,
    captureTarget: unknown,
  ): Promise<Result<ShareResult, Failure>> {
    const product = verdict.productName ?? 'this product';
    const subject = `Bud verdict for ${product}`;
    const fileName = `bud-verdict-${verdict.kind}-${verdict.capturedAt.getTime()}.png`;
    return this.repo.shareViewSnapshot({ captureTarget, subject, fileName });
  }
}
