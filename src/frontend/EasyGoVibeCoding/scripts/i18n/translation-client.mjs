import { createHash } from "node:crypto"

const PROMPT_VERSION = "egvc-i18n-v1"
const PLACEHOLDER_PATTERN = /\{\{[^{}]+\}\}|\{[A-Za-z_][\w.-]*\}|%\d*\$?[sdif]/g

function extractPlaceholders(value) {
  return [...value.matchAll(PLACEHOLDER_PATTERN)].map(([match]) => match).sort()
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (!value || typeof value !== "object") return value

  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, canonicalize(value[key])]),
  )
}

export function loadTranslationSettings(env = process.env) {
  const baseUrl = env.TRANSLATION_API_BASE_URL?.trim()
  if (!baseUrl) {
    throw new Error("Missing required environment variable: TRANSLATION_API_BASE_URL")
  }

  const apiKey = env.TRANSLATION_API_KEY?.trim()
  if (!apiKey) {
    throw new Error("Missing required environment variable: TRANSLATION_API_KEY")
  }

  let parsedBaseUrl
  try {
    parsedBaseUrl = new URL(baseUrl)
  } catch {
    throw new Error("TRANSLATION_API_BASE_URL must be a valid URL")
  }
  if (parsedBaseUrl.protocol !== "https:" && parsedBaseUrl.hostname !== "localhost") {
    throw new Error("TRANSLATION_API_BASE_URL must use HTTPS")
  }

  return {
    baseUrl: baseUrl.replace(/\/+$/, ""),
    apiKey,
    model: env.TRANSLATION_MODEL?.trim() || "gpt-5.4-mini",
  }
}

export function createTranslationCacheKey({
  baseUrl,
  model,
  sourceLocale,
  targetLocales,
  entries,
  glossary = {},
}) {
  const payload = canonicalize({
    version: 1,
    promptVersion: PROMPT_VERSION,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    model,
    sourceLocale,
    targetLocales: [...targetLocales].sort(),
    entries,
    glossary,
  })

  return createHash("sha256").update(JSON.stringify(payload)).digest("hex")
}

export function buildTranslationRequest({
  model,
  sourceLocale,
  targetLocales,
  glossary = {},
  entries,
}) {
  const systemPrompt = [
    "You are a precise website localization engine.",
    "Return only one valid JSON object.",
    "Keep every source entry ID unchanged at the root.",
    "For each ID, return an object with exactly the requested target locale keys.",
    "Preserve product names, URLs, Markdown, HTML tags, code identifiers, and placeholders.",
    "Translate directly from the source language into each target language.",
    `Prompt version: ${PROMPT_VERSION}.`,
  ].join(" ")

  return {
    path: "/chat/completions",
    body: {
      model,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: JSON.stringify({ sourceLocale, targetLocales, glossary, entries }),
        },
      ],
      response_format: { type: "json_object" },
    },
  }
}

export function parseTranslationResponse({ responseBody, entries, targetLocales }) {
  const content = responseBody?.choices?.[0]?.message?.content
  if (typeof content !== "string" || content.length === 0) {
    throw new Error("Translation response is missing choices[0].message.content")
  }

  let catalog
  try {
    catalog = JSON.parse(content)
  } catch {
    throw new Error("Translation response content is not valid JSON")
  }

  if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) {
    throw new Error("Translation response must be a JSON object")
  }

  const expectedIds = Object.keys(entries).sort()
  const actualIds = Object.keys(catalog).sort()
  if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) {
    throw new Error("Translation response IDs do not match source entry IDs")
  }

  const expectedLocales = [...targetLocales].sort()
  for (const id of expectedIds) {
    const translations = catalog[id]
    if (!translations || typeof translations !== "object" || Array.isArray(translations)) {
      throw new Error(`Translation entry ${id} must be an object`)
    }

    const actualLocales = Object.keys(translations).sort()
    if (JSON.stringify(actualLocales) !== JSON.stringify(expectedLocales)) {
      throw new Error(`Translation entry ${id} does not contain the requested locales`)
    }

    for (const locale of expectedLocales) {
      const value = translations[locale]
      if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`Translation entry ${id}.${locale} must be a non-empty string`)
      }

      const sourcePlaceholders = extractPlaceholders(entries[id])
      const translatedPlaceholders = extractPlaceholders(value)
      if (JSON.stringify(sourcePlaceholders) !== JSON.stringify(translatedPlaceholders)) {
        throw new Error(`Translation entry ${id}.${locale} does not preserve placeholders`)
      }
    }
  }

  return catalog
}

export async function translateCatalog({
  baseUrl,
  apiKey,
  model,
  sourceLocale,
  targetLocales,
  glossary = {},
  entries,
  fetchImpl = fetch,
  timeoutMs = 30_000,
  maxAttempts = 3,
  sleepImpl = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds)),
}) {
  const request = buildTranslationRequest({
    model,
    sourceLocale,
    targetLocales,
    glossary,
    entries,
  })
  const endpoint = `${baseUrl.replace(/\/+$/, "")}${request.path}`
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let response
    try {
      response = await fetchImpl(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request.body),
        signal: AbortSignal.timeout(timeoutMs),
      })
    } catch (error) {
      if (attempt === maxAttempts) {
        throw new Error("Translation API network request failed", { cause: error })
      }
      await sleepImpl(Math.min(8_000, 500 * 2 ** (attempt - 1)))
      continue
    }

    if (!response.ok) {
      const retryable =
        response.status === 408 ||
        response.status === 409 ||
        response.status === 429 ||
        response.status >= 500
      if (retryable && attempt < maxAttempts) {
        await sleepImpl(Math.min(8_000, 500 * 2 ** (attempt - 1)))
        continue
      }
      throw new Error(`Translation API request failed with HTTP ${response.status}`)
    }

    let responseBody
    try {
      responseBody = await response.json()
    } catch {
      throw new Error("Translation API response is not valid JSON")
    }

    return parseTranslationResponse({ responseBody, entries, targetLocales })
  }

  throw new Error("Translation API request exhausted all attempts")
}
