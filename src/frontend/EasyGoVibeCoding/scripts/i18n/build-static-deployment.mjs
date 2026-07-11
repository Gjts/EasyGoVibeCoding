import { spawn } from "node:child_process"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"

import { createLocaleBuildTree } from "./create-locale-worktree.mjs"
import { collectForbiddenMarkers, createSecretFreeEnvironment } from "./deployment-secrets.mjs"
import { BUILD_MATRIX, deriveAcademyRoutes, mergeStaticOutputs, validateBuildPair } from "./static-deployment.mjs"

export { collectForbiddenMarkers } from "./deployment-secrets.mjs"

export function createBuildPlan(projectRoot) {
  const root = resolve(projectRoot)
  const pnpmCli = process.platform === "win32"
    ? join(process.env.APPDATA ?? "", "npm", "node_modules", "pnpm", "bin", "pnpm.cjs")
    : null
  return BUILD_MATRIX.map(({ locale, basePath }) => ({
    locale,
    basePath,
    cwd: locale === "zh-CN" ? root : join(root, ".cache", "i18n-build", locale),
    command: process.platform === "win32" ? process.execPath : "pnpm",
    args: process.platform === "win32" ? [pnpmCli, "run", "build"] : ["run", "build"],
    shell: false,
  }))
}

function cleanBuildEnvironment(locale, basePath, parentEnv) {
  return { ...createSecretFreeEnvironment(parentEnv), NEXT_PUBLIC_SITE_LOCALE: locale, NEXT_PUBLIC_SITE_BASE_PATH: basePath }
}

export async function executeBuildPlan(plan, runner = runBuild, { parentEnv = process.env } = {}) {
  const results = []
  for (const call of plan) {
    validateBuildPair(call.locale, call.basePath)
    const exitCode = await runner({ ...call, env: cleanBuildEnvironment(call.locale, call.basePath, parentEnv) })
    if (exitCode !== 0) throw new Error(`Production build failed for ${call.locale} with exit code ${exitCode}`)
    results.push({ locale: call.locale, basePath: call.basePath, exitCode })
  }
  return results
}

function runBuild({ command, args, cwd, env, shell }) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { cwd, env, shell, stdio: "inherit", windowsHide: true })
    child.once("error", rejectRun)
    child.once("exit", (code, signal) => signal ? rejectRun(new Error(`Build terminated by ${signal}`)) : resolveRun(code ?? 1))
  })
}

export async function buildStaticDeployment(projectRoot = process.cwd()) {
  const root = resolve(projectRoot)
  const forbiddenMarkers = await collectForbiddenMarkers(root)
  for (const { locale } of BUILD_MATRIX.slice(1)) await createLocaleBuildTree({ projectRoot: root, locale })
  const plan = createBuildPlan(root)
  const buildResults = await executeBuildPlan(plan)
  const academyRoutes = await deriveAcademyRoutes(root)
  const builds = Object.fromEntries(plan.map(({ locale, cwd }) => [locale, join(cwd, "out")]))
  const sourceLabels = Object.fromEntries(plan.map(({ locale }) => [locale, locale === "zh-CN" ? "out" : `.cache/i18n-build/${locale}/out`]))
  const merge = await mergeStaticOutputs({ projectRoot: root, sourceLabels, forbiddenMarkers, builds, output: join(root, ".cache", "i18n-deploy"), academyRoutes })
  return { buildResults, academyRoutes, ...merge }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  buildStaticDeployment().then((result) => console.log(JSON.stringify({ builds: result.buildResults, academyRouteCount: result.academyRoutes.length, businessHtml: result.manifest.businessRouteMatrix.total, manifestSha256: result.manifestSha256 }, null, 2))).catch((error) => { console.error(error?.stack ?? error); process.exitCode = 1 })
}
