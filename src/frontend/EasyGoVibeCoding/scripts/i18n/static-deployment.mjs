import { createHash, randomUUID } from "node:crypto"
import { lstat, mkdir, readFile, readdir, realpath, rename, rm, writeFile } from "node:fs/promises"
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path"
import { pathToFileURL } from "node:url"

import { collectForbiddenMarkers } from "./deployment-secrets.mjs"
import { postprocessDeploymentSeo, validateSiteOrigin } from "./seo-postprocess.mjs"

export const BUILD_MATRIX = Object.freeze([
  Object.freeze({ locale: "zh-CN", basePath: "" }),
  Object.freeze({ locale: "ja", basePath: "/ja/academy" }),
  Object.freeze({ locale: "en", basePath: "/en/academy" }),
  Object.freeze({ locale: "fr", basePath: "/fr/academy" }),
  Object.freeze({ locale: "de", basePath: "/de/academy" }),
])

const SALES_LEGAL = ["/ja", "/ja/privacy", "/ja/refund", "/ja/terms", "/ja/tokushoho"]
const GLOBAL_NAMES = new Set(["robots.txt", "sitemap.xml", "_headers", "_redirects", "wrangler.toml"])

function compare(left, right) { return left < right ? -1 : left > right ? 1 : 0 }
function slash(value) { return value.replaceAll("\\", "/") }
function sha256(bytes) { return createHash("sha256").update(bytes).digest("hex") }
function strictChild(root, target, label) {
  const rel = relative(resolve(root), resolve(target))
  if (!rel || rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error(`${label} must be strictly contained`)
  return resolve(target)
}

export function validateBuildPair(locale, basePath) {
  const pair = BUILD_MATRIX.find((candidate) => candidate.locale === locale)
  if (!pair || pair.basePath !== basePath) throw new Error(`Invalid locale/base-path pair: ${locale} ${basePath}`)
  return pair
}

export async function deriveAcademyRoutes(projectRoot) {
  const appRoot = resolve(projectRoot, "app")
  const routes = []
  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true })
    entries.sort((a, b) => compare(a.name, b.name))
    for (const entry of entries) {
      const absolute = join(directory, entry.name)
      if (entry.isSymbolicLink()) throw new Error(`Application route tree contains symbolic link: ${absolute}`)
      if (entry.isDirectory()) await walk(absolute)
      else if (entry.isFile() && entry.name === "page.tsx") {
        const rel = slash(relative(appRoot, dirname(absolute)))
        if (rel === "ja" || rel.startsWith("ja/")) continue
        routes.push(rel === "" ? "/" : `/${rel}`)
      }
    }
  }
  await walk(appRoot)
  routes.sort(compare)
  if (routes.length !== 79) throw new Error(`Canonical academy route manifest must contain exactly 79 routes; found ${routes.length}`)
  if (new Set(routes).size !== routes.length) throw new Error("Canonical academy route manifest contains duplicates")
  return routes
}

export function buildBusinessRouteMatrix(academyRoutes) {
  const canonical = academyRoutes.map((route) => ({ locale: "zh-CN", route }))
  const localized = BUILD_MATRIX.slice(1).flatMap(({ locale, basePath }) =>
    academyRoutes.map((logicalRoute) => ({ locale, logicalRoute, route: logicalRoute === "/" ? basePath : `${basePath}${logicalRoute}` })),
  )
  const academy = [...canonical, ...localized]
  return { academy, localized, salesLegal: [...SALES_LEGAL], total: academy.length + SALES_LEGAL.length }
}

function routeHtmlPath(route) { return route === "/" ? "index.html" : `${route.slice(1)}.html` }
function isLocalizedGlobal(path) {
  const parts = path.normalize("NFC").toLowerCase().split("/")
  return parts[0] === "functions" || (parts.length === 1 && GLOBAL_NAMES.has(parts[0]))
}
function deploymentKey(path) { return path.normalize("NFC").toLowerCase() }
function isForbidden(path) {
  const lower = path.toLowerCase()
  return lower.endsWith(".map") || lower.startsWith(".cache/") || lower.includes("/.cache/") || lower.startsWith(".git/") || lower.includes("/.git/") || lower.startsWith("node_modules/") || lower.endsWith("/.env.local") || lower === ".env.local" || /(?:^|\/)(?:[^/]+\.)?(?:pem|p12|pfx|key)$/u.test(lower)
}

async function listOrdinaryFiles(root) {
  const realRoot = await realpath(root)
  const files = []
  async function walk(directory) {
    const realDirectory = await realpath(directory)
    if (realDirectory !== realRoot) strictChild(realRoot, realDirectory, `Build output directory real path ${slash(relative(root, directory))}`)
    const entries = await readdir(directory, { withFileTypes: true })
    entries.sort((a, b) => compare(a.name, b.name))
    for (const entry of entries) {
      const absolute = join(directory, entry.name)
      const rel = slash(relative(root, absolute))
      if (entry.isSymbolicLink()) throw new Error(`Build output contains a symbolic link: ${rel}`)
      if (entry.isDirectory()) await walk(absolute)
      else if (entry.isFile()) {
        const details = await lstat(absolute)
        if (!details.isFile() || details.isSymbolicLink()) throw new Error(`Build output contains a non-ordinary file: ${rel}`)
        files.push({ absolute, rel })
      }
      else throw new Error(`Build output contains a non-ordinary entry: ${rel}`)
    }
  }
  await walk(root)
  return files
}

async function exists(path) { try { await lstat(path); return true } catch (error) { if (error?.code === "ENOENT") return false; throw error } }
async function renameWithRetries(operation, source, target) {
  const retryable = new Set(["EACCES", "EBUSY", "EPERM"])
  for (let attempt = 0; attempt < 7; attempt += 1) {
    try { await operation(source, target); return } catch (error) {
      if (!retryable.has(error?.code) || attempt === 6) throw error
      await new Promise((resolveWait) => setTimeout(resolveWait, 100 * 2 ** attempt))
    }
  }
}

function normalizeForbiddenMarkers(markers = []) {
  return markers
    .filter(({ value }) => (typeof value === "string" || Buffer.isBuffer(value)) && value.length > 0)
    .map(({ name, value }) => ({
      name: typeof name === "string" && /^[A-Z][A-Z0-9_]*$/u.test(name) ? name : "CONFIGURED_SECRET",
      bytes: Buffer.isBuffer(value) ? value : Buffer.from(value),
    }))
}

function validateSourceProvenance({ projectRoot, sourceRoot, sourceLabel, locale }) {
  if (typeof sourceLabel !== "string" || sourceLabel.length === 0 || isAbsolute(sourceLabel)) throw new Error(`Invalid source label for ${locale}`)
  const normalized = slash(sourceLabel).replace(/^\.\//u, "")
  if (normalized === ".." || normalized.startsWith("../") || normalized.includes("\0")) throw new Error(`Invalid source label for ${locale}`)
  const labeledRoot = resolve(projectRoot, ...normalized.split("/"))
  if (relative(labeledRoot, sourceRoot) !== "" || relative(sourceRoot, labeledRoot) !== "") throw new Error(`Source label does not match build output for ${locale}`)
  strictChild(projectRoot, labeledRoot, `Source label for ${locale}`)
  return normalized
}

export async function mergeStaticOutputs({ projectRoot, sourceLabels, forbiddenMarkers, builds, output, academyRoutes, siteOrigin, publishRename = rename, mapDestination } = {}) {
  if (!Array.isArray(academyRoutes) || academyRoutes.length === 0) throw new Error("academyRoutes must be non-empty")
  const matrix = buildBusinessRouteMatrix(academyRoutes)
  const absoluteOutput = resolve(output)
  const parent = dirname(absoluteOutput)
  const absoluteProjectRoot = resolve(projectRoot ?? parent)
  const secretMarkers = normalizeForbiddenMarkers(forbiddenMarkers)
  await mkdir(parent, { recursive: true })
  const temporary = strictChild(parent, join(parent, `.${resolve(output).split(sep).at(-1)}-tmp-${process.pid}-${randomUUID()}`), "Temporary deployment")
  const backup = strictChild(parent, join(parent, `.${resolve(output).split(sep).at(-1)}-backup-${process.pid}-${randomUUID()}`), "Deployment backup")
  await mkdir(temporary)
  const destinations = new Map()
  const manifestBuilds = []
  let backupCreated = false
  let published = false
  try {
    for (const { locale, basePath } of BUILD_MATRIX) {
      validateBuildPair(locale, basePath)
      const sourceRoot = resolve(builds?.[locale] ?? "")
      const sourceOutput = sourceLabels
        ? validateSourceProvenance({ projectRoot: absoluteProjectRoot, sourceRoot, sourceLabel: sourceLabels[locale], locale })
        : slash(relative(absoluteProjectRoot, sourceRoot))
      const stats = await lstat(sourceRoot)
      if (!stats.isDirectory() || stats.isSymbolicLink()) throw new Error(`Build output must be an ordinary directory: ${locale}`)
      const files = await listOrdinaryFiles(sourceRoot)
      const copied = []
      const excluded = []
      const deduplications = []
      const materializedFiles = await Promise.all(files.map(async (item) => {
        if (isForbidden(item.rel)) throw new Error(`Forbidden build output content: ${locale}:${item.rel}`)
        const bytes = await readFile(item.absolute)
        if (bytes.length === 0) throw new Error(`Build output file is empty: ${locale}:${item.rel}`)
        const marker = secretMarkers.find(({ bytes: markerBytes }) => bytes.includes(markerBytes))
        if (marker) throw new Error(`Forbidden secret marker ${marker.name} in ${locale}:${item.rel}`)
        if (locale !== "zh-CN" && isLocalizedGlobal(item.rel)) return { ...item, bytes, excluded: true }
        return { ...item, bytes, hash: sha256(bytes), excluded: false }
      }))
      const writes = []
      for (const item of materializedFiles) {
        if (item.excluded) { excluded.push(item.rel); continue }
        let destination = locale === "zh-CN" ? item.rel : `${basePath.slice(1)}/${item.rel}`
        if (mapDestination) destination = mapDestination({ locale, basePath, relativePath: item.rel, destination })
        destination = slash(destination).replace(/^\/+/, "")
        if (!destination || destination.startsWith("../") || isAbsolute(destination)) throw new Error(`Unsafe merge destination: ${destination}`)
        const destinationIdentity = deploymentKey(destination)
        const previous = destinations.get(destinationIdentity)
        if (previous) {
          if (previous.sha256 !== item.hash) throw new Error(`Non-identical collision at ${previous.path} / ${destination}: ${previous.source} vs ${locale}:${item.rel}`)
          deduplications.push({ destination: previous.path, incomingDestination: destination, source: `${locale}:${item.rel}`, sha256: item.hash })
          continue
        }
        const target = strictChild(temporary, join(temporary, ...destination.split("/")), "Merged file")
        writes.push((async () => { await mkdir(dirname(target), { recursive: true }); await writeFile(target, item.bytes) })())
        const record = { path: destination, sha256: item.hash, size: item.bytes.length, source: `${locale}:${item.rel}` }
        destinations.set(destinationIdentity, record)
        copied.push(record)
      }
      await Promise.all(writes)
      manifestBuilds.push({ locale, basePath, sourceOutput, logicalRouteCount: academyRoutes.length, copiedFileCount: copied.length, copiedFiles: copied.sort((a, b) => compare(a.path, b.path)), excludedGlobalFiles: excluded.sort(compare), deduplications: deduplications.sort((a, b) => compare(a.destination, b.destination)) })
    }

    for (const { locale, basePath } of BUILD_MATRIX) {
      for (const route of academyRoutes) {
        const logical = routeHtmlPath(route)
        const path = locale === "zh-CN" ? logical : `${basePath.slice(1)}/${logical}`
        if (!destinations.has(deploymentKey(path))) throw new Error(`Missing academy route output: ${locale}:${route} (${path})`)
      }
    }
    if (academyRoutes.length === 79) {
      for (const route of SALES_LEGAL) {
        const path = routeHtmlPath(route)
        if (!destinations.has(deploymentKey(path))) throw new Error(`Missing Japanese sales/legal route output: ${route}`)
      }
      if (matrix.total !== 400) throw new Error(`Business route matrix must total 400; found ${matrix.total}`)
    }
    const seo = siteOrigin
      ? await postprocessDeploymentSeo({ deploymentRoot: temporary, academyRoutes, salesLegal: matrix.salesLegal, siteOrigin })
      : null
    const manifest = { version: 2, builds: manifestBuilds, collisions: [], businessRouteMatrix: matrix, seo }
    const manifestBytes = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`)
    const manifestSha256 = sha256(manifestBytes)
    await writeFile(join(temporary, "i18n-merge-manifest.json"), manifestBytes)
    if (await exists(absoluteOutput)) { await renameWithRetries(publishRename, absoluteOutput, backup); backupCreated = true }
    try { await renameWithRetries(publishRename, temporary, absoluteOutput); published = true } catch (error) {
      if (backupCreated && !(await exists(absoluteOutput))) { await renameWithRetries(publishRename, backup, absoluteOutput); backupCreated = false }
      throw error
    }
    if (backupCreated) { await rm(backup, { recursive: true, force: true }); backupCreated = false }
    return { manifest, manifestSha256, output: absoluteOutput }
  } finally {
    if (!published) await rm(temporary, { recursive: true, force: true })
  }
}

async function cli() {
  const projectRoot = resolve(process.cwd())
  const academyRoutes = await deriveAcademyRoutes(projectRoot)
  const builds = { "zh-CN": join(projectRoot, "out"), ...Object.fromEntries(BUILD_MATRIX.slice(1).map(({ locale }) => [locale, join(projectRoot, ".cache", "i18n-build", locale, "out")])) }
  const sourceLabels = { "zh-CN": "out", ...Object.fromEntries(BUILD_MATRIX.slice(1).map(({ locale }) => [locale, `.cache/i18n-build/${locale}/out`])) }
  const forbiddenMarkers = await collectForbiddenMarkers(projectRoot)
  const siteOrigin = validateSiteOrigin(process.env.I18N_SITE_ORIGIN)
  const result = await mergeStaticOutputs({ projectRoot, sourceLabels, forbiddenMarkers, builds, output: join(projectRoot, ".cache", "i18n-deploy"), academyRoutes, siteOrigin })
  console.log(JSON.stringify({ output: slash(relative(projectRoot, result.output)), academyRoutes: academyRoutes.length, businessHtml: result.manifest.businessRouteMatrix.total, manifestSha256: result.manifestSha256 }))
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) cli().catch((error) => { console.error(error?.stack ?? error); process.exitCode = 1 })
