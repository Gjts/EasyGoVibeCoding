import assert from "node:assert/strict"
import { createServer } from "node:http"
import { once } from "node:events"
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

test("builds a compact chat-completions translation request", async () => {
  let translationClient = {}
  try {
    translationClient = await import("./translation-client.mjs")
  } catch {
    // The first TDD run intentionally reaches this branch.
  }

  assert.equal(typeof translationClient.buildTranslationRequest, "function")

  const request = translationClient.buildTranslationRequest({
    model: "gpt-5.4-mini",
    sourceLocale: "zh-CN",
    targetLocales: ["ja", "en", "fr", "de"],
    glossary: { EasyGoVibeCoding: "EasyGoVibeCoding", MCP: "MCP" },
    entries: {
      "home.tagline": "AI 编程工具不是魔法，是工程。",
    },
  })

  assert.equal(request.path, "/chat/completions")
  assert.equal(request.body.model, "gpt-5.4-mini")
  assert.deepEqual(request.body.response_format, { type: "json_object" })
  assert.equal(request.body.messages.length, 2)
  assert.match(request.body.messages[1].content, /home\.tagline/)
  assert.deepEqual(JSON.parse(request.body.messages[1].content).glossary, {
    EasyGoVibeCoding: "EasyGoVibeCoding",
    MCP: "MCP",
  })
  assert.doesNotMatch(JSON.stringify(request.body), /api[_ -]?key/i)
})

test("parses a complete translation catalog from chat completions", async () => {
  const { parseTranslationResponse } = await import("./translation-client.mjs")
  assert.equal(typeof parseTranslationResponse, "function")

  const catalog = {
    "home.tagline": {
      ja: "AI ツールは魔法ではなく、エンジニアリングです。",
      en: "AI tools are not magic; they are engineering.",
      fr: "Les outils d’IA ne sont pas magiques : ils relèvent de l’ingénierie.",
      de: "KI-Werkzeuge sind keine Magie, sondern Ingenieursarbeit.",
    },
  }

  const parsed = parseTranslationResponse({
    responseBody: {
      choices: [{ message: { content: JSON.stringify(catalog) } }],
    },
    entries: { "home.tagline": "AI 编程工具不是魔法，是工程。" },
    targetLocales: ["ja", "en", "fr", "de"],
  })

  assert.deepEqual(parsed, catalog)
})

test("rejects translations that drop source placeholders", async () => {
  const { parseTranslationResponse } = await import("./translation-client.mjs")

  assert.throws(
    () =>
      parseTranslationResponse({
        responseBody: {
          choices: [
            {
              message: {
                content: JSON.stringify({
                  greeting: {
                    ja: "こんにちは。",
                    en: "Hello.",
                    fr: "Bonjour.",
                    de: "Hallo.",
                  },
                }),
              },
            },
          ],
        },
        entries: { greeting: "你好，{name}。" },
        targetLocales: ["ja", "en", "fr", "de"],
      }),
    /placeholder/i,
  )
})

test("creates a stable content-addressed translation cache key", async () => {
  const { createTranslationCacheKey } = await import("./translation-client.mjs")
  assert.equal(typeof createTranslationCacheKey, "function")

  const common = {
    baseUrl: "https://translation.example/v1/",
    model: "gpt-5.4-mini",
    sourceLocale: "zh-CN",
    targetLocales: ["ja", "en", "fr", "de"],
  }
  const first = createTranslationCacheKey({
    ...common,
    entries: { second: "第二段", first: "第一段" },
  })
  const reordered = createTranslationCacheKey({
    ...common,
    entries: { first: "第一段", second: "第二段" },
  })
  const changed = createTranslationCacheKey({
    ...common,
    entries: { first: "第一段已更新", second: "第二段" },
  })

  assert.match(first, /^[a-f0-9]{64}$/)
  assert.equal(first, reordered)
  assert.notEqual(first, changed)
})

test("posts to the normalized chat-completions endpoint and parses the result", async (t) => {
  const { translateCatalog } = await import("./translation-client.mjs")
  assert.equal(typeof translateCatalog, "function")

  const requests = []
  const expectedCatalog = {
    title: {
      ja: "タイトル",
      en: "Title",
      fr: "Titre",
      de: "Titel",
    },
  }
  const server = createServer(async (request, response) => {
    let body = ""
    for await (const chunk of request) body += chunk
    requests.push({
      url: request.url,
      authorization: request.headers.authorization,
      body: JSON.parse(body),
    })
    response.writeHead(200, { "Content-Type": "application/json" })
    response.end(
      JSON.stringify({
        choices: [{ message: { content: JSON.stringify(expectedCatalog) } }],
      }),
    )
  })
  server.listen(0, "127.0.0.1")
  await once(server, "listening")
  t.after(() => server.close())

  const address = server.address()
  assert.notEqual(address, null)
  assert.equal(typeof address, "object")

  const result = await translateCatalog({
    baseUrl: `http://127.0.0.1:${address.port}/v1/`,
    apiKey: "test-secret",
    model: "gpt-5.4-mini",
    sourceLocale: "zh-CN",
    targetLocales: ["ja", "en", "fr", "de"],
    entries: { title: "标题" },
  })

  assert.deepEqual(result, expectedCatalog)
  assert.equal(requests.length, 1)
  assert.equal(requests[0].url, "/v1/chat/completions")
  assert.equal(requests[0].authorization, "Bearer test-secret")
  assert.equal(requests[0].body.model, "gpt-5.4-mini")
})

test("retries a transient HTTP failure before succeeding", async (t) => {
  const { translateCatalog } = await import("./translation-client.mjs")
  const delays = []
  let attempts = 0
  const catalog = {
    title: { ja: "題名", en: "Title", fr: "Titre", de: "Titel" },
  }
  const server = createServer(async (_request, response) => {
    attempts += 1
    if (attempts === 1) {
      response.writeHead(503, { "Content-Type": "application/json" })
      response.end(JSON.stringify({ error: { message: "temporarily unavailable" } }))
      return
    }

    response.writeHead(200, { "Content-Type": "application/json" })
    response.end(
      JSON.stringify({
        choices: [{ message: { content: JSON.stringify(catalog) } }],
      }),
    )
  })
  server.listen(0, "127.0.0.1")
  await once(server, "listening")
  t.after(() => server.close())

  const address = server.address()
  assert.notEqual(address, null)
  assert.equal(typeof address, "object")

  const result = await translateCatalog({
    baseUrl: `http://127.0.0.1:${address.port}/v1`,
    apiKey: "test-secret",
    model: "gpt-5.4-mini",
    sourceLocale: "zh-CN",
    targetLocales: ["ja", "en", "fr", "de"],
    entries: { title: "标题" },
    maxAttempts: 2,
    sleepImpl: async (milliseconds) => delays.push(milliseconds),
  })

  assert.deepEqual(result, catalog)
  assert.equal(attempts, 2)
  assert.deepEqual(delays, [500])
})

test("requires a private translation API key before network access", async () => {
  const { loadTranslationSettings } = await import("./translation-client.mjs")
  assert.equal(typeof loadTranslationSettings, "function")

  assert.throws(
    () =>
      loadTranslationSettings({
        TRANSLATION_API_BASE_URL: "https://translation.example/v1",
      }),
    /TRANSLATION_API_KEY/,
  )
})

test("persists and reads a translation cache entry atomically", async (t) => {
  let cacheModule = {}
  try {
    cacheModule = await import("./translation-cache.mjs")
  } catch {
    // The first TDD run intentionally reaches this branch.
  }
  assert.equal(typeof cacheModule.writeTranslationCache, "function")
  assert.equal(typeof cacheModule.readTranslationCache, "function")

  const cacheDir = await mkdtemp(join(tmpdir(), "egvc-i18n-"))
  t.after(() => rm(cacheDir, { recursive: true, force: true }))
  const key = "a".repeat(64)
  const catalog = {
    title: { ja: "題名", en: "Title", fr: "Titre", de: "Titel" },
  }

  await cacheModule.writeTranslationCache({ cacheDir, key, catalog })
  const restored = await cacheModule.readTranslationCache({ cacheDir, key })
  const files = await readdir(cacheDir)

  assert.deepEqual(restored, catalog)
  assert.deepEqual(files, [`${key}.json`])
})

test("splits a translated catalog into locale message files", async () => {
  let catalogModule = {}
  try {
    catalogModule = await import("./translation-catalog.mjs")
  } catch {
    // The first TDD run intentionally reaches this branch.
  }
  assert.equal(typeof catalogModule.splitCatalogByLocale, "function")

  const split = catalogModule.splitCatalogByLocale({
    catalog: {
      title: { ja: "題名", en: "Title", fr: "Titre", de: "Titel" },
      cta: { ja: "始める", en: "Start", fr: "Commencer", de: "Starten" },
    },
    targetLocales: ["ja", "en", "fr", "de"],
  })

  assert.deepEqual(split.en, { title: "Title", cta: "Start" })
  assert.deepEqual(split.ja, { title: "題名", cta: "始める" })
})

test("validates a source catalog before translation", async () => {
  const { validateSourceCatalog } = await import("./translation-catalog.mjs")
  assert.equal(typeof validateSourceCatalog, "function")

  const source = {
    sourceLocale: "zh-CN",
    targetLocales: ["ja", "en", "fr", "de"],
    entries: { title: "标题", cta: "开始学习" },
  }

  assert.deepEqual(validateSourceCatalog(source), source)
  assert.throws(
    () => validateSourceCatalog({ ...source, entries: { title: "" } }),
    /non-empty string/i,
  )
})

test("translates a source file once and reuses its cache", async (t) => {
  let runnerModule = {}
  try {
    runnerModule = await import("./translate-catalog.mjs")
  } catch {
    // The first TDD run intentionally reaches this branch.
  }
  assert.equal(typeof runnerModule.translateCatalogFile, "function")

  const root = await mkdtemp(join(tmpdir(), "egvc-i18n-run-"))
  t.after(() => rm(root, { recursive: true, force: true }))
  const inputPath = join(root, "source.json")
  const outputDir = join(root, "messages")
  const cacheDir = join(root, "cache")
  await writeFile(
    inputPath,
    JSON.stringify({
      sourceLocale: "zh-CN",
      targetLocales: ["ja", "en", "fr", "de"],
      entries: { title: "标题" },
    }),
    "utf8",
  )

  let attempts = 0
  const catalog = {
    title: { ja: "題名", en: "Title", fr: "Titre", de: "Titel" },
  }
  const server = createServer(async (_request, response) => {
    attempts += 1
    response.writeHead(200, { "Content-Type": "application/json" })
    response.end(
      JSON.stringify({
        choices: [{ message: { content: JSON.stringify(catalog) } }],
      }),
    )
  })
  server.listen(0, "127.0.0.1")
  await once(server, "listening")
  t.after(() => server.close())
  const address = server.address()
  assert.notEqual(address, null)
  assert.equal(typeof address, "object")

  const options = {
    inputPath,
    outputDir,
    cacheDir,
    settings: {
      baseUrl: `http://127.0.0.1:${address.port}/v1`,
      apiKey: "test-secret",
      model: "gpt-5.4-mini",
    },
  }
  const first = await runnerModule.translateCatalogFile(options)
  const second = await runnerModule.translateCatalogFile(options)
  const english = JSON.parse(await readFile(join(outputDir, "en.json"), "utf8"))

  assert.equal(first.cacheHit, false)
  assert.equal(second.cacheHit, true)
  assert.equal(attempts, 1)
  assert.deepEqual(english, { title: "Title" })
})
