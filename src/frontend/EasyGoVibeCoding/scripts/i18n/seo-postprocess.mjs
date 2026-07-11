import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

const LOCALES = Object.freeze([
  Object.freeze({ locale: "zh-CN", basePath: "" }),
  Object.freeze({ locale: "ja", basePath: "/ja/academy" }),
  Object.freeze({ locale: "en", basePath: "/en/academy" }),
  Object.freeze({ locale: "fr", basePath: "/fr/academy" }),
  Object.freeze({ locale: "de", basePath: "/de/academy" }),
])

const compare = (left, right) => left < right ? -1 : left > right ? 1 : 0
const sha256 = (value) => createHash("sha256").update(value).digest("hex")
const escapeAttribute = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
const escapeXml = escapeAttribute

function decodeEntities(value) {
  return value.replace(/&(?:#(\d+)|#x([\da-f]+)|amp|quot|apos|lt|gt);/giu, (entity, decimal, hexadecimal) => {
    if (decimal) return String.fromCodePoint(Number(decimal))
    if (hexadecimal) return String.fromCodePoint(Number.parseInt(hexadecimal, 16))
    return { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">" }[entity.toLowerCase()] ?? entity
  })
}

function findTagEnd(source, start) {
  let quote = ""
  for (let index = start + 1; index < source.length; index += 1) {
    const character = source[index]
    if (quote) { if (character === quote) quote = "" }
    else if (character === '"' || character === "'") quote = character
    else if (character === ">") return index + 1
  }
  throw new Error("Malformed HTML tag in head")
}

function parseTag(raw, offset = 0) {
  const match = /^<\s*(\/)?\s*([a-z][\w:-]*)/iu.exec(raw)
  if (!match) return null
  const attributes = []
  let index = match[0].length
  while (index < raw.length - 1) {
    while (/\s/u.test(raw[index] ?? "")) index += 1
    if (raw[index] === "/" || raw[index] === ">" || index >= raw.length - 1) break
    const nameStart = index
    while (index < raw.length && !/[\s=/>]/u.test(raw[index])) index += 1
    const name = raw.slice(nameStart, index)
    while (/\s/u.test(raw[index] ?? "")) index += 1
    let value = ""
    let valueStart = index
    let valueEnd = index
    if (raw[index] === "=") {
      index += 1
      while (/\s/u.test(raw[index] ?? "")) index += 1
      if (raw[index] === '"' || raw[index] === "'") {
        const quote = raw[index]
        valueStart = ++index
        while (index < raw.length && raw[index] !== quote) index += 1
        if (index >= raw.length) throw new Error("Malformed quoted HTML attribute")
        valueEnd = index
        value = raw.slice(valueStart, valueEnd)
        index += 1
      } else {
        valueStart = index
        while (index < raw.length && !/[\s>]/u.test(raw[index])) index += 1
        valueEnd = index
        value = raw.slice(valueStart, valueEnd).replace(/\/$/u, "")
      }
    }
    attributes.push({ name: name.toLowerCase(), value: decodeEntities(value), start: offset + nameStart, end: offset + index, valueStart: offset + valueStart, valueEnd: offset + valueEnd })
  }
  return { name: match[2].toLowerCase(), closing: Boolean(match[1]), attributes }
}

function headStructure(source) {
  const lower = source.toLowerCase()
  const htmlStart = lower.indexOf("<html")
  if (htmlStart < 0) throw new Error("HTML document must contain one html element")
  const htmlEnd = findTagEnd(source, htmlStart)
  const headStart = lower.indexOf("<head", htmlEnd)
  if (headStart < 0) throw new Error("HTML document must contain one head element")
  const headOpenEnd = findTagEnd(source, headStart)
  let index = headOpenEnd
  let headCloseStart = -1
  let headCloseEnd = -1
  while (index < source.length) {
    const open = source.indexOf("<", index)
    if (open < 0) break
    if (source.startsWith("<!--", open)) {
      const commentEnd = source.indexOf("-->", open + 4)
      if (commentEnd < 0) throw new Error("Unclosed HTML comment in head")
      index = commentEnd + 3
      continue
    }
    const tagEnd = findTagEnd(source, open)
    const tag = parseTag(source.slice(open, tagEnd))
    if (!tag) { index = tagEnd; continue }
    if (tag.closing && tag.name === "head") { headCloseStart = open; headCloseEnd = tagEnd; break }
    if (!tag.closing && tag.name === "head") throw new Error("HTML document contains nested head elements")
    if (!tag.closing && ["title", "script", "style"].includes(tag.name)) {
      const rawClose = lower.indexOf(`</${tag.name}`, tagEnd)
      if (rawClose < 0) throw new Error(`Unclosed ${tag.name} element in head`)
      index = findTagEnd(source, rawClose)
    } else index = tagEnd
  }
  if (headCloseStart < 0) throw new Error("HTML document must contain a closing head element")
  return { htmlStart, htmlEnd, headStart, headOpenEnd, headCloseStart, headCloseEnd }
}

function scanHeadElements(source, start, end) {
  const elements = []
  let index = start
  while (index < end) {
    const open = source.indexOf("<", index)
    if (open < 0 || open >= end) break
    if (source.startsWith("<!--", open)) {
      const commentEnd = source.indexOf("-->", open + 4)
      if (commentEnd < 0 || commentEnd >= end) throw new Error("Unclosed HTML comment in head")
      index = commentEnd + 3
      continue
    }
    const tagEnd = findTagEnd(source, open)
    const tag = parseTag(source.slice(open, tagEnd), open)
    if (!tag || tag.closing) { index = tagEnd; continue }
    let elementEnd = tagEnd
    let inner = ""
    if (["title", "script", "style"].includes(tag.name)) {
      const closingStart = source.toLowerCase().indexOf(`</${tag.name}`, tagEnd)
      if (closingStart < 0 || closingStart >= end) throw new Error(`Unclosed ${tag.name} element in head`)
      elementEnd = findTagEnd(source, closingStart)
      inner = source.slice(tagEnd, closingStart)
    }
    elements.push({ ...tag, start: open, openEnd: tagEnd, end: elementEnd, raw: source.slice(open, elementEnd), inner })
    index = elementEnd
  }
  return elements
}

function attribute(element, name) { return element.attributes.find((item) => item.name === name)?.value ?? "" }
function relTokens(element) {
  return new Set(attribute(element, "rel").toLowerCase().split(/[\t\n\f\r ]+/u).filter(Boolean))
}
function routeFor(locale, logicalRoute) {
  const { basePath } = LOCALES.find((entry) => entry.locale === locale) ?? {}
  if (basePath === undefined) throw new Error(`Unsupported SEO locale: ${locale}`)
  return logicalRoute === "/" ? (basePath || "/") : `${basePath}${logicalRoute}`
}
function absoluteRoute(siteOrigin, route) { return route === "/" ? siteOrigin : `${siteOrigin}${route}` }
function routeHtmlPath(route) { return route === "/" ? "index.html" : `${route.slice(1)}.html` }
function academyHtmlPath(locale, logicalRoute) {
  if (logicalRoute !== "/") return routeHtmlPath(routeFor(locale, logicalRoute))
  const route = routeFor(locale, logicalRoute)
  return route === "/" ? "index.html" : `${route.slice(1)}/index.html`
}

export function validateSiteOrigin(value) {
  if (typeof value !== "string" || value.length === 0) throw new Error("I18N_SITE_ORIGIN must be an explicit absolute HTTPS origin")
  let url
  try { url = new URL(value) } catch { throw new Error("I18N_SITE_ORIGIN must be an explicit absolute HTTPS origin") }
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash || url.origin === "null") {
    throw new Error("I18N_SITE_ORIGIN must be an explicit absolute HTTPS origin")
  }
  return url.origin
}

export function buildAcademyAlternates(logicalRoute, origin) {
  const siteOrigin = validateSiteOrigin(origin)
  const language = LOCALES.map(({ locale }) => [locale, absoluteRoute(siteOrigin, routeFor(locale, logicalRoute))])
  return [...language, ["x-default", language[0][1]]]
}

function setDocumentLang(source, structure, locale) {
  const opening = source.slice(structure.htmlStart, structure.htmlEnd)
  const parsed = parseTag(opening, structure.htmlStart)
  const langAttributes = parsed.attributes.filter((item) => item.name === "lang")
  let rebuilt = opening
  for (const item of [...langAttributes].sort((a, b) => b.start - a.start)) rebuilt = rebuilt.slice(0, item.start - structure.htmlStart) + rebuilt.slice(item.end - structure.htmlStart)
  const insertion = rebuilt.lastIndexOf(">")
  rebuilt = `${rebuilt.slice(0, insertion).replace(/\s*$/u, "")} lang="${escapeAttribute(locale)}"${rebuilt.slice(insertion)}`
  return source.slice(0, structure.htmlStart) + rebuilt + source.slice(structure.htmlEnd)
}

export function transformAcademyHtml({ html, locale, logicalRoute, siteOrigin }) {
  const origin = validateSiteOrigin(siteOrigin)
  const expectedRoute = routeFor(locale, logicalRoute)
  let source = String(html)
  let structure = headStructure(source)
  source = setDocumentLang(source, structure, locale)
  structure = headStructure(source)
  const elements = scanHeadElements(source, structure.headOpenEnd, structure.headCloseStart)
  const titles = elements.filter((item) => item.name === "title")
  const descriptions = elements.filter((item) => item.name === "meta" && attribute(item, "name").toLowerCase() === "description")
  const title = titles.find((item) => decodeEntities(item.inner).trim().length > 0)
  const description = descriptions.find((item) => attribute(item, "content").trim().length > 0)
  if (!title) throw new Error(`Academy page has no non-empty localized title: ${locale}:${logicalRoute}`)
  if (!description) throw new Error(`Academy page has no non-empty localized description: ${locale}:${logicalRoute}`)
  const remove = elements.filter((item) => item.name === "title"
    || (item.name === "meta" && attribute(item, "name").toLowerCase() === "description")
    || (item.name === "link" && (relTokens(item).has("canonical") || relTokens(item).has("alternate"))))
  let inner = source.slice(structure.headOpenEnd, structure.headCloseStart)
  for (const item of [...remove].sort((a, b) => b.start - a.start)) {
    inner = inner.slice(0, item.start - structure.headOpenEnd) + inner.slice(item.end - structure.headOpenEnd)
  }
  const canonical = absoluteRoute(origin, expectedRoute)
  const links = [
    `<link rel="canonical" href="${escapeAttribute(canonical)}"/>`,
    ...buildAcademyAlternates(logicalRoute, origin).map(([hrefLang, href]) => `<link rel="alternate" hreflang="${hrefLang}" href="${escapeAttribute(href)}"/>`),
  ].join("")
  const metadata = `${title.raw}${description.raw}${links}`
  return source.slice(0, structure.headOpenEnd) + inner + metadata + source.slice(structure.headCloseStart)
}

export function generateSitemap({ academyRoutes, salesLegal, siteOrigin }) {
  const origin = validateSiteOrigin(siteOrigin)
  const routes = LOCALES.flatMap(({ locale }) => academyRoutes.map((logicalRoute) => routeFor(locale, logicalRoute))).concat(salesLegal)
  if (new Set(routes).size !== routes.length) throw new Error("Sitemap route set contains duplicates")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${escapeXml(absoluteRoute(origin, route))}</loc></url>`).join("\n")}\n</urlset>\n`
}

export function generateRobots(siteOrigin) {
  const origin = validateSiteOrigin(siteOrigin)
  return `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
}

export async function postprocessDeploymentSeo({ deploymentRoot, academyRoutes, salesLegal, siteOrigin }) {
  const origin = validateSiteOrigin(siteOrigin)
  const processed = []
  for (const { locale } of LOCALES) for (const logicalRoute of academyRoutes) {
    const relativePath = academyHtmlPath(locale, logicalRoute)
    const absolutePath = join(deploymentRoot, ...relativePath.split("/"))
    const before = await readFile(absolutePath, "utf8")
    const after = transformAcademyHtml({ html: before, locale, logicalRoute, siteOrigin: origin })
    if (after !== before) await writeFile(absolutePath, after)
    processed.push({ path: relativePath, sha256: sha256(Buffer.from(after)), size: Buffer.byteLength(after) })
  }
  const sitemap = generateSitemap({ academyRoutes, salesLegal, siteOrigin: origin })
  const robots = generateRobots(origin)
  await writeFile(join(deploymentRoot, "sitemap.xml"), sitemap)
  await writeFile(join(deploymentRoot, "robots.txt"), robots)
  const processedFiles = processed.map(({ path }) => path).concat(["robots.txt", "sitemap.xml"]).sort(compare)
  return {
    version: 1,
    siteOrigin: origin,
    originKind: origin.endsWith(".invalid") ? "non-production" : "release",
    academyPageCount: processed.length,
    salesLegalPageCount: salesLegal.length,
    canonicalCount: processed.length,
    alternateCount: processed.length * 6,
    sitemapUrlCount: processed.length + salesLegal.length,
    processedFiles,
    academyHtmlSha256: sha256(Buffer.from(processed.map(({ path, sha256: hash, size }) => `${path}\0${hash}\0${size}\n`).join(""))),
    sitemapSha256: sha256(Buffer.from(sitemap)),
    robotsSha256: sha256(Buffer.from(robots)),
  }
}

export async function auditDeploymentSeo({ deploymentRoot, academyRoutes, salesLegal, siteOrigin }) {
  const origin = validateSiteOrigin(siteOrigin)
  let academyPageCount = 0
  let canonicalCount = 0
  let alternateCount = 0
  const htmlEvidence = []
  for (const { locale } of LOCALES) for (const logicalRoute of academyRoutes) {
    const relativePath = academyHtmlPath(locale, logicalRoute)
    const bytes = await readFile(join(deploymentRoot, ...relativePath.split("/")))
    const source = bytes.toString("utf8")
    const structure = headStructure(source)
    const htmlTag = parseTag(source.slice(structure.htmlStart, structure.htmlEnd))
    const lang = htmlTag.attributes.filter((item) => item.name === "lang")
    if (lang.length !== 1 || lang[0].value !== locale) throw new Error(`Invalid document lang for ${locale}:${logicalRoute}`)
    const elements = scanHeadElements(source, structure.headOpenEnd, structure.headCloseStart)
    const titles = elements.filter((item) => item.name === "title" && decodeEntities(item.inner).trim())
    const descriptions = elements.filter((item) => item.name === "meta" && attribute(item, "name").toLowerCase() === "description" && attribute(item, "content").trim())
    const canonicals = elements.filter((item) => item.name === "link" && relTokens(item).has("canonical"))
    const alternates = elements.filter((item) => item.name === "link" && relTokens(item).has("alternate"))
    const expectedCanonical = absoluteRoute(origin, routeFor(locale, logicalRoute))
    if (titles.length !== 1) throw new Error(`Expected exactly one non-empty title for ${locale}:${logicalRoute}`)
    if (descriptions.length !== 1) throw new Error(`Expected exactly one non-empty description for ${locale}:${logicalRoute}`)
    if (canonicals.length !== 1 || attribute(canonicals[0], "href") !== expectedCanonical) throw new Error(`Invalid canonical for ${locale}:${logicalRoute}`)
    const expectedAlternates = new Map(buildAcademyAlternates(logicalRoute, origin))
    const actualAlternates = new Map(alternates.map((item) => [attribute(item, "hreflang"), attribute(item, "href")]))
    if (alternates.length !== 6 || actualAlternates.size !== 6 || [...expectedAlternates].some(([key, value]) => actualAlternates.get(key) !== value)) {
      throw new Error(`Invalid reciprocal alternates for ${locale}:${logicalRoute}`)
    }
    academyPageCount += 1
    canonicalCount += canonicals.length
    alternateCount += alternates.length
    htmlEvidence.push(`${relativePath}\0${sha256(bytes)}\0${bytes.length}\n`)
  }
  for (const route of salesLegal) {
    const source = await readFile(join(deploymentRoot, ...routeHtmlPath(route).split("/")), "utf8")
    const structure = headStructure(source)
    const elements = scanHeadElements(source, structure.headOpenEnd, structure.headCloseStart)
    if (!elements.some((item) => item.name === "title" && decodeEntities(item.inner).trim())) throw new Error(`Sales/legal page has no title: ${route}`)
    if (!elements.some((item) => item.name === "meta" && attribute(item, "name").toLowerCase() === "description" && attribute(item, "content").trim())) throw new Error(`Sales/legal page has no description: ${route}`)
  }
  const sitemap = await readFile(join(deploymentRoot, "sitemap.xml"), "utf8")
  const robots = await readFile(join(deploymentRoot, "robots.txt"), "utf8")
  const expectedSitemap = generateSitemap({ academyRoutes, salesLegal, siteOrigin: origin })
  if (sitemap !== expectedSitemap) throw new Error("Root sitemap does not exactly match the verified business route matrix")
  if (robots !== generateRobots(origin)) throw new Error("Root robots.txt is not the exact verified content")
  return {
    academyPageCount,
    salesLegalPageCount: salesLegal.length,
    businessPageCount: academyPageCount + salesLegal.length,
    canonicalCount,
    alternateCount,
    sitemapUrlCount: (sitemap.match(/<url>/gu) ?? []).length,
    academyHtmlSha256: sha256(Buffer.from(htmlEvidence.join(""))),
    sitemapSha256: sha256(Buffer.from(sitemap)),
    robotsSha256: sha256(Buffer.from(robots)),
  }
}
