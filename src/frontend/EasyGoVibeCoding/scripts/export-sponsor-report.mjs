import {
  closeSync,
  constants as fsConstants,
  lstatSync,
  openSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import {
  dirname,
  extname,
  isAbsolute,
  relative,
  resolve,
  sep,
} from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

import { parseSponsorCampaigns } from "../lib/sponsor-schema.ts"

const DATASET = "easy_go_vibe_sponsor_events"
const REPORT_TIMEZONE = "Asia/Shanghai"
const DEFAULT_TIMEOUT_MS = 15_000
const EVENT_TYPES = ["viewable_impression", "click"]
const SLOT_PATHS = Object.freeze({
  "super-individual-home": "/super-individual",
  "super-individual-monetization": "/super-individual/monetization",
})
const SLOT_ORDER = Object.keys(SLOT_PATHS)
const COLUMN_MAPPING = Object.freeze({
  index1: "campaignId",
  blob1: "eventType",
  blob2: "slot",
  blob3: "path",
  double1: "count",
  timestamp: "serverTimestamp",
})
const EXPECTED_META = Object.freeze([
  Object.freeze({ name: "day", type: "String" }),
  Object.freeze({ name: "event_type", type: "String" }),
  Object.freeze({ name: "slot", type: "String" }),
  Object.freeze({ name: "path", type: "String" }),
  Object.freeze({ name: "total", type: "Float64" }),
])
const ROW_KEYS = ["day", "event_type", "path", "slot", "total"]
const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url))
const DEFAULT_CAMPAIGNS_PATH = resolve(
  SCRIPT_DIRECTORY,
  "../data/sponsor-campaigns.json",
)
const DEFAULT_REPOSITORY_ROOT = resolve(SCRIPT_DIRECTORY, "../../../..")
const USAGE =
  "Usage: pnpm report:sponsor -- <campaign-id> --cutoff <ISO timestamp> " +
  "--output <absolute-outside-repository.json> [--known-incident <note>] [--force]"

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function hasExactKeys(value, keys) {
  if (!isRecord(value)) return false
  return JSON.stringify(Object.keys(value).sort()) === JSON.stringify([...keys].sort())
}

export function validateCampaignId(value) {
  if (
    typeof value !== "string" ||
    value.length > 80 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
  ) {
    throw new Error("campaign ID must be lowercase kebab-case")
  }
  return value
}

function validateWholeSecondTimestamp(value, label) {
  if (typeof value !== "string") {
    throw new Error(`${label} must be an ISO timestamp at whole-second precision`)
  }

  const match = value.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:\d{2})$/,
  )
  if (!match || (match[7] && /[1-9]/.test(match[7]))) {
    throw new Error(`${label} must be an ISO timestamp at whole-second precision`)
  }

  const [, yearText, monthText, dayText, hourText, minuteText, secondText] =
    match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  const hour = Number(hourText)
  const minute = Number(minuteText)
  const second = Number(secondText)
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > daysInMonth ||
    hour > 23 ||
    minute > 59 ||
    second > 59
  ) {
    throw new Error(`${label} must be a valid ISO timestamp at whole-second precision`)
  }

  if (match[8] !== "Z") {
    const [offsetHour, offsetMinute] = match[8].slice(1).split(":").map(Number)
    if (offsetHour > 23 || offsetMinute > 59) {
      throw new Error(`${label} must be a valid ISO timestamp at whole-second precision`)
    }
  }

  const milliseconds = Date.parse(value)
  if (!Number.isFinite(milliseconds)) {
    throw new Error(`${label} must be a valid ISO timestamp at whole-second precision`)
  }

  return { value, milliseconds }
}

function validateCampaignForReport(campaign) {
  if (!isRecord(campaign)) throw new Error("campaign data is invalid")
  validateCampaignId(campaign.id)
  const startsAt = validateWholeSecondTimestamp(campaign.startsAt, "campaign start")
  const endsAt = validateWholeSecondTimestamp(campaign.endsAt, "campaign end")
  if (endsAt.milliseconds <= startsAt.milliseconds) {
    throw new Error("campaign end must be later than campaign start")
  }
  if (
    !Array.isArray(campaign.placements) ||
    campaign.placements.length === 0 ||
    campaign.placements.some((slot) => !Object.hasOwn(SLOT_PATHS, slot)) ||
    new Set(campaign.placements).size !== campaign.placements.length
  ) {
    throw new Error("campaign placements are invalid")
  }
  return { startsAt, endsAt }
}

function validateReportWindow(campaign, cutoff) {
  const { startsAt, endsAt } = validateCampaignForReport(campaign)
  const reportEnd = validateWholeSecondTimestamp(cutoff, "cutoff")
  if (reportEnd.milliseconds <= startsAt.milliseconds) {
    throw new Error("cutoff must be later than the contracted start")
  }
  if (reportEnd.milliseconds > endsAt.milliseconds) {
    throw new Error("cutoff must not be later than the contracted end")
  }
  return { startsAt, endsAt, reportEnd }
}

function formatUtcSqlLiteral(milliseconds) {
  return new Date(milliseconds).toISOString().slice(0, 19).replace("T", " ")
}

function quoteSqlList(values) {
  return values.map((value) => `'${value}'`).join(", ")
}

export function buildSponsorReportQuery(campaign, cutoff) {
  const { startsAt, reportEnd } = validateReportWindow(campaign, cutoff)
  const slots = SLOT_ORDER.filter((slot) => campaign.placements.includes(slot))
  const paths = slots.map((slot) => SLOT_PATHS[slot])

  return [
    "SELECT",
    "  formatDateTime(timestamp, '%Y-%m-%d', 'Asia/Shanghai') AS day,",
    "  blob1 AS event_type,",
    "  blob2 AS slot,",
    "  blob3 AS path,",
    "  SUM(_sample_interval * double1) AS total",
    `FROM ${DATASET}`,
    `WHERE index1 = '${campaign.id}'`,
    `  AND timestamp >= toDateTime('${formatUtcSqlLiteral(startsAt.milliseconds)}', 'Etc/UTC')`,
    `  AND timestamp < toDateTime('${formatUtcSqlLiteral(reportEnd.milliseconds)}', 'Etc/UTC')`,
    `  AND blob1 IN (${quoteSqlList(EVENT_TYPES)})`,
    `  AND blob2 IN (${quoteSqlList(slots)})`,
    `  AND blob3 IN (${quoteSqlList(paths)})`,
    "GROUP BY day, event_type, slot, path",
    "ORDER BY day ASC, event_type ASC, slot ASC, path ASC",
    "FORMAT JSON",
  ].join("\n")
}

export function loadSponsorCampaign(
  campaignsPath,
  campaignId,
  { readFileImpl = readFileSync } = {},
) {
  const safeCampaignId = validateCampaignId(campaignId)
  let input
  try {
    input = JSON.parse(readFileImpl(campaignsPath, "utf8"))
  } catch {
    throw new Error("sponsor campaign data could not be read")
  }

  let payload
  try {
    payload = parseSponsorCampaigns(input)
  } catch {
    throw new Error("sponsor campaigns invalid")
  }
  const selected = payload.campaigns.find((entry) => entry.id === safeCampaignId)
  if (!selected) throw new Error("sponsor campaign was not found")
  validateCampaignForReport(selected)
  return selected
}

function formatShanghaiDay(milliseconds) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: REPORT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(milliseconds))
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}

function isExpectedMeta(meta) {
  return (
    Array.isArray(meta) &&
    meta.length === EXPECTED_META.length &&
    meta.every(
      (entry, index) =>
        hasExactKeys(entry, ["name", "type"]) &&
        entry.name === EXPECTED_META[index].name &&
        entry.type === EXPECTED_META[index].type,
    )
  )
}

function isValidProviderRow(row, campaign, reportStartDay, reportEndDay) {
  if (!hasExactKeys(row, ROW_KEYS)) return false
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.day)) return false
  if (row.day < reportStartDay || row.day > reportEndDay) return false
  if (!EVENT_TYPES.includes(row.event_type)) return false
  if (!campaign.placements.includes(row.slot)) return false
  if (row.path !== SLOT_PATHS[row.slot]) return false
  return typeof row.total === "number" && Number.isFinite(row.total) && row.total >= 0
}

export function validateAnalyticsEngineEnvelope(value, campaign, cutoff = campaign?.endsAt) {
  try {
    const { startsAt, reportEnd } = validateReportWindow(campaign, cutoff)
    if (!hasExactKeys(value, ["meta", "data", "rows"])) throw new Error()
    if (!isExpectedMeta(value.meta) || !Array.isArray(value.data)) throw new Error()
    if (!Number.isInteger(value.rows) || value.rows < 0) throw new Error()
    if (value.rows !== value.data.length) throw new Error()

    const reportStartDay = formatShanghaiDay(startsAt.milliseconds)
    const reportEndDay = formatShanghaiDay(reportEnd.milliseconds - 1)
    if (
      value.data.some(
        (row) => !isValidProviderRow(row, campaign, reportStartDay, reportEndDay),
      )
    ) {
      throw new Error()
    }
    return value.data
  } catch {
    throw new Error("Invalid Analytics Engine envelope")
  }
}

export async function fetchAnalyticsEngineEnvelope({
  accountId,
  apiToken,
  query,
  campaign,
  cutoff = campaign?.endsAt,
  fetchImpl = globalThis.fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  setTimeoutImpl = globalThis.setTimeout,
  clearTimeoutImpl = globalThis.clearTimeout,
}) {
  validateOperatorEnvironment({
    CF_ACCOUNT_ID: accountId,
    CF_API_TOKEN: apiToken,
  })
  if (typeof query !== "string" || query.length === 0) {
    throw new Error("Analytics Engine query is required")
  }
  if (typeof fetchImpl !== "function") {
    throw new Error("Analytics Engine request is unavailable")
  }
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1) {
    throw new Error("Analytics Engine timeout is invalid")
  }

  const controller = new AbortController()
  let timer
  try {
    timer = setTimeoutImpl(() => controller.abort(), timeoutMs)
    let response
    try {
      response = await fetchImpl(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/analytics_engine/sql`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "text/plain",
          },
          body: query,
          signal: controller.signal,
        },
      )
    } catch {
      if (controller.signal.aborted) {
        throw new Error("Analytics Engine request timed out")
      }
      throw new Error("Analytics Engine request failed")
    }

    if (!response || typeof response.text !== "function") {
      throw new Error("Analytics Engine request failed")
    }
    if (!response.ok) {
      throw new Error(`Analytics Engine query failed with HTTP ${response.status}`)
    }

    let value
    try {
      value = JSON.parse(await response.text())
    } catch {
      throw new Error("Analytics Engine returned an invalid report response")
    }
    try {
      return validateAnalyticsEngineEnvelope(value, campaign, cutoff)
    } catch {
      throw new Error("Analytics Engine returned an invalid report response")
    }
  } finally {
    if (timer !== undefined) clearTimeoutImpl(timer)
  }
}

function validateKnownIncidents(value) {
  if (
    !Array.isArray(value) ||
    value.length > 100 ||
    value.some(
      (entry) =>
        typeof entry !== "string" ||
        entry.trim().length === 0 ||
        entry.length > 500,
    )
  ) {
    throw new Error("known incidents must be an array of nonblank notes")
  }
  return [...value]
}

export function buildSponsorReport(data, {
  campaign,
  cutoff,
  generatedAt,
  knownIncidents = [],
}) {
  const rows = validateAnalyticsEngineEnvelope(
    { meta: EXPECTED_META, data, rows: Array.isArray(data) ? data.length : -1 },
    campaign,
    cutoff,
  )
  if (typeof generatedAt !== "string" || !Number.isFinite(Date.parse(generatedAt))) {
    throw new Error("generatedAt must be an ISO timestamp")
  }
  if (
    typeof campaign.advertiserName !== "string" ||
    campaign.advertiserName.trim().length === 0 ||
    typeof campaign.productName !== "string" ||
    campaign.productName.trim().length === 0
  ) {
    throw new Error("campaign report metadata is invalid")
  }

  const grouped = new Map()
  for (const row of rows) {
    const key = JSON.stringify([row.day, row.slot, row.path])
    const current = grouped.get(key) || {
      day: row.day,
      slot: row.slot,
      path: row.path,
      impressions: 0,
      clicks: 0,
    }
    if (row.event_type === "viewable_impression") {
      current.impressions += row.total
    } else {
      current.clicks += row.total
    }
    grouped.set(key, current)
  }

  const reportRows = [...grouped.values()]
    .sort(
      (left, right) =>
        left.day.localeCompare(right.day) ||
        left.slot.localeCompare(right.slot) ||
        left.path.localeCompare(right.path),
    )
    .map((row) => ({
      ...row,
      ctr: row.impressions > 0 ? row.clicks / row.impressions : null,
      anomalies:
        row.impressions === 0 && row.clicks > 0
          ? ["clicks_with_zero_impressions"]
          : [],
    }))

  return {
    schemaVersion: 1,
    campaign: {
      id: campaign.id,
      advertiserName: campaign.advertiserName,
      productName: campaign.productName,
    },
    contractWindow: {
      startsAt: campaign.startsAt,
      endsAt: campaign.endsAt,
    },
    reportWindow: {
      startsAt: campaign.startsAt,
      endsAt: cutoff,
    },
    timezone: REPORT_TIMEZONE,
    generatedAt,
    countLabel: "sampling-adjusted",
    knownIncidents: validateKnownIncidents(knownIncidents),
    source: {
      provider: "Cloudflare Analytics Engine",
      dataset: DATASET,
      immutableColumnMapping: { ...COLUMN_MAPPING },
      aggregation: "SUM(_sample_interval * double1)",
    },
    rows: reportRows,
  }
}

export function serializeSponsorReport(report) {
  return `${JSON.stringify(report, null, 2)}\n`
}

function readFlagValue(argv, index, flag) {
  const value = argv[index + 1]
  if (typeof value !== "string" || value.startsWith("--")) {
    throw new Error(`${flag} requires a value. ${USAGE}`)
  }
  return value
}

export function parseCliArgs(argv) {
  if (!Array.isArray(argv) || !argv[0] || argv[0].startsWith("--")) {
    throw new Error(USAGE)
  }
  const campaignId = validateCampaignId(argv[0])
  let cutoff
  let output
  let force = false
  const knownIncidents = []

  for (let index = 1; index < argv.length; index += 1) {
    const flag = argv[index]
    if (flag === "--cutoff") {
      if (cutoff !== undefined) throw new Error("cutoff may be supplied only once")
      cutoff = readFlagValue(argv, index, flag)
      index += 1
    } else if (flag === "--output") {
      if (output !== undefined) throw new Error("output may be supplied only once")
      output = readFlagValue(argv, index, flag)
      index += 1
    } else if (flag === "--known-incident") {
      const note = readFlagValue(argv, index, flag)
      if (note.trim().length === 0 || note.length > 500) {
        throw new Error("known incident notes must be nonblank")
      }
      knownIncidents.push(note)
      index += 1
    } else if (flag === "--force") {
      if (force) throw new Error("--force may be supplied only once")
      force = true
    } else {
      throw new Error(`unknown argument. ${USAGE}`)
    }
  }

  if (!cutoff) throw new Error(`cutoff is required. ${USAGE}`)
  validateWholeSecondTimestamp(cutoff, "cutoff")
  if (!output) throw new Error(`absolute output path is required. ${USAGE}`)
  if (!isAbsolute(output)) throw new Error("output path must be absolute")
  if (extname(output).toLowerCase() !== ".json") {
    throw new Error("output path must end in .json")
  }

  return { campaignId, cutoff, output, knownIncidents, force }
}

export function validateOperatorEnvironment(environment) {
  const accountId = environment?.CF_ACCOUNT_ID
  const apiToken = environment?.CF_API_TOKEN
  if (typeof accountId !== "string" || !/^[a-f0-9]{32}$/.test(accountId)) {
    throw new Error("CF_ACCOUNT_ID must be a lowercase 32-character account ID")
  }
  if (typeof apiToken !== "string" || apiToken.trim().length === 0) {
    throw new Error("CF_API_TOKEN with Account Analytics Read is required")
  }
  return { accountId, apiToken: apiToken.trim() }
}

function tryLstat(path) {
  try {
    return lstatSync(path)
  } catch (error) {
    if (error?.code === "ENOENT") return null
    throw new Error("output path could not be inspected")
  }
}

function isWithin(directory, candidate) {
  const pathFromDirectory = relative(resolve(directory), resolve(candidate))
  return (
    pathFromDirectory === "" ||
    (!pathFromDirectory.startsWith(`..${sep}`) && pathFromDirectory !== "..")
  )
}

function validateOutputAncestors(output) {
  let current = dirname(output)
  while (true) {
    const stat = tryLstat(current)
    if (!stat) throw new Error("output parent directory must already exist")
    if (stat.isSymbolicLink()) throw new Error("output path must not use a symbolic link")
    if (!stat.isDirectory()) throw new Error("output parent must be a directory")
    const parent = dirname(current)
    if (parent === current) return
    current = parent
  }
}

export function validateOutputPath(output, {
  repositoryRoot = DEFAULT_REPOSITORY_ROOT,
  force = false,
} = {}) {
  if (typeof output !== "string" || !isAbsolute(output)) {
    throw new Error("output path must be absolute")
  }
  const resolvedOutput = resolve(output)
  const target = tryLstat(resolvedOutput)
  if (target?.isSymbolicLink()) {
    throw new Error("output path must not be a symbolic link")
  }
  if (target?.isDirectory()) throw new Error("output path must not be a directory")
  if (extname(resolvedOutput).toLowerCase() !== ".json") {
    throw new Error("output path must end in .json")
  }
  if (isWithin(repositoryRoot, resolvedOutput)) {
    throw new Error("output path must be outside the repository")
  }
  validateOutputAncestors(resolvedOutput)
  if (target && !target.isFile()) {
    throw new Error("output path must be a regular file")
  }
  if (target && !force) throw new Error("output file already exists")
  return resolvedOutput
}

export function writeSponsorReport(output, json, options = {}) {
  const resolvedOutput = validateOutputPath(output, options)
  const force = options.force === true
  const baseFlags = fsConstants.O_WRONLY | fsConstants.O_CREAT
  const exclusiveFlags = force
    ? baseFlags | fsConstants.O_TRUNC
    : baseFlags | fsConstants.O_EXCL
  const flags = fsConstants.O_NOFOLLOW
    ? exclusiveFlags | fsConstants.O_NOFOLLOW
    : exclusiveFlags
  let fileDescriptor
  try {
    fileDescriptor = openSync(resolvedOutput, flags, 0o600)
    writeFileSync(fileDescriptor, json, "utf8")
  } catch (error) {
    if (error?.code === "EEXIST") throw new Error("output file already exists")
    if (error?.code === "ELOOP") throw new Error("output path must not be a symbolic link")
    throw new Error("sponsor report could not be written")
  } finally {
    if (fileDescriptor !== undefined) closeSync(fileDescriptor)
  }
  return resolvedOutput
}

export async function runSponsorReportCli({
  argv = process.argv.slice(2),
  environment = process.env,
  campaignsPath = DEFAULT_CAMPAIGNS_PATH,
  repositoryRoot = DEFAULT_REPOSITORY_ROOT,
  fetchImpl = globalThis.fetch,
  now = () => new Date(),
} = {}) {
  const args = parseCliArgs(argv)
  const { accountId, apiToken } = validateOperatorEnvironment(environment)
  const campaign = loadSponsorCampaign(campaignsPath, args.campaignId)
  const query = buildSponsorReportQuery(campaign, args.cutoff)
  const output = validateOutputPath(args.output, {
    repositoryRoot,
    force: args.force,
  })
  const data = await fetchAnalyticsEngineEnvelope({
    accountId,
    apiToken,
    query,
    campaign,
    cutoff: args.cutoff,
    fetchImpl,
  })
  const currentTime = now()
  if (!(currentTime instanceof Date) || !Number.isFinite(currentTime.getTime())) {
    throw new Error("report generation time is invalid")
  }
  const report = buildSponsorReport(data, {
    campaign,
    cutoff: args.cutoff,
    generatedAt: currentTime.toISOString(),
    knownIncidents: args.knownIncidents,
  })
  writeSponsorReport(output, serializeSponsorReport(report), {
    repositoryRoot,
    force: args.force,
  })
  return report
}

const isDirect =
  Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href

if (isDirect) {
  runSponsorReportCli()
    .then(() => process.stdout.write("Sponsor report written.\n"))
    .catch((error) => {
      const message = error instanceof Error ? error.message : "Sponsor report failed"
      process.stderr.write(`${message}\n`)
      process.exitCode = 1
    })
}
