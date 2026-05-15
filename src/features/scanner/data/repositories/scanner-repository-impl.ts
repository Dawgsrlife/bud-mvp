/**
 * ScannerRepositoryImpl - implements the domain ScannerRepository contract.
 *
 * For Amir: the repo orchestrates the OCR datasource + the verdict datasource.
 * Slice 4 wired the local-mock verdict; slice 5 swaps to the remote (Supabase
 * Edge Function) verdict via DI. The repo itself stays clean; that's the value
 * of clean architecture.
 *
 * If `useRemoteVerdict` is true (default), we call the Edge Function. If false,
 * or if the remote call fails with a network error, we fall back to the local
 * pattern-matcher so the app never hard-errors on a scan.
 *
 * SOLID:
 * - Single Responsibility: orchestrate one scan flow, nothing else.
 * - Open-Closed: new verdict providers (Gemini direct, on-device Llama) plug in
 *   by adding new datasources, not editing this file.
 * - Liskov: every implementation returns Result<Verdict, ScanFailure>. No throws.
 * - Dependency Inversion: depends on data source types, not concrete classes.
 */

import { err, ok, type Result } from '../../../../core/errors/result';
import {
  LowConfidenceFailure,
  NetworkFailure,
  OcrFailure,
  UnknownFailure,
} from '../../../../core/errors/failure';
import type { AllergenProfile } from '../../domain/entities/allergen-profile';
import type { Verdict } from '../../domain/entities/verdict';
import type {
  ScannerRepository,
  ScanFailure,
} from '../../domain/repositories/scanner-repository';
import type { OcrDataSource } from '../datasources/ocr-datasource';
import type { VerdictDataSource } from '../datasources/verdict-datasource';
import type { RemoteVerdictDataSource } from '../datasources/remote-verdict-datasource';

const MIN_CONFIDENCE = 0.7;

interface ScannerRepositoryImplOptions {
  /**
   * When true, calls the Edge Function (real Gemini/Claude verdict). When
   * false, uses the local pattern-matcher only. Default true. Auto-falls-back
   * to local on network failure.
   */
  useRemoteVerdict?: boolean;
}

export class ScannerRepositoryImpl implements ScannerRepository {
  private readonly useRemoteVerdict: boolean;

  constructor(
    private readonly ocr: OcrDataSource,
    private readonly localVerdict: VerdictDataSource,
    private readonly remoteVerdict: RemoteVerdictDataSource,
    options: ScannerRepositoryImplOptions = {},
  ) {
    this.useRemoteVerdict = options.useRemoteVerdict ?? true;
  }

  async scan(
    _imageBytes: ReadonlyArray<Uint8Array>,
    profile: AllergenProfile,
  ): Promise<Result<Verdict, ScanFailure>> {
    try {
      // 1. Read text from the captured image. Slice 5 still uses the mock OCR
      //    cycler; slice 6 swaps in Apple Vision / ML Kit native OCR.
      const ocrResult = await this.ocr.readText('placeholder-uri');

      if (!ocrResult.text) {
        return err(new OcrFailure());
      }
      if (ocrResult.confidence < MIN_CONFIDENCE) {
        return err(new LowConfidenceFailure(ocrResult.confidence));
      }

      // 2. Decide which verdict path. Remote (real LLM via Edge Function) is
      //    preferred. Local pattern-matcher is the safety net.
      if (this.useRemoteVerdict) {
        const remoteResult = await this.remoteVerdict.produce(
          ocrResult.text,
          ocrResult.confidence,
          profile,
        );

        if ('verdict' in remoteResult) {
          return ok(remoteResult.verdict);
        }

        // Remote failed. Network-class failures fall back to the local matcher
        // so the user always gets an answer. Server-class failures surface to
        // the UI as an error so we can debug.
        if (remoteResult.kind === 'network') {
          const verdict = this.localVerdict.produce(
            ocrResult.text,
            profile,
            ocrResult.confidence,
          );
          return ok(verdict);
        }
        if (remoteResult.kind === 'server') {
          return err(new NetworkFailure(`Server: ${remoteResult.message}`));
        }
        return err(new UnknownFailure(remoteResult, 'Got bad response from verdict service'));
      }

      // Local-only path (dev / offline mode)
      const verdict = this.localVerdict.produce(ocrResult.text, profile, ocrResult.confidence);
      return ok(verdict);
    } catch (cause) {
      return err(new UnknownFailure(cause, 'Scan failed'));
    }
  }
}
