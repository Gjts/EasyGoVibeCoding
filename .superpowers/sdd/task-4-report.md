# Task 4 Report: Disposable Localized Source Trees

## Outcome

- Added occurrence-directed source rewriting for JavaScript, TypeScript, JSX, TSX, and JSON.
- Reconstructs template literals from translated placeholder patterns without evaluating expressions.
- Recursively transforms nested occurrences inside Task 2 `expressionRanges`; the four nested branches in `app/api/send-email/route.ts` are each applied exactly once.
- Added a locale-tree creator and CLI for exactly `ja`, `en`, `fr`, and `de`.
- Creates only ignored `.cache/i18n-build/<locale>` trees from `git ls-files --cached --others --exclude-standard`.
- Leaves the canonical Chinese source and catalogs unchanged.
- Added no dependency and made no API call.

## Safety and Rewrite Guarantees

- Validates supported occurrence kinds, LF-only input, bounds, source slices, expressions/ranges, placeholder parity, overlaps, exact message usage, and transformed syntax.
- Allows overlap only when a child is contained by an ancestor template expression range.
- Uses JSON string literals for JavaScript/JSON values, JSX entities for visible text, and JavaScript string expressions for quoted JSX attributes.
- Preserves existing JSX character entities instead of double encoding them.
- Never performs global source-string replacement.
- Resolves locale snapshots only through `i18n/catalog/manifest.json`, then verifies lexical and real-path containment under `i18n/catalog/messages`, SHA-256, count, and exact source-key parity.
- Rejects tracked/selected environment, secret, cache, Git, dependency, and build-output paths; the public `.env.example` is deliberately omitted so no `.env*` file reaches staging.
- Validates both lexical and real cache-root paths. Parent directory junctions cannot redirect deletion or publication outside `<projectRoot>/.cache/i18n-build`.
- Revalidates source/target containment before every recursive removal and every bounded Windows rename retry.
- Creates a Windows directory junction from each staging `node_modules` to the real project dependencies.

## TDD Evidence

- Initial RED: focused run exited 1 with 0 passing and 9 failing tests because both required public modules/exports were absent.
- Initial GREEN: the focused suite reached 9/9.
- Root-page RED: the first real Japanese tree failed closed at 78 pages because `app/page.tsx` was not counted. A root-page fixture reproduced the failure before the counter was fixed.
- JSX-attribute RED: the first English tree failed on a real syntax diagnostic when a translated attribute contained quotes. A focused regression failed at the same `Identifier expected` diagnostic before JSX attributes were rendered as JavaScript string expressions.
- Entity RED: an entity fixture showed `&amp;` becoming `&amp;amp;`; the renderer now preserves valid existing JSX entities while escaping raw syntax characters.
- Cache-junction RED: an external parent junction produced a missing expected rejection before real-path anchoring was added.
- Windows publication RED: two real CLI attempts encountered transient `EPERM` during directory rename. Publication now performs six bounded exponential-backoff retries only for `EACCES`, `EBUSY`, and `EPERM`, rechecking containment on every attempt.
- Final focused GREEN: 12 passed, 0 failed.
- Final full GREEN: 64 passed, 0 failed.

## Real Staging Audit

| Locale | Pages | Transformed files | Applied occurrences | Parsed files | Nested children | Locale catalog SHA-256 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `ja` | 79 | 108 | 11,178 | 108 | 4 | `caabbb97e410477cf5e19063f1f09a3015ac993e80440462fd0e12e38613ddf8` |
| `en` | 79 | 108 | 11,178 | 108 | 4 | `c62c51862c46503c970b94010ef6b99095b5795b9dffec6c2a308300e4747edb` |
| `fr` | 79 | 108 | 11,178 | 108 | 4 | `7a19040838ce38da6a6f0d1dd5872df0ab94425e5889d08709e9ac266b8a6e07` |
| `de` | 79 | 108 | 11,178 | 108 | 4 | `9152c06ddd70680b785679704824949a938875e2c67b36facb6a674aed1b4cc3` |

Every final tree independently passed:

- TypeScript compiler parsing for every transformed JS/JSX/TS/TSX file and `JSON.parse` for every transformed JSON file.
- Exactly 79 `app/**/page.tsx` files.
- No `app/ja`, `.env*`, `.git`, translation cache, build output, or leftover temporary tree.
- A verified `node_modules` junction to the canonical project dependency directory.
- All entity-bearing JSX translations present without double encoding.
- All four real nested send-email child translations present and their Chinese source strings absent.

The staging manifests are deterministic and contain only locale, source/locale hashes, transformed/application counts, and page count. They contain no credential or absolute machine path.

## Canonical Source Immutability

| Check | Before | After |
| --- | --- | --- |
| Source catalog SHA-256 | `62c474d1ca7bfb0beb2980db79167da08e349698a32a4d01b8388ef38919ee76` | `62c474d1ca7bfb0beb2980db79167da08e349698a32a4d01b8388ef38919ee76` |
| Aggregate SHA-256 for 108 occurrence source files | `74f697cdfae14ac4e962fb5762020370205c42d993bcd926e49ed7ed70d3c7f7` | `74f697cdfae14ac4e962fb5762020370205c42d993bcd926e49ed7ed70d3c7f7` |
| Occurrence count | 11,178 | 11,178 |

## Verification

- `node --test scripts/i18n/source-transformer.test.mjs` — 12 passed, 0 failed.
- `pnpm test:i18n` — 64 passed, 0 failed.
- `pnpm exec tsc --noEmit` — exit 0.
- Targeted `pnpm exec eslint --max-warnings=0` for all three Task 4 files — exit 0.
- `node --check` for all three Task 4 `.mjs` files — exit 0.
- `git diff --check` — exit 0.
- Four final real CLI staging runs — exit 0.
- Independent four-tree page/path/junction/catalog/nested/entity/syntax audit — exit 0.
- Fixture repository proved tracked and eligible untracked files copy, while ignored secrets and build outputs do not.
- Repeated fixture publication produced byte-identical transformed content and staging manifests.

## Changed Files

- `src/frontend/EasyGoVibeCoding/scripts/i18n/source-transformer.mjs`
- `src/frontend/EasyGoVibeCoding/scripts/i18n/source-transformer.test.mjs`
- `src/frontend/EasyGoVibeCoding/scripts/i18n/create-locale-worktree.mjs`
- `.superpowers/sdd/task-4-report.md`

No academy page, component, data file, catalog, dependency, or package script changed. The four generated trees remain ignored and uncommitted.

## Simplifications and Remaining Risk

- Reused Task 2 occurrence metadata and the installed TypeScript compiler instead of adding a parser or replacement dependency.
- Kept one CLI command with a locale argument rather than adding four package aliases.
- Used content-addressed Task 3 snapshots directly through the manifest rather than copying or republishing catalogs.
- Kept publication retry bounded and limited to transient Windows filesystem errors.

Remaining risk: production Next.js builds, route generation, and locale deployment behavior are Task 5 concerns and were not run here. A machine that holds the staging directory beyond the bounded retry window will fail closed and leave the previously published locale tree untouched or report the replacement failure; no broader deletion fallback exists.

## Commit

Implementation commit: `d42107f8066e187a91472e52477e6c1a14f11439` — `Keep locale staging builds syntax-safe and disposable`.
