import assert from "node:assert/strict"
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import {
  auditDeploymentSeo,
  buildAcademyAlternates,
  generateRobots,
  generateSitemap,
  postprocessDeploymentSeo,
  transformAcademyHtml,
  validateSiteOrigin,
} from "./seo-postprocess.mjs"

const ORIGIN = "https://example.invalid"
const html = (lang = "en", title = "A &amp; B", description = "Useful &amp; localized") =>
  `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${title}</title><meta name="description" content="${description}"><script>globalThis.x="<title>body decoy</title></head>"</script></head><body><main>unchanged & content</main></body></html>`

test("release site origin is an explicit absolute HTTPS origin", () => {
  assert.equal(validateSiteOrigin("https://EXAMPLE.com/"), "https://example.com")
  for (const invalid of [undefined, "", "http://example.com", "/relative", "https://example.com/path", "https://user@example.com", "https://example.com?q=1", "https://example.com/#x"]) {
    assert.throws(() => validateSiteOrigin(invalid), /I18N_SITE_ORIGIN|HTTPS origin/i)
  }
})

test("alternate matrix maps root and deep routes without doubled prefixes", () => {
  assert.deepEqual(buildAcademyAlternates("/advanced/testing", ORIGIN), [
    ["zh-CN", `${ORIGIN}/advanced/testing`],
    ["ja", `${ORIGIN}/ja/academy/advanced/testing`],
    ["en", `${ORIGIN}/en/academy/advanced/testing`],
    ["fr", `${ORIGIN}/fr/academy/advanced/testing`],
    ["de", `${ORIGIN}/de/academy/advanced/testing`],
    ["x-default", `${ORIGIN}/advanced/testing`],
  ])
  assert.equal(buildAcademyAlternates("/", ORIGIN)[1][1], `${ORIGIN}/ja/academy`)
})

test("head transform removes stale duplicates, escapes URLs, preserves localized metadata and body, and is idempotent", () => {
  const original = html()
  const closingHead = original.lastIndexOf("</head>")
  const input = `${original.slice(0, closingHead)}<title>stale</title><meta NAME="description" content="stale"><link rel="canonical" href="/old"><link rel="alternate" hreflang="en" href="/old">${original.slice(closingHead)}`
  const once = transformAcademyHtml({ html: input, locale: "en", logicalRoute: "/advanced/a&b", siteOrigin: ORIGIN })
  const twice = transformAcademyHtml({ html: once, locale: "en", logicalRoute: "/advanced/a&b", siteOrigin: ORIGIN })
  assert.equal(twice, once)
  assert.match(once, /<html lang="en">/)
  const markupWithoutScriptPayload = once.replace(/<script>[\s\S]*?<\/script>/giu, "")
  assert.equal((markupWithoutScriptPayload.match(/<title\b/gi) ?? []).length, 1)
  assert.equal((once.match(/<meta\b[^>]*\bname="description"/gi) ?? []).length, 1)
  assert.equal((once.match(/<link\b[^>]*\brel="canonical"/gi) ?? []).length, 1)
  assert.equal((once.match(/<link\b[^>]*\brel="alternate"/gi) ?? []).length, 6)
  assert.match(once, /href="https:\/\/example\.invalid\/en\/academy\/advanced\/a&amp;b"/)
  assert.equal(once.slice(once.indexOf("<body>")), input.slice(input.indexOf("<body>")))
  assert.match(once, /<script>globalThis\.x="<title>body decoy<\/title><\/head>"<\/script>/)
})

test("canonical and alternate are ASCII-whitespace rel tokens, not exact rel strings", async () => {
  const original = html()
  const closingHead = original.lastIndexOf("</head>")
  const stale = '<link rel="stylesheet\tCANONICAL" href="https://stale.invalid/c"><link rel="preload\nAlTeRnAtE" hreflang="en" href="https://stale.invalid/a"><link rel="canonical alternate" href="https://stale.invalid/both">'
  const input = `${original.slice(0, closingHead)}${stale}${original.slice(closingHead)}`
  const output = transformAcademyHtml({ html: input, locale: "en", logicalRoute: "/deep", siteOrigin: ORIGIN })
  assert.doesNotMatch(output, /stale\.invalid/u)
  const root = await mkdtemp(join(tmpdir(), "seo-rel-tokens-"))
  const academyRoutes = ["/"]
  const sales = ["/ja"]
  const locales = [["zh-CN", "index.html"], ["ja", "ja/academy/index.html"], ["en", "en/academy/index.html"], ["fr", "fr/academy/index.html"], ["de", "de/academy/index.html"]]
  for (const [locale, path] of locales) {
    await mkdir(join(root, path, ".."), { recursive: true })
    await writeFile(join(root, path), transformAcademyHtml({ html: html(locale), locale, logicalRoute: "/", siteOrigin: ORIGIN }))
  }
  await writeFile(join(root, "ja.html"), html("ja", "Sales", "Sales description"))
  await writeFile(join(root, "sitemap.xml"), generateSitemap({ academyRoutes, salesLegal: sales, siteOrigin: ORIGIN }))
  await writeFile(join(root, "robots.txt"), generateRobots(ORIGIN))
  const enPath = join(root, "en/academy/index.html")
  const enHtml = await readFile(enPath, "utf8")
  const enClosingHead = enHtml.lastIndexOf("</head>")
  await writeFile(enPath, `${enHtml.slice(0, enClosingHead)}<link rel="preload\tCaNoNiCaL alternate" href="https://stale.invalid/x">${enHtml.slice(enClosingHead)}`)
  await assert.rejects(auditDeploymentSeo({ deploymentRoot: root, academyRoutes, salesLegal: sales, siteOrigin: ORIGIN }), /canonical|alternate/i)
})

test("academy transform rejects empty title or description and malformed head structure", () => {
  assert.throws(() => transformAcademyHtml({ html: html("en", "", "ok"), locale: "en", logicalRoute: "/", siteOrigin: ORIGIN }), /title/i)
  assert.throws(() => transformAcademyHtml({ html: html("en", "ok", ""), locale: "en", logicalRoute: "/", siteOrigin: ORIGIN }), /description/i)
  assert.throws(() => transformAcademyHtml({ html: "<html><body>x</body></html>", locale: "en", logicalRoute: "/", siteOrigin: ORIGIN }), /head/i)
})

test("sitemap is exact, deterministic and escaped; robots references the absolute sitemap", () => {
  const xml = generateSitemap({ academyRoutes: ["/", "/a&b"], salesLegal: ["/ja", "/ja/privacy"], siteOrigin: ORIGIN })
  assert.equal((xml.match(/<url>/g) ?? []).length, 12)
  assert.match(xml, /https:\/\/example\.invalid\/a&amp;b/)
  assert.ok(xml.indexOf(`${ORIGIN}</loc>`) < xml.indexOf(`${ORIGIN}/ja/academy</loc>`))
  assert.equal(generateRobots(ORIGIN), `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`)
})

test("full deployment postprocessor changes academy pages only and records stable evidence", async () => {
  const root = await mkdtemp(join(tmpdir(), "seo-deploy-"))
  const academyRoutes = ["/", "/deep"]
  const locales = [["zh-CN", ""], ["ja", "/ja/academy"], ["en", "/en/academy"], ["fr", "/fr/academy"], ["de", "/de/academy"]]
  for (const [locale, base] of locales) for (const route of academyRoutes) {
    const publicRoute = route === "/" ? (base || "/") : `${base}${route}`
    const path = route === "/"
      ? (publicRoute === "/" ? "index.html" : `${publicRoute.slice(1)}/index.html`)
      : `${publicRoute.slice(1)}.html`
    await mkdir(join(root, path, ".."), { recursive: true })
    await writeFile(join(root, path), html(locale))
  }
  const sales = ["/ja", "/ja/privacy"]
  for (const route of sales) {
    const path = `${route.slice(1)}.html`
    await mkdir(join(root, path, ".."), { recursive: true })
    await writeFile(join(root, path), html("ja", "Sales", "Sales description"))
  }
  const beforeSales = await readFile(join(root, "ja.html"), "utf8")
  const first = await postprocessDeploymentSeo({ deploymentRoot: root, academyRoutes, salesLegal: sales, siteOrigin: ORIGIN })
  const snapshots = await Promise.all(first.processedFiles.map((path) => readFile(join(root, path))))
  const second = await postprocessDeploymentSeo({ deploymentRoot: root, academyRoutes, salesLegal: sales, siteOrigin: ORIGIN })
  const snapshots2 = await Promise.all(second.processedFiles.map((path) => readFile(join(root, path))))
  assert.deepEqual(snapshots2, snapshots)
  assert.equal(first.academyPageCount, 10)
  assert.equal(first.sitemapUrlCount, 12)
  assert.equal(first.salesLegalPageCount, 2)
  assert.equal(await readFile(join(root, "ja.html"), "utf8"), beforeSales)
  assert.deepEqual(second, first)
  const audit = await auditDeploymentSeo({ deploymentRoot: root, academyRoutes, salesLegal: sales, siteOrigin: ORIGIN })
  assert.equal(audit.academyPageCount, 10)
  await writeFile(join(root, "en/academy/deep.html"), (await readFile(join(root, "en/academy/deep.html"), "utf8")).replace('rel="canonical"', 'rel="alternate"'))
  await assert.rejects(auditDeploymentSeo({ deploymentRoot: root, academyRoutes, salesLegal: sales, siteOrigin: ORIGIN }), /canonical/i)
})
