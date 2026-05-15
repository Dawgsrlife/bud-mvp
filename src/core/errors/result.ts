/**
 * Result type — Either<Success, Failure> equivalent.
 *
 * Use this as the return type of every repository and use case.
 * Forces callers to handle the failure path explicitly. No silent throws.
 *
 * SOLID: Dependency Inversion. Domain depends on this abstraction, data implements it.
 */

import type { Failure } from './failure';

export type Result<T, F extends Failure = Failure> =
  | { ok: true; value: T }
  | { ok: false; failure: F };

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });

export const err = <F extends Failure>(failure: F): Result<never, F> => ({ ok: false, failure });

/** Type guard. */
export const isOk = <T, F extends Failure>(
  r: Result<T, F>,
): r is { ok: true; value: T } => r.ok;

/** Type guard. */
export const isErr = <T, F extends Failure>(
  r: Result<T, F>,
): r is { ok: false; failure: F } => !r.ok;
