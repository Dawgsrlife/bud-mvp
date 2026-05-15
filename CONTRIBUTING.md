# Contributing to BUD MVP

Quick rules of the road. Long-form: see `docs/code-quality.md` + `docs/adr/`.

## Setup

```bash
cd /path/to/zedsio-shared-vault/programming/bud-mvp
npm install
npm run start   # Expo dev server
npm run ios     # iOS simulator (requires macOS) or your iPhone via Expo Go (or dev client once installed)
```

For full iOS workflow you'll need a custom dev client because we use `react-native-vision-camera` (not Expo Go compatible). See `docs/dev-environment.md` (coming).

## Branching

- `main`: shippable. PR-protected.
- `feat/<feature>`: new feature.
- `fix/<bug>`: bug fix.
- `docs/<topic>`: docs only.
- `chore/<topic>`: tooling, config, deps.

One PR per feature. Reviewer is the other co-founder. Squash merge to main.

## Commit messages

Conventional commits:

```
feat(scanner): add multi-frame burst capture
fix(profile): allergen list deduplicates correctly
docs(adr): ADR-004 OCR provider choice
chore(deps): bump expo to 54.0.34
```

## Code quality

Read `docs/code-quality.md` once, fully. The SOLID rules are concrete folder rules, not slogans.

Hard rules (lint-enforced where possible):

1. No `data/` import inside `presentation/`.
2. No hardcoded colors, sizes, radii. Use `src/core/theme/tokens.ts`.
3. No throws from repositories. Return `Result<T, Failure>` always.
4. No API keys in source. Use Supabase Edge Functions for Anthropic calls.
5. No `// TODO` in shipped code. Open a GitHub issue instead.
6. No `console.log` in shipped code. Use a logger (TBD).
7. No `git add -A` blindly. Read every diff before commit.
8. ADR before significant architectural change.

## Vibe-coding rules

- Stay inside the architecture. If Claude wants to cross layers, push back.
- One concern per file. Split large files before merge.
- Names matter. Rename until the file teaches what it does.
- Tests first when behavior is non-obvious. Use cases get unit tests.
- Read every diff before commit.

## ADR template

```markdown
# ADR-NNN: Title

**Status:** PROPOSED | ACCEPTED | SUPERSEDED-BY-NNN
**Date:** YYYY-MM-DD
**Decision driver:** what forced this decision

## Decision
(One sentence.)

## Rationale
(Why this and not the alternative.)

## Consequences
(What this commits us to.)

## Approval
- [ ] Alex
- [ ] Amir
```

## Co-founder coordination

Alex's machine canonical path: `C:\Users\33576\zedsio-shared-vault\programming\bud-mvp\`
Amir's machine canonical path: `~/zedsio-shared-vault/programming/bud-mvp/`
AI PC canonical path: `/mnt/hdd/zedsio-shared-vault/programming/bud-mvp/`

`.git/` is excluded from Syncthing (see `.stignore` at vault root). GitHub is the source of truth for history. Each machine has its own `.git/`. Push + pull is the cross-machine sync, not Syncthing.

Syncthing mirrors the working tree only, so you'll always see the latest committed-then-synced changes appear on your filesystem even if you haven't pulled yet. Always `git pull` before starting work to make sure your `.git/` is current.
