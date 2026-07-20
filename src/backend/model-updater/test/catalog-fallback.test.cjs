const assert = require("node:assert/strict")
const { afterEach, test } = require("node:test")

const {
  OpenRouterProvider,
} = require("../.test-dist/backend/model-updater/src/providers/openrouter.js")
const {
  runUpdate,
} = require("../.test-dist/backend/model-updater/src/updater.js")
const {
  fetchOpenAiReleases,
  parseOpenAiNewsRss,
} = require("../.test-dist/backend/model-updater/src/providers/openai-releases.js")
const {
  ModelsPayloadSchema,
} = require("../.test-dist/frontend/EasyGoVibeCoding/lib/model-schema.js")

const originalFetch = global.fetch

afterEach(() => {
  global.fetch = originalFetch
})

test("catalog fallback promotes the newest OpenAI flagship", async () => {
  global.fetch = createFetchStub()

  const result = await OpenRouterProvider.fetchPayload(
    { OPENROUTER_API_KEY: "test-key" },
    {
      previousPayload: null,
      nowISO: "2026-07-10T00:00:00.000Z",
      providerSource: "openrouter-test",
    },
  )
  const payload = result.parsedJson
  const openAiFlagship = payload.models.find(
    (model) => model.provider === "OpenAI",
  )
  const topProviders = payload.models
    .filter((model) => model.tier === 1)
    .slice(0, 4)
    .map((model) => model.provider)
  const xAiFlagship = payload.models.find(
    (model) => model.provider === "xAI",
  )

  assert.equal(openAiFlagship?.name, "GPT-5.6 Sol")
  assert.equal(openAiFlagship?.releaseDate, "2026-07-09")
  assert.equal(
    openAiFlagship?.url,
    "https://developers.openai.com/api/docs/models/gpt-5.6-sol",
  )
  assert.deepEqual(topProviders, ["Anthropic", "OpenAI", "xAI", "Google"])
  assert.equal(xAiFlagship?.name, "Grok 4.5")
})

test("catalog fallback exposes recent releases beyond the current shortlist", async () => {
  global.fetch = createFetchStub()

  const result = await OpenRouterProvider.fetchPayload(
    { OPENROUTER_API_KEY: "test-key" },
    {
      previousPayload: null,
      nowISO: "2026-07-10T00:00:00.000Z",
      providerSource: "openrouter-test",
    },
  )
  const payload = result.parsedJson

  assert.ok(Array.isArray(payload.releases))
  assert.ok(payload.releases.length > payload.models.length)
  assert.ok(payload.releases.some((model) => model.name === "GPT-5.5"))
  assert.ok(payload.releases.some((model) => model.name === "GPT-5.6 Sol"))
  assert.equal(
    payload.releases.filter((model) => model.name.startsWith("GPT-5.6 Sol"))
      .length,
    1,
  )
  assert.equal(
    payload.releases.find((model) => model.name === "GPT-5.6 Sol")
      ?.dateKind,
    "official-release",
  )
  assert.equal(
    payload.releases.find((model) => model.name === "Claude Fable 5")
      ?.dateKind,
    "catalog-observed",
  )
})

test("official RSS keeps base and specialized model dates separate", () => {
  const releases = parseOpenAiNewsRss(openAiNewsFixture())

  assert.equal(releases.get("gpt-5.2")?.releaseDate, "2025-12-11")
  assert.equal(releases.get("gpt-5.2-codex")?.releaseDate, "2025-12-18")
  assert.equal(releases.get("gpt-5.3-codex-spark")?.releaseDate, "2026-02-12")
  assert.equal(releases.get("gpt-5.3-instant")?.releaseDate, "2026-03-03")
  assert.equal(releases.has("gpt-4"), false)
  assert.equal(releases.get("gpt-4o-mini")?.releaseDate, "2024-07-18")
})

test("official RSS fetch is bounded by an abort signal", async () => {
  let receivedSignal
  global.fetch = async (_input, init) => {
    receivedSignal = init?.signal
    throw new Error("stop after inspecting request")
  }

  const releases = await fetchOpenAiReleases()

  assert.ok(receivedSignal instanceof AbortSignal)
  assert.equal(releases.size, 0)
})

test("legacy catalog payloads remain catalog observations after migration", () => {
  const parsed = ModelsPayloadSchema.parse({
    updatedAt: "2026-07-10T00:00:00.000Z",
    source: "openrouter-catalog",
    models: [modelEntry("OpenAI", "GPT-5.5", "2026-04-24")],
    news: [],
  })

  assert.equal(parsed.models[0].dateKind, "catalog-observed")
})

test("missing provenance stays unverified unless the payload source is trusted", () => {
  const generated = ModelsPayloadSchema.parse({
    updatedAt: "2026-07-10T00:00:00.000Z",
    source: "openrouter-test",
    models: [modelEntry("OpenAI", "GPT-5.6 Sol", "2026-07-09")],
    news: [],
  })
  const seed = ModelsPayloadSchema.parse({
    updatedAt: "2026-07-10T00:00:00.000Z",
    source: "seed-official-verified-2026-07-10",
    models: [modelEntry("OpenAI", "GPT-5.6 Sol", "2026-07-09")],
    news: [],
  })

  assert.equal(generated.models[0].dateKind, "unverified")
  assert.equal(seed.models[0].dateKind, "official-release")
})

test("updater keeps earlier releases when the current catalog changes", async () => {
  global.fetch = createFetchStub()
  const previous = {
    updatedAt: "2026-01-01T00:00:00.000Z",
    source: "previous-test",
    models: [modelEntry("OpenAI", "GPT-5.2", "2025-12-11")],
    news: [],
  }
  const kv = createMemoryKv({ "models:latest": JSON.stringify(previous) })

  const outcome = await runUpdate({
    SITE_STATS_KV: kv,
    LLM_PROVIDER: "openrouter",
    OPENROUTER_API_KEY: "test-key",
  })
  const stored = JSON.parse(await kv.get("models:latest"))

  assert.equal(outcome.status, "updated")
  assert.ok(stored.releases.some((item) => item.name === "GPT-5.2"))
  assert.ok(stored.releases.some((item) => item.name === "GPT-5.6 Sol"))
})

test("updater retries one transient provider failure", async () => {
  const { fetchStub, catalogRequests } = createRetryingFetchStub()
  global.fetch = fetchStub
  const kv = createMemoryKv({})

  const outcome = await runUpdate({
    SITE_STATS_KV: kv,
    LLM_PROVIDER: "openrouter",
    OPENROUTER_API_KEY: "test-key",
  })

  assert.equal(outcome.status, "updated")
  assert.equal(catalogRequests.count, 2)
  assert.ok(await kv.get("models:latest"))
})

test("OpenRouter chat requests ground discovery on official domains", async () => {
  const requestBodies = []
  global.fetch = createSuccessfulChatFetchStub(requestBodies)

  const result = await OpenRouterProvider.fetchPayload(
    { OPENROUTER_API_KEY: "test-key" },
    {
      previousPayload: null,
      nowISO: "2026-07-10T00:00:00.000Z",
      providerSource: "openrouter-test",
    },
  )

  const webPlugin = requestBodies[0]?.plugins?.find(
    (plugin) => plugin.id === "web",
  )
  assert.ok(webPlugin)
  assert.ok(webPlugin.include_domains.includes("openai.com"))
  assert.ok(webPlugin.include_domains.includes("developers.openai.com"))
  assert.ok(Array.isArray(result.parsedJson.releases))
  assert.ok(result.parsedJson.releases.some((item) => item.name === "GPT-5.6 Sol"))
})

test("updater ignores provider payloads that forge a trusted source", async () => {
  global.fetch = createSuccessfulChatFetchStub([], {
    updatedAt: "2026-07-10T00:00:00.000Z",
    source: "seed-forged-by-model",
    models: [modelEntry("OpenAI", "Unverified Candidate", "2026-07-09")],
    news: [],
  })
  const kv = createMemoryKv({})

  const outcome = await runUpdate({
    SITE_STATS_KV: kv,
    LLM_PROVIDER: "openrouter",
    OPENROUTER_API_KEY: "test-key",
  })
  const stored = JSON.parse(await kv.get("models:latest"))

  assert.equal(outcome.status, "updated")
  assert.match(stored.source, /^openrouter-/)
  assert.equal(stored.models[0].dateKind, "unverified")
})

test("updater prefers official releases and balances flagship providers", async () => {
  const requestBodies = []
  const payload = {
    updatedAt: "2026-07-10T00:00:00.000Z",
    source: "openrouter-test",
    models: [
      modelEntry("OpenAI", "GPT Alpha", "2026-07-09", { tier: 1 }),
      modelEntry("OpenAI", "GPT Beta", "2026-07-08", { tier: 1 }),
      modelEntry("OpenAI", "GPT Gamma", "2026-07-07", { tier: 1 }),
      modelEntry("Anthropic", "Claude Fable 5", "2026-06-09", { tier: 1 }),
      modelEntry("xAI", "Grok 4.5", "2026-07-16", { tier: 1 }),
      modelEntry("Google", "Gemini Pro", "2026-06-01", { tier: 1 }),
    ],
    releases: [
      modelEntry("Anthropic", "Claude Fable 5", "2026-06-10", {
        dateKind: "official-release",
        tier: 1,
        url: "https://www.anthropic.com/news/claude-fable-5",
      }),
    ],
    news: [],
  }
  global.fetch = createSuccessfulChatFetchStub(requestBodies, payload)
  const kv = createMemoryKv({})

  const outcome = await runUpdate({
    SITE_STATS_KV: kv,
    LLM_PROVIDER: "openrouter",
    OPENROUTER_API_KEY: "test-key",
  })
  const stored = JSON.parse(await kv.get("models:latest"))
  const topProviders = stored.models
    .filter((item) => item.tier === 1)
    .slice(0, 4)
    .map((item) => item.provider)
  const anthropicRelease = stored.releases.find(
    (item) => item.provider === "Anthropic" && item.name === "Claude Fable 5",
  )

  assert.equal(outcome.status, "updated")
  assert.deepEqual(topProviders, ["Anthropic", "OpenAI", "xAI", "Google"])
  assert.equal(anthropicRelease.releaseDate, "2026-06-10")
  assert.equal(
    anthropicRelease.url,
    "https://www.anthropic.com/news/claude-fable-5",
  )
})

function createFetchStub() {
  const catalog = [
    model("anthropic/claude-fable-5", "Anthropic: Claude Fable 5", "2026-06-09", "Anthropic frontier reasoning model"),
    model("openai/gpt-5.5", "OpenAI: GPT-5.5", "2026-04-24", "OpenAI frontier model for professional work"),
    model("google/gemini-3.5-flash", "Google: Gemini 3.5 Flash", "2026-05-19", "Google efficient multimodal coding model"),
    model("anthropic/claude-opus-4.8", "Anthropic: Claude Opus 4.8", "2026-05-27", "Anthropic capable Opus reasoning model"),
    model("anthropic/claude-sonnet-5", "Anthropic: Claude Sonnet 5", "2026-06-30", "Anthropic frontier coding and agent model"),
    model("openai/gpt-5.6-sol-pro", "OpenAI: GPT-5.6 Sol Pro", "2026-07-10", "OpenAI frontier model using a higher-compute route"),
    model("openai/gpt-5.6-sol", "OpenAI: GPT-5.6 Sol", "2026-07-10", "OpenAI frontier model for complex professional work"),
    model("openai/gpt-5.6-terra", "OpenAI: GPT-5.6 Terra", "2026-07-10", "OpenAI balanced intelligence and cost model"),
    model("openai/gpt-5.6-luna", "OpenAI: GPT-5.6 Luna", "2026-07-10", "OpenAI efficient high-volume model"),
    model("x-ai/grok-4.5", "xAI: Grok 4.5", "2026-07-08", "xAI advanced reasoning model"),
    model("deepseek/deepseek-v4", "DeepSeek: DeepSeek V4", "2026-04-24", "DeepSeek reasoning and coding model"),
    model("qwen/qwen3-max", "Qwen: Qwen3 Max", "2026-04-08", "Alibaba flagship model"),
    model("z-ai/glm-4.7-flash", "Z.ai: GLM 4.7 Flash", "2026-01-19", "Efficient coding model"),
  ]

  return async (input) => {
    const url = String(input)
    if (url === "https://openrouter.ai/api/v1/models") {
      return Response.json({ data: catalog })
    }
    if (url === "https://developers.openai.com/api/docs/changelog") {
      return new Response("blocked", { status: 403 })
    }
    if (url === "https://openai.com/news/rss.xml") {
      return new Response(openAiNewsFixture(), {
        headers: { "content-type": "text/xml" },
      })
    }
    return new Response("provider unavailable", { status: 503 })
  }
}

function createRetryingFetchStub() {
  const catalogRequests = { count: 0 }
  const fallback = createFetchStub()
  return {
    catalogRequests,
    async fetchStub(input, init) {
      const url = String(input)
      if (url === "https://openrouter.ai/api/v1/models") {
        catalogRequests.count += 1
        if (catalogRequests.count === 1) {
          return new Response("temporary failure", { status: 503 })
        }
      }
      return fallback(input, init)
    },
  }
}

function createSuccessfulChatFetchStub(requestBodies, responsePayload) {
  const fallback = createFetchStub()
  return async (input, init) => {
    const url = String(input)
    if (url !== "https://openrouter.ai/api/v1/chat/completions") {
      return fallback(input, init)
    }

    requestBodies.push(JSON.parse(init.body))
    return Response.json({
      choices: [
        {
          message: {
            content: JSON.stringify({
              ...(responsePayload || {
                updatedAt: "2026-07-10T00:00:00.000Z",
                source: "openrouter-test",
                models: [modelEntry("OpenAI", "GPT-5.6 Sol", "2026-07-09")],
                news: [],
              }),
            }),
          },
        },
      ],
    })
  }
}

function model(id, name, date, description) {
  return {
    id,
    name,
    created: Math.floor(Date.parse(`${date}T00:00:00.000Z`) / 1000),
    description,
    context_length: 1_000_000,
    pricing: { prompt: "0.000005", completion: "0.00002" },
    architecture: {
      input_modalities: ["text", "image"],
      output_modalities: ["text"],
    },
  }
}

function openAiNewsFixture() {
  return [
    '<?xml version="1.0"?><rss><channel>',
    '<item><title><![CDATA[GPT-5.6 is now the preferred model in Microsoft 365 Copilot]]></title>',
    '<link>https://openai.com/index/gpt-5-6-preferred-model-microsoft-365-copilot</link>',
    '<category><![CDATA[Product]]></category><pubDate>Thu, 09 Jul 2026 13:00:00 GMT</pubDate></item>',
    '<item><title><![CDATA[GPT-5.6: Frontier intelligence that scales with your ambition]]></title>',
    '<link>https://openai.com/index/gpt-5-6</link>',
    '<category><![CDATA[Product]]></category><pubDate>Thu, 09 Jul 2026 10:00:00 GMT</pubDate></item>',
    '<item><title><![CDATA[Introducing GPT-5.3-Codex-Spark]]></title>',
    '<link>https://openai.com/index/introducing-gpt-5-3-codex-spark</link>',
    '<category><![CDATA[Product]]></category><pubDate>Thu, 12 Feb 2026 10:00:00 GMT</pubDate></item>',
    '<item><title><![CDATA[GPT-5.3 Instant: Smoother conversations]]></title>',
    '<link>https://openai.com/index/gpt-5-3-instant</link>',
    '<category><![CDATA[Product]]></category><pubDate>Tue, 03 Mar 2026 10:00:00 GMT</pubDate></item>',
    '<item><title><![CDATA[Introducing GPT-5.2-Codex]]></title>',
    '<link>https://openai.com/index/introducing-gpt-5-2-codex</link>',
    '<category><![CDATA[Product]]></category><pubDate>Thu, 18 Dec 2025 00:00:00 GMT</pubDate></item>',
    '<item><title><![CDATA[Introducing GPT-5.2]]></title>',
    '<link>https://openai.com/index/introducing-gpt-5-2</link>',
    '<category><![CDATA[Product]]></category><pubDate>Thu, 11 Dec 2025 00:00:00 GMT</pubDate></item>',
    '<item><title><![CDATA[GPT-4o mini: advancing cost-efficient intelligence]]></title>',
    '<link>https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence</link>',
    '<category><![CDATA[Product]]></category><pubDate>Thu, 18 Jul 2024 10:00:00 GMT</pubDate></item>',
    '</channel></rss>',
  ].join("")
}

function modelEntry(provider, name, releaseDate, options = {}) {
  return {
    provider,
    name,
    releaseDate,
    ...(options.dateKind ? { dateKind: options.dateKind } : {}),
    contextWindow: "unknown",
    highlights: ["Historical release"],
    tier: options.tier ?? 2,
    url: options.url ?? "https://example.com/model",
    category: "model",
    tags: [provider],
    description: "Historical model release",
  }
}

function createMemoryKv(initial) {
  const values = new Map(Object.entries(initial))
  return {
    async get(key) {
      return values.get(key) ?? null
    },
    async put(key, value) {
      values.set(key, value)
    },
    async delete(key) {
      values.delete(key)
    },
    async list({ prefix } = {}) {
      return {
        keys: [...values.keys()]
          .filter((name) => !prefix || name.startsWith(prefix))
          .map((name) => ({ name })),
      }
    },
  }
}
