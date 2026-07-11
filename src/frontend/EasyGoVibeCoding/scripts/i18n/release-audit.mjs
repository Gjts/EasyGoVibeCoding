import { createHash } from "node:crypto"
import { execFile } from "node:child_process"
import { lstat, readFile, readdir, realpath, writeFile } from "node:fs/promises"
import { extname, join, relative, resolve } from "node:path"
import { promisify } from "node:util"
import { pathToFileURL } from "node:url"

import { collectForbiddenMarkers } from "./deployment-secrets.mjs"
import { auditDeploymentSeo, validateSiteOrigin } from "./seo-postprocess.mjs"
import { BUILD_MATRIX, buildBusinessRouteMatrix, deriveAcademyRoutes } from "./static-deployment.mjs"

const execFileAsync = promisify(execFile)
const HAN_RUN = /[\p{Script=Han}\u3005\u3007]+/gu
const JAPANESE_SOURCE_MIN_LENGTH = 24
const SALES_LEGAL = Object.freeze(["/ja", "/ja/privacy", "/ja/refund", "/ja/terms", "/ja/tokushoho"])
const URL_ATTRIBUTES = new Set(["href", "src", "action", "poster", "data", "manifest"])
const SKIP_PROTOCOLS = /^(?:data|blob|mailto|tel|javascript|about):/iu
const TEXT_EXTENSIONS = new Set([".css", ".html", ".js", ".json", ".mjs", ".svg", ".txt", ".xml"])
const NON_BUSINESS_HTML_BASENAMES = new Set(["404.html", "_not-found.html", "generate-icons.html"])
const compare = (left, right) => left < right ? -1 : left > right ? 1 : 0
const slash = (value) => value.replaceAll("\\", "/")
const sha256 = (value) => createHash("sha256").update(value).digest("hex")

function decodeEntities(value) {
  return value.replace(/&(?:#(\d+)|#x([\da-f]+)|amp|quot|apos|lt|gt|nbsp);/giu, (entity, decimal, hexadecimal) => {
    if (decimal) return String.fromCodePoint(Number(decimal))
    if (hexadecimal) return String.fromCodePoint(Number.parseInt(hexadecimal, 16))
    return { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">", "&nbsp;": " " }[entity.toLowerCase()] ?? entity
  })
}

export function extractVisibleText(html) {
  return decodeEntities(String(html)
    .replace(/<!--[\s\S]*?-->/gu, " ")
    .replace(/<(?:script|style|template|noscript)\b[^>]*>[\s\S]*?<\/(?:script|style|template|noscript)\s*>/giu, " ")
    .replace(/<[^>]+>/gu, " "))
    .replace(/[\s\u00a0]+/gu, " ")
    .trim()
}

function allowlistMatch(entry, { locale, route, file, text, scope }) {
  if (entry.locale !== locale && !(Array.isArray(entry.locales) && entry.locales.includes(locale))) return false
  if (entry.text !== text || typeof entry.reason !== "string" || !entry.reason.trim()) return false
  if (entry.route && entry.route !== route) return false
  if (entry.file && entry.file !== file) return false
  if (entry.scope && entry.scope !== scope) return false
  return true
}

export function findLocalizationResidue({ locale, route, file, text, allowlist, scope = "html" }) {
  const matches = [...new Set(String(text).match(HAN_RUN) ?? [])]
  return matches.map((value) => {
    const allowed = allowlist.find((entry) => allowlistMatch(entry, { locale, route, file, text: value, scope }))
    return allowed
      ? { locale, route, file, scope, text: value, allowed: true, reason: allowed.reason }
      : { locale, route, file, scope, text: value, allowed: false }
  })
}

function parseAttributes(html) {
  const results = []
  for (const tagMatch of html.matchAll(/<([a-z][\w:-]*)\b([^>]*)>/giu)) {
    const tag = tagMatch[1].toLowerCase()
    const raw = tagMatch[2]
    for (const match of raw.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/gu)) {
      results.push({ tag, name: match[1].toLowerCase(), value: decodeEntities(match[2] ?? match[3] ?? match[4] ?? "") })
    }
  }
  return results
}

function cssUrls(value) {
  return [...value.matchAll(/url\(\s*(?:"([^"]+)"|'([^']+)'|([^)'"\s]+))\s*\)/giu)].map((match) => match[1] ?? match[2] ?? match[3])
}

export function collectHtmlReferences({ html, route }) {
  const attributes = parseAttributes(String(html))
  const anchors = new Set()
  const references = []
  for (const { tag, name, value } of attributes) {
    if ((name === "id" || (tag === "a" && name === "name")) && value) anchors.add(value)
    if (name === "style") for (const url of cssUrls(value)) references.push({ tag, attribute: name, kind: "asset", url })
    if (name === "srcset") for (const candidate of value.split(",")) {
      const url = candidate.trim().split(/\s+/u)[0]
      if (url) references.push({ tag, attribute: name, kind: "asset", url })
    }
    if (URL_ATTRIBUTES.has(name) && value) {
      const kind = value.startsWith("/api/") ? "api" : name === "href" && tag === "a" ? "navigation" : "asset"
      references.push({ tag, attribute: name, kind, url: value })
    }
  }
  for (const url of cssUrls(String(html))) if (!references.some((item) => item.url === url)) references.push({ tag: "style", attribute: "css-url", kind: "asset", url })
  return { route, anchors, references }
}

function routeHtmlPath(route) { return route === "/" ? "index.html" : `${route.slice(1)}.html` }
function academyHtmlPath(locale, logicalRoute) {
  const { basePath } = BUILD_MATRIX.find((item) => item.locale === locale)
  if (locale === "zh-CN") return routeHtmlPath(logicalRoute)
  return logicalRoute === "/" ? `${basePath.slice(1)}/index.html` : `${basePath.slice(1)}${logicalRoute}.html`
}
function academyRoute(locale, logicalRoute) {
  const { basePath } = BUILD_MATRIX.find((item) => item.locale === locale)
  if (locale === "zh-CN") return logicalRoute
  return logicalRoute === "/" ? basePath : `${basePath}${logicalRoute}`
}

async function listFiles(root) {
  const absoluteRoot = resolve(root)
  const realRoot = await realpath(absoluteRoot)
  const files = []
  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true })
    entries.sort((a, b) => compare(a.name, b.name))
    for (const entry of entries) {
      const absolute = join(directory, entry.name)
      const path = slash(relative(absoluteRoot, absolute))
      if (entry.isSymbolicLink()) throw new Error(`Release contains symbolic link: ${path}`)
      if (entry.isDirectory()) await walk(absolute)
      else if (entry.isFile()) {
        const details = await lstat(absolute)
        if (details.isSymbolicLink() || !details.isFile()) throw new Error(`Release contains non-ordinary file: ${path}`)
        files.push({ absolute, path, size: details.size })
      } else throw new Error(`Release contains non-ordinary entry: ${path}`)
    }
  }
  await walk(absoluteRoot)
  if (await realpath(absoluteRoot) !== realRoot) throw new Error("Release root changed during audit")
  return files
}

function normalizedPathname(raw, { currentRoute, siteOrigin }) {
  if (!raw || SKIP_PROTOCOLS.test(raw) || raw.startsWith("//")) return null
  let url
  try { url = new URL(raw, `${siteOrigin}${currentRoute === "/" ? "/" : currentRoute}`) } catch { return { invalid: true, raw } }
  if (url.origin !== siteOrigin) return null
  return { pathname: decodeURIComponent(url.pathname), fragment: decodeURIComponent(url.hash.slice(1)), raw }
}

function pathCandidates(pathname) {
  const clean = pathname.replace(/^\/+|\/+$/gu, "")
  if (!clean) return ["index.html"]
  if (extname(clean)) return [clean]
  return [`${clean}.html`, `${clean}/index.html`, clean]
}

function basePathForRoute(route) {
  return BUILD_MATRIX.slice(1).find(({ basePath }) => route === basePath || route.startsWith(`${basePath}/`))?.basePath ?? ""
}

function referenceFailures({ records, filePaths, anchorsByPath, siteOrigin }) {
  const failures = []
  let checked = 0
  let apiExceptions = 0
  const referencedPaths = new Set()
  for (const record of records) {
    const currentBase = basePathForRoute(record.route)
    for (const reference of record.references) {
      if (reference.kind === "api" && reference.url.startsWith("/api/")) { apiExceptions += 1; continue }
      const resolved = normalizedPathname(reference.url, { currentRoute: record.route, siteOrigin })
      if (!resolved) continue
      checked += 1
      if (resolved.invalid) { failures.push({ route: record.route, file: record.file, url: reference.url, reason: "invalid-local-url" }); continue }
      const doubled = BUILD_MATRIX.slice(1).some(({ basePath }) => resolved.pathname.startsWith(`${basePath}${basePath}/`) || resolved.pathname === `${basePath}${basePath}`)
      if (doubled) failures.push({ route: record.route, file: record.file, url: reference.url, reason: "doubled-locale-prefix" })
      if (resolved.pathname.includes("/_next/") && currentBase && !resolved.pathname.startsWith(`${currentBase}/_next/`)) {
        failures.push({ route: record.route, file: record.file, url: reference.url, reason: "cross-locale-next-asset" })
      }
      const candidates = pathCandidates(resolved.pathname)
      const target = candidates.find((candidate) => filePaths.has(candidate.toLowerCase()))
      if (!target) { failures.push({ route: record.route, file: record.file, url: reference.url, reason: "missing-local-target", candidates }); continue }
      referencedPaths.add(target.toLowerCase())
      if (resolved.fragment) {
        const anchors = anchorsByPath.get(target.toLowerCase())
        const fragmentTarget = resolved.fragment.split("?")[0]
        if (target.toLowerCase().endsWith(".html") && (!anchors || !anchors.has(fragmentTarget))) {
          failures.push({ route: record.route, file: record.file, url: reference.url, reason: "missing-anchor", fragment: resolved.fragment })
        }
      }
    }
  }
  return { checked, apiExceptions, uniqueTargets: referencedPaths.size, failures }
}

function cssReferenceRecords({ cssFiles }) {
  return cssFiles.map(({ path, source }) => ({
    route: `/${path}`,
    file: path,
    references: cssUrls(source).map((url) => ({ tag: "css", attribute: "url", kind: "asset", url })),
  }))
}

export function scanSecurityBytes({ path, bytes, forbiddenMarkers }) {
  const hits = []
  for (const marker of forbiddenMarkers) if (marker.bytes?.length && bytes.includes(marker.bytes)) hits.push({ path, category: "configured-secret", marker: marker.name })
  const lower = path.toLowerCase()
  if (lower.endsWith(".map")) hits.push({ path, category: "source-map" })
  if (/(?:^|\/)(?:\.env(?:\.local)?|\.cache|node_modules|\.git)(?:\/|$)/u.test(lower)) hits.push({ path, category: "forbidden-artifact" })
  if (TEXT_EXTENSIONS.has(extname(lower))) {
    const text = bytes.toString("utf8")
    if (/\bat\s+(?:async\s+)?(?:file:\/\/\/)?(?:[a-z]:\\users\\|\/home\/[^/]+\/|\/Users\/[^/]+\/)[^\r\n]+:\d+:\d+/iu.test(text)) hits.push({ path, category: "local-stack-trace" })
  }
  return hits
}

async function trackedSecurity({ projectRoot, forbiddenMarkers }) {
  const { stdout } = await execFileAsync("git", ["ls-files", "-z"], { cwd: projectRoot, encoding: "buffer", maxBuffer: 20 * 1024 * 1024 })
  const paths = stdout.toString("utf8").split("\0").filter(Boolean)
  const hits = []
  for (const path of paths) {
    const bytes = await readFile(join(projectRoot, ...slash(path).split("/")))
    hits.push(...scanSecurityBytes({ path, bytes, forbiddenMarkers }))
  }
  return { fileCount: paths.length, hits }
}

function validateJapaneseSourceIdentity({ route, file, htmlText, sourceEntries, allowlist }) {
  const hits = []
  for (const source of sourceEntries) {
    const normalized = String(source).replace(/\s+/gu, " ").trim()
    if (normalized.length < JAPANESE_SOURCE_MIN_LENGTH || !/[\p{Script=Han}]/u.test(normalized) || !htmlText.includes(normalized)) continue
    const allowed = allowlist.find((entry) => allowlistMatch(entry, { locale: "ja", route, file, text: normalized, scope: "source-identical" }))
    hits.push({ locale: "ja", route, file, scope: "source-identical", text: normalized, allowed: Boolean(allowed), ...(allowed ? { reason: allowed.reason } : {}) })
  }
  return hits
}

function summarizeResidue(items, scanned) {
  const unique = [...new Map(items.map((item) => [[item.locale, item.route, item.file, item.scope, item.text].join("\0"), item])).values()]
  const allowed = unique.filter((item) => item.allowed)
  const unexplained = unique.filter((item) => !item.allowed)
  return { ...scanned, hitCount: unique.length, allowedCount: allowed.length, unexplainedCount: unexplained.length, allowed, unexplained }
}

function payloadPathForHtml(path) {
  if (path === "index.html") return "__next._full.txt"
  if (path.endsWith("/index.html")) return `${path.slice(0, -"index.html".length)}__next._full.txt`
  return `${path.slice(0, -".html".length)}/__next._full.txt`
}

export async function auditRelease({ deploymentRoot, projectRoot, academyRoutes, salesLegal = SALES_LEGAL, siteOrigin, forbiddenMarkers = [], allowlist = [], sourceEntries = [], browserEvidence = { status: "pending" } }) {
  const origin = validateSiteOrigin(siteOrigin)
  const root = resolve(deploymentRoot)
  const files = await listFiles(root)
  const filePaths = new Map(files.map((item) => [item.path.toLowerCase(), item]))
  const emptyFiles = files.filter((item) => item.size === 0).map((item) => item.path)
  const matrix = buildBusinessRouteMatrix(academyRoutes)
  const expected = []
  for (const { locale } of BUILD_MATRIX) for (const logicalRoute of academyRoutes) expected.push({ locale, logicalRoute, route: academyRoute(locale, logicalRoute), file: academyHtmlPath(locale, logicalRoute) })
  expected.push(...salesLegal.map((route) => ({ locale: "ja-sales", route, file: routeHtmlPath(route) })))
  const missing = expected.filter(({ file }) => !filePaths.has(file.toLowerCase())).map(({ route, file }) => ({ route, file }))
  const zeroByte = expected.filter(({ file }) => filePaths.get(file.toLowerCase())?.size === 0).map(({ route, file }) => ({ route, file }))
  const duplicatePaths = [...filePaths.keys()].filter((path, index, all) => all.indexOf(path) !== index)
  const localizedPrefixes = BUILD_MATRIX.slice(1).map(({ basePath }) => basePath.slice(1).toLowerCase())
  const unexpectedLocalizedHtml = files.filter(({ path }) => path.toLowerCase().endsWith(".html") && localizedPrefixes.some((prefix) => path.toLowerCase().startsWith(`${prefix}/`)) && !expected.some(({ file }) => file.toLowerCase() === path.toLowerCase()) && !NON_BUSINESS_HTML_BASENAMES.has(path.toLowerCase().split("/").at(-1))).map(({ path }) => path)
  const routeMatrix = { logicalRoutes: academyRoutes.length, academyPages: expected.length - salesLegal.length, localizedPages: expected.filter(({ locale }) => ["ja", "en", "fr", "de"].includes(locale)).length, salesLegalPages: salesLegal.length, businessPages: expected.length, missing, zeroByte, duplicatePaths, unexpectedLocalizedHtml }
  if (missing.length || zeroByte.length || duplicatePaths.length || unexpectedLocalizedHtml.length || academyRoutes.length !== 79 || matrix.total !== 400) {
    throw new Error(`Release route matrix failed: ${JSON.stringify(routeMatrix)}`)
  }
  const mergeManifestFile = filePaths.get("i18n-merge-manifest.json")
  if (!mergeManifestFile) throw new Error("Release has no i18n merge manifest")
  const mergeManifestBytes = await readFile(mergeManifestFile.absolute)
  const mergeManifest = JSON.parse(mergeManifestBytes.toString("utf8"))
  const expectedBuilds = BUILD_MATRIX.map(({ locale, basePath }) => `${locale}\0${basePath}`)
  const actualBuilds = (mergeManifest.builds ?? []).map(({ locale, basePath }) => `${locale}\0${basePath}`)
  if (JSON.stringify(actualBuilds) !== JSON.stringify(expectedBuilds) || mergeManifest.businessRouteMatrix?.total !== 400 || mergeManifest.seo?.siteOrigin !== origin) {
    throw new Error("Release manifest provenance does not match the audited build matrix and origin")
  }
  const buildEvidence = {
    manifestSha256: sha256(mergeManifestBytes),
    sourceBuilds: mergeManifest.builds.map(({ locale, basePath, sourceOutput, logicalRouteCount, copiedFileCount }) => ({ locale, basePath, sourceOutput, logicalRouteCount, copiedFileCount })),
    seoOriginKind: mergeManifest.seo.originKind,
    seoSiteOrigin: mergeManifest.seo.siteOrigin,
  }

  const htmlRecords = []
  const anchorsByPath = new Map()
  const residue = []
  const scriptRoutes = new Map()
  const payloadFiles = new Set()
  let localizedHtmlPagesScanned = 0
  for (const record of expected) {
    const source = await readFile(join(root, ...record.file.split("/")), "utf8")
    const parsed = collectHtmlReferences({ html: source, route: record.route })
    anchorsByPath.set(record.file.toLowerCase(), parsed.anchors)
    htmlRecords.push({ route: record.route, file: record.file, references: parsed.references })
    if (["ja", "en", "fr", "de"].includes(record.locale)) localizedHtmlPagesScanned += 1
    if (["en", "fr", "de"].includes(record.locale)) residue.push(...findLocalizationResidue({ locale: record.locale, route: record.route, file: record.file, text: extractVisibleText(source), allowlist, scope: "html" }))
    if (record.locale === "ja") residue.push(...validateJapaneseSourceIdentity({ route: record.route, file: record.file, htmlText: extractVisibleText(source), sourceEntries, allowlist }))
    if (["ja", "en", "fr", "de"].includes(record.locale)) {
      const payloadPath = payloadPathForHtml(record.file)
      const payloadFile = filePaths.get(payloadPath.toLowerCase())
      if (!payloadFile) residue.push({ locale: record.locale, route: record.route, file: payloadPath, scope: "rsc", text: "missing-payload", allowed: false })
      else {
        payloadFiles.add(payloadPath.toLowerCase())
        const payload = await readFile(payloadFile.absolute, "utf8")
        if (["en", "fr", "de"].includes(record.locale)) residue.push(...findLocalizationResidue({ locale: record.locale, route: record.route, file: payloadPath, text: payload, allowlist, scope: "rsc" }))
        else residue.push(...validateJapaneseSourceIdentity({ route: record.route, file: payloadPath, htmlText: payload, sourceEntries, allowlist }))
      }
    }
    for (const reference of parsed.references.filter((item) => item.tag === "script" && item.attribute === "src")) {
      const resolved = normalizedPathname(reference.url, { currentRoute: record.route, siteOrigin: origin })
      if (!resolved?.pathname) continue
      const target = pathCandidates(resolved.pathname).find((candidate) => filePaths.has(candidate.toLowerCase()))
      if (target) {
        if (!scriptRoutes.has(target.toLowerCase())) scriptRoutes.set(target.toLowerCase(), [])
        scriptRoutes.get(target.toLowerCase()).push(record)
      }
    }
  }

  for (const [path, routes] of scriptRoutes) {
    const bytes = await readFile(filePaths.get(path).absolute)
    const source = bytes.toString("utf8")
    for (const record of routes.filter(({ locale }) => ["en", "fr", "de"].includes(locale))) {
      residue.push(...findLocalizationResidue({ locale: record.locale, route: record.route, file: filePaths.get(path).path, text: source, allowlist, scope: "js" }))
    }
    for (const record of routes.filter(({ locale }) => locale === "ja")) {
      residue.push(...validateJapaneseSourceIdentity({ route: record.route, file: filePaths.get(path).path, htmlText: source, sourceEntries, allowlist }))
    }
  }
  const localization = summarizeResidue(residue, { localizedHtmlPagesScanned, rscPayloadFilesScanned: payloadFiles.size, jsChunkFilesScanned: scriptRoutes.size, jsRouteAssociationsScanned: [...scriptRoutes.values()].reduce((sum, routes) => sum + routes.length, 0) })

  const cssFiles = []
  for (const file of files.filter(({ path }) => path.toLowerCase().endsWith(".css"))) cssFiles.push({ path: file.path, source: await readFile(file.absolute, "utf8") })
  const linkRecords = [...htmlRecords, ...cssReferenceRecords({ cssFiles, siteOrigin: origin })]
  const links = referenceFailures({ records: linkRecords, filePaths: new Set(filePaths.keys()), anchorsByPath, siteOrigin: origin })

  const localPathMarkers = projectRoot ? [
    { name: "LOCAL_PROJECT_PATH", bytes: Buffer.from(resolve(projectRoot)) },
    { name: "LOCAL_PROJECT_PATH", bytes: Buffer.from(slash(resolve(projectRoot))) },
  ] : []
  const securityHits = []
  const deploymentContentEvidence = []
  for (const file of files) {
    const bytes = await readFile(file.absolute)
    securityHits.push(...scanSecurityBytes({ path: file.path, bytes, forbiddenMarkers: [...forbiddenMarkers, ...localPathMarkers] }))
    deploymentContentEvidence.push(`${file.path}\0${sha256(bytes)}\0${bytes.length}\n`)
  }
  const tracked = projectRoot ? await trackedSecurity({ projectRoot, forbiddenMarkers }) : { fileCount: 0, hits: [] }
  const security = { deploymentFileCount: files.length, trackedFileCount: tracked.fileCount, deploymentHits: securityHits, trackedHits: tracked.hits }
  const seo = await auditDeploymentSeo({ deploymentRoot: root, academyRoutes, salesLegal, siteOrigin: origin })
  const failures = {
    localization: localization.unexplainedCount,
    links: links.failures.length,
    security: security.deploymentHits.length + security.trackedHits.length,
    emptyFiles: emptyFiles.length,
  }
  const nonBrowserPass = Object.values(failures).every((count) => count === 0)
  const browserPass = browserEvidence?.status === "pass"
  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    siteOrigin: origin,
    originKind: origin.endsWith(".invalid") ? "non-production" : "release",
    status: nonBrowserPass ? (browserPass ? "PASS" : "PENDING_BROWSER") : "FAIL",
    nonBrowserStatus: nonBrowserPass ? "PASS" : "FAIL",
    browserEvidence,
    checks: {
      routeMatrix: routeMatrix.missing.length + routeMatrix.zeroByte.length + routeMatrix.duplicatePaths.length + routeMatrix.unexpectedLocalizedHtml.length === 0 ? "PASS" : "FAIL",
      localization: localization.unexplainedCount === 0 ? "PASS" : "FAIL",
      linksAndAssets: links.failures.length === 0 ? "PASS" : "FAIL",
      seo: seo.businessPageCount === 400 && seo.sitemapUrlCount === 400 ? "PASS" : "FAIL",
      security: security.deploymentHits.length + security.trackedHits.length === 0 ? "PASS" : "FAIL",
      browser: browserEvidence?.status ?? "pending",
    },
    buildEvidence,
    routeMatrix,
    localization,
    links,
    seo,
    security,
    emptyFiles,
    failures,
    deploymentSha256: sha256(Buffer.from(deploymentContentEvidence.join(""))),
  }
}

async function loadAllowlist(projectRoot) {
  const path = join(projectRoot, "scripts", "i18n", "release-audit-allowlist.json")
  return JSON.parse(await readFile(path, "utf8"))
}

async function loadSourceEntries(projectRoot) {
  const catalog = JSON.parse(await readFile(join(projectRoot, "i18n", "catalog", "source.zh-CN.json"), "utf8"))
  const values = Array.isArray(catalog) ? catalog : Array.isArray(catalog.entries) ? catalog.entries : Object.values(catalog.entries ?? catalog.messages ?? catalog)
  return values.map((entry) => typeof entry === "string" ? entry : entry.source ?? entry.message ?? entry.value ?? "").filter(Boolean)
}

async function cli() {
  const projectRoot = resolve(process.cwd())
  const deploymentRoot = join(projectRoot, ".cache", "i18n-deploy")
  const academyRoutes = await deriveAcademyRoutes(projectRoot)
  const forbiddenMarkers = (await collectForbiddenMarkers(projectRoot)).map(({ name, value }) => ({ name, bytes: Buffer.from(value) }))
  const allowlist = await loadAllowlist(projectRoot)
  const sourceEntries = await loadSourceEntries(projectRoot)
  const report = await auditRelease({ deploymentRoot, projectRoot, academyRoutes, siteOrigin: process.env.I18N_SITE_ORIGIN, forbiddenMarkers, allowlist, sourceEntries })
  const reportPath = join(projectRoot, ".cache", "i18n-release-audit.json")
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify({ status: report.status, nonBrowserStatus: report.nonBrowserStatus, report: slash(relative(projectRoot, reportPath)), routes: report.routeMatrix, residue: { allowed: report.localization.allowedCount, unexplained: report.localization.unexplainedCount }, links: { checked: report.links.checked, failures: report.links.failures.length }, security: { deployment: report.security.deploymentHits.length, tracked: report.security.trackedHits.length } }))
  if (report.nonBrowserStatus !== "PASS") process.exitCode = 1
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) cli().catch((error) => { console.error(error?.stack ?? error); process.exitCode = 1 })
