// ShareRepository - contract for capturing a node + handing it to the OS share sheet.
// Implementation lives in data/. Domain knows nothing about view-shot or expo-sharing.

import type { Result } from '../../../../core/errors/result';
import type { Failure } from '../../../../core/errors/failure';
import type { ShareResult } from '../entities/shareable-verdict';

export interface ShareRepository {
  shareViewSnapshot(input: ShareViewSnapshotInput): Promise<Result<ShareResult, Failure>>;
}

export interface ShareViewSnapshotInput {
  // Opaque token. Caller passes a React Native View ref (or numeric tag);
  // implementations decide what to do with it.
  readonly captureTarget: unknown;
  readonly subject: string;
  readonly fileName: string;
}
