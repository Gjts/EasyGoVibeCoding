import test from "node:test"
import assert from "node:assert/strict"
import {
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

import {
  buildSponsorReport,
  buildSponsorReportQuery,
  fetchAnalyticsEngineEnvelope,
  loadSponsorCampaign,
  parseCliArgs,
  serializeSponsorReport,
  validateAnalyticsEngineEnvelope,
  validateCampaignId,
  validateOperatorEnvironment,
  validateOutputPath,
  writeSponsorReport,
} from "../../scripts/export-sponsor-report.mjs"

const ACCOUNT_ID = "0123456789abcdef0123456789abcdef"
const API_TOKEN = "test-account-analytics-read-token"
const GENERATED_AT = "2026-08-15T04:05:06.000Z"

function campaign(overrides = {}) {
  return {
    id: "vendor-product-2026-08",
    advertiserName: "Vendor",
    productName: "Product",
    status: "ended",
    startsAt: "2026-08-01T00:00:00+08:00",
    endsAt: "2026-09-01T00:00:00+08:00",
    headline: "Ship faster with Product",
    description: "A developer tool for building and deploying AI applications.",
    ctaLabel: "了解产品",
    destinationUrl: "https://example.com/product",
    placements: [
      "super-individual-monetization",
      "super-individual-home",
    ],
    theme: "violet",
    ...overrides,
  }
}

function meta() {
  return [
    { name: "day", type: "String" },
    { name: "event_type", type: "String" },
    { name: "slot", type: "String" },
    { name: "path", type: "String" },
    { name: "total", type: "Float64" },
  ]
}

function envelope(data = []) {
  return { meta: meta(), data, rows: data.length }
}

function reportOptions(overrides = {}) {
  return {
    campaign: campaign(),
    cutoff: "2026-08-15T12:00:00+08:00",
    generatedAt: GENERATED_AT,
    knownIncidents: [],
    ...overrides,
  }
}

function withTempDirectory(callback) {
  const directory = mkdtempSync(join(tmpdir(), "sponsor-report-test-"))
  try {
    return callback(directory)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

test("validates campaign IDs and rejects injection-shaped input", () => {
  assert.equal(validateCampaignId("vendor-product-2026-08"), "vendor-product-2026-08")
  for (const value of [
    "campaign' OR 1=1",
    "Campaign-A",
    "campaign_a",
    "-campaign",
    "campaign-",
    "a".repeat(81),
    "",
    undefined,
  ]) {
    assert.throws(() => validateCampaignId(value), /campaign ID/)
  }
})

test("builds one sampling-aware fixed-window query with the locked schema", () => {
  const query = buildSponsorReportQuery(
    campaign(),
    "2026-08-15T12:00:00+08:00",
  )

  assert.equal(
    query,
    [
      "SELECT",
      "  formatDateTime(timestamp, '%Y-%m-%d', 'Asia/Shanghai') AS day,",
      "  blob1 AS event_type,",
      "  blob2 AS slot,",
      "  blob3 AS path,",
      "  SUM(_sample_interval * double1) AS total",
      "FROM easy_go_vibe_sponsor_events",
      "WHERE index1 = 'vendor-product-2026-08'",
      "  AND timestamp >= toDateTime('2026-07-31 16:00:00', 'Etc/UTC')",
      "  AND timestamp < toDateTime('2026-08-15 04:00:00', 'Etc/UTC')",
      "  AND blob1 IN ('viewable_impression', 'click')",
      "  AND ((blob2 = 'super-individual-home' AND blob3 = '/super-individual')",
      "    OR (blob2 = 'super-individual-monetization' AND blob3 = '/super-individual/monetization'))",
      "GROUP BY day, event_type, slot, path",
      "ORDER BY day ASC, event_type ASC, slot ASC, path ASC",
      "FORMAT JSON",
    ].join("\n"),
  )
  assert.doesNotMatch(query, /NOW\(\)|\bINTERVAL\b/i)
})

test("query includes only the selected campaign placements and paths", () => {
  const query = buildSponsorReportQuery(
    campaign({ placements: ["super-individual-monetization"] }),
    "2026-08-15T00:00:00+08:00",
  )

  assert.match(
    query,
    /blob2 = 'super-individual-monetization' AND blob3 = '\/super-individual\/monetization'/,
  )
  assert.doesNotMatch(query, /'super-individual-home'/)
})

test("couples every allowed slot to its canonical path in SQL", () => {
  const query = buildSponsorReportQuery(
    campaign(),
    "2026-08-15T12:00:00+08:00",
  )

  assert.match(
    query,
    /\(blob2 = 'super-individual-home' AND blob3 = '\/super-individual'\)/,
  )
  assert.match(
    query,
    /\(blob2 = 'super-individual-monetization' AND blob3 = '\/super-individual\/monetization'\)/,
  )
  assert.doesNotMatch(query, /blob2 IN|blob3 IN/)
  assert.doesNotMatch(
    query,
    /blob2 = 'super-individual-home' AND blob3 = '\/super-individual\/monetization'/,
  )
  assert.doesNotMatch(
    query,
    /blob2 = 'super-individual-monetization' AND blob3 = '\/super-individual'/,
  )
})

test("package report command suppresses only the known module-type warning", () => {
  const packageJson = JSON.parse(
    readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
  )

  assert.equal(
    packageJson.scripts["report:sponsor"],
    "node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/export-sponsor-report.mjs",
  )
})

test("rejects cutoffs outside the contracted half-open window", () => {
  const selected = campaign()

  assert.throws(
    () => buildSponsorReportQuery(selected, selected.startsAt),
    /cutoff.*later than.*start/i,
  )
  assert.throws(
    () =>
      buildSponsorReportQuery(selected, "2026-07-31T23:59:59+08:00"),
    /cutoff.*later than.*start/i,
  )
  assert.doesNotThrow(() =>
    buildSponsorReportQuery(selected, selected.endsAt),
  )
  assert.throws(
    () => buildSponsorReportQuery(selected, "2026-09-01T00:00:01+08:00"),
    /cutoff.*contracted end/i,
  )
})

test("rejects timestamps that cannot be represented at whole-second precision", () => {
  assert.throws(
    () =>
      buildSponsorReportQuery(
        campaign({ startsAt: "2026-08-01T00:00:00.001+08:00" }),
        "2026-08-15T00:00:00+08:00",
      ),
    /whole-second precision/i,
  )
  assert.throws(
    () =>
      buildSponsorReportQuery(
        campaign({ endsAt: "2026-09-01T00:00:00.500+08:00" }),
        "2026-08-15T00:00:00+08:00",
      ),
    /whole-second precision/i,
  )
  assert.throws(
    () =>
      buildSponsorReportQuery(
        campaign(),
        "2026-08-15T00:00:00.0001+08:00",
      ),
    /whole-second precision/i,
  )
  assert.doesNotThrow(() =>
    buildSponsorReportQuery(
      campaign(),
      "2026-08-15T00:00:00.000+08:00",
    ),
  )
})

test("loads and validates exactly one configured campaign by ID", () => {
  withTempDirectory((directory) => {
    const path = join(directory, "sponsor-campaigns.json")
    writeFileSync(
      path,
      JSON.stringify({ schemaVersion: 1, campaigns: [campaign()] }),
      "utf8",
    )

    assert.deepEqual(loadSponsorCampaign(path, campaign().id), campaign())
    assert.throws(
      () => loadSponsorCampaign(path, "unknown-campaign"),
      /campaign was not found/i,
    )
    assert.throws(
      () => loadSponsorCampaign(path, "campaign' OR 1=1"),
      /campaign ID/,
    )
  })
})

test("campaign loading rejects malformed JSON and invalid campaign payloads", () => {
  withTempDirectory((directory) => {
    const path = join(directory, "sponsor-campaigns.json")
    writeFileSync(path, "{", "utf8")
    assert.throws(() => loadSponsorCampaign(path, campaign().id), /campaign data/i)

    writeFileSync(
      path,
      JSON.stringify({ schemaVersion: 1, campaigns: [campaign({ placements: ["home"] })] }),
      "utf8",
    )
    assert.throws(() => loadSponsorCampaign(path, campaign().id), /campaigns invalid/i)
  })
})

test("validates the exact Analytics Engine JSON envelope contract", () => {
  const rows = [
    {
      day: "2026-08-02",
      event_type: "click",
      slot: "super-individual-home",
      path: "/super-individual",
      total: 2,
    },
  ]

  assert.deepEqual(validateAnalyticsEngineEnvelope(envelope(rows), campaign()), rows)
})

test("rejects malformed envelopes and metadata/data/row-count disagreement", () => {
  for (const value of [
    null,
    [],
    {},
    { meta: meta(), data: {}, rows: 0 },
    { meta: meta(), data: [], rows: 1 },
    { meta: meta(), data: [], rows: -1 },
    { meta: meta(), data: [], rows: 0.5 },
    { meta: meta().slice(0, 4), data: [], rows: 0 },
    {
      meta: meta().map((entry, index) =>
        index === 1 ? { ...entry, name: "blob1" } : entry,
      ),
      data: [],
      rows: 0,
    },
  ]) {
    assert.throws(
      () => validateAnalyticsEngineEnvelope(value, campaign()),
      /Analytics Engine envelope/i,
    )
  }
})

test("rejects unexpected row keys, event types, campaign slots, and paths", () => {
  const base = {
    day: "2026-08-02",
    event_type: "click",
    slot: "super-individual-home",
    path: "/super-individual",
    total: 2,
  }
  const invalidRows = [
    { ...base, raw_ip: "203.0.113.1" },
    { ...base, event_type: "hover" },
    { ...base, slot: "super-individual-monetization" },
    { ...base, path: "/super-individual/monetization" },
    { ...base, day: "2026/08/02" },
  ]
  const homeOnly = campaign({ placements: ["super-individual-home"] })

  for (const row of invalidRows) {
    assert.throws(
      () => validateAnalyticsEngineEnvelope(envelope([row]), homeOnly),
      /Analytics Engine envelope/i,
    )
  }
})

test("rejects provider rows outside the explicit report window", () => {
  const base = {
    event_type: "click",
    slot: "super-individual-home",
    path: "/super-individual",
    total: 1,
  }

  for (const day of ["2026-07-31", "2026-08-16"]) {
    assert.throws(
      () =>
        validateAnalyticsEngineEnvelope(
          envelope([{ ...base, day }]),
          campaign(),
          "2026-08-15T12:00:00+08:00",
        ),
      /Analytics Engine envelope/i,
    )
  }
})

test("rejects non-finite and negative sampling-adjusted totals", () => {
  const base = {
    day: "2026-08-02",
    event_type: "click",
    slot: "super-individual-home",
    path: "/super-individual",
  }

  for (const total of [-1, Number.NaN, Number.POSITIVE_INFINITY, "1"] ) {
    assert.throws(
      () =>
        validateAnalyticsEngineEnvelope(
          envelope([{ ...base, total }]),
          campaign(),
        ),
      /Analytics Engine envelope/i,
    )
  }
})

test("pivots event rows, zero-fills missing types, and orders deterministically", () => {
  const data = [
    {
      day: "2026-08-03",
      event_type: "click",
      slot: "super-individual-monetization",
      path: "/super-individual/monetization",
      total: 3,
    },
    {
      day: "2026-08-02",
      event_type: "viewable_impression",
      slot: "super-individual-home",
      path: "/super-individual",
      total: 10,
    },
    {
      day: "2026-08-02",
      event_type: "click",
      slot: "super-individual-home",
      path: "/super-individual",
      total: 2,
    },
  ]

  const report = buildSponsorReport(data, reportOptions())

  assert.deepEqual(report.rows, [
    {
      day: "2026-08-02",
      slot: "super-individual-home",
      path: "/super-individual",
      impressions: 10,
      clicks: 2,
      ctr: 0.2,
      anomalies: [],
    },
    {
      day: "2026-08-03",
      slot: "super-individual-monetization",
      path: "/super-individual/monetization",
      impressions: 0,
      clicks: 3,
      ctr: null,
      anomalies: ["clicks_with_zero_impressions"],
    },
  ])
})

test("uses N/A semantics for zero denominators and does not clamp CTR above 100%", () => {
  const data = [
    {
      day: "2026-08-02",
      event_type: "viewable_impression",
      slot: "super-individual-home",
      path: "/super-individual",
      total: 2,
    },
    {
      day: "2026-08-02",
      event_type: "click",
      slot: "super-individual-home",
      path: "/super-individual",
      total: 3,
    },
    {
      day: "2026-08-03",
      event_type: "viewable_impression",
      slot: "super-individual-home",
      path: "/super-individual",
      total: 0,
    },
  ]

  const report = buildSponsorReport(data, reportOptions())

  assert.equal(report.rows[0].ctr, 1.5)
  assert.equal(report.rows[1].ctr, null)
  assert.deepEqual(report.rows[1].anomalies, [])
})

test("includes auditable metadata without copying the provider envelope", () => {
  const report = buildSponsorReport([], reportOptions({
    knownIncidents: ["Paused for 20 minutes during a deploy incident."],
  }))

  assert.deepEqual(report, {
    schemaVersion: 1,
    campaign: {
      id: "vendor-product-2026-08",
      advertiserName: "Vendor",
      productName: "Product",
    },
    contractWindow: {
      startsAt: "2026-08-01T00:00:00+08:00",
      endsAt: "2026-09-01T00:00:00+08:00",
    },
    reportWindow: {
      startsAt: "2026-08-01T00:00:00+08:00",
      endsAt: "2026-08-15T12:00:00+08:00",
    },
    timezone: "Asia/Shanghai",
    generatedAt: GENERATED_AT,
    countLabel: "sampling-adjusted",
    knownIncidents: ["Paused for 20 minutes during a deploy incident."],
    source: {
      provider: "Cloudflare Analytics Engine",
      dataset: "easy_go_vibe_sponsor_events",
      immutableColumnMapping: {
        index1: "campaignId",
        blob1: "eventType",
        blob2: "slot",
        blob3: "path",
        double1: "count",
        timestamp: "serverTimestamp",
      },
      aggregation: "SUM(_sample_interval * double1)",
    },
    rows: [],
  })
  assert.equal("meta" in report, false)
  assert.equal("data" in report, false)
})

test("serialization is UTF-8 stable for identical input and metadata", () => {
  const first = [
    {
      day: "2026-08-03",
      event_type: "click",
      slot: "super-individual-home",
      path: "/super-individual",
      total: 1,
    },
    {
      day: "2026-08-02",
      event_type: "viewable_impression",
      slot: "super-individual-home",
      path: "/super-individual",
      total: 4,
    },
  ]
  const second = [...first].reverse()

  const firstJson = serializeSponsorReport(buildSponsorReport(first, reportOptions()))
  const secondJson = serializeSponsorReport(buildSponsorReport(second, reportOptions()))

  assert.equal(firstJson, secondJson)
  assert.equal(Buffer.from(firstJson, "utf8").toString("utf8"), firstJson)
  assert.ok(firstJson.endsWith("\n"))
})

test("report incidents must be a deterministic array of nonblank notes", () => {
  assert.throws(
    () => buildSponsorReport([], reportOptions({ knownIncidents: "none" })),
    /known incidents/i,
  )
  assert.throws(
    () => buildSponsorReport([], reportOptions({ knownIncidents: ["  "] })),
    /known incidents/i,
  )

  const report = buildSponsorReport([], reportOptions({
    knownIncidents: ["Second incident.", "First incident."],
  }))
  assert.deepEqual(report.knownIncidents, ["Second incident.", "First incident."])
})

test("CLI parsing requires an explicit cutoff and absolute JSON output", () => {
  const output = resolve(tmpdir(), "advertiser-report.json")
  assert.deepEqual(
    parseCliArgs([
      "vendor-product-2026-08",
      "--cutoff",
      "2026-08-15T12:00:00+08:00",
      "--output",
      output,
      "--known-incident",
      "No known incidents.",
      "--known-incident",
      "20-minute deploy pause.",
      "--force",
    ]),
    {
      campaignId: "vendor-product-2026-08",
      cutoff: "2026-08-15T12:00:00+08:00",
      output,
      knownIncidents: ["No known incidents.", "20-minute deploy pause."],
      force: true,
    },
  )

  for (const argv of [
    [],
    ["vendor-product-2026-08", "--output", output],
    ["vendor-product-2026-08", "--cutoff", "2026-08-15T00:00:00Z"],
    ["vendor-product-2026-08", "--cutoff", "x", "--output", output],
    ["campaign' OR 1=1", "--cutoff", "2026-08-15T00:00:00Z", "--output", output],
    ["vendor-product-2026-08", "--cutoff", "2026-08-15T00:00:00Z", "--output", "relative.json"],
    ["vendor-product-2026-08", "--cutoff", "2026-08-15T00:00:00Z", "--output", resolve(tmpdir(), "report.csv")],
    ["vendor-product-2026-08", "--cutoff", "2026-08-15T00:00:00Z", "--output", output, "--unknown"],
  ]) {
    assert.throws(() => parseCliArgs(argv), /Usage|campaign ID|cutoff|absolute|\.json|unknown/i)
  }
})

test("operator environment validation accepts only a lowercase account ID and nonblank token", () => {
  assert.deepEqual(
    validateOperatorEnvironment({
      CF_ACCOUNT_ID: ACCOUNT_ID,
      CF_API_TOKEN: API_TOKEN,
    }),
    { accountId: ACCOUNT_ID, apiToken: API_TOKEN },
  )

  for (const accountId of [undefined, "", ACCOUNT_ID.toUpperCase(), "a".repeat(31), "g".repeat(32)]) {
    assert.throws(
      () =>
        validateOperatorEnvironment({
          CF_ACCOUNT_ID: accountId,
          CF_API_TOKEN: API_TOKEN,
        }),
      /CF_ACCOUNT_ID/,
    )
  }
  for (const apiToken of [undefined, "", "   "]) {
    assert.throws(
      () =>
        validateOperatorEnvironment({
          CF_ACCOUNT_ID: ACCOUNT_ID,
          CF_API_TOKEN: apiToken,
        }),
      /CF_API_TOKEN/,
    )
  }
})

test("output validation refuses relative, non-JSON, in-repository, directory, and existing paths", () => {
  withTempDirectory((directory) => {
    const repository = join(directory, "repository")
    const outside = join(directory, "outside")
    mkdirSync(repository)
    mkdirSync(outside)

    assert.throws(
      () => validateOutputPath("report.json", { repositoryRoot: repository }),
      /absolute/i,
    )
    assert.throws(
      () => validateOutputPath(join(outside, "report.csv"), { repositoryRoot: repository }),
      /\.json/i,
    )
    assert.throws(
      () => validateOutputPath(join(repository, "report.json"), { repositoryRoot: repository }),
      /outside.*repository/i,
    )
    assert.throws(
      () => validateOutputPath(outside, { repositoryRoot: repository }),
      /directory/i,
    )

    const existing = join(outside, "existing.json")
    writeFileSync(existing, "existing", "utf8")
    assert.throws(
      () => validateOutputPath(existing, { repositoryRoot: repository }),
      /already exists/i,
    )
    assert.equal(
      validateOutputPath(existing, { repositoryRoot: repository, force: true }),
      existing,
    )
  })
})

test("output validation refuses symbolic-link targets where supported", (t) => {
  withTempDirectory((directory) => {
    const repository = join(directory, "repository")
    const outside = join(directory, "outside")
    mkdirSync(repository)
    mkdirSync(outside)
    const real = join(outside, "real.json")
    const link = join(outside, "link.json")
    writeFileSync(real, "existing", "utf8")

    try {
      symlinkSync(real, link, "file")
    } catch (error) {
      if (error && ["EPERM", "EACCES", "ENOSYS"].includes(error.code)) {
        t.skip("file symlinks are unavailable on this platform")
        return
      }
      throw error
    }

    assert.equal(lstatSync(link).isSymbolicLink(), true)
    assert.throws(
      () => validateOutputPath(link, { repositoryRoot: repository, force: true }),
      /symbolic link/i,
    )
  })
})

test("writes deterministic UTF-8 JSON and overwrites only with force", () => {
  withTempDirectory((directory) => {
    const repository = join(directory, "repository")
    const outside = join(directory, "outside")
    mkdirSync(repository)
    mkdirSync(outside)
    const output = join(outside, "report.json")
    const json = serializeSponsorReport(buildSponsorReport([], reportOptions()))

    writeSponsorReport(output, json, { repositoryRoot: repository })
    assert.equal(readFileSync(output, "utf8"), json)
    assert.throws(
      () => writeSponsorReport(output, json, { repositoryRoot: repository }),
      /already exists/i,
    )

    const replacement = json.replace(GENERATED_AT, "2026-08-16T04:05:06.000Z")
    writeSponsorReport(output, replacement, {
      repositoryRoot: repository,
      force: true,
    })
    assert.equal(readFileSync(output, "utf8"), replacement)
  })
})

test("SQL API request is one-shot, authenticated, plain text, bounded, and cleans its timer", async () => {
  const calls = []
  const timers = []
  const cleared = []
  const query = "SELECT 1 FORMAT JSON"
  const providerEnvelope = envelope([])

  const result = await fetchAnalyticsEngineEnvelope({
    accountId: ACCOUNT_ID,
    apiToken: API_TOKEN,
    query,
    campaign: campaign(),
    fetchImpl: async (...args) => {
      calls.push(args)
      return new Response(JSON.stringify(providerEnvelope), { status: 200 })
    },
    timeoutMs: 12_345,
    setTimeoutImpl(callback, delay) {
      const handle = { callback, delay }
      timers.push(handle)
      return handle
    },
    clearTimeoutImpl(handle) {
      cleared.push(handle)
    },
  })

  assert.deepEqual(result, [])
  assert.equal(calls.length, 1)
  assert.equal(
    calls[0][0],
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/analytics_engine/sql`,
  )
  assert.equal(calls[0][1].method, "POST")
  assert.equal(calls[0][1].headers.Authorization, `Bearer ${API_TOKEN}`)
  assert.equal(calls[0][1].headers["Content-Type"], "text/plain")
  assert.equal(calls[0][1].body, query)
  assert.ok(calls[0][1].signal instanceof AbortSignal)
  assert.equal(timers.length, 1)
  assert.equal(timers[0].delay, 12_345)
  assert.deepEqual(cleared, [timers[0]])
})

test("provider, malformed JSON/envelope, network, and timeout errors are redacted without retries", async () => {
  const secretMarker = "raw-secret-response-marker"
  const cases = [
    {
      fetchImpl: async () => new Response(secretMarker, { status: 503 }),
      expected: /HTTP 503/,
    },
    {
      fetchImpl: async () => new Response(`{${secretMarker}`, { status: 200 }),
      expected: /invalid report response/i,
    },
    {
      fetchImpl: async () =>
        new Response(
          JSON.stringify({ meta: meta(), data: [{ secretMarker }], rows: 1 }),
          { status: 200 },
        ),
      expected: /invalid report response/i,
    },
    {
      fetchImpl: async () => {
        throw new Error(secretMarker)
      },
      expected: /request failed/i,
    },
  ]

  for (const entry of cases) {
    let calls = 0
    await assert.rejects(
      () =>
        fetchAnalyticsEngineEnvelope({
          accountId: ACCOUNT_ID,
          apiToken: API_TOKEN,
          query: "SELECT 1 FORMAT JSON",
          campaign: campaign(),
          fetchImpl: async (...args) => {
            calls += 1
            return entry.fetchImpl(...args)
          },
        }),
      (error) => {
        assert.match(error.message, entry.expected)
        assert.doesNotMatch(error.message, new RegExp(secretMarker))
        assert.doesNotMatch(error.message, new RegExp(API_TOKEN))
        return true
      },
    )
    assert.equal(calls, 1)
  }

  let timeoutCalls = 0
  await assert.rejects(
    () =>
      fetchAnalyticsEngineEnvelope({
        accountId: ACCOUNT_ID,
        apiToken: API_TOKEN,
        query: "SELECT 1 FORMAT JSON",
        campaign: campaign(),
        fetchImpl: async (_url, { signal }) => {
          timeoutCalls += 1
          assert.equal(signal.aborted, true)
          throw new DOMException(secretMarker, "AbortError")
        },
        setTimeoutImpl(callback) {
          callback()
          return 1
        },
        clearTimeoutImpl() {},
      }),
    (error) => {
      assert.match(error.message, /timed out/i)
      assert.doesNotMatch(error.message, new RegExp(secretMarker))
      return true
    },
  )
  assert.equal(timeoutCalls, 1)
})
