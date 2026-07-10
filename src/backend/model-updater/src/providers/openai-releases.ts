export const OPENAI_NEWS_RSS_URL = "https://openai.com/news/rss.xml"
const OPENAI_NEWS_TIMEOUT_MS = 8_000

const OPENAI_MODEL_URL_PREFIX =
  "https://developers.openai.com/api/docs/models/"

export interface OpenAiRelease {
  modelId: string
  releaseDate: string
  sourceUrl: string
}

export async function fetchOpenAiReleases(): Promise<Map<string, OpenAiRelease>> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), OPENAI_NEWS_TIMEOUT_MS)
  try {
    const response = await fetch(OPENAI_NEWS_RSS_URL, {
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      signal: controller.signal,
    })
    if (!response.ok) return new Map()
    return parseOpenAiNewsRss(await response.text())
  } catch {
    return new Map()
  } finally {
    clearTimeout(timeout)
  }
}

export function parseOpenAiNewsRss(
  xml: string,
): Map<string, OpenAiRelease> {
  const candidates = new Map<
    string,
    { release: OpenAiRelease; specificity: number }
  >()

  for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const item = match[1] || ""
    const title = readTag(item, "title")
    const category = readTag(item, "category")
    const sourceUrl = readTag(item, "link")
    const publishedAt = readTag(item, "pubDate")
    if (!title || category !== "Product" || !isOfficialUrl(sourceUrl)) continue

    const normalizedTitle = normalizeHyphens(title)
    const modelIds = releaseModelIds(normalizedTitle)
    if (modelIds.length === 0) continue

    const timestamp = Date.parse(publishedAt)
    if (Number.isNaN(timestamp)) continue

    for (const modelId of modelIds) {
      const release = {
        modelId,
        releaseDate: new Date(timestamp).toISOString().slice(0, 10),
        sourceUrl,
      }
      const specificity = releaseSpecificity(normalizedTitle, sourceUrl, modelId)
      const current = candidates.get(modelId)
      if (!current || specificity > current.specificity) {
        candidates.set(modelId, { release, specificity })
      }
    }
  }

  return new Map(
    [...candidates.entries()].map(([modelId, value]) => [
      modelId,
      value.release,
    ]),
  )
}

function releaseModelIds(title: string): string[] {
  const introducing = /^Introducing\s+GPT-/i.test(title)
  const titledRelease = /^GPT-[^:]+:/i.test(title)
  if (!introducing && !titledRelease) return []

  const match = title.match(
    /\bGPT-(\d+(?:\.\d+)*(?:o)?)(?=$|[- :])(?:[- ](Codex(?:[- ]Spark)?|Instant|mini|nano|Sol|Terra|Luna))?/i,
  )
  if (!match?.[1]) return []

  const baseId = `gpt-${match[1]}`.toLowerCase()
  const suffix = match[2]?.toLowerCase().replace(/\s+/g, "-")
  const ids = [suffix ? `${baseId}-${suffix}` : baseId]
  if (suffix === "mini" && /\band\s+nano\b/i.test(title)) {
    ids.push(`${baseId}-nano`)
  }
  return ids
}

export function openAiModelUrl(modelId: string): string {
  return `${OPENAI_MODEL_URL_PREFIX}${modelId}`
}

function readTag(item: string, tag: string): string {
  const pattern = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i")
  const value = item.match(pattern)?.[1]?.trim() || ""
  const cdata = value.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/i)?.[1]
  return (cdata ?? value)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}

function normalizeHyphens(value: string): string {
  return value.replace(/[‐‑‒–—−]/g, "-")
}

function isOfficialUrl(value: string): boolean {
  try {
    return new URL(value).hostname === "openai.com"
  } catch {
    return false
  }
}

function releaseSpecificity(
  title: string,
  sourceUrl: string,
  modelId: string,
): number {
  let score = 0
  const titlePrefix = modelId.toUpperCase()
  if (title.toUpperCase().startsWith(`${titlePrefix}:`)) score += 4
  if (/\b(introducing|launch|frontier)\b/i.test(title)) score += 2

  const expectedSlug = modelId.replace(/\./g, "-")
  try {
    const pathname = new URL(sourceUrl).pathname.replace(/\/$/, "")
    if (pathname.endsWith(`/${expectedSlug}`)) score += 4
  } catch {
    return score
  }
  return score
}
