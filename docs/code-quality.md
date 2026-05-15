# Code quality rules. BUD MVP

This is the contract for every line of code that lands in the repo. UTM-grade quality. SOLID enforced.

## The 5 SOLID principles, as concrete folder/file rules

### S. Single Responsibility

**Rule:** one class per file. The file name + class name tell you exactly what it does.

| Suffix | Role | Touches |
|---|---|---|
| `*_screen` | full-screen UI widget | ViewModel + widgets only |
| `*_viewmodel` | UI state + commands | UseCases only (no HTTP, no DTOs) |
| `*_usecase` | one business action | Repository abstractions only |
| `*_repository` | abstract contract (in domain/) | nothing. pure interface |
| `*_repository_impl` | concrete implementation (in data/) | DataSources only |
| `*_datasource` | I/O boundary (HTTP, camera, OCR, DB) | external SDKs |
| `*_model` | DTO with fromJson/toJson (in data/) | JSON |
| (no suffix in domain/entities/) | pure business entity | nothing |

**If a file holds two roles, split it.**

### O. Open-Closed

**Rule:** new features go in new folders under `features/`. Never edit a shipped feature folder to add capabilities.

Examples:
- ❌ Adding "show product history" by editing `features/scanner/`
- ✅ Adding "show product history" by creating `features/history/`

**Exception:** bug fixes inside the responsible feature folder. ADR-002 governs this.

### L. Liskov Substitution

**Rule:** every implementation honors its abstract contract shape exactly.

```dart
// domain
abstract class ScannerRepository {
  Future<Either<Failure, Verdict>> scan(Uint8List imageBytes);
}

// data. implements with the SAME return shape
class ScannerRepositoryImpl implements ScannerRepository {
  @override
  Future<Either<Failure, Verdict>> scan(Uint8List imageBytes) async {
    try { ... return Right(verdict); }
    on NetworkException { return Left(NetworkFailure()); }
    // NEVER throw. abstract contract says we return Either
  }
}
```

**If a method throws when the abstract returns `Either`, you've violated LSP.**

### I. Interface Segregation

**Rule:** split fat interfaces. Each repository handles ONE domain concept.

- ✅ `ScannerRepository` (scan-related operations only)
- ✅ `ProfileRepository` (allergen profile only)
- ✅ `HistoryRepository` (past scan history only)
- ❌ `BudRepository` (everything)

### D. Dependency Inversion

**Rule:** dependencies point inward. Domain at the center, then data + presentation outside.

```
[presentation] ──depends on──> [domain (abstract)]
                                     ^
                                     |
                                  [data (impl)] ──depends on──> external SDKs
```

**The DI container is the ONLY place concrete classes meet abstractions.** Widgets don't `import` from `data/`. ViewModels don't `import` from `data/`. Use cases depend on abstract repositories.

```dart
// ✅ presentation/viewmodels/scanner_viewmodel.dart
import '../../domain/usecases/scan_product_usecase.dart';  // ok

// ❌ presentation/viewmodels/scanner_viewmodel.dart
import '../../data/datasources/anthropic_datasource.dart';  // VIOLATION
```

**Enforce with lint:** `import_lint` (Flutter) or ESLint `boundaries` plugin (RN). Configure in CI to fail PRs that cross layers.

## Anti-patterns Claude Code commonly generates. reject these on review

1. **God ViewModel with HTTP calls.** Fix: ViewModel only calls UseCases.
2. **API keys in source code.** Fix: `.env` + `flutter_dotenv` / `react-native-config`, loaded in `core/config/`. `.env` is gitignored.
3. **Logic in `build()` methods.** Fix: compute in ViewModel, pass primitives to widgets.
4. **Importing `data/` from `presentation/`.** Fix: lint rule.
5. **One mega `models/` folder for the whole app.** Fix: models live inside their feature.
6. **Catching `Exception` and swallowing.** Fix: map to `Failure` subtypes at the repo boundary.
7. **Magic numbers + magic strings.** Fix: extract to `core/theme/tokens` (UI) or feature-level `constants.dart` (logic).
8. **Inconsistent corner radii / spacings / colors.** Fix: design tokens are the only source. No hardcoded `Color(0xFF...)` in widgets.
9. **No press feedback on touchable elements.** Fix: every tappable widget has visual feedback (Material InkWell, Cupertino opacity, or custom spring).
10. **Loading spinners with no skeleton.** Fix: skeleton loaders for any predictable layout.

## Testing strategy (MVP scope)

- **Unit tests (mandatory):** every use case, every repo impl with mocked datasources, pure utils. Target ≥ 80% line coverage on `domain/`.
- **Widget tests:** ScannerScreen happy path + error state. VerdictCard rendering. Allergen profile setup flow.
- **Integration tests:** one golden path (camera open → mock OCR text → see verdict). Postponed until pre-launch hardening.
- **Skip in MVP:** theme, simple stateless widgets, generated code.

## Naming conventions

| Element | Convention | Example |
|---|---|---|
| Files (Flutter) | `snake_case.dart` | `scanner_viewmodel.dart` |
| Files (RN) | `kebab-case.ts` | `scanner-viewmodel.ts` |
| Classes | `PascalCase`, suffix matches file | `ScannerViewModel` |
| Functions | `camelCase`, verb-first | `scanBarcode()` not `barcodeScan()` |
| Constants | `kCamelCase` (Flutter) or `UPPER_SNAKE` (RN) | `kMaxScanDuration` / `MAX_SCAN_DURATION` |
| Tests | `<unit>_test.dart`, group by class | `group('ScannerViewModel', () { ... })` |
| Test descriptions | behavior, not implementation | `'returns Failure when OCR confidence < 0.7'` |

## Code review checklist (before merging any PR)

- [ ] No file does more than one thing
- [ ] No `data/` import inside `presentation/`
- [ ] All hardcoded strings/colors/numbers extracted to tokens or constants
- [ ] Every public function has a doc comment if behavior is non-obvious
- [ ] Tests added for new use cases
- [ ] Diff is readable (no 1000-line uncommented file)
- [ ] No secrets committed
- [ ] No `print()` / `console.log()` left in shipped code (use a logger)
- [ ] ADR exists for any architectural change

## Forbidden patterns

- ❌ `// TODO: fix later` in shipped code → either fix now or open a GitHub issue
- ❌ Commented-out code → delete it; git has the history
- ❌ Singleton patterns outside the DI container
- ❌ Global mutable state
- ❌ Circular imports (lint catches these)
- ❌ Hardcoded API URLs (use env)
- ❌ `// ignore_for_file:` directives without ADR justification

## When in doubt

Read [Reso Coder's Flutter clean architecture series](https://resocoder.com) (Flutter) or [Eduardo Moroni's React Native clean architecture repo](https://github.com/eduardomoroni/react-native-clean-architecture) (RN). Both are canonical references.

The folder structure IS the spec. Stay inside it.
