import { execFile as execFileCallback } from "node:child_process"
import { readFile, readdir, stat, writeFile } from "node:fs/promises"
import { extname, join, relative, resolve } from "node:path"
import { promisify } from "node:util"

import {
  findLocalPathOccurrences,
  shouldScanDeploymentGenericPosix,
  validateLocalPathAllowlist,
} from "./release-audit.mjs"

const execFile = promisify(execFileCallback)
const TEXT_EXTENSIONS = new Set([
  ".cjs", ".css", ".html", ".js", ".json", ".jsx", ".md", ".mdx",
  ".mjs", ".svg", ".toml", ".ts", ".tsx", ".txt", ".xml", ".yaml", ".yml",
])
const ALLOWLIST_PATH = "scripts/i18n/release-audit-local-path-allowlist.json"

function slash(path) {
  return path.replaceAll("\\", "/")
}

function normalizedSnapshotPath(path) {
  return path.replace(/(i18n\/catalog\/messages\/)[a-f0-9]{64}(\/)/u, "$1{snapshot}$2")
}

async function walkFiles(root) {
  const files = []
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name)
      if (entry.isDirectory()) await visit(path)
      else if (entry.isFile()) files.push(path)
    }
  }
  if ((await stat(root)).isDirectory()) await visit(root)
  return files
}

function reasonLookup(existing) {
  const exact = new Map(existing.map((entry) => [`${entry.path}\0${entry.text}`, entry.reason]))
  const normalized = new Map(
    existing.map((entry) => [
      `${normalizedSnapshotPath(entry.path)}\0${entry.text}`,
      entry.reason,
    ]),
  )
  return (path, text) =>
    exact.get(`${path}\0${text}`) ??
    normalized.get(`${normalizedSnapshotPath(path)}\0${text}`)
}

async function collectOccurrences({ root, path, includeGenericPosix }) {
  const bytes = await readFile(join(root, ...path.split("/")))
  if (!TEXT_EXTENSIONS.has(extname(path.toLowerCase()))) return []
  return findLocalPathOccurrences(bytes.toString("utf8"), { includeGenericPosix })
}

export async function refreshLocalPathAllowlist(projectRoot = resolve(process.cwd())) {
  const allowlistPath = join(projectRoot, ...ALLOWLIST_PATH.split("/"))
  const existing = validateLocalPathAllowlist(JSON.parse(await readFile(allowlistPath, "utf8")))
  const findReason = reasonLookup(existing)
  const proposed = []
  const unmatched = []

  const deploymentRoot = join(projectRoot, ".cache", "i18n-deploy")
  for (const absolutePath of await walkFiles(deploymentRoot)) {
    const path = slash(relative(deploymentRoot, absolutePath))
    for (const occurrence of await collectOccurrences({
      root: deploymentRoot,
      path,
      includeGenericPosix: shouldScanDeploymentGenericPosix(path),
    })) {
      const reason = findReason(path, occurrence.text)
      if (!reason) unmatched.push({ path, ...occurrence })
      else proposed.push({ path, text: occurrence.text, offset: occurrence.offset, reason })
    }
  }

  const { stdout } = await execFile("git", ["ls-files", "-z"], {
    cwd: projectRoot,
    encoding: "buffer",
    maxBuffer: 20 * 1024 * 1024,
  })
  for (const path of stdout.toString("utf8").split("\0").filter(Boolean)) {
    if (path === ALLOWLIST_PATH) continue
    for (const occurrence of await collectOccurrences({
      root: projectRoot,
      path,
      includeGenericPosix: true,
    })) {
      const reason = findReason(path, occurrence.text)
      if (!reason) unmatched.push({ path, ...occurrence })
      else proposed.push({ path, text: occurrence.text, offset: occurrence.offset, reason })
    }
  }

  if (unmatched.length > 0) {
    throw new Error(
      `Refusing to allow ${unmatched.length} unreviewed local-path occurrences: ${unmatched.map(({ path, offset }) => `${path}:${offset}`).join(", ")}`,
    )
  }
  proposed.sort((left, right) =>
    left.path.localeCompare(right.path) || left.offset - right.offset || left.text.localeCompare(right.text),
  )
  validateLocalPathAllowlist(proposed)
  await writeFile(allowlistPath, `${JSON.stringify(proposed, null, 2)}\n`, "utf8")
  return { previous: existing.length, current: proposed.length }
}

if (process.argv[1] && resolve(process.argv[1]) === import.meta.filename) {
  if (process.env.I18N_REFRESH_LOCAL_PATH_ALLOWLIST !== "1") {
    throw new Error("Set I18N_REFRESH_LOCAL_PATH_ALLOWLIST=1 to rewrite the reviewed allowlist")
  }
  console.log(JSON.stringify(await refreshLocalPathAllowlist(), null, 2))
}
