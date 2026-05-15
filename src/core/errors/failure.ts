/**
 * Failure base class - domain-level error type.
 *
 * Every repository contract returns `Result<T, Failure>` (or equivalent),
 * never throws. Datasources may throw; the repo boundary maps to Failure subtypes.
 *
 * SOLID: Liskov. Every Failure subtype is interchangeable in the type signature.
 */

export abstract class Failure {
  constructor(public readonly message: string) {}
}

// Network layer
export class NetworkFailure extends Failure {
  constructor(message = 'Network unavailable') {
    super(message);
  }
}

export class TimeoutFailure extends Failure {
  constructor(message = 'Request timed out') {
    super(message);
  }
}

// Camera + OCR
export class CameraPermissionFailure extends Failure {
  constructor(message = 'Camera permission denied') {
    super(message);
  }
}

export class OcrFailure extends Failure {
  constructor(message = 'Could not read package text') {
    super(message);
  }
}

export class LowConfidenceFailure extends Failure {
  constructor(public readonly confidence: number) {
    super(`OCR confidence too low: ${confidence}`);
  }
}

// LLM / verdict
export class VerdictFailure extends Failure {
  constructor(message = 'Could not produce a verdict') {
    super(message);
  }
}

// Auth / profile
export class UnauthenticatedFailure extends Failure {
  constructor(message = 'User not signed in') {
    super(message);
  }
}

export class ProfileMissingFailure extends Failure {
  constructor(message = 'Allergen profile not set up') {
    super(message);
  }
}

// Generic fallback (use sparingly)
export class UnknownFailure extends Failure {
  constructor(public readonly cause?: unknown, message = 'Something went wrong') {
    super(message);
  }
}
