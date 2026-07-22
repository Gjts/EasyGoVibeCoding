import test from "node:test"
import assert from "node:assert/strict"

import { reconcileModelPayload } from "../../lib/model-reconciliation.ts"

function model({
  provider,
  name,
  releaseDate,
  tier = 1,
  dateKind = "catalog-observed",
}) {
  return {
    provider,
    name,
    releaseDate,
    dateKind,
    contextWindow: "1M",
    highlights: [`${name} highlight`],
    tier,
    url: `https://example.com/${encodeURIComponent(name)}`,
    category: "model",
    tags: [provider],
    description: `${name} description`,
  }
}

function payload({ source, models, news = [], releases = [] }) {
  return {
    updatedAt: "2026-07-12T12:01:00.000Z",
    source,
    models,
    news,
    releases,
  }
}

const verifiedSeed = payload({
  source: "seed-official-verified-2026-07-10",
  models: [
    model({
      provider: "Anthropic",
      name: "Claude Fable 5",
      releaseDate: "2026-06-09",
      dateKind: "official-release",
    }),
    model({
      provider: "OpenAI",
      name: "GPT-5.6 Sol",
      releaseDate: "2026-07-09",
      dateKind: "official-release",
    }),
    model({
      provider: "xAI",
      name: "Grok 4.5",
      releaseDate: "2026-07-16",
      dateKind: "official-release",
    }),
    model({
      provider: "Google",
      name: "Gemini 3.5 Flash",
      releaseDate: "2026-06-23",
      dateKind: "official-release",
    }),
  ],
  news: [
    {
      date: "2026-07-09",
      provider: "OpenAI",
      title: "GPT-5.6 Sol / Terra / Luna 发布",
      summary: "OpenAI 已正式发布 GPT-5.6 系列。",
      url: "https://openai.com/index/gpt-5-6/",
    },
  ],
})

test("keeps the verified GPT-5.6 flagship ahead of a stale runtime catalog", () => {
  const runtime = payload({
    source: "openrouter-catalog",
    models: [
      model({
        provider: "Anthropic",
        name: "Claude Fable 5",
        releaseDate: "2026-06-09",
      }),
      model({
        provider: "OpenAI",
        name: "GPT-5.5",
        releaseDate: "2026-04-23",
      }),
      model({
        provider: "Google",
        name: "Gemini 3.5 Flash",
        releaseDate: "2026-06-23",
      }),
      model({
        provider: "Zhipu",
        name: "GLM 4.7 Flash",
        releaseDate: "2026-01-01",
        tier: 3,
      }),
    ],
  })

  const result = reconcileModelPayload(runtime, verifiedSeed)
  const topFour = result.models
    .filter((entry) => entry.tier === 1)
    .slice(0, 4)
    .map((entry) => entry.name)

  assert.deepEqual(topFour, [
    "Claude Fable 5",
    "GPT-5.6 Sol",
    "Grok 4.5",
    "Gemini 3.5 Flash",
  ])
  assert.ok(result.models.some((entry) => entry.name === "GLM 4.7 Flash"))
  assert.equal(
    result.models.filter((entry) => entry.name === "GPT-5.6 Sol").length,
    1,
  )
  assert.equal(result.news[0]?.title, "GPT-5.6 Sol / Terra / Luna 发布")
  assert.equal(result.source, "openrouter-catalog+official-verified")
})

test("lets a newer officially verified runtime flagship supersede the seed", () => {
  const runtime = payload({
    source: "openrouter-catalog+openai-official",
    models: [
      model({
        provider: "OpenAI",
        name: "GPT-5.7 Sol",
        releaseDate: "2026-08-01",
        dateKind: "official-release",
      }),
    ],
  })

  const result = reconcileModelPayload(runtime, verifiedSeed)
  const openAiFlagship = result.models.find(
    (entry) => entry.provider === "OpenAI" && entry.tier === 1,
  )

  assert.equal(openAiFlagship?.name, "GPT-5.7 Sol")
})

test("lets a newer catalog release refresh a watched provider", () => {
  const runtime = payload({
    source: "openrouter-catalog",
    models: [
      model({
        provider: "Google",
        name: "Gemini 3.6 Flash",
        releaseDate: "2026-07-21",
        dateKind: "catalog-observed",
      }),
    ],
  })

  const result = reconcileModelPayload(runtime, verifiedSeed)
  const googleFlagship = result.models.find(
    (entry) => entry.provider === "Google" && entry.tier === 1,
  )

  assert.equal(googleFlagship?.name, "Gemini 3.6 Flash")
})

test("keeps the latest officially verified xAI flagship in third place", () => {
  const runtime = payload({
    source: "openrouter-catalog",
    models: [
      model({
        provider: "xAI",
        name: "Grok 4.6",
        releaseDate: "2026-08-01",
        dateKind: "official-release",
      }),
    ],
  })

  const result = reconcileModelPayload(runtime, verifiedSeed)
  const topFour = result.models
    .filter((entry) => entry.tier === 1)
    .slice(0, 4)
    .map((entry) => entry.name)

  assert.deepEqual(topFour, [
    "Claude Fable 5",
    "GPT-5.6 Sol",
    "Grok 4.6",
    "Gemini 3.5 Flash",
  ])
})

test("does not promote an unverified claim above an official seed flagship", () => {
  const runtime = payload({
    source: "openrouter-catalog",
    models: [
      model({
        provider: "OpenAI",
        name: "GPT-5.7 Rumor",
        releaseDate: "2026-08-01",
        dateKind: "unverified",
      }),
    ],
  })

  const result = reconcileModelPayload(runtime, verifiedSeed)
  const openAiFlagship = result.models.find(
    (entry) => entry.provider === "OpenAI" && entry.tier === 1,
  )

  assert.equal(openAiFlagship?.name, "GPT-5.6 Sol")
})

test("repairs an equal official runtime entry that demotes the verified flagship", () => {
  const runtime = payload({
    source: "openrouter-catalog+openai-official",
    models: [
      model({
        provider: "OpenAI",
        name: "GPT-5.5",
        releaseDate: "2026-04-23",
        dateKind: "official-release",
      }),
      model({
        provider: "OpenAI",
        name: "GPT-5.6 Sol",
        releaseDate: "2026-07-09",
        dateKind: "official-release",
        tier: 2,
      }),
    ],
  })

  const result = reconcileModelPayload(runtime, verifiedSeed)
  const openAiFlagship = result.models.find(
    (entry) => entry.provider === "OpenAI" && entry.tier === 1,
  )

  assert.equal(openAiFlagship?.name, "GPT-5.6 Sol")
})
