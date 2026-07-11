# Sponsor Campaign Operations Runbook

This runbook is for the China-first, direct-sponsorship MVP. It does not authorize a production deployment, a real campaign, programmatic advertising, CPC/CPA billing, or third-party tracking. A signed insertion order and explicit production-deploy authorization are required for every activation.

## 1. Before accepting an order

1. Check the proposed product, claims, destination, and creative against [Sponsor_Advertising_Policy.md](./Sponsor_Advertising_Policy.md). Reject arbitrary HTML, external pixels, non-HTTPS destinations, paid editorial influence, and unsupported superlative or performance claims.
2. Verify the advertiser's legal identity, authorization to use every asset, destination-domain control, evidence for material claims, and any licenses required for the advertised business in China.
3. Complete legal review and retain the signed insertion order. The order must record the fixed fee, invoice and payment state, campaign ID, exact UTC-offset start and end timestamps, approved slots and paths, creative version, reporting cadence, cancellation terms, and responsible operators.
4. Apply [Sponsor_Rate_Card.md](./Sponsor_Rate_Card.md): this MVP sells fixed-fee inventory and does not promise clicks, conversions, revenue, CPC, or CPA.
5. Do not accept payment as permission to publish. Payment, creative review, policy/legal review, schedule review, and explicit deploy authorization are separate gates.

## 2. Configure and review a campaign

1. Add the signed values to `data/sponsor-campaigns.json`. Use a unique lowercase kebab-case ID containing the advertiser, product, and period.
2. Copy only approved local artwork into `public/sponsors/`; never load advertiser scripts or remote tracking assets.
3. Limit placements to `super-individual-home` and/or `super-individual-monetization`. At most one active campaign may occupy a page at a time.
4. Keep the campaign `draft` until payment, destination, asset, copy, legal, schedule, and conflict reviews are complete. Record reviewer names and timestamps with the order.
5. Verify locally from `src/frontend/EasyGoVibeCoding/`:

       pnpm test:sponsors
       pnpm validate:sponsors
       pnpm typecheck
       pnpm typecheck:functions
       pnpm build

6. Review both eligible pages at mobile and desktop widths. The exact label `广告`, editorial-independence notice, HTTPS destination, and `rel="sponsored noopener noreferrer"` must be visible/correct.
7. Change the campaign to `active`, rerun the checks, and request explicit production-deploy authorization. Never deploy solely because the schedule has arrived.

## 3. Cloudflare production controls

The production Pages project must have all of the following before activation:

- Analytics Engine binding `SPONSOR_ANALYTICS` using dataset `easy_go_vibe_sponsor_events`.
- Secret `RESEND_API_KEY` and required server-only variable `SPONSOR_INBOX_EMAIL`. The inbox must be controlled by the operator; neither value belongs in client code, commits, screenshots, logs, or advertiser reports.
- WAF and rate-limit rules for `/api/sponsor-events` and `/api/sponsor-inquiry`. Rate limits supplement the application's same-origin, content-type, size, and schema checks; they do not replace them.
- Deployment access restricted to named operators with MFA and least privilege. Preserve the authorization record and deployed commit hash in the campaign log.

Analytics writes use one immutable ordered mapping:

| Analytics Engine position | Meaning |
| --- | --- |
| `index1` | campaign ID |
| `blob1` | event type (`viewable_impression` or `click`) |
| `blob2` | slot |
| `blob3` | path |
| `double1` | count |
| `timestamp` | Cloudflare server timestamp |

Do not change this order without changing the event writer, export query, tests, and reporting contract together. Do not add raw IP, email, cross-site IDs, User-Agent, third-party cookies, or other identity data.

Cloudflare's current operator references:

- [Workers Analytics Engine SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/) documents the `POST /client/v4/accounts/{account_id}/analytics_engine/sql` endpoint, Bearer authentication, and the `Account Analytics: Read` permission.
- [SQL statements and JSON format](https://developers.cloudflare.com/analytics/analytics-engine/sql-reference/statements/) documents the default `Etc/UTC` timezone and the JSON `{ meta, data, rows }` response.
- [Sampling](https://developers.cloudflare.com/analytics/analytics-engine/sampling/) documents that `_sample_interval` belongs to each row and must be applied row by row.
- [Analytics Engine limits](https://developers.cloudflare.com/analytics/analytics-engine/limits/) documents the three-month data-retention window.
- [Analytics Engine setup](https://developers.cloudflare.com/analytics/analytics-engine/get-started/) documents binding/dataset configuration and ordered data-point fields.

## 4. Authorized production smoke tests

Run these checks only after an authorized deploy and against controlled operator data:

1. Open each eligible route, verify that the contracted campaign appears only inside its fixed half-open window `[startsAt, endsAt)`, remains visibly marked `广告`, and disappears outside that window.
2. Confirm that a viewable impression is written only after at least 50% visibility for 1,000 ms and is deduplicated by browser session, campaign, slot, and path. Confirm that clicks are not deduplicated.
3. Use a clearly non-billable `smoke-*` campaign ID for direct Analytics Engine smoke events. Record it in the operations log and exclude all smoke IDs from campaign delivery reports.
4. Query the smoke ID once through the SQL API and verify the immutable column mapping. Do not retry automatically; investigate an error before making a deliberate new request.
5. Submit one sponsor-inquiry smoke message using a controlled address. Confirm delivery to `SPONSOR_INBOX_EMAIL`, confirm no secret or reader data appears in logs, and label/delete the message according to the test-data policy. Never use an advertiser address for a smoke test.
6. Record actual activation and deactivation timestamps, deploy gaps, pauses, outages, sampling concerns, and smoke IDs in the manual incident log. Contracted dates never substitute for actual-active history.

## 5. Export an auditable report

Cloudflare retains Analytics Engine data for three months, so export and archive the final JSON well before that deadline. The export is JSON-only by design; CSV is not produced, avoiding spreadsheet formula-injection risk and lossy schema conversion.

1. Create a short-lived custom Cloudflare API token with only `Account Analytics: Read` on the required account. Restrict it by the operator's IP and the shortest practical TTL. Do not reuse a deploy token.
2. Choose an explicit whole-second cutoff later than the contract start and no later than the contract end. The report always covers the fixed half-open UTC interval `[contract startsAt, cutoff)` and groups days in `Asia/Shanghai`; it never uses `NOW()` or a rolling-day window.
3. Choose an absolute `.json` path outside the repository in access-controlled storage. The exporter refuses repository paths, directories, symlinks, and overwrites unless `--force` targets an existing regular non-symlink file.
4. In PowerShell, set secrets only for the current process and export once:

       $env:CF_ACCOUNT_ID="<lowercase-32-character-account-id>"
       $env:CF_API_TOKEN="<short-lived-account-analytics-read-token>"
       pnpm report:sponsor -- vendor-product-2026-08 --cutoff 2026-08-31T16:00:00Z --output "<absolute-path-outside-repository>\vendor-product-2026-08.json" --known-incident "20-minute pause recorded in the operations log."

5. If the command fails, do not blindly retry. Check the campaign, cutoff, local output policy, token scope/expiry/IP restriction, and Cloudflare status. The exporter makes one request and redacts account, token, query body, and raw provider responses from errors.
6. Clear the operator environment immediately after the attempt:

       Remove-Item Env:CF_API_TOKEN -ErrorAction SilentlyContinue
       Remove-Item Env:CF_ACCOUNT_ID -ErrorAction SilentlyContinue

7. Review the normalized JSON: campaign, contract/report windows, `Asia/Shanghai`, generation time, dataset/mapping, `sampling-adjusted` label, known-incidents array, and deterministic day/slot/path rows. Counts use `SUM(_sample_interval * double1)` because the sample interval can differ per row.
8. `ctr` is `clicks / impressions` only when impressions are greater than zero; otherwise it is `null`. A click with zero impressions is flagged as an anomaly. CTR may legitimately exceed 100% and must not be clamped.
9. Reconcile the report with the manual actual-active and incident log. Exclude smoke IDs and disclose every material pause or data-quality issue. Never replace effective sponsor impressions with total site pageviews.
10. Store the JSON, signed order, creative approval, deploy hash, actual-active log, and delivery note together in confidential access-controlled storage outside the repository. Archive before the three-month Analytics Engine retention expires.

## 6. Deliver, pause, and close

### Reporting

- During the first pilot, send a weekly delivery summary and the final report within three business days after the report cutoff.
- State contracted dates, actual-active dates, slots, paths, sampling-adjusted impressions, clicks, CTR definition, sampling caveat, smoke exclusion, and known incidents.
- Have a second operator verify the JSON and incident reconciliation before sending it. Send only the normalized report, never the provider response, query, account ID, or token.
- Ask for renewal only after the report is delivered and reader-feedback/policy guardrails are reviewed.

### Pause or takedown

1. Immediately pause a campaign if its domain is compromised, a claim becomes false, authorization or payment is withdrawn, reader safety is credibly at risk, or the signed terms require it.
2. Set `status` to `paused` for a temporary stop or `ended` for closure; record the reason and actual timestamp in the incident log.
3. Run sponsor tests/validation, both typechecks, targeted lint, and build. Deploy only with explicit authorization.
4. Confirm the card is absent from both eligible routes after the authorized deployment. Record the deployed commit, verification time, and any delivery impact.
5. If resuming, repeat creative/legal/schedule review, obtain deployment authorization, and add the resumed actual-active timestamp. Do not silently extend dates or fabricate replacement delivery.

## 7. Scale gate

Continue manual fixed-fee operations until at least five paid campaigns have completed and recurring manual work exceeds four hours per week. Before that evidence exists, do not build self-service campaign creation, advertiser accounts, online payment, CPC/CPA billing, programmatic backfill, additional inventory, or third-party ad scripts. After the gate, review reader trust, incidents, delivery variance, legal workload, and renewals before approving any expansion.
