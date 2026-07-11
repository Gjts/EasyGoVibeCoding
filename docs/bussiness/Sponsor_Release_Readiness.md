# Sponsor MVP Release Readiness

Decision: **NO DEPLOY / CODE READY** for the local candidate at implementation baseline `6c31e9524bc671f635d29d733d1ad8698cec395c`.

This record is a local release gate, not deployment authorization. No production deployment, credential access, Cloudflare or Resend request, real campaign activation, sponsor asset addition, inquiry email, or advertiser message occurred during Tasks 1–8.

## Candidate and scope

- Branch: `feat/sponsor-mvp`.
- Implementation baseline under review: `6c31e9524bc671f635d29d733d1ad8698cec395c`.
- Implementation comparison scope: `main...6c31e95` contains 35 files, 8,171 insertions, and 1 deletion. The complete Git name/status and diff supplement GitNexus because its index predates most sponsor work.
- Task 8 is limited to release evidence plus the narrow consistency corrections in the tracked implementation plan. It does not add a dependency, campaign, asset, binding, secret, deployment, or live request.

## Local release gates

All commands below were run fresh on 2026-07-11 from `src/frontend/EasyGoVibeCoding/` unless noted otherwise:

| Gate | Fresh result |
| --- | --- |
| `pnpm test:sponsors` | Exit 0: 92 tests, 91 passed, 0 failed, 1 skipped, 0 todo. The skip is the known Windows inability to create a file symlink; the refusal path runs where the platform permits symlink creation. |
| `pnpm validate:sponsors` | Exit 0: `data/sponsor-campaigns.json valid: 0 campaigns`. |
| `pnpm validate:models` | Exit 0: 13 models, 1 historical release, and 11 news items valid. |
| `pnpm typecheck` | Exit 0 with no diagnostics. |
| `pnpm typecheck:functions` | Exit 0 with no diagnostics. |
| Targeted ESLint | Exit 0 with no output. The explicit set covered all sponsor pages, both eligible pages, Footer, both sponsor components, all sponsor libraries, both shared Function modules, both API Functions, both sponsor scripts, and every sponsor test. |
| `pnpm build` | Exit 0: 88 static pages generated; `/sponsor` is static; postbuild copied the Functions directory. Next's own type validation remains disabled by repository configuration, so the independent frontend and Functions typechecks above are required evidence. |
| `pnpm lint` | Expected exit 1 at exactly the historical baseline: 289 problems = 229 errors + 60 warnings. A second in-memory ESLint JSON audit produced the same totals and `0` sponsor-target/Footer files with findings. No repository-wide lint cleanup was attempted. |

The build emitted only the known baseline warning categories: stale `baseline-browser-mapping` data and two optional-Prettier resolution warnings from `@react-email/render`. No dependency was added to alter them.

From the repository root, `git diff --check` and the complete working candidate check `git diff --check main` exited 0. This also verifies removal of the plan's prior extra blank line at EOF. The exact post-commit `git diff --check main...HEAD` remains a required final rerun.

## Inventory and static behavior

- `data/sponsor-campaigns.json` currently contains `campaigns: []`.
- `public/sponsors/` is absent; no advertiser asset exists in this candidate.
- All five required artifacts exist: `out/sponsor.html`, both eligible Super Individual HTML files, and both copied sponsor API Functions.
- The copied `sponsor-events.ts` SHA-256 is `2CC47E18DDE78A9392D6DB6A5A433402795EAE67114727C20765C683CC2C929D`, exactly matching its source. The copied `sponsor-inquiry.ts` SHA-256 is `728F2DD32164D8B21520A83DCE136232AA88E6A9F0A80FB4715B7A99E18925FA`, exactly matching its source.
- The static sponsor page has one H1 and contains the current `读者能看清的位置` H1 copy, `只有两个试运行位置`, the custom-content inventory clarification, the provisional 180-day rule, and the `inventory`, `offers`, `policy`, `privacy`, and `inquiry` anchors.
- Both eligible static pages contain no sponsor disclosure, sponsored link relation, sponsor aria-label, or `min-h-44` hydration-placeholder class. Empty inventory therefore produces neither sponsor card markup nor a blank reserved sponsor area in the static export.
- Active-campaign timing, card disclosure, external-link behavior, live analytics, and a real advertiser asset cannot be claimed from empty inventory.

Task 6 recorded real Chrome checks of the sponsor media-kit page at 375, 768, and 1440 pixels, including overflow, focus order/visibility, labels, honeypot exclusion, live-region failure behavior, and a mocked one-request 502 path. Task 8 reused that historical evidence and fresh static semantic checks but did not relabel it as active-campaign or production evidence. No browser-control connector was exposed for a fresh Task 8 interaction run, so fresh empty-page hydration and form-focus browser checks remain a manual pre-deploy gap. The prior browser run did not send an email.

## Shared-surface review

- `components/course/course-layout.tsx` has no `main...6c31e95` diff. Its known GitNexus blast radius is CRITICAL (74 direct callers, 32 processes, 5 modules), so it remains intentionally untouched.
- `components/header.tsx` and `app/layout.tsx` have no `main...6c31e95` diff. The committed `.impeccable/live/config.json` is tool configuration, not the application root layout.
- GitNexus rated `Footer` CRITICAL during Task 6 (80 impacted symbols, 5 direct callers, 35 processes, 6 modules). The actual `components/footer.tsx` diff is one data-only resource entry: `{ name: "广告合作", href: "/sponsor" }`; Footer logic and rendering are unchanged.

## GitNexus caveat

The local GitNexus index records `lastCommit` `10b975350a5548d9a72c5c36c7370bf351a75542` and `indexedAt` `2026-07-10T17:29:28.705Z`, so it is stale relative to this candidate. No reindex was performed.

The required compare command exited 0 and reported `Changes: 35 files, 77 symbols`, `Affected processes: 0`, and `Risk level: low`, plus a non-blocking unavailable-FTS warning. Because unmapped post-index sponsor symbols can still yield incomplete results, this is not treated as full proof. The complete `git diff --name-status main...HEAD`, the 35-file/8,171-insertion/1-deletion stat, targeted shared-file diffs, and the Task 8 staged file list are the authoritative supplements.

Task 8 staged detection also exited 0 and reported exactly 2 documentation files, 9 mapped Markdown symbols, 0 affected processes, and low risk. The staged name list contained only this readiness record and the tracked implementation plan.

Repository-wide scans found no `TODO`, `FIXME`, `HACK`, or `XXX` marker in sponsor files; no forbidden email, IP/header, cookie, cross-site, fingerprint, device, visitor, or session identifier in the production analytics path; no credential-shaped literal; and no sensitive server logging. The only UI `placeholder` matches are normal input hint text and Tailwind placeholder-color classes.

## External production gates — not satisfied or claimed here

Every item below requires separate evidence and authority after this local gate:

- separate explicit production-deploy authorization;
- legal approval of the advertising policy, insertion order, inquiry handling, and the provisional 180-day unconverted-inquiry retention rule;
- a signed insertion order, payment state, approved copy, substantiated claims, destination control, and licensed creative rights before any real campaign or asset is added;
- Cloudflare WAF and rate-limit rules for `/api/sponsor-events` and `/api/sponsor-inquiry`;
- production `SPONSOR_ANALYTICS` binding to dataset `easy_go_vibe_sponsor_events`;
- production secret `RESEND_API_KEY`;
- required server-only `SPONSOR_INBOX_EMAIL` controlled by the operator;
- an authorized configured non-billable smoke campaign or signed campaign, followed by live `204` analytics, live `202` inquiry, exactly one escaped inbox email, and a report exported with the current fixed-`--cutoff`, absolute-outside-repository `--output` CLI;
- a scheduled weekly delivery report before the first pilot starts.

No item in this external list is represented as configured, approved, signed, paid, deployed, or tested by this document.

## Local decision

The local code and static artifacts satisfy the Task 8 release sequence, with full lint exactly matching the historical baseline and no sponsor-path finding. The decision is therefore **NO DEPLOY / CODE READY**: the code candidate may proceed only to the separate external gates above. It is not production-ready in the operational sense until every external gate has its own evidence and authorization.
