import { createHash } from "node:crypto"
import { spawn } from "node:child_process"
import { writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"

import { auditProjectRelease } from "./release-audit.mjs"

const sha256 = (value) => createHash("sha256").update(value).digest("hex")
const executable = (name) => process.platform === "win32" ? `${name}.cmd` : name

export function sanitizeCommandLabel(label) {
  if (typeof label !== "string" || !label.trim() || /[\r\n\0]/u.test(label)) throw new Error("Command evidence label must be sanitized")
  if (/TRANSLATION_API_(?:KEY|BASE_URL)\s*=|(?:^|\s)(?:API_KEY|SECRET|TOKEN|PASSWORD)\s*=/iu.test(label)) throw new Error("Command evidence label is secret-bearing")
  return label
}

async function runCommandEvidence({ name, command, file, args, cwd, env = process.env }) {
  const startedAt = new Date().toISOString()
  const stdoutHash = createHash("sha256")
  const stderrHash = createHash("sha256")
  let stdoutBytes = 0
  let stderrBytes = 0
  let spawnErrorCode
  const exitCode = await new Promise((resolveExit) => {
    const isCommandShim = process.platform === "win32" && file.toLowerCase().endsWith(".cmd")
    const child = spawn(isCommandShim ? process.env.ComSpec : file, isCommandShim ? ["/d", "/s", "/c", file, ...args] : args, { cwd, env, shell: false, windowsHide: true })
    child.on("error", (error) => { spawnErrorCode = error.code ?? "SPAWN_ERROR"; resolveExit(-1) })
    child.stdout.on("data", (chunk) => { stdoutHash.update(chunk); stdoutBytes += chunk.length; process.stdout.write(chunk) })
    child.stderr.on("data", (chunk) => { stderrHash.update(chunk); stderrBytes += chunk.length; process.stderr.write(chunk) })
    child.on("close", resolveExit)
  })
  return {
    name,
    command: sanitizeCommandLabel(command),
    exitCode,
    startedAt,
    endedAt: new Date().toISOString(),
    stdoutBytes,
    stderrBytes,
    stdoutSha256: stdoutHash.digest("hex"),
    stderrSha256: stderrHash.digest("hex"),
    ...(spawnErrorCode ? { errorCode: spawnErrorCode } : {}),
  }
}

async function main() {
  const projectRoot = resolve(process.cwd())
  const siteOrigin = process.env.I18N_SITE_ORIGIN
  if (siteOrigin !== "https://example.invalid") throw new Error("Final verification requires the explicit reviewed non-production origin https://example.invalid")
  const reportPath = join(projectRoot, ".cache", "i18n-release-audit.json")
  const commands = []
  let report
  let failure
  async function command(spec) {
    const evidence = await runCommandEvidence({ ...spec, cwd: projectRoot })
    commands.push(evidence)
    if (evidence.exitCode !== 0) throw new Error(`${spec.name} exited ${evidence.exitCode}`)
  }
  try {
    await command({ name: "fresh-five-build-release", command: "I18N_SITE_ORIGIN=https://example.invalid pnpm i18n:build:all", file: executable("pnpm"), args: ["i18n:build:all"], env: { ...process.env, I18N_SITE_ORIGIN: siteOrigin } })
    const auditStarted = new Date().toISOString()
    report = await auditProjectRelease({ projectRoot, siteOrigin })
    const auditSummary = {
      status: report.status,
      businessPages: report.routeMatrix.businessPages,
      systemPages: report.routeMatrix.systemPages,
      references: report.links.checked,
      unexplainedResidue: report.localization.unexplainedCount,
      deploymentSha256: report.deploymentSha256,
      manifestSha256: report.buildEvidence.manifestSha256,
    }
    const summaryBytes = Buffer.from(JSON.stringify(auditSummary))
    commands.push({ name: "release-audit", command: "I18N_SITE_ORIGIN=https://example.invalid pnpm i18n:audit:release", exitCode: report.nonBrowserStatus === "PASS" ? 0 : 1, startedAt: auditStarted, endedAt: new Date().toISOString(), stdoutBytes: summaryBytes.length, stderrBytes: 0, stdoutSha256: sha256(summaryBytes), stderrSha256: sha256(Buffer.alloc(0)), result: auditSummary })
    if (report.nonBrowserStatus !== "PASS") throw new Error("release-audit failed")
    await command({ name: "full-i18n-tests", command: "pnpm test:i18n", file: executable("pnpm"), args: ["test:i18n"] })
    await command({ name: "application-typecheck", command: "pnpm exec tsc --noEmit", file: executable("pnpm"), args: ["exec", "tsc", "--noEmit"] })
    await command({ name: "functions-typecheck", command: "pnpm typecheck:functions", file: executable("pnpm"), args: ["typecheck:functions"] })
    await command({ name: "focused-eslint", command: "pnpm exec eslint scripts/i18n/release-audit.mjs scripts/i18n/release-audit.test.mjs scripts/i18n/finalize-release-audit.mjs scripts/i18n/finalize-release-audit.test.mjs --max-warnings=0", file: executable("pnpm"), args: ["exec", "eslint", "scripts/i18n/release-audit.mjs", "scripts/i18n/release-audit.test.mjs", "scripts/i18n/finalize-release-audit.mjs", "scripts/i18n/finalize-release-audit.test.mjs", "--max-warnings=0"] })
    await command({ name: "node-syntax", command: "node --check scripts/i18n/release-audit.mjs", file: process.execPath, args: ["--check", "scripts/i18n/release-audit.mjs"] })
    await command({ name: "finalizer-node-syntax", command: "node --check scripts/i18n/finalize-release-audit.mjs", file: process.execPath, args: ["--check", "scripts/i18n/finalize-release-audit.mjs"] })
    await command({ name: "allowlist-json-parse", command: "node -e parse release audit allowlists", file: process.execPath, args: ["-e", "const f=require('fs');for(const p of ['scripts/i18n/release-audit-allowlist.json','scripts/i18n/release-audit-local-path-allowlist.json'])JSON.parse(f.readFileSync(p,'utf8'))"] })
    await command({ name: "git-diff-check", command: "git diff --check", file: "git", args: ["diff", "--check"] })
  } catch (error) {
    failure = error
  }
  report ??= { version: 1, generatedAt: new Date().toISOString(), siteOrigin, originKind: "non-production", browserEvidence: { status: "pending" }, checks: {} }
  report.commands = commands
  report.checks.commands = failure ? "FAIL" : "PASS"
  report.freshBuildEvidence = { status: commands.find(({ name }) => name === "fresh-five-build-release")?.exitCode === 0 ? "PASS" : "FAIL", requiredOrigin: "https://example.invalid" }
  if (failure) {
    report.status = "FAIL"
    report.nonBrowserStatus = "FAIL"
    report.failure = { stage: commands.at(-1)?.name ?? "initialization", message: failure.message }
  }
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify({ status: report.status, nonBrowserStatus: report.nonBrowserStatus, commands: commands.map(({ name, exitCode }) => ({ name, exitCode })), report: ".cache/i18n-release-audit.json" }))
  if (failure) throw failure
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) main().catch((error) => { console.error(error?.stack ?? error); process.exitCode = 1 })
