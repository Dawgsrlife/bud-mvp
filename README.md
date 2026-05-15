# BUD MVP — mobile app

The pre-launch BUD app. Camera → OCR → LLM verdict against the user's allergen profile.

## Repo location

This directory is a **combo location**:
- It is a **private GitHub repo** (`Dawgsrlife/bud-mvp`, TBD final name) — authoritative source, version control, PR reviews, CI/CD
- It also lives **inside `zedsio-shared-vault/`** so Amir + Amir's Claude see the working tree live via Syncthing

**Syncthing does NOT sync the `.git/` folder** (filtered by `.stignore`) to avoid git index corruption from concurrent filesystem writes across machines. GitHub is the source of truth for history. Syncthing is just a live mirror of the working tree.

## How to work

### From Alex's Windows PC

```powershell
cd C:\Users\33576\zedsio-shared-vault\programming\bud-mvp
git pull
# edit
git add -A
git commit -m "..."
git push
```

### From Amir's PC

Syncthing has already mirrored the working tree. To get the git authority too:

```bash
cd ~/zedsio-shared-vault/programming/bud-mvp
git init  # if .git not present (it won't be — excluded from sync)
git remote add origin https://github.com/Dawgsrlife/bud-mvp.git
git pull origin main
```

After that, Amir's local copy has its own `.git/`. Both copies sync via push/pull, not Syncthing.

### From the AI PC (amir-linux)

Same as Amir's PC. Use `gh auth login` once.

## Branching strategy

- `main`: always shippable. Direct push protected; PR required.
- `feat/<feature-name>`: feature branches off main.
- `fix/<bug>`: bugfix branches off main.
- One PR per feature. Reviewer = the other co-founder.
- Squash merge to main. Linear history.

## Architecture

See [`docs/adr/`](docs/adr/) for architecture decision records.

- **ADR-001:** Stack lock (Flutter or React Native, decided after parallel research 2026-05-15)
- **ADR-002:** Feature-First Clean Architecture + MVVM
- **ADR-003:** Animation library + design token system
- **ADR-004:** OCR + LLM provider choice

## Code quality

This codebase follows **SOLID principles** as concrete folder/file rules:

1. **Single Responsibility:** one class per file, suffix denotes role (`*_screen`, `*_viewmodel`, `*_repository_impl`, `*_usecase`, `*_datasource`)
2. **Open-Closed:** new features = new folder under `features/`. Never edit shipped feature folders to add capabilities.
3. **Liskov Substitution:** all repository implementations honor the abstract contract shape exactly.
4. **Interface Segregation:** split fat interfaces. `ScannerRepository`, `ProfileRepository`, `HistoryRepository` separately — not one mega `BudRepository`.
5. **Dependency Inversion:** domain defines abstract repos. Data implements. Presentation depends on use cases, not implementations. DI container is the only place concrete meets abstract.

See [`docs/code-quality.md`](docs/code-quality.md) for the full enforced rules.

## Folder structure (post-scaffold)

```
lib/                              # or src/ for RN
  core/                           # cross-feature plumbing
    config/                       # env, flavors, feature flags
    errors/                       # Failure base class + subtypes
    network/                      # http client, interceptors
    theme/                        # design tokens, colors, typography
    di/                           # injection container
    utils/                        # pure helpers only
  features/
    scanner/                      # Phase 1 feature
      data/
      domain/
      presentation/
    profile/                      # allergen profile feature
    symptoms/                     # Phase 3 placeholder
    receipts/                     # Phase 3 placeholder
  shared/
    widgets/                      # reusable Button, Card, etc.
test/
  unit/
  widget/
  integration/
docs/
  adr/                            # architecture decision records
  design/                         # design tokens, screen mockups, reference screenshots
```

## What goes in /docs/

- **ADRs** (`adr/000N-title.md`): append-only architecture decisions. Never edited after merge.
- **Design** (`design/`): design tokens spec, reference screen captures, animation timing curves.
- **Onboarding** (`onboarding.md`): how a new contributor sets up.

## What goes in /lib/ or /src/

Code only. No docs, no images, no notes. Use `docs/` for everything else.

## Vibe-coding rules (Alex's standing instruction)

Both founders use Claude Code (vibe coding) to write much of this codebase. To prevent AI slop:

- **Stay inside the architecture.** If Claude wants to write code that crosses layers, push back.
- **One concern per file.** If Claude generates a 400-line file mixing UI + state + HTTP, split it before merging.
- **Names matter.** Bad name = bad abstraction. Rename until the file teaches what it does.
- **Tests first when behavior is non-obvious.** Use cases get unit tests. UI gets widget tests for happy + error states.
- **Read every diff before commit.** Don't `git add -A` blindly.
- **ADR or it didn't happen.** Architecture decisions get an ADR before the code lands.
