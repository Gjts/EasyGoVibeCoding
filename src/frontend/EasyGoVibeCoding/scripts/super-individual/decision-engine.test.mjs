import test from "node:test"
import assert from "node:assert/strict"

import { TOOL_CATALOG } from "../../lib/super-individual/tool-catalog.ts"
import {
  getProfileWarnings,
  recommendTools,
} from "../../lib/super-individual/decision-engine.ts"

function profile(overrides = {}) {
  return {
    version: 1,
    locale: "zh-CN",
    region: "CN",
    entityType: "cn-individual",
    productType: "saas",
    billingModel: "subscription",
    skillLevel: "intermediate",
    monthlyBudget: "under-25",
    targetMarkets: ["US"],
    needs: ["database", "auth", "payments"],
    dataSensitivity: "normal",
    updatedAt: 0,
    ...overrides,
  }
}

function idsByRank(recommendations, rank) {
  return recommendations
    .filter((recommendation) => recommendation.rank === rank)
    .map((recommendation) => recommendation.toolId)
}

test("mainland individual receives MoR candidates and no direct Stripe default", () => {
  const recommendations = recommendTools(
    profile(),
    "payments",
    TOOL_CATALOG,
    new Date("2026-07-12T00:00:00Z"),
  )
  assert.ok(idsByRank(recommendations, "default").includes("paddle"))
  assert.ok(!idsByRank(recommendations, "default").includes("stripe"))
  assert.ok(recommendations.every((item) => item.requiresOfficialCheck))
})

test("Hong Kong company can receive Stripe with Paddle and Wise alternatives", () => {
  const recommendations = recommendTools(
    profile({ entityType: "hk-company", region: "HK" }),
    "payments",
    TOOL_CATALOG,
    new Date("2026-07-12T00:00:00Z"),
  )
  assert.ok(idsByRank(recommendations, "default").includes("stripe"))
  const allIds = recommendations.map((item) => item.toolId)
  assert.ok(allIds.includes("paddle"))
  assert.ok(allIds.includes("wise-business"))
})

test("sensitive data adds a backend security warning", () => {
  const warnings = getProfileWarnings(
    profile({ dataSensitivity: "sensitive" }),
  )
  assert.ok(warnings.some((warning) => warning.includes("敏感数据")))
})

test("stale payment data requires a new official check", () => {
  const recommendations = recommendTools(
    profile({ entityType: "hk-company", region: "HK" }),
    "payments",
    TOOL_CATALOG,
    new Date("2026-09-01T00:00:00Z"),
  )
  assert.ok(recommendations.every((item) => item.requiresOfficialCheck))
  assert.ok(
    recommendations.some((item) =>
      item.warnings.some((warning) => warning.includes("超过核验周期")),
    ),
  )
})
