export type SuperIndividualStageId =
  | "discover"
  | "validate"
  | "mvp"
  | "build"
  | "backend"
  | "deploy"
  | "payments"
  | "analytics"
  | "automation"
  | "iterate"

export type EntityType =
  | "none"
  | "cn-individual"
  | "cn-company"
  | "hk-company"
  | "sg-company"
  | "us-company"
  | "other-company"

export type ProductType =
  | "saas"
  | "ai-app"
  | "digital-product"
  | "course"
  | "consulting"
  | "developer-tool"

export type SkillLevel = "beginner" | "intermediate" | "advanced"

export interface ToolSource {
  label: string
  url: string
}

export interface ToolCatalogItem {
  id: string
  name: string
  stageIds: SuperIndividualStageId[]
  categories: string[]
  officialUrl: string
  entityTypes: Array<EntityType | "any">
  regions: string[]
  productTypes: Array<ProductType | "any">
  skillLevels: Array<SkillLevel | "any">
  freeTierSummary: string
  limitations: string[]
  upgradeSignals: string[]
  alternatives: string[]
  sources: ToolSource[]
  lastVerifiedAt: string
  verificationDays: 30 | 90
  status: "active" | "recheck" | "retired"
}

export interface ToolRecommendation {
  toolId: string
  rank: "default" | "alternative"
  reasons: string[]
  warnings: string[]
  requiresOfficialCheck: boolean
}

export interface CoachResponse {
  feedback: string
  followUpQuestions: string[]
  missingConsiderations: string[]
  suggestedArtifact: string
  disclaimer?: string
}

export interface SuperIndividualProfile {
  version: 1
  locale: string
  region: string
  entityType: EntityType
  productType: ProductType
  billingModel: "one-time" | "subscription" | "usage" | "quote" | "unknown"
  skillLevel: SkillLevel
  monthlyBudget: "zero" | "under-25" | "under-100" | "over-100"
  targetMarkets: string[]
  needs: string[]
  dataSensitivity: "normal" | "sensitive" | "regulated"
  updatedAt: number
}

export interface SuperIndividualWorkspace {
  version: 1
  profile: SuperIndividualProfile | null
  stageAnswers: Partial<
    Record<SuperIndividualStageId, Record<string, string>>
  >
  stageStatus: Record<
    SuperIndividualStageId,
    "not-started" | "in-progress" | "complete"
  >
  recommendations: Partial<
    Record<SuperIndividualStageId, ToolRecommendation[]>
  >
  artifacts: Partial<Record<SuperIndividualStageId, string>>
  aiFeedback: Partial<Record<SuperIndividualStageId, CoachResponse>>
  updatedAt: number
}
