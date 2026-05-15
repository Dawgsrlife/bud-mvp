// ShareRepositoryImpl - bridges the snapshot + share-sheet datasources to the domain contract.

import { err, ok, type Result } from '../../../../core/errors/result';
import {
  ShareUnavailableFailure,
  UnknownFailure,
  type Failure,
} from '../../../../core/errors/failure';
import type {
  ShareRepository,
  ShareViewSnapshotInput,
} from '../../domain/repositories/share-repository';
import type { ShareResult } from '../../domain/entities/shareable-verdict';
import { SnapshotDataSource } from '../datasources/snapshot-datasource';
import { ShareSheetDataSource } from '../datasources/share-sheet-datasource';

export class ShareRepositoryImpl implements ShareRepository {
  constructor(
    private readonly snapshot: SnapshotDataSource,
    private readonly sheet: ShareSheetDataSource,
  ) {}

  async shareViewSnapshot(
    input: ShareViewSnapshotInput,
  ): Promise<Result<ShareResult, Failure>> {
    try {
      const available = await this.sheet.isAvailable();
      if (!available) {
        return err(new ShareUnavailableFailure());
      }
      const uri = await this.snapshot.captureToPng(input.captureTarget, input.fileName);
      await this.sheet.share(uri, input.subject);
      return ok({ kind: 'shared' });
    } catch (cause) {
      return err(new UnknownFailure(cause, 'Share failed'));
    }
  }
}
