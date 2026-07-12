import assert from "node:assert/strict"
import test from "node:test"

import { SUPER_INDIVIDUAL_STAGES } from "../../lib/super-individual/curriculum.ts"
import { buildLaunchReport } from "../../lib/super-individual/report.ts"
import { TOOL_CATALOG } from "../../lib/super-individual/tool-catalog.ts"
import { emptyWorkspace } from "../../lib/super-individual/workspace.ts"

function workspaceFixture() {
  const workspace = emptyWorkspace()
  workspace.profile = {
    version: 1,
    locale: "zh-CN",
    region: "CN",
    entityType: "cn-individual",
    productType: "saas",
    billingModel: "subscription",
    skillLevel: "beginner",
    monthlyBudget: "under-25",
    targetMarkets: ["GLOBAL"],
    needs: ["payments"],
    dataSensitivity: "normal",
    updatedAt: Date.UTC(2026, 6, 12),
  }
  workspace.stageAnswers.discover = {
    audience: "独立开发者",
    api_key: "must-not-leak",
    accessToken: "also-private",
    password: "private",
  }
  workspace.stageStatus.discover = "complete"
  workspace.artifacts.discover = "已验证的需求机会"
  workspace.recommendations.discover = [
    {
      toolId: "google-trends",
      rank: "default",
      reasons: ["用于寻找需求信号"],
      warnings: ["趋势不是购买证据"],
      requiresOfficialCheck: false,
    },
  ]
  return workspace
}

test("launch report preserves all ten stages in curriculum order", () => {
  const report = buildLaunchReport(workspaceFixture(), TOOL_CATALOG, new Date("2026-07-12T10:00:00Z"))
  assert.deepEqual(
    report.stages.map(({ title }) => title),
    SUPER_INDIVIDUAL_STAGES.map(({ title }) => title),
  )
  assert.equal(report.stages[0].status, "complete")
  assert.equal(report.stages[1].status, "not-started")
})

test("launch report includes official sources and verification dates", () => {
  const report = buildLaunchReport(workspaceFixture(), TOOL_CATALOG, new Date("2026-07-12T10:00:00Z"))
  const tool = report.stages[0].tools[0]
  assert.ok(tool.sources.some(({ url }) => url.startsWith("https://")))
  assert.match(tool.lastVerifiedAt, /^\d{4}-\d{2}-\d{2}$/)
})

test("launch report excludes arbitrary secret-shaped answer fields", () => {
  const serialized = JSON.stringify(buildLaunchReport(workspaceFixture(), TOOL_CATALOG))
  assert.doesNotMatch(serialized, /api[_-]?key|token|password|must-not-leak|also-private|private/i)
})
