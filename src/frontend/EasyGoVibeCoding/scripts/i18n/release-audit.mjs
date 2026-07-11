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
const VISIBLE_ATTRIBUTES = new Set(["alt", "title", "placeholder", "aria-label", "value"])
const SKIP_PROTOCOLS = /^(?:data|blob|mailto|tel|javascript|about):/iu
const TEXT_EXTENSIONS = new Set([".css", ".html", ".js", ".json", ".mjs", ".svg", ".txt", ".xml"])
export const SYSTEM_HTML_PATHS = Object.freeze([
  "404.html", "_not-found.html", "generate-icons.html",
  "ja/academy/404.html", "ja/academy/_not-found.html", "ja/academy/generate-icons.html",
  "en/academy/404.html", "en/academy/_not-found.html", "en/academy/generate-icons.html",
  "fr/academy/404.html", "fr/academy/_not-found.html", "fr/academy/generate-icons.html",
  "de/academy/404.html", "de/academy/_not-found.html", "de/academy/generate-icons.html",
])
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
  const source = String(html)
  const visibleAttributes = parseAttributes(withoutRawTextBodies(source)).filter(({ name, value }) => VISIBLE_ATTRIBUTES.has(name) && value).map(({ value }) => value)
  const bodyText = decodeEntities(source
    .replace(/<!--[\s\S]*?-->/gu, " ")
    .replace(/<(?:script|style|template|noscript)\b[^>]*>[\s\S]*?<\/(?:script|style|template|noscript)\s*>/giu, " ")
    .replace(/<[^>]+>/gu, " "))
  return [...visibleAttributes, bodyText].join(" ").replace(/[\s\u00a0]+/gu, " ").trim()
}

function allowlistMatch(entry, { locale, route, file, text, scope }) {
  if (entry.locale !== locale) return false
  if (entry.text !== text || typeof entry.reason !== "string" || !entry.reason.trim()) return false
  if (entry.route && entry.route !== route) return false
  if (entry.file && entry.file !== file) return false
  if (entry.scope && entry.scope !== scope) return false
  return true
}

export function validateAllowlist(allowlist) {
  if (!Array.isArray(allowlist)) throw new Error("Localization allowlist must be an array")
  const keys = new Set()
  for (const [index, entry] of allowlist.entries()) {
    for (const field of ["locale", "route", "file", "scope", "text", "reason"]) {
      if (typeof entry?.[field] !== "string" || !entry[field].trim()) throw new Error(`Localization allowlist entry ${index} requires exact ${field}`)
    }
    if (!BUILD_MATRIX.slice(1).some(({ locale }) => locale === entry.locale)) throw new Error(`Localization allowlist entry ${index} has invalid locale`)
    const key = [entry.locale, entry.route, entry.file, entry.scope, entry.text].join("\0")
    if (keys.has(key)) throw new Error(`Localization allowlist contains duplicate entry ${index}`)
    keys.add(key)
  }
  return allowlist
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

function withoutRawTextBodies(html) {
  return String(html).replace(/(<(?:script|style|template|noscript)\b[^>]*>)[\s\S]*?(<\/(?:script|style|template|noscript)\s*>)/giu, "$1$2")
}

function cssUrls(value) {
  return [...value.matchAll(/url\(\s*(?:"([^"]+)"|'([^']+)'|([^)'"\s]+))\s*\)/giu)].map((match) => match[1] ?? match[2] ?? match[3])
}

export function collectCssReferences(source) {
  const imports = [...String(source).matchAll(/@import\s+(?:url\(\s*)?(?:"([^"]+)"|'([^']+)'|([^\s;)]+))/giu)].map((match) => match[1] ?? match[2] ?? match[3])
  return [...new Set([...imports, ...cssUrls(String(source))])]
}

export function collectHtmlReferences({ html, route }) {
  const source = String(html)
  const attributes = parseAttributes(withoutRawTextBodies(source))
  const anchors = new Set()
  const references = []
  for (const { tag, name, value } of attributes) {
    if ((name === "id" || (tag === "a" && name === "name")) && value) anchors.add(value)
    if (name === "style") for (const url of cssUrls(value)) references.push({ tag, attribute: name, kind: "asset", url })
    if (name === "srcset") for (const candidate of value.split(",")) {
      const url = candidate.trim().split(/\s+/u)[0]
      if (url) references.push({ tag, attribute: name, kind: "asset", url })
    }
    if (URL_ATTRIBUTES.has(name) && value && (name !== "data" || tag === "object")) {
      const kind = value.startsWith("/api/") ? "api" : name === "href" && tag === "a" ? "navigation" : "asset"
      references.push({ tag, attribute: name, kind, url: value })
    }
  }
  for (const style of source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/giu)) for (const url of collectCssReferences(style[1])) {
    if (!references.some((item) => item.url === url)) references.push({ tag: "style", attribute: "css-url-or-import", kind: "asset", url })
  }
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

function releaseIdentity(path) { return slash(path).normalize("NFC").toLowerCase() }

export function validateReleasePathIndex(files) {
  const paths = new Map()
  for (const file of files) {
    const identity = releaseIdentity(file.path)
    const prior = paths.get(identity)
    if (prior) throw new Error(`Release path collision under NFC/case-fold semantics: ${prior.path} / ${file.path}`)
    paths.set(identity, file)
  }
  return paths
}

export function classifyHtmlPaths({ htmlPaths, businessPaths, systemPaths = SYSTEM_HTML_PATHS }) {
  const actual = new Set(htmlPaths.map(releaseIdentity))
  const business = new Set(businessPaths.map(releaseIdentity))
  const system = new Set(systemPaths.map(releaseIdentity))
  const missingBusiness = [...business].filter((path) => !actual.has(path))
  const missingSystem = [...system].filter((path) => !actual.has(path))
  const rogue = [...actual].filter((path) => !business.has(path) && !system.has(path))
  if (missingBusiness.length || missingSystem.length || rogue.length || actual.size !== business.size + system.size) {
    throw new Error(`HTML classification failed: ${JSON.stringify({ missingBusiness, missingSystem, rogue })}`)
  }
  return { totalHtml: actual.size, businessHtml: business.size, systemHtml: system.size, missingBusiness, missingSystem, rogue }
}

export function validateManifestProvenance({ manifest, files, generatedPaths }) {
  const generated = new Set([...generatedPaths].map(releaseIdentity))
  const claimed = new Set()
  let checked = 0
  let generatedCheckedSeparately = 0
  for (const build of manifest.builds ?? []) {
    const expectedBuild = BUILD_MATRIX.find(({ locale }) => locale === build.locale)
    if (!expectedBuild || build.basePath !== expectedBuild.basePath) throw new Error(`Manifest provenance has invalid build locale/base path: ${build.locale}`)
    const expectedSourceOutput = build.locale === "zh-CN" ? "out" : `.cache/i18n-build/${build.locale}/out`
    if (build.sourceOutput !== expectedSourceOutput) throw new Error(`Manifest provenance has invalid source output for ${build.locale}`)
    if (build.logicalRouteCount !== 79) throw new Error(`Manifest provenance logical route count must be 79 for ${build.locale}`)
    if (build.copiedFileCount !== build.copiedFiles?.length) throw new Error(`Manifest provenance copied file count mismatch for ${build.locale}`)
    for (const copied of build.copiedFiles ?? []) {
      const sourcePrefix = `${build.locale}:`
      if (typeof copied.source !== "string" || !copied.source.startsWith(sourcePrefix) || copied.source.indexOf(":", sourcePrefix.length) >= 0) throw new Error(`Manifest provenance has invalid source for ${copied.path}`)
      const sourceRelative = copied.source.slice(sourcePrefix.length)
      const safeRelative = (value) => typeof value === "string" && value && value === value.normalize("NFC") && !value.includes("\\") && !value.startsWith("/") && !value.includes("\0") && value.split("/").every((part) => part && part !== "." && part !== "..")
      if (!safeRelative(sourceRelative) || !safeRelative(copied.path)) throw new Error(`Manifest provenance contains unsafe source or destination: ${copied.path}`)
      const expectedDestination = build.locale === "zh-CN" ? sourceRelative : `${build.basePath.slice(1)}/${sourceRelative}`
      if (copied.path !== expectedDestination) throw new Error(`Manifest provenance destination/source mapping mismatch: ${copied.path}`)
      if (!Number.isInteger(copied.size) || copied.size <= 0 || !/^[a-f\d]{64}$/u.test(copied.sha256)) throw new Error(`Manifest provenance contains invalid size/hash: ${copied.path}`)
      const identity = releaseIdentity(copied.path)
      if (claimed.has(identity)) throw new Error(`Manifest provenance contains duplicate destination: ${copied.path}`)
      claimed.add(identity)
      const actual = files.get(identity)
      if (!actual) throw new Error(`Manifest provenance target is missing: ${copied.path}`)
      if (actual.path !== copied.path) throw new Error(`Manifest provenance path casing/normalization mismatch: ${copied.path}`)
      if (generated.has(identity)) { generatedCheckedSeparately += 1; continue }
      if (actual.size !== copied.size || actual.sha256 !== copied.sha256) throw new Error(`Manifest provenance mismatch for ${copied.path}`)
      checked += 1
    }
  }
  for (const path of files.keys()) {
    if (path === "i18n-merge-manifest.json" || generated.has(path)) continue
    if (!claimed.has(path)) throw new Error(`Deployment file is absent from manifest provenance: ${files.get(path).path}`)
  }
  return { copiedFileCount: claimed.size, byteVerifiedCopiedFiles: checked, seoMutatedCopiedFiles: generatedCheckedSeparately }
}

export function buildFrozenSeoProcessedSet(academyRoutes) {
  const paths = BUILD_MATRIX.flatMap(({ locale }) => academyRoutes.map((logicalRoute) => academyHtmlPath(locale, logicalRoute)))
  return [...paths, "robots.txt", "sitemap.xml"].sort(compare)
}

export function validateSeoProcessedSet({ manifest, academyRoutes }) {
  const expected = buildFrozenSeoProcessedSet(academyRoutes)
  const actual = manifest.seo?.processedFiles
  if (!Array.isArray(actual) || JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error("SEO processed files do not exactly match the frozen academy/robots/sitemap set")
  return new Set(expected)
}

export function validateLocalizedScriptCoverage(records, files) {
  const closure = new Set()
  for (const record of records) {
    if (!record.scriptPaths?.length) throw new Error(`Localized route script coverage is empty: ${record.locale}:${record.route}`)
    for (const path of record.scriptPaths) {
      const identity = releaseIdentity(path)
      if (!files.has(identity)) throw new Error(`Localized route script coverage references a missing chunk: ${record.route}:${path}`)
      closure.add(identity)
    }
  }
  if (!closure.size) throw new Error("Localized route script coverage closure is empty")
  return { localizedRoutes: records.length, jsChunkFiles: closure.size, routeChunkAssociations: records.reduce((sum, record) => sum + record.scriptPaths.length, 0) }
}

function normalizedPathname(raw, { currentRoute, siteOrigin }) {
  if (!raw || SKIP_PROTOCOLS.test(raw)) return null
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
      const target = candidates.find((candidate) => filePaths.has(releaseIdentity(candidate)))
      if (!target) { failures.push({ route: record.route, file: record.file, url: reference.url, reason: "missing-local-target", candidates }); continue }
      referencedPaths.add(releaseIdentity(target))
      if (resolved.fragment) {
        const anchors = anchorsByPath.get(releaseIdentity(target))
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
    references: collectCssReferences(source).map((url) => ({ tag: "css", attribute: "url-or-import", kind: "asset", url })),
  }))
}

export function findLocalPaths(text) {
  const patterns = [
    /(?<![\p{L}\p{N}])[a-z]:[\\/](?![\\/])[^\s"'`<>|]+/giu,
    /(?<!\\)\\\\(?!\\)[a-z\d][a-z\d._-]+\\[a-z\d][a-z\d._-]+(?:\\[^\s"'`<>|]+)*/giu,
    /file:\/\/\/(?:[a-z]:\/)?[^\s"'`<>]+/giu,
    /(?<![\p{L}\p{N}:])\/(?:Users|home|workspace|opt|tmp|var\/tmp)(?![\p{L}\p{N}|)\\])(?:\/[^\s"'`<>|]+)?/gu,
  ]
  return [...new Set(patterns.flatMap((pattern) => [...text.matchAll(pattern)].map(([match]) => match.replace(/[),.;\]}]+$/gu, ""))))]
}

export function validateLocalPathAllowlist(allowlist) {
  if (!Array.isArray(allowlist)) throw new Error("Local-path allowlist must be an array")
  const keys = new Set()
  for (const [index, entry] of allowlist.entries()) for (const field of ["path", "text", "reason"]) {
    if (typeof entry?.[field] !== "string" || !entry[field].trim()) throw new Error(`Local-path allowlist entry ${index} requires exact ${field}`)
  }
  for (const [index, entry] of allowlist.entries()) {
    const key = `${entry.path}\0${entry.text}`
    if (keys.has(key)) throw new Error(`Local-path allowlist contains duplicate entry ${index}`)
    keys.add(key)
  }
  return allowlist
}

export function scanSecurityBytes({ path, bytes, forbiddenMarkers, localPathAllowlist = [], localPathUsage }) {
  const hits = []
  for (const marker of forbiddenMarkers) if (marker.bytes?.length && bytes.includes(marker.bytes)) hits.push({ path, category: marker.name === "LOCAL_PROJECT_PATH" ? "absolute-local-path" : "configured-secret", marker: marker.name })
  const lower = path.toLowerCase()
  if (lower.endsWith(".map")) hits.push({ path, category: "source-map" })
  if (/(?:^|\/)(?:\.env(?:\.local)?|\.cache|node_modules|\.git)(?:\/|$)/u.test(lower)) hits.push({ path, category: "forbidden-artifact" })
  if (TEXT_EXTENSIONS.has(extname(lower)) && lower !== "scripts/i18n/release-audit-local-path-allowlist.json") {
    const text = bytes.toString("utf8")
    for (const value of findLocalPaths(text)) {
      const allowed = localPathAllowlist.find((entry) => entry.path === path && entry.text === value && entry.reason.trim())
      if (allowed && localPathUsage) {
        const key = `${allowed.path}\0${allowed.text}`
        localPathUsage.set(key, (localPathUsage.get(key) ?? 0) + 1)
      }
      if (!allowed) hits.push({ path, category: "absolute-local-path" })
    }
    if (/\bat\s+(?:async\s+)?(?:file:\/\/\/)?(?:[a-z]:\\users\\|\/home\/[^/]+\/|\/Users\/[^/]+\/)[^\r\n]+:\d+:\d+/iu.test(text)) hits.push({ path, category: "local-stack-trace" })
  }
  return hits
}

async function trackedSecurity({ projectRoot, forbiddenMarkers, localPathAllowlist, localPathUsage }) {
  const { stdout } = await execFileAsync("git", ["ls-files", "-z"], { cwd: projectRoot, encoding: "buffer", maxBuffer: 20 * 1024 * 1024 })
  const paths = stdout.toString("utf8").split("\0").filter(Boolean)
  const hits = []
  for (const path of paths) {
    const bytes = await readFile(join(projectRoot, ...slash(path).split("/")))
    hits.push(...scanSecurityBytes({ path, bytes, forbiddenMarkers, localPathAllowlist, localPathUsage }))
  }
  return { fileCount: paths.length, hits }
}

function validateJapaneseSourceIdentity({ route, file, htmlText, sourceEntries, allowlist }) {
  const hits = []
  for (const source of sourceEntries) {
    if (!htmlText.includes(source)) continue
    const allowed = allowlist.find((entry) => allowlistMatch(entry, { locale: "ja", route, file, text: source, scope: "source-identical" }))
    hits.push({ locale: "ja", route, file, scope: "source-identical", text: source, allowed: Boolean(allowed), ...(allowed ? { reason: allowed.reason } : {}) })
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

export async function auditRelease({ deploymentRoot, projectRoot, academyRoutes, salesLegal = SALES_LEGAL, siteOrigin, forbiddenMarkers = [], allowlist = [], localPathAllowlist = [], sourceEntries = [], browserEvidence = { status: "pending" } }) {
  const origin = validateSiteOrigin(siteOrigin)
  validateAllowlist(allowlist)
  validateLocalPathAllowlist(localPathAllowlist)
  const root = resolve(deploymentRoot)
  const japaneseSourceCandidates = [...new Set(sourceEntries.map((source) => String(source).replace(/\s+/gu, " ").trim()).filter((source) => source.length >= JAPANESE_SOURCE_MIN_LENGTH && /[\p{Script=Han}]/u.test(source)))]
  const files = await listFiles(root)
  for (const file of files) {
    file.bytes = await readFile(file.absolute)
    file.sha256 = sha256(file.bytes)
  }
  const filePaths = validateReleasePathIndex(files)
  const emptyFiles = files.filter((item) => item.size === 0).map((item) => item.path)
  const matrix = buildBusinessRouteMatrix(academyRoutes)
  const expected = []
  for (const { locale } of BUILD_MATRIX) for (const logicalRoute of academyRoutes) expected.push({ locale, logicalRoute, route: academyRoute(locale, logicalRoute), file: academyHtmlPath(locale, logicalRoute) })
  expected.push(...salesLegal.map((route) => ({ locale: "ja-sales", route, file: routeHtmlPath(route) })))
  const missing = expected.filter(({ file }) => !filePaths.has(releaseIdentity(file))).map(({ route, file }) => ({ route, file }))
  const zeroByte = expected.filter(({ file }) => filePaths.get(releaseIdentity(file))?.size === 0).map(({ route, file }) => ({ route, file }))
  const htmlClassification = classifyHtmlPaths({ htmlPaths: files.filter(({ path }) => path.toLowerCase().endsWith(".html")).map(({ path }) => path), businessPaths: expected.map(({ file }) => file) })
  const routeMatrix = { logicalRoutes: academyRoutes.length, academyPages: expected.length - salesLegal.length, localizedPages: expected.filter(({ locale }) => ["ja", "en", "fr", "de"].includes(locale)).length, salesLegalPages: salesLegal.length, businessPages: expected.length, systemPages: htmlClassification.systemHtml, totalHtml: htmlClassification.totalHtml, missing, zeroByte, pathCollisions: 0, rogueHtml: htmlClassification.rogue }
  if (missing.length || zeroByte.length || academyRoutes.length !== 79 || matrix.total !== 400 || htmlClassification.totalHtml !== 415) {
    throw new Error(`Release route matrix failed: ${JSON.stringify(routeMatrix)}`)
  }
  const mergeManifestFile = filePaths.get(releaseIdentity("i18n-merge-manifest.json"))
  if (!mergeManifestFile) throw new Error("Release has no i18n merge manifest")
  const mergeManifestBytes = mergeManifestFile.bytes
  const mergeManifest = JSON.parse(mergeManifestBytes.toString("utf8"))
  const expectedBuilds = BUILD_MATRIX.map(({ locale, basePath }) => `${locale}\0${basePath}`)
  const actualBuilds = (mergeManifest.builds ?? []).map(({ locale, basePath }) => `${locale}\0${basePath}`)
  if (JSON.stringify(actualBuilds) !== JSON.stringify(expectedBuilds) || mergeManifest.businessRouteMatrix?.total !== 400 || mergeManifest.seo?.siteOrigin !== origin) {
    throw new Error("Release manifest provenance does not match the audited build matrix and origin")
  }
  const generatedPaths = validateSeoProcessedSet({ manifest: mergeManifest, academyRoutes })
  const provenance = validateManifestProvenance({ manifest: mergeManifest, files: filePaths, generatedPaths })
  const buildEvidence = {
    manifestSha256: sha256(mergeManifestBytes),
    sourceBuilds: mergeManifest.builds.map(({ locale, basePath, sourceOutput, logicalRouteCount, copiedFileCount }) => ({ locale, basePath, sourceOutput, logicalRouteCount, copiedFileCount })),
    seoOriginKind: mergeManifest.seo.originKind,
    seoSiteOrigin: mergeManifest.seo.siteOrigin,
    frozenSeoProcessedFileCount: generatedPaths.size,
    provenance,
  }

  const htmlRecords = []
  const anchorsByPath = new Map()
  const expectedByFile = new Map(expected.map((record) => [releaseIdentity(record.file), record]))
  const parsedHtml = new Map()
  for (const file of files.filter(({ path }) => path.toLowerCase().endsWith(".html"))) {
    const business = expectedByFile.get(releaseIdentity(file.path))
    const route = business?.route ?? (file.path === "index.html" ? "/" : `/${file.path.replace(/(?:\/index)?\.html$/u, "")}`)
    const source = file.bytes.toString("utf8")
    const parsed = collectHtmlReferences({ html: source, route })
    parsedHtml.set(releaseIdentity(file.path), { source, parsed })
    anchorsByPath.set(releaseIdentity(file.path), parsed.anchors)
    htmlRecords.push({ route, file: file.path, references: parsed.references })
  }
  const residue = []
  const scriptRoutes = new Map()
  const payloadFiles = new Set()
  const localizedCoverageRecords = []
  let localizedHtmlPagesScanned = 0
  for (const record of expected) {
    const { source, parsed } = parsedHtml.get(releaseIdentity(record.file))
    if (["ja", "en", "fr", "de"].includes(record.locale)) localizedHtmlPagesScanned += 1
    if (["en", "fr", "de"].includes(record.locale)) residue.push(...findLocalizationResidue({ locale: record.locale, route: record.route, file: record.file, text: extractVisibleText(source), allowlist, scope: "html" }))
    if (record.locale === "ja") residue.push(...validateJapaneseSourceIdentity({ route: record.route, file: record.file, htmlText: extractVisibleText(source), sourceEntries: japaneseSourceCandidates, allowlist }))
    if (["ja", "en", "fr", "de"].includes(record.locale)) {
      const payloadPath = payloadPathForHtml(record.file)
      const payloadFile = filePaths.get(releaseIdentity(payloadPath))
      if (!payloadFile) residue.push({ locale: record.locale, route: record.route, file: payloadPath, scope: "rsc", text: "missing-payload", allowed: false })
      else {
        payloadFiles.add(releaseIdentity(payloadPath))
        const payload = payloadFile.bytes.toString("utf8")
        if (["en", "fr", "de"].includes(record.locale)) residue.push(...findLocalizationResidue({ locale: record.locale, route: record.route, file: payloadPath, text: payload, allowlist, scope: "rsc" }))
        else residue.push(...validateJapaneseSourceIdentity({ route: record.route, file: payloadPath, htmlText: payload, sourceEntries: japaneseSourceCandidates, allowlist }))
      }
    }
    const scriptPaths = []
    for (const reference of parsed.references.filter((item) => item.tag === "script" && item.attribute === "src")) {
      const resolved = normalizedPathname(reference.url, { currentRoute: record.route, siteOrigin: origin })
      if (!resolved?.pathname) continue
      const target = pathCandidates(resolved.pathname).find((candidate) => filePaths.has(releaseIdentity(candidate)))
      if (target) {
        const identity = releaseIdentity(target)
        scriptPaths.push(identity)
        if (!scriptRoutes.has(identity)) scriptRoutes.set(identity, [])
        scriptRoutes.get(identity).push(record)
      }
    }
    if (["ja", "en", "fr", "de"].includes(record.locale)) localizedCoverageRecords.push({ ...record, scriptPaths: [...new Set(scriptPaths)] })
  }
  const scriptCoverage = validateLocalizedScriptCoverage(localizedCoverageRecords, filePaths)

  for (const [path, routes] of scriptRoutes) {
    const source = filePaths.get(path).bytes.toString("utf8")
    for (const record of routes.filter(({ locale }) => ["en", "fr", "de"].includes(locale)).slice(0, 1)) {
      residue.push(...findLocalizationResidue({ locale: record.locale, route: record.route, file: filePaths.get(path).path, text: source, allowlist, scope: "js" }))
    }
    for (const record of routes.filter(({ locale }) => locale === "ja").slice(0, 1)) {
      residue.push(...validateJapaneseSourceIdentity({ route: record.route, file: filePaths.get(path).path, htmlText: source, sourceEntries: japaneseSourceCandidates, allowlist }))
    }
  }
  const localization = summarizeResidue(residue, { localizedHtmlPagesScanned, rscPayloadFilesScanned: payloadFiles.size, jsChunkFilesScanned: scriptCoverage.jsChunkFiles, jsRouteAssociationsScanned: scriptCoverage.routeChunkAssociations })

  const cssFiles = []
  for (const file of files.filter(({ path }) => path.toLowerCase().endsWith(".css"))) cssFiles.push({ path: file.path, source: file.bytes.toString("utf8") })
  const linkRecords = [...htmlRecords, ...cssReferenceRecords({ cssFiles })]
  const links = referenceFailures({ records: linkRecords, filePaths: new Set(filePaths.keys()), anchorsByPath, siteOrigin: origin })
  links.htmlPagesCrawled = htmlRecords.length
  links.cssFilesCrawled = cssFiles.length
  localization.scriptCoverage = scriptCoverage

  const localPathMarkers = projectRoot ? [
    { name: "LOCAL_PROJECT_PATH", bytes: Buffer.from(resolve(projectRoot)) },
    { name: "LOCAL_PROJECT_PATH", bytes: Buffer.from(slash(resolve(projectRoot))) },
  ] : []
  const securityHits = []
  const deploymentContentEvidence = []
  const localPathUsage = new Map()
  for (const file of files) {
    securityHits.push(...scanSecurityBytes({ path: file.path, bytes: file.bytes, forbiddenMarkers: [...forbiddenMarkers, ...localPathMarkers], localPathAllowlist, localPathUsage }))
    deploymentContentEvidence.push(`${file.path}\0${file.sha256}\0${file.bytes.length}\n`)
  }
  const tracked = projectRoot ? await trackedSecurity({ projectRoot, forbiddenMarkers: [...forbiddenMarkers, ...localPathMarkers], localPathAllowlist, localPathUsage }) : { fileCount: 0, hits: [] }
  const unusedLocalPathAllowlist = localPathAllowlist.filter((entry) => (localPathUsage.get(`${entry.path}\0${entry.text}`) ?? 0) !== 1).map(({ path, text }) => ({ path, textSha256: sha256(Buffer.from(text)), usageCount: localPathUsage.get(`${path}\0${text}`) ?? 0 }))
  const security = { deploymentFileCount: files.length, trackedFileCount: tracked.fileCount, localPathAllowlistEntries: localPathAllowlist.length, localPathAllowlistUsedExactlyOnce: localPathAllowlist.length - unusedLocalPathAllowlist.length, unusedLocalPathAllowlist, deploymentHits: securityHits, trackedHits: tracked.hits }
  const seo = await auditDeploymentSeo({ deploymentRoot: root, academyRoutes, salesLegal, siteOrigin: origin })
  for (const field of ["academyHtmlSha256", "sitemapSha256", "robotsSha256", "academyPageCount", "canonicalCount", "alternateCount", "sitemapUrlCount"]) {
    if (seo[field] !== mergeManifest.seo[field]) throw new Error(`SEO-generated provenance mismatch: ${field}`)
  }
  const failures = {
    localization: localization.unexplainedCount,
    links: links.failures.length,
    security: security.deploymentHits.length + security.trackedHits.length + security.unusedLocalPathAllowlist.length,
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
      routeMatrix: routeMatrix.missing.length + routeMatrix.zeroByte.length + routeMatrix.pathCollisions + routeMatrix.rogueHtml.length === 0 ? "PASS" : "FAIL",
      localization: localization.unexplainedCount === 0 ? "PASS" : "FAIL",
      linksAndAssets: links.failures.length === 0 ? "PASS" : "FAIL",
      seo: seo.businessPageCount === 400 && seo.sitemapUrlCount === 400 ? "PASS" : "FAIL",
      security: security.deploymentHits.length + security.trackedHits.length + security.unusedLocalPathAllowlist.length === 0 ? "PASS" : "FAIL",
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

async function loadLocalPathAllowlist(projectRoot) {
  const path = join(projectRoot, "scripts", "i18n", "release-audit-local-path-allowlist.json")
  return JSON.parse(await readFile(path, "utf8"))
}

async function loadSourceEntries(projectRoot) {
  const catalog = JSON.parse(await readFile(join(projectRoot, "i18n", "catalog", "source.zh-CN.json"), "utf8"))
  const values = Array.isArray(catalog) ? catalog : Array.isArray(catalog.entries) ? catalog.entries : Object.values(catalog.entries ?? catalog.messages ?? catalog)
  return values.map((entry) => typeof entry === "string" ? entry : entry.source ?? entry.message ?? entry.value ?? "").filter(Boolean)
}

export async function auditProjectRelease({ projectRoot = resolve(process.cwd()), siteOrigin, browserEvidence = { status: "pending" } } = {}) {
  const deploymentRoot = join(projectRoot, ".cache", "i18n-deploy")
  const academyRoutes = await deriveAcademyRoutes(projectRoot)
  const forbiddenMarkers = (await collectForbiddenMarkers(projectRoot)).map(({ name, value }) => ({ name, bytes: Buffer.from(value) }))
  const allowlist = await loadAllowlist(projectRoot)
  const localPathAllowlist = await loadLocalPathAllowlist(projectRoot)
  const sourceEntries = await loadSourceEntries(projectRoot)
  return auditRelease({ deploymentRoot, projectRoot, academyRoutes, siteOrigin, forbiddenMarkers, allowlist, localPathAllowlist, sourceEntries, browserEvidence })
}

async function cli() {
  const projectRoot = resolve(process.cwd())
  const report = await auditProjectRelease({ projectRoot, siteOrigin: process.env.I18N_SITE_ORIGIN })
  const reportPath = join(projectRoot, ".cache", "i18n-release-audit.json")
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify({ status: report.status, nonBrowserStatus: report.nonBrowserStatus, report: slash(relative(projectRoot, reportPath)), routes: report.routeMatrix, residue: { allowed: report.localization.allowedCount, unexplained: report.localization.unexplainedCount }, links: { checked: report.links.checked, failures: report.links.failures.length }, security: { deployment: report.security.deploymentHits.length, tracked: report.security.trackedHits.length } }))
  if (report.nonBrowserStatus !== "PASS") process.exitCode = 1
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) cli().catch((error) => { console.error(error?.stack ?? error); process.exitCode = 1 })
