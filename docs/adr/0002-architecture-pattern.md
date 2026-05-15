# ADR-002: Architecture pattern

**Status:** PROPOSED
**Date:** 2026-05-15
**Decision driver:** SOLID enforced as concrete folder rules. Scales from MVP through Phase 3 without rewrites. Survives a hypothetical Flutter ↔ RN migration (domain layer is pure language with zero framework imports).

## Decision (proposed)

**Feature-First Clean Architecture + MVVM presentation layer.**

Three concentric layers (data → domain → presentation), sliced vertically by feature. Domain layer is pure TypeScript with zero framework imports. Data layer implements domain interfaces (Dependency Inversion). Presentation uses MVVM (ViewModels expose state, Views are dumb).

## Folder structure

```
src/                              # TypeScript root
  core/                           # cross-feature plumbing
    config/                       # env, flavors, feature flags
    errors/                       # Failure base class + subtypes
    network/                      # http client, interceptors
    theme/                        # design tokens (see ADR-003)
    di/                           # injection container
    utils/                        # pure helpers only
  features/
    scanner/                      # Phase 1 feature
      data/
        datasources/              # camera-datasource, ocr-datasource, anthropic-datasource
        models/                   # JSON DTOs with zod schemas
        repositories/             # ScannerRepositoryImpl
      domain/
        entities/                 # Product, AllergenVerdict (pure)
        repositories/             # abstract ScannerRepository
        usecases/                 # ScanProduct, GetVerdict
      presentation/
        viewmodels/               # useScannerViewModel hook
        screens/                  # ScannerScreen
        widgets/                  # CameraOverlay, VerdictCard
    profile/                      # allergen profile feature
    symptoms/                     # Phase 3 (empty for MVP)
    receipts/                     # Phase 3 (empty for MVP)
  shared/
    widgets/                      # truly reusable UI (Button, Card)
    extensions/
test/
  unit/                           # mirrors src/ structure
  widget/                         # screen + widget tests
  integration/                    # end-to-end scan flow (postponed until pre-launch)
```

## SOLID as concrete folder/file rules

| Principle | Rule |
|---|---|
| **S — Single Responsibility** | One class per file. Suffix denotes role: `*-screen`, `*-viewmodel`, `*-repository-impl`, `*-usecase`, `*-datasource`. If a file holds two roles, split it. |
| **O — Open-Closed** | New features = new folder under `features/`. Never edit a shipped feature folder to add capabilities. Exception: bug fixes inside the responsible feature. |
| **L — Liskov Substitution** | All `*RepositoryImpl` honor their abstract contract shape exactly. If `ScannerRepository.scan()` returns `Either<Failure, Verdict>`, every impl returns the same shape. No throwing where abstract returns Either. |
| **I — Interface Segregation** | Split fat interfaces. `ScannerRepository`, `ProfileRepository`, `HistoryRepository` separately. Not one mega `BudRepository`. |
| **D — Dependency Inversion** | Domain defines abstract repos. Data implements. Presentation depends on use cases, not implementations. DI container is the only place concrete meets abstract. |

## Dependency injection

**Approach:** simple TypeScript factory functions in `core/di/container.ts`. Avoid heavy DI frameworks (`tsyringe`, `inversify`) for the MVP — they add ceremony without benefit at this scale.

```typescript
// core/di/container.ts
export const container = {
  scannerRepository: (): ScannerRepository => new ScannerRepositoryImpl(
    cameraDataSource(),
    ocrDataSource(),
    anthropicDataSource(),
  ),
  scanProductUseCase: (): ScanProductUseCase => new ScanProductUseCase(
    container.scannerRepository(),
  ),
  // ...
};
```

ViewModels receive use cases via constructor (class-based) or as args to the hook (functional). No `container.x` calls inside widgets — only at the route-build boundary.

## Naming

| Element | Convention | Example |
|---|---|---|
| Files | `kebab-case.ts` | `scanner-viewmodel.ts` |
| Classes | `PascalCase`, suffix matches file | `ScannerViewModel` |
| Functions | `camelCase`, verb-first | `scanBarcode()` not `barcodeScan()` |
| Hooks | `useXxx` | `useScannerViewModel` |
| Types | `PascalCase` | `Verdict`, `AllergenProfile` |
| Constants | `UPPER_SNAKE_CASE` (env) or `kCamelCase` (component-scoped) | `MAX_SCAN_DURATION_MS` |
| Tests | `<unit-under-test>.test.ts` | `scan-product-usecase.test.ts` |
| Test descriptions | behavior, not implementation | `'returns Failure when OCR confidence < 0.7'` |

## Layer responsibilities (the contract)

- **Presentation:** screens, widgets, viewmodels. Knows nothing about HTTP or JSON. Imports only from `domain/usecases/`, `core/theme/`, `shared/widgets/`.
- **Domain:** entities, use cases, abstract repos. Pure TypeScript, zero imports from `data/` or `presentation/`. This is the layer that survives a Flutter ↔ RN migration.
- **Data:** datasources, DTOs, repo implementations. Only place where Axios/Supabase/Camera/Anthropic SDK appears.

## Lint enforcement

ESLint `eslint-plugin-boundaries` to block cross-layer leaks:

```json
"boundaries/element-types": [2, {
  "default": "disallow",
  "rules": [
    { "from": "presentation", "allow": ["domain", "core", "shared"] },
    { "from": "domain", "allow": ["core"] },
    { "from": "data", "allow": ["domain", "core"] }
  ]
}]
```

CI fails any PR that crosses layers.

## Testing strategy (MVP scope)

- **Unit (mandatory):** every use case, every repo impl with mocked datasources, pure utils. Target ≥ 80% on `domain/`.
- **Widget:** ScannerScreen happy path + error state. VerdictCard rendering. Allergen profile setup flow.
- **Integration:** one golden path (camera open → mock OCR text → see verdict). Postponed until pre-launch hardening.
- **Skip:** theme, simple stateless widgets, generated code.

## Reference repos

- [Reso Coder's Flutter TDD Clean Architecture series](https://resocoder.com) (canonical pattern, port concepts to TS)
- [eduardomoroni/react-native-clean-architecture](https://github.com/eduardomoroni/react-native-clean-architecture) (TS canonical reference)
- [gronxb/react-native-clean-architecture-example](https://github.com/gronxb/react-native-clean-architecture-example) (modern TS example)

## Approval

- [ ] Alex
- [ ] Amir
