import { SUPER_INDIVIDUAL_STAGES } from "./curriculum.ts"
import { getProfileWarnings } from "./decision-engine.ts"
import type {
  SuperIndividualStageId,
  SuperIndividualWorkspace,
  ToolCatalogItem,
  ToolSource,
} from "./types.ts"

export interface LaunchReportTool {
  name: string
  reasons: string[]
  warnings: string[]
  sources: ToolSource[]
  lastVerifiedAt: string
}

export interface LaunchReport {
  generatedAt: string
  profileSummary: Array<{ label: string; value: string }>
  stages: Array<{
    id: SuperIndividualStageId
    title: string
    status: "complete" | "in-progress" | "not-started"
    artifact: string
    tools: LaunchReportTool[]
  }>
  globalWarnings: string[]
}

function summarizeProfile(
  workspace: SuperIndividualWorkspace,
): LaunchReport["profileSummary"] {
  const profile = workspace.profile
  if (!profile) return []
  return [
    { label: "地区", value: profile.region },
    { label: "经营主体", value: profile.entityType },
    { label: "产品类型", value: profile.productType },
    { label: "收费方式", value: profile.billingModel },
    { label: "技能水平", value: profile.skillLevel },
    { label: "月度预算", value: profile.monthlyBudget },
    { label: "目标市场", value: profile.targetMarkets.join("、") || "未填写" },
    { label: "数据敏感度", value: profile.dataSensitivity },
  ]
}

export function buildLaunchReport(
  workspace: SuperIndividualWorkspace,
  catalog: readonly ToolCatalogItem[],
  now = new Date(),
): LaunchReport {
  const toolsById = new Map(catalog.map((item) => [item.id, item]))

  return {
    generatedAt: now.toISOString(),
    profileSummary: summarizeProfile(workspace),
    stages: SUPER_INDIVIDUAL_STAGES.map((stage) => ({
      id: stage.id,
      title: stage.title,
      status: workspace.stageStatus[stage.id],
      artifact: workspace.artifacts[stage.id]?.trim() || "尚未生成",
      tools: (workspace.recommendations[stage.id] ?? []).flatMap((recommendation) => {
        const item = toolsById.get(recommendation.toolId)
        if (!item) return []
        return [{
          name: item.name,
          reasons: [...recommendation.reasons],
          warnings: [...recommendation.warnings],
          sources: item.sources.map((source) => ({ ...source })),
          lastVerifiedAt: item.lastVerifiedAt,
        }]
      }),
    })),
    globalWarnings: workspace.profile ? getProfileWarnings(workspace.profile) : [],
  }
}
