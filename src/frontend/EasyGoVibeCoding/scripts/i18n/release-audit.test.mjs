import assert from "node:assert/strict"
import { mkdir, mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import {
  auditRelease,
  buildFrozenSeoProcessedSet,
  classifyHtmlPaths,
  collectCssReferences,
  collectHtmlReferences,
  extractVisibleText,
  findLocalizationResidue,
  findLocalPathOccurrences,
  findLocalPaths,
  scanSecurityBytes,
  shouldScanDeploymentGenericPosix,
  validateAllowlist,
  validateLocalizedScriptCoverage,
  validateLocalPathAllowlist,
  validateLocalPathAllowlistUsage,
  validateManifestProvenance,
  validateReleasePathIndex,
  validateSeoProcessedSet,
} from "./release-audit.mjs"

test("extractVisibleText ignores scripts, styles, comments, and markup", () => {
  const html = '<!doctype html><html><head><style>.x{}</style><script>const x="中文"</script></head><body><!-- 中文 --><p>Hello &amp; bye</p><code>npm run build</code></body></html>'
  assert.equal(extractVisibleText(html), "Hello & bye npm run build")
})

test("extractVisibleText includes decoded user-visible attributes", () => {
  const html = '<img alt="\u4e2d&amp;\u6587" title="\u63d0\u793a"><input placeholder="\u8bf7\u8f93\u5165" aria-label="\u59d3\u540d" value="\u9ed8\u8ba4"><div data-label="ignored">Body</div>'
  assert.equal(extractVisibleText(html), "\u4e2d&\u6587 \u63d0\u793a \u8bf7\u8f93\u5165 \u59d3\u540d \u9ed8\u8ba4 Body")
})

test("findLocalizationResidue requires an exact allowlist match", () => {
  const text = "English 中文 法语"
  assert.deepEqual(findLocalizationResidue({ locale: "en", route: "/en/academy", file: "en/academy/index.html", text, allowlist: [] }).map((hit) => hit.text), ["中文", "法语"])
  const allowlist = [{ locale: "en", route: "/en/academy", text: "中文", reason: "language-switch label" }]
  const result = findLocalizationResidue({ locale: "en", route: "/en/academy", file: "en/academy/index.html", text, allowlist })
  assert.deepEqual(result.filter((hit) => !hit.allowed).map((hit) => hit.text), ["法语"])
  assert.equal(result.find((hit) => hit.text === "中文").reason, "language-switch label")
})

test("collectHtmlReferences handles local URLs, fragments, srcset, CSS and API exceptions", () => {
  const html = '<a href="/en/academy/guide#step">x</a><img src="/en/academy/a.png" srcset="/en/academy/a.png 1x, /en/academy/b.png 2x"><script src="/en/academy/_next/app.js"></script><link rel="stylesheet" href="/en/academy/_next/app.css"><form action="/api/contact"></form><div style="background:url(\'/en/academy/bg.png\')" id="step"></div>'
  const result = collectHtmlReferences({ html, route: "/en/academy" })
  assert.equal(result.anchors.has("step"), true)
  assert.equal(result.references.some((item) => item.kind === "api" && item.url === "/api/contact"), true)
  assert.equal(result.references.some((item) => item.url === "/en/academy/b.png"), true)
  assert.equal(result.references.some((item) => item.url === "/en/academy/bg.png"), true)
})

test("collectHtmlReferences crawls same-origin protocol-relative references", () => {
  const result = collectHtmlReferences({ html: '<script src="//example.invalid/en/academy/app.js"></script>', route: "/en/academy" })
  assert.equal(result.references[0].url, "//example.invalid/en/academy/app.js")
})

test("collectCssReferences covers @import and url references", () => {
  assert.deepEqual(collectCssReferences('@import "./theme.css"; @import url(\'./print.css\') print; .x{src:url(./font.woff2)}'), ["./theme.css", "./print.css", "./font.woff2"])
})

test("scanSecurityBytes reports marker names without exposing marker values", () => {
  const marker = Buffer.from("secret-release-marker")
  const hits = scanSecurityBytes({ path: "index.html", bytes: Buffer.from(`prefix ${marker} suffix`), forbiddenMarkers: [{ name: "TRANSLATION_API_KEY", bytes: marker }] })
  assert.deepEqual(hits, [{ path: "index.html", category: "configured-secret", marker: "TRANSLATION_API_KEY" }])
  assert.equal(JSON.stringify(hits).includes(marker.toString()), false)
})

test("scanSecurityBytes rejects ordinary Windows, UNC, file URL and POSIX local paths", () => {
  const source = String.raw`const a="C:\\Users\\alice\\repo"; const b="D:\\build\\output"; const c="C:\\temp\\x"; const d="\\\\server\\share\\repo"; const e="file:///var/tmp/repo"; const f="/home/alice/repo"; const g="/workspace/app"; const h="/opt/tool"; const i="/tmp/build"; const j="\\\\a\\b\\secret.txt"; const k="\\\\127.0.0.1\\C$\\secret.txt"; const l="/root/secret"; const m="/mnt/data"; const n="/etc/passwd"; const filePath="/custom/build/file.txt"`
  const hits = scanSecurityBytes({ path: "app.js", bytes: Buffer.from(source), forbiddenMarkers: [], localPathAllowlist: [] })
  assert.deepEqual([...new Set(hits.map(({ category }) => category))], ["absolute-local-path"])
  assert.deepEqual(findLocalPaths('"/workspace" "/opt"'), ["/workspace", "/opt"])
  assert.equal(findLocalPaths(String.raw`const escaped = /\\\\[^\\s]+\\share/u`).length, 0)
  assert.throws(() => validateLocalPathAllowlist([{ path: "app.js", text: "/workspace/app", reason: "fixture" }, { path: "app.js", text: "/workspace/app", reason: "duplicate" }]), /duplicate/iu)
  const repeatedPath = `/${"root"}/secret`
  const repeated = `const a="${repeatedPath}"; const b="${repeatedPath}"`
  const occurrences = findLocalPathOccurrences(repeated)
  assert.equal(occurrences.filter(({ text }) => text === "/root/secret").length, 2)
  const usage = new Map()
  const repeatedAllowlist = validateLocalPathAllowlist([{ path: "repeat.js", text: repeatedPath, reason: "fixture" }])
  scanSecurityBytes({ path: "repeat.js", bytes: Buffer.from(repeated), forbiddenMarkers: [], localPathAllowlist: repeatedAllowlist, localPathUsage: usage })
  assert.throws(() => validateLocalPathAllowlistUsage(repeatedAllowlist, usage), /exactly once/iu)
  const deploymentSource = 'const filePath="/custom/build/file.txt"; const workspaceRoot="/custom/build/output"'
  assert.deepEqual(findLocalPaths(deploymentSource), ["/custom/build/file.txt", "/custom/build/output"])
  assert.deepEqual(["bundle.js", "worker.mjs", "data.json", "route/__next._full.txt"].map(shouldScanDeploymentGenericPosix), [true, true, true, true])
  assert.deepEqual(["index.html", "styles.css", "image.svg"].map(shouldScanDeploymentGenericPosix), [false, false, false])
  assert.equal(scanSecurityBytes({ path: "bundle.js", bytes: Buffer.from(deploymentSource), forbiddenMarkers: [], includeGenericPosix: shouldScanDeploymentGenericPosix("bundle.js") }).some(({ category }) => category === "absolute-local-path"), true)
  assert.equal(scanSecurityBytes({ path: "index.html", bytes: Buffer.from(deploymentSource), forbiddenMarkers: [], includeGenericPosix: shouldScanDeploymentGenericPosix("index.html") }).some(({ category }) => category === "absolute-local-path"), false)
  assert.equal(scanSecurityBytes({ path: "app.ts", bytes: Buffer.from('const filePath="/custom/build/file.txt"'), forbiddenMarkers: [] }).some(({ category }) => category === "absolute-local-path"), true)
  assert.equal(scanSecurityBytes({ path: "app.tsx", bytes: Buffer.from('const workspaceRoot="/custom/build/output"'), forbiddenMarkers: [] }).some(({ category }) => category === "absolute-local-path"), true)
  assert.equal(scanSecurityBytes({ path: "README.md", bytes: Buffer.from('filePath: "/custom/build/readme.txt"'), forbiddenMarkers: [] }).some(({ category }) => category === "absolute-local-path"), true)
  assert.equal(scanSecurityBytes({ path: "artifact.bin", bytes: Buffer.from('const filePath="/custom/build/file.txt"'), forbiddenMarkers: [] }).some(({ category }) => category === "absolute-local-path"), false)
  assert.equal(findLocalPaths('import { x } from "./home-live-strip"').length, 0)
  const routePrefixes = 'const route="/home-live-strip"; const href="/build-assets/app.js"; const url="/root.css"; const pathname="/tmp_file"'
  assert.deepEqual(findLocalPaths(routePrefixes), [])
  assert.equal(scanSecurityBytes({ path: "routes.ts", bytes: Buffer.from(routePrefixes), forbiddenMarkers: [] }).some(({ category }) => category === "absolute-local-path"), false)
  assert.deepEqual(findLocalPaths('"/home/user" "/build/output" "/root/secret" "/tmp/file"'), ["/home/user", "/build/output", "/root/secret", "/tmp/file"])
  assert.equal(findLocalPaths('const route="/custom/build/output"; const url="/custom/build/file.txt"; const href="/custom/build/file.txt"; const path="/custom/build/output"; const pathname="/custom/build/output"; const basePath="/custom/build/output"; paths: "/api/tasks"').length, 0)
  const escapedShortUnc = String.raw`const filePath="\\\\a\\b\\secret.txt"`
  const escapedAdminUnc = String.raw`const filePath="\\\\127.0.0.1\\C$\\secret.txt"`
  assert.equal(findLocalPaths(escapedShortUnc).length, 1)
  assert.equal(scanSecurityBytes({ path: "short-unc.ts", bytes: Buffer.from(escapedShortUnc), forbiddenMarkers: [] }).some(({ category }) => category === "absolute-local-path"), true)
  assert.equal(findLocalPaths(escapedAdminUnc).length, 1)
  assert.equal(scanSecurityBytes({ path: "admin-unc.ts", bytes: Buffer.from(escapedAdminUnc), forbiddenMarkers: [] }).some(({ category }) => category === "absolute-local-path"), true)
  assert.equal(findLocalPaths(String.raw`const pattern = /\\\\[^\\s]+\\share/u`).length, 0)
  assert.equal(findLocalPaths(String.raw`const filePath = "\\\\n\\u003c"`).length, 0)
  assert.equal(findLocalPaths(String.raw`const route = "\\\\a\\b\\secret.txt"; const url = "\\\\127.0.0.1\\C$\\secret.txt"`).length, 0)
})

test("allowlist requires exact locale, route, file, scope, text, and reason", () => {
  assert.throws(() => validateAllowlist([{ locale: "ja", route: "/ja/academy", scope: "html", text: "\u4e2d\u6587", reason: "x" }]), /file/u)
  assert.equal(validateAllowlist([{ locale: "ja", route: "/ja/academy", file: "ja/academy/index.html", scope: "html", text: "\u4e2d\u6587", reason: "intentional label" }]).length, 1)
})

test("release path index rejects NFC and case-fold collisions", () => {
  assert.throws(() => validateReleasePathIndex([{ path: "A.png", size: 1 }, { path: "a.png", size: 1 }]), /collision/iu)
  assert.throws(() => validateReleasePathIndex([{ path: "caf\u00e9.png", size: 1 }, { path: "cafe\u0301.png", size: 1 }]), /collision/iu)
})

test("HTML classification rejects a rogue page outside the frozen system set", () => {
  assert.throws(() => classifyHtmlPaths({ htmlPaths: ["index.html", "rogue.html"], businessPaths: ["index.html"], systemPaths: [] }), /rogue/iu)
})

test("manifest provenance rejects a tampered copied PNG", () => {
  const bytes = Buffer.from("tampered")
  const manifest = { builds: [{ locale: "zh-CN", basePath: "", sourceOutput: "out", logicalRouteCount: 79, copiedFileCount: 1, copiedFiles: [{ path: "logo.png", source: "zh-CN:logo.png", size: 8, sha256: "0".repeat(64) }] }] }
  const files = new Map([["logo.png", { path: "logo.png", size: bytes.length, sha256: "bad", bytes }]])
  assert.throws(() => validateManifestProvenance({ manifest, files, generatedPaths: new Set() }), /provenance/iu)
  const wrongSource = structuredClone(manifest)
  wrongSource.builds[0].copiedFiles[0].source = "zh-CN:../logo.png"
  assert.throws(() => validateManifestProvenance({ manifest: wrongSource, files, generatedPaths: new Set() }), /source|unsafe/iu)
  const wrongCount = structuredClone(manifest)
  wrongCount.builds[0].copiedFileCount = 2
  assert.throws(() => validateManifestProvenance({ manifest: wrongCount, files, generatedPaths: new Set() }), /count/iu)
  const academyRoutes = ["/"]
  const frozen = buildFrozenSeoProcessedSet(academyRoutes)
  const seoManifest = { seo: { processedFiles: [...frozen, "logo.png"] } }
  assert.throws(() => validateSeoProcessedSet({ manifest: seoManifest, academyRoutes }), /processed/iu)
})

test("localized script coverage rejects a route with no declared chunk", () => {
  assert.throws(() => validateLocalizedScriptCoverage([{ locale: "en", route: "/en/academy", file: "en/academy/index.html", scriptPaths: [] }], new Map()), /script coverage/iu)
})

test("auditRelease rejects a matrix missing any academy page", async () => {
  const root = await mkdtemp(join(tmpdir(), "release-audit-"))
  await mkdir(join(root, "ja"), { recursive: true })
  await writeFile(join(root, "index.html"), "<html><body>ok</body></html>")
  await assert.rejects(
    auditRelease({ deploymentRoot: root, academyRoutes: ["/"], salesLegal: [], siteOrigin: "https://example.invalid", forbiddenMarkers: [], allowlist: [] }),
    /(?:route matrix|HTML classification)/i,
  )
})
