// ScannerRepositoryImpl - implements the domain contract.
// Slice 4: OCR + local verdict. Slice 5: swaps verdict to LLM via Supabase Edge Function.

import { err, ok, type Result } from '../../../../core/errors/result';
import { LowConfidenceFailure, OcrFailure, UnknownFailure } from '../../../../core/errors/failure';
import type { AllergenProfile } from '../../domain/entities/allergen-profile';
import type { Verdict } from '../../domain/entities/verdict';
import type {
  ScannerRepository,
  ScanFailure,
} from '../../domain/repositories/scanner-repository';
import type { OcrDataSource } from '../datasources/ocr-datasource';
import type { VerdictDataSource } from '../datasources/verdict-datasource';

const MIN_CONFIDENCE = 0.7;

export class ScannerRepositoryImpl implements ScannerRepository {
  constructor(
    private readonly ocr: OcrDataSource,
    private readonly verdict: VerdictDataSource,
  ) {}

  async scan(
    _imageBytes: ReadonlyArray<Uint8Array>,
    profile: AllergenProfile,
  ): Promise<Result<Verdict, ScanFailure>> {
    try {
      // Slice 4 wires the mocked OCR. In slice 5 we'll pass real bytes.
      const ocrResult = await this.ocr.readText('placeholder-uri');
      if (!ocrResult.text) {
        return err(new OcrFailure());
      }
      if (ocrResult.confidence < MIN_CONFIDENCE) {
        return err(new LowConfidenceFailure(ocrResult.confidence));
      }
      const verdict = this.verdict.produce(ocrResult.text, profile, ocrResult.confidence);
      return ok(verdict);
    } catch (cause) {
      return err(new UnknownFailure(cause, 'Scan failed'));
    }
  }
}
