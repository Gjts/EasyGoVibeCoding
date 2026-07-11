import { execFile } from "node:child_process"
import { createHash, randomUUID } from "node:crypto"
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises"
import {
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from "node:path"
import { pathToFileURL } from "node:url"
import { promisify } from "node:util"

import { applyTranslationsToText } from "./source-transformer.mjs"

const execFileAsync = promisify(execFile)
const SUPPORTED_LOCALES = new Set(["ja", "en", "fr", "de"])
const BUILD_MANIFEST_FILE = "i18n-build-manifest.json"
const FORBIDDEN_PATH_PARTS = new Set([
  ".cache",
  ".git",
  ".next",
  "build",
  "coverage",
  "node_modules",
  "out",
])
const SECRET_ENV_NAMES = [
  "I18N_RELAY_API_KEY",
  "I18N_RELAY_BASE_URL",
  "OPENAI_API_KEY",
  "RESEND_API_KEY",
]

function normalizePath(value) {
  return value.replaceAll("\\", "/").replace(/^\.\//u, "")
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex")
}

function compareText(left, right) {
  if (left < right) return -1
  if (left > right) return 1
  return 0
}

function isSamePath(left, right) {
  return relative(left, right) === "" && relative(right, left) === ""
}

function assertStrictlyContained(root, target, label) {
  const absoluteRoot = resolve(root)
  const absoluteTarget = resolve(target)
  const relativeTarget = relative(absoluteRoot, absoluteTarget)
  if (
    relativeTarget.length === 0 ||
    relativeTarget === ".." ||
    relativeTarget.startsWith(`..${sep}`) ||
    isAbsolute(relativeTarget)
  ) {
    throw new Error(`${label} must be strictly contained by ${absoluteRoot}`)
  }
  return absoluteTarget
}

async function assertOrdinaryDirectory(path, label) {
  const details = await lstat(path)
  if (!details.isDirectory() || details.isSymbolicLink()) {
    throw new Error(`${label} must be an ordinary directory`)
  }
}

async function safeRemoveContained(root, target, label) {
  const absoluteTarget = assertStrictlyContained(root, target, label)
  await rm(absoluteTarget, { recursive: true, force: true, maxRetries: 3 })
}

function wait(milliseconds) {
  return new Promise((resolveWait) => setTimeout(resolveWait, milliseconds))
}

async function renameContainedWithRetries(root, source, target) {
  const retryableCodes = new Set(["EACCES", "EBUSY", "EPERM"])
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const absoluteSource = assertStrictlyContained(
      root,
      source,
      "Temporary locale staging target",
    )
    const absoluteTarget = assertStrictlyContained(root, target, "Locale staging target")
    try {
      await rename(absoluteSource, absoluteTarget)
      return
    } catch (error) {
      if (!retryableCodes.has(error?.code) || attempt === 5) throw error
      await wait(50 * 2 ** attempt)
    }
  }
}

function parseJsonObject(bytes, label) {
  let value
  try {
    value = JSON.parse(bytes.toString("utf8"))
  } catch (error) {
    throw new SyntaxError(`${label} is not valid JSON: ${error.message}`, { cause: error })
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must contain a JSON object`)
  }
  return value
}

function assertExactKeyParity(sourceEntries, localeMessages) {
  const sourceKeys = Object.keys(sourceEntries)
  const localeKeys = Object.keys(localeMessages)
  if (
    sourceKeys.length !== localeKeys.length ||
    sourceKeys.some((key, index) => key !== localeKeys[index])
  ) {
    throw new Error("Locale catalog does not have exact source key parity")
  }
}

async function loadCatalogRelease({ projectRoot, locale }) {
  const catalogRoot = resolve(projectRoot, "i18n", "catalog")
  const messagesRoot = resolve(catalogRoot, "messages")
  const sourceCatalogPath = resolve(catalogRoot, "source.zh-CN.json")
  const occurrencesPath = resolve(catalogRoot, "occurrences.json")
  const manifestPath = resolve(catalogRoot, "manifest.json")
  const [sourceCatalogBytes, occurrenceBytes, manifestBytes] = await Promise.all([
    readFile(sourceCatalogPath),
    readFile(occurrencesPath),
    readFile(manifestPath),
  ])
  const sourceCatalog = parseJsonObject(sourceCatalogBytes, "Source catalog")
  const manifest = parseJsonObject(manifestBytes, "Catalog manifest")
  let occurrences
  try {
    occurrences = JSON.parse(occurrenceBytes.toString("utf8"))
  } catch (error) {
    throw new SyntaxError(`Occurrence catalog is not valid JSON: ${error.message}`, {
      cause: error,
    })
  }
  if (!Array.isArray(occurrences) || occurrences.length === 0) {
    throw new Error("Occurrence catalog must contain a non-empty array")
  }
  if (!sourceCatalog.entries || typeof sourceCatalog.entries !== "object") {
    throw new Error("Source catalog entries must be an object")
  }

  const sourceCatalogSha256 = sha256(sourceCatalogBytes)
  if (manifest.sourceCatalogSha256 !== sourceCatalogSha256) {
    throw new Error("Source catalog SHA-256 does not match the release manifest")
  }
  const sourceEntryCount = Object.keys(sourceCatalog.entries).length
  if (manifest.sourceEntryCount !== sourceEntryCount) {
    throw new Error("Source catalog count does not match the release manifest")
  }

  const output = manifest.outputs?.[locale]
  if (!output || typeof output !== "object") {
    throw new Error(`Catalog manifest has no output for supported locale ${locale}`)
  }
  if (typeof output.path !== "string" || output.path.length === 0 || isAbsolute(output.path)) {
    throw new Error("Locale snapshot path must be a non-empty relative path")
  }
  const snapshotPath = resolve(catalogRoot, output.path)
  assertStrictlyContained(messagesRoot, snapshotPath, "Locale snapshot")
  const [realMessagesRoot, realSnapshotPath] = await Promise.all([
    realpath(messagesRoot),
    realpath(snapshotPath),
  ])
  assertStrictlyContained(realMessagesRoot, realSnapshotPath, "Resolved locale snapshot")

  const localeCatalogBytes = await readFile(realSnapshotPath)
  const localeCatalogSha256 = sha256(localeCatalogBytes)
  if (output.sha256 !== localeCatalogSha256) {
    throw new Error("Locale snapshot SHA-256 does not match the release manifest")
  }
  const localeMessages = parseJsonObject(localeCatalogBytes, "Locale catalog")
  if (output.count !== Object.keys(localeMessages).length) {
    throw new Error("Locale snapshot count does not match the release manifest")
  }
  assertExactKeyParity(sourceCatalog.entries, localeMessages)

  const occurrenceIds = new Set()
  for (const occurrence of occurrences) {
    if (!occurrence || typeof occurrence.id !== "string") {
      throw new Error("Occurrence catalog contains an invalid occurrence")
    }
    occurrenceIds.add(occurrence.id)
    if (
      !Object.hasOwn(sourceCatalog.entries, occurrence.id) ||
      sourceCatalog.entries[occurrence.id] !== occurrence.source
    ) {
      throw new Error(`Occurrence ${occurrence.id} does not match the source catalog`)
    }
  }
  if (
    occurrenceIds.size !== sourceEntryCount ||
    Object.keys(sourceCatalog.entries).some((id) => !occurrenceIds.has(id))
  ) {
    throw new Error("Occurrence catalog does not have exact source key parity")
  }

  return {
    sourceCatalogSha256,
    localeCatalogSha256,
    sourceEntries: sourceCatalog.entries,
    localeMessages,
    occurrences,
  }
}

function assertEligibleRelativePath(relativePath) {
  const normalized = normalizePath(relativePath)
  if (
    normalized.length === 0 ||
    normalized === ".." ||
    normalized.startsWith("../") ||
    isAbsolute(normalized) ||
    normalized.includes("\0")
  ) {
    throw new Error(`Git selected an unsafe path: ${relativePath}`)
  }
  const parts = normalized.split("/")
  if (parts.some((part) => FORBIDDEN_PATH_PARTS.has(part.toLowerCase()))) {
    throw new Error(`Git selected a forbidden cache/build path: ${relativePath}`)
  }
  const fileName = parts.at(-1) ?? ""
  if (fileName.startsWith(".env")) {
    if (fileName === ".env.example") return null
    throw new Error(`Git selected a forbidden environment file: ${relativePath}`)
  }
  if (/\.(?:key|p12|pfx|pem)$/iu.test(fileName)) {
    throw new Error(`Git selected a potential secret file: ${relativePath}`)
  }
  return normalized
}

async function listEligibleFiles(projectRoot) {
  const { stdout } = await execFileAsync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard", "-z", "--", "."],
    { cwd: projectRoot, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 },
  )
  const files = []
  const seen = new Set()
  for (const selectedPath of stdout.split("\0").filter(Boolean)) {
    const eligiblePath = assertEligibleRelativePath(selectedPath)
    if (eligiblePath === null) continue
    if (seen.has(eligiblePath)) throw new Error(`Git selected duplicate path ${eligiblePath}`)
    seen.add(eligiblePath)
    files.push(eligiblePath)
  }
  return files.sort(compareText)
}

async function copyEligibleFiles({ projectRoot, stagingRoot, files }) {
  for (const file of files) {
    const sourcePath = assertStrictlyContained(projectRoot, resolve(projectRoot, file), "Source file")
    const destinationPath = assertStrictlyContained(
      stagingRoot,
      resolve(stagingRoot, file),
      "Staging file",
    )
    const details = await lstat(sourcePath)
    if (!details.isFile() || details.isSymbolicLink()) {
      throw new Error(`Eligible source must be an ordinary file: ${file}`)
    }
    await mkdir(dirname(destinationPath), { recursive: true })
    await copyFile(sourcePath, destinationPath)
  }
}

async function hashCanonicalFiles(projectRoot, files) {
  const hashes = new Map()
  for (const file of files) {
    const absolutePath = assertStrictlyContained(
      projectRoot,
      resolve(projectRoot, file),
      "Canonical source file",
    )
    hashes.set(file, sha256(await readFile(absolutePath)))
  }
  return hashes
}

async function assertCanonicalHashes(projectRoot, expectedHashes) {
  for (const [file, expectedHash] of expectedHashes) {
    const absolutePath = assertStrictlyContained(
      projectRoot,
      resolve(projectRoot, file),
      "Canonical source file",
    )
    if (sha256(await readFile(absolutePath)) !== expectedHash) {
      throw new Error(`Canonical Chinese source changed during staging: ${file}`)
    }
  }
}

async function transformOccurrenceFiles({
  stagingRoot,
  occurrences,
  localeMessages,
  eligibleFiles,
}) {
  const byFile = new Map()
  for (const occurrence of occurrences) {
    const file = assertEligibleRelativePath(occurrence.file)
    if (file === null || !eligibleFiles.has(file)) {
      throw new Error(`Occurrence file was not selected by git: ${occurrence.file}`)
    }
    const fileOccurrences = byFile.get(file) ?? []
    fileOccurrences.push(occurrence)
    byFile.set(file, fileOccurrences)
  }

  let appliedOccurrenceCount = 0
  for (const file of [...byFile.keys()].sort(compareText)) {
    const fileOccurrences = byFile.get(file)
    const messageIds = new Set(fileOccurrences.map((occurrence) => occurrence.id))
    const messages = Object.fromEntries(
      [...messageIds].map((id) => [id, localeMessages[id]]),
    )
    const absolutePath = assertStrictlyContained(
      stagingRoot,
      resolve(stagingRoot, file),
      "Transformed staging file",
    )
    const source = await readFile(absolutePath, "utf8")
    const transformed = applyTranslationsToText({
      source,
      occurrences: fileOccurrences,
      messages,
      file,
    })
    await writeFile(absolutePath, transformed, "utf8")
    appliedOccurrenceCount += fileOccurrences.length
  }
  if (appliedOccurrenceCount !== occurrences.length) {
    throw new Error("Not every catalog occurrence was applied exactly once")
  }
  return { transformedFileCount: byFile.size, appliedOccurrenceCount }
}

async function walkStagingTree(root) {
  const paths = []
  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true })
    entries.sort((left, right) => compareText(left.name, right.name))
    for (const entry of entries) {
      const absolutePath = join(directory, entry.name)
      const relativePath = normalizePath(relative(root, absolutePath))
      paths.push({ absolutePath, relativePath, entry })
      if (entry.isDirectory() && !entry.isSymbolicLink()) await walk(absolutePath)
    }
  }
  await walk(root)
  return paths
}

async function auditStagingTree(stagingRoot) {
  const paths = await walkStagingTree(stagingRoot)
  const pageCount = paths.filter(
    ({ relativePath, entry }) =>
      entry.isFile() && /^app\/(?:.*\/)?page\.tsx$/u.test(relativePath),
  ).length
  if (pageCount !== 79) {
    throw new Error(`Staging tree must contain exactly 79 app pages; found ${pageCount}`)
  }
  for (const { relativePath } of paths) {
    const parts = relativePath.split("/")
    const fileName = parts.at(-1) ?? ""
    if (parts[0] === "app" && parts[1] === "ja") {
      throw new Error("Staging tree still contains app/ja")
    }
    if (fileName.startsWith(".env")) {
      throw new Error(`Staging tree contains an environment file: ${relativePath}`)
    }
    if (
      parts.some((part) => [".cache", ".next", "build", "coverage", "out"].includes(part))
    ) {
      throw new Error(`Staging tree contains cache/build output: ${relativePath}`)
    }
  }

  const secretValues = SECRET_ENV_NAMES.map((name) => process.env[name])
    .filter((value) => typeof value === "string" && value.length >= 8)
    .map((value) => Buffer.from(value))
  if (secretValues.length > 0) {
    for (const { absolutePath, entry, relativePath } of paths) {
      if (!entry.isFile()) continue
      const bytes = await readFile(absolutePath)
      if (secretValues.some((secret) => bytes.includes(secret))) {
        throw new Error(`Staging tree contains a relay URL or API key: ${relativePath}`)
      }
    }
  }
  return pageCount
}

async function createDependencyLink(projectRoot, stagingRoot) {
  const realNodeModules = resolve(projectRoot, "node_modules")
  await assertOrdinaryDirectory(realNodeModules, "Project node_modules")
  const linkPath = assertStrictlyContained(
    stagingRoot,
    resolve(stagingRoot, "node_modules"),
    "Staging node_modules link",
  )
  await symlink(
    realNodeModules,
    linkPath,
    process.platform === "win32" ? "junction" : "dir",
  )
}

async function prepareSafeCacheRoot(projectRoot, cacheRoot) {
  const expectedCacheRoot = resolve(projectRoot, ".cache", "i18n-build")
  const resolvedCacheRoot = resolve(cacheRoot ?? expectedCacheRoot)
  if (!isSamePath(expectedCacheRoot, resolvedCacheRoot)) {
    throw new Error("cacheRoot must resolve to <projectRoot>/.cache/i18n-build")
  }
  await mkdir(resolvedCacheRoot, { recursive: true })
  await assertOrdinaryDirectory(resolvedCacheRoot, "Locale cache root")
  const [realProjectRoot, realCacheRoot] = await Promise.all([
    realpath(projectRoot),
    realpath(resolvedCacheRoot),
  ])
  const expectedRealCacheRoot = resolve(realProjectRoot, ".cache", "i18n-build")
  if (!isSamePath(realCacheRoot, expectedRealCacheRoot)) {
    throw new Error("Locale cache root real path must stay inside projectRoot")
  }
  return resolvedCacheRoot
}

export async function createLocaleBuildTree({ projectRoot, locale, cacheRoot } = {}) {
  if (typeof projectRoot !== "string" || projectRoot.length === 0) {
    throw new TypeError("projectRoot must be a non-empty string")
  }
  if (!SUPPORTED_LOCALES.has(locale)) {
    throw new Error(`locale must be a supported locale: ${[...SUPPORTED_LOCALES].join(", ")}`)
  }
  const absoluteProjectRoot = resolve(projectRoot)
  await assertOrdinaryDirectory(absoluteProjectRoot, "projectRoot")
  const absoluteCacheRoot = await prepareSafeCacheRoot(absoluteProjectRoot, cacheRoot)
  const stagingRoot = assertStrictlyContained(
    absoluteCacheRoot,
    resolve(absoluteCacheRoot, locale),
    "Locale staging target",
  )
  const temporaryRoot = assertStrictlyContained(
    absoluteCacheRoot,
    resolve(absoluteCacheRoot, `.${locale}-${process.pid}-${randomUUID()}`),
    "Temporary locale staging target",
  )

  const release = await loadCatalogRelease({ projectRoot: absoluteProjectRoot, locale })
  const occurrenceFiles = [...new Set(release.occurrences.map(({ file }) => file))].sort(
    compareText,
  )
  const canonicalHashes = await hashCanonicalFiles(absoluteProjectRoot, occurrenceFiles)

  try {
    const eligibleFiles = await listEligibleFiles(absoluteProjectRoot)
    const eligibleFileSet = new Set(eligibleFiles)
    await mkdir(temporaryRoot, { recursive: false })
    await copyEligibleFiles({
      projectRoot: absoluteProjectRoot,
      stagingRoot: temporaryRoot,
      files: eligibleFiles,
    })

    const jaRoot = assertStrictlyContained(
      temporaryRoot,
      resolve(temporaryRoot, "app", "ja"),
      "Staging app/ja",
    )
    await safeRemoveContained(temporaryRoot, jaRoot, "Staging app/ja")

    const counts = await transformOccurrenceFiles({
      stagingRoot: temporaryRoot,
      occurrences: release.occurrences,
      localeMessages: release.localeMessages,
      eligibleFiles: eligibleFileSet,
    })
    await createDependencyLink(absoluteProjectRoot, temporaryRoot)
    const pageCount = await auditStagingTree(temporaryRoot)
    const stagingManifest = {
      locale,
      sourceCatalogSha256: release.sourceCatalogSha256,
      localeCatalogSha256: release.localeCatalogSha256,
      transformedFileCount: counts.transformedFileCount,
      appliedOccurrenceCount: counts.appliedOccurrenceCount,
      pageCount,
    }
    const stagingManifestBytes = `${JSON.stringify(stagingManifest, null, 2)}\n`
    if (
      stagingManifestBytes.includes(absoluteProjectRoot) ||
      SECRET_ENV_NAMES.some(
        (name) => process.env[name] && stagingManifestBytes.includes(process.env[name]),
      )
    ) {
      throw new Error("Staging manifest contains a credential or absolute machine path")
    }
    await writeFile(join(temporaryRoot, BUILD_MANIFEST_FILE), stagingManifestBytes, "utf8")
    await assertCanonicalHashes(absoluteProjectRoot, canonicalHashes)

    assertStrictlyContained(absoluteCacheRoot, temporaryRoot, "Temporary locale staging target")
    assertStrictlyContained(absoluteCacheRoot, stagingRoot, "Locale staging target")
    try {
      const existing = await lstat(stagingRoot)
      if (existing.isSymbolicLink()) {
        throw new Error("Existing locale staging target must not be a symbolic link")
      }
    } catch (error) {
      if (error?.code !== "ENOENT") throw error
    }
    await safeRemoveContained(absoluteCacheRoot, stagingRoot, "Locale staging target")
    await renameContainedWithRetries(absoluteCacheRoot, temporaryRoot, stagingRoot)
    await assertCanonicalHashes(absoluteProjectRoot, canonicalHashes)
    return stagingRoot
  } catch (error) {
    await safeRemoveContained(
      absoluteCacheRoot,
      temporaryRoot,
      "Temporary locale staging target",
    ).catch(() => {})
    throw error
  }
}

async function runCli() {
  const args = process.argv.slice(2)
  if (args.length !== 1) {
    throw new Error("Usage: node scripts/i18n/create-locale-worktree.mjs <ja|en|fr|de>")
  }
  const projectRoot = resolve(process.cwd())
  const stagingRoot = await createLocaleBuildTree({ projectRoot, locale: args[0] })
  console.log(`Created ${args[0]} locale tree at ${normalizePath(relative(projectRoot, stagingRoot))}.`)
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : ""
if (invokedPath === import.meta.url) {
  runCli().catch((error) => {
    console.error(error instanceof Error ? error.stack : error)
    process.exitCode = 1
  })
}
