/**
 * RemoteVerdictDataSource - calls the Supabase Edge Function `verdict`.
 *
 * For Amir: this is the production path. It sends OCR text + the user's allergen
 * profile to our Edge Function, which holds the Gemini and Anthropic keys
 * server-side and returns a Verdict. We never expose API keys to the mobile
 * client.
 *
 * Implements the same shape as the local mock `VerdictDataSource`, so the
 * ScannerRepository can swap between them by changing one DI line. That's
 * Dependency Inversion in action.
 *
 * Error contract: never throws. Returns either a Verdict or a Failure-shaped
 * error string. The repo layer wraps it in our Result<T, Failure> type.
 */

import { getSupabase } from '../../../../core/network/supabase-client';
import type { AllergenProfile } from '../../domain/entities/allergen-profile';
import { Verdict } from '../../domain/entities/verdict';

/**
 * Raw shape returned by the Edge Function. Matches the JSON schema documented in
 * `supabase/functions/verdict/index.ts`.
 */
interface RemoteVerdictPayload {
  kind: 'compatible' | 'avoid' | 'caution' | 'unknown';
  reason: string;
  triggeredAllergens: string[];
  mayContainAllergens: string[];
  confidence: number;
  normalizedProductName?: string;
  displayName?: string;
}

interface EdgeFunctionResponse {
  verdict: RemoteVerdictPayload;
  productId?: string;
  modelUsed?: string;
}

export type RemoteVerdictError =
  | { kind: 'network' }
  | { kind: 'server'; message: string }
  | { kind: 'malformed' };

export class RemoteVerdictDataSource {
  /**
   * Produce a verdict by calling the `verdict` Edge Function.
   *
   * @param ocrText - The raw text the camera + on-device OCR produced.
   * @param ocrConfidence - 0..1 confidence the OCR engine reported.
   * @param profile - The user's saved allergen profile.
   * @param locale - eg "en-CA". Default Canadian English.
   * @returns Verdict on success, or a typed error.
   */
  async produce(
    ocrText: string,
    ocrConfidence: number,
    profile: AllergenProfile,
    locale = 'en-CA',
  ): Promise<{ verdict: Verdict; modelUsed?: string } | RemoteVerdictError> {
    const supabase = getSupabase();

    try {
      const { data, error } = await supabase.functions.invoke<EdgeFunctionResponse>('verdict', {
        body: {
          ocrText,
          ocrConfidence,
          profileAllergens: [...profile.allergens],
          locale,
        },
      });

      if (error) {
        return { kind: 'server', message: error.message };
      }
      if (!data?.verdict) {
        return { kind: 'malformed' };
      }

      const payload = data.verdict;
      const verdict = this.toDomain(payload);
      return { verdict, modelUsed: data.modelUsed };
    } catch (cause) {
      // Network failure, CORS, offline, etc.
      return { kind: 'network' };
    }
  }

  /**
   * Convert the Edge Function JSON payload into our domain Verdict entity.
   * Keeps the domain layer ignorant of the wire format.
   */
  private toDomain(payload: RemoteVerdictPayload): Verdict {
    switch (payload.kind) {
      case 'compatible':
        return Verdict.compatible(payload.reason);
      case 'avoid':
        return Verdict.avoid(payload.triggeredAllergens, payload.reason, payload.confidence);
      case 'caution':
        return Verdict.caution(payload.mayContainAllergens, payload.reason, payload.confidence);
      case 'unknown':
      default:
        return Verdict.unknown(payload.reason);
    }
  }
}
