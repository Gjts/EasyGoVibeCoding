import assert from "node:assert/strict"
import { mkdir, mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import {
  auditRelease,
  collectHtmlReferences,
  extractVisibleText,
  findLocalizationResidue,
  scanSecurityBytes,
} from "./release-audit.mjs"

test("extractVisibleText ignores scripts, styles, comments, and markup", () => {
  const html = '<!doctype html><html><head><style>.x{}</style><script>const x="中文"</script></head><body><!-- 中文 --><p>Hello &amp; bye</p><code>npm run build</code></body></html>'
  assert.equal(extractVisibleText(html), "Hello & bye npm run build")
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

test("scanSecurityBytes reports marker names without exposing marker values", () => {
  const marker = Buffer.from("secret-release-marker")
  const hits = scanSecurityBytes({ path: "index.html", bytes: Buffer.from(`prefix ${marker} suffix`), forbiddenMarkers: [{ name: "TRANSLATION_API_KEY", bytes: marker }] })
  assert.deepEqual(hits, [{ path: "index.html", category: "configured-secret", marker: "TRANSLATION_API_KEY" }])
  assert.equal(JSON.stringify(hits).includes(marker.toString()), false)
})

test("auditRelease rejects a matrix missing any academy page", async () => {
  const root = await mkdtemp(join(tmpdir(), "release-audit-"))
  await mkdir(join(root, "ja"), { recursive: true })
  await writeFile(join(root, "index.html"), "<html><body>ok</body></html>")
  await assert.rejects(
    auditRelease({ deploymentRoot: root, academyRoutes: ["/"], salesLegal: [], siteOrigin: "https://example.invalid", forbiddenMarkers: [], allowlist: [] }),
    /route matrix/i,
  )
})
