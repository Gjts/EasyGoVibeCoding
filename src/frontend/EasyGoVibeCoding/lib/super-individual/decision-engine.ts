import { isToolEntryStale } from "./tool-catalog-schema.ts"
import type {
  SuperIndividualProfile,
  SuperIndividualStageId,
  ToolCatalogItem,
  ToolRecommendation,
} from "./types.ts"

const PREFERRED_BY_STAGE: Record<SuperIndividualStageId, string[]> = {
  discover: ["google-trends", "product-hunt"],
  validate: ["tally", "calendly"],
  mvp: ["figma", "github"],
  build: ["github", "codex"],
  backend: ["supabase"],
  deploy: ["cloudflare-pages"],
  payments: [],
  analytics: ["posthog", "sentry"],
  automation: ["resend", "n8n"],
  iterate: ["posthog", "product-hunt"],
}

function matchesList(value: string, allowed: readonly string[], wildcard: string): boolean {
  return allowed.includes(wildcard) || allowed.includes(value)
}

function isEligible(
  item: ToolCatalogItem,
  profile: SuperIndividualProfile,
  stageId: SuperIndividualStageId,
): boolean {
  if (item.status === "retired" || !item.stageIds.includes(stageId)) return false
  if (!matchesList(profile.entityType, item.entityTypes, "any")) return false
  if (
    !item.regions.includes("GLOBAL") &&
    !item.regions.includes("SUPPORTED") &&
    !item.regions.includes(profile.region)
  ) {
    return false
  }
  if (!matchesList(profile.productType, item.productTypes, "any")) return false
  return matchesList(profile.skillLevel, item.skillLevels, "any")
}

function paymentPreference(profile: SuperIndividualProfile): string[] {
  if (
    profile.entityType === "hk-company" ||
    profile.entityType === "sg-company" ||
    profile.entityType === "us-company" ||
    profile.entityType === "other-company"
  ) {
    return ["stripe", "paddle", "wise-business", "lemon-squeezy"]
  }
  return ["paddle", "lemon-squeezy"]
}

function reasonFor(item: ToolCatalogItem, profile: SuperIndividualProfile): string[] {
  const reasons = [`适用于${profile.productType}的${item.categories.join(" / ")}阶段`]
  if (item.entityTypes.includes(profile.entityType)) {
    reasons.push(`匹配${profile.entityType}主体`)
  }
  if (item.regions.includes(profile.region)) reasons.push(`明确支持 ${profile.region} 地区`)
  if (profile.monthlyBudget === "zero" && !item.freeTierSummary.startsWith("无")) {
    reasons.push("存在可用于验证阶段的免费方案")
  }
  return reasons
}

function toRecommendation(
  item: ToolCatalogItem,
  rank: ToolRecommendation["rank"],
  profile: SuperIndividualProfile,
  stageId: SuperIndividualStageId,
  now: Date,
): ToolRecommendation {
  const stale = isToolEntryStale(item, now)
  const warnings = [...item.limitations]
  if (stale) warnings.unshift("此工具资料已超过核验周期，请重新查看官方来源。")
  if (stageId === "payments") {
    warnings.push("开户、产品审核、费率和地区资格以平台官方最终决定为准。")
  }
  return {
    toolId: item.id,
    rank,
    reasons: reasonFor(item, profile),
    warnings,
    requiresOfficialCheck: stale || stageId === "payments" || item.status === "recheck",
  }
}

export function recommendTools(
  profile: SuperIndividualProfile,
  stageId: SuperIndividualStageId,
  catalog: readonly ToolCatalogItem[],
  now = new Date(),
): ToolRecommendation[] {
  const eligible = catalog.filter((item) => isEligible(item, profile, stageId))
  const byId = new Map(eligible.map((item) => [item.id, item]))
  const preference =
    stageId === "payments" ? paymentPreference(profile) : PREFERRED_BY_STAGE[stageId]
  const ordered = [
    ...preference.map((id) => byId.get(id)).filter((item): item is ToolCatalogItem => Boolean(item)),
    ...eligible.filter((item) => !preference.includes(item.id)),
  ]

  if (ordered.length === 0) return []
  const defaultCount = stageId === "payments" ? 1 : Math.min(2, preference.length)
  const picked = ordered.slice(0, Math.max(defaultCount + 2, 3))
  const seenCategories = new Set<string>()

  return picked.map((item, index) => {
    const primaryCategory = item.categories[0]
    const canBeDefault = index < defaultCount && !seenCategories.has(primaryCategory)
    if (canBeDefault) seenCategories.add(primaryCategory)
    return toRecommendation(
      item,
      canBeDefault ? "default" : "alternative",
      profile,
      stageId,
      now,
    )
  })
}

export function getProfileWarnings(profile: SuperIndividualProfile): string[] {
  const warnings: string[] = []
  if (
    profile.entityType === "none" ||
    profile.entityType === "cn-individual"
  ) {
    warnings.push("跨境收款前需要核验经营主体、平台 KYC、提现和本地税务要求。")
  }
  if (profile.dataSensitivity === "sensitive") {
    warnings.push("敏感数据需要最小化收集、严格访问控制、日志脱敏和备份策略。")
  }
  if (profile.dataSensitivity === "regulated") {
    warnings.push("受监管数据需要在上线前获得适用地区的专业合规意见。")
  }
  if (profile.monthlyBudget === "zero") {
    warnings.push("零预算路线应设置升级阈值，避免免费额度耗尽后服务中断。")
  }
  return warnings
}
