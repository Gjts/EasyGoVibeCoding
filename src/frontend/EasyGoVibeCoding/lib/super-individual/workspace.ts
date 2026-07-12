import type {
  CoachResponse,
  SuperIndividualProfile,
  SuperIndividualStageId,
  SuperIndividualWorkspace,
  ToolRecommendation,
} from "./types.ts"

export const STORAGE_KEY = "egvc:super-individual-workspace:v1"
export const WORKSPACE_EVENT = "egvc:super-individual-workspace-change"

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export type SaveWorkspaceResult =
  | { saved: true }
  | { saved: false; reason: "storage-unavailable" }

export const STAGE_IDS: SuperIndividualStageId[] = [
  "discover",
  "validate",
  "mvp",
  "build",
  "backend",
  "deploy",
  "payments",
  "analytics",
  "automation",
  "iterate",
]

function emptyStageStatus(): SuperIndividualWorkspace["stageStatus"] {
  return Object.fromEntries(
    STAGE_IDS.map((stageId) => [stageId, "not-started"]),
  ) as SuperIndividualWorkspace["stageStatus"]
}

export function emptyWorkspace(): SuperIndividualWorkspace {
  return {
    version: 1,
    profile: null,
    stageAnswers: {},
    stageStatus: emptyStageStatus(),
    recommendations: {},
    artifacts: {},
    aiFeedback: {},
    updatedAt: 0,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function normalizeStringRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {}
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  )
}

function normalizeProfile(value: unknown): SuperIndividualProfile | null {
  if (!isRecord(value) || value.version !== 1) return null
  const requiredStrings = [
    "locale",
    "region",
    "entityType",
    "productType",
    "billingModel",
    "skillLevel",
    "monthlyBudget",
    "dataSensitivity",
  ]
  if (requiredStrings.some((key) => typeof value[key] !== "string")) return null
  if (!Array.isArray(value.targetMarkets) || !Array.isArray(value.needs)) return null
  return value as unknown as SuperIndividualProfile
}

export function normalizeWorkspace(value: unknown): SuperIndividualWorkspace {
  if (!isRecord(value) || value.version !== 1) return emptyWorkspace()
  const workspace = emptyWorkspace()

  workspace.profile = normalizeProfile(value.profile)
  workspace.updatedAt =
    typeof value.updatedAt === "number" && Number.isFinite(value.updatedAt)
      ? value.updatedAt
      : 0

  if (isRecord(value.stageAnswers)) {
    for (const stageId of STAGE_IDS) {
      const answers = normalizeStringRecord(value.stageAnswers[stageId])
      if (Object.keys(answers).length > 0) workspace.stageAnswers[stageId] = answers
    }
  }

  if (isRecord(value.stageStatus)) {
    for (const stageId of STAGE_IDS) {
      const status = value.stageStatus[stageId]
      if (
        status === "not-started" ||
        status === "in-progress" ||
        status === "complete"
      ) {
        workspace.stageStatus[stageId] = status
      }
    }
  }

  if (isRecord(value.recommendations)) {
    for (const stageId of STAGE_IDS) {
      const recommendations = value.recommendations[stageId]
      if (Array.isArray(recommendations)) {
        workspace.recommendations[stageId] =
          recommendations as ToolRecommendation[]
      }
    }
  }

  if (isRecord(value.artifacts)) {
    for (const stageId of STAGE_IDS) {
      const artifact = value.artifacts[stageId]
      if (typeof artifact === "string") workspace.artifacts[stageId] = artifact
    }
  }

  if (isRecord(value.aiFeedback)) {
    for (const stageId of STAGE_IDS) {
      const feedback = value.aiFeedback[stageId]
      if (isRecord(feedback) && typeof feedback.feedback === "string") {
        workspace.aiFeedback[stageId] = feedback as unknown as CoachResponse
      }
    }
  }

  return workspace
}

export function loadWorkspace(storage?: StorageLike | null): SuperIndividualWorkspace {
  if (!storage) return emptyWorkspace()
  try {
    const raw = storage.getItem(STORAGE_KEY)
    return raw ? normalizeWorkspace(JSON.parse(raw)) : emptyWorkspace()
  } catch {
    return emptyWorkspace()
  }
}

export function saveWorkspace(
  storage: StorageLike | null | undefined,
  workspace: SuperIndividualWorkspace,
): SaveWorkspaceResult {
  if (!storage) return { saved: false, reason: "storage-unavailable" }
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(normalizeWorkspace(workspace)))
    return { saved: true }
  } catch {
    return { saved: false, reason: "storage-unavailable" }
  }
}

function withTimestamp(workspace: SuperIndividualWorkspace): SuperIndividualWorkspace {
  return { ...workspace, updatedAt: Date.now() }
}

export function setWorkspaceProfile(
  workspace: SuperIndividualWorkspace,
  profile: SuperIndividualProfile,
): SuperIndividualWorkspace {
  return withTimestamp({ ...workspace, profile: { ...profile } })
}

export function updateStageAnswer(
  workspace: SuperIndividualWorkspace,
  stageId: SuperIndividualStageId,
  questionId: string,
  value: string,
): SuperIndividualWorkspace {
  const answers = { ...(workspace.stageAnswers[stageId] ?? {}), [questionId]: value }
  return withTimestamp({
    ...workspace,
    stageAnswers: { ...workspace.stageAnswers, [stageId]: answers },
    stageStatus: { ...workspace.stageStatus, [stageId]: "in-progress" },
  })
}

export function setStageRecommendations(
  workspace: SuperIndividualWorkspace,
  stageId: SuperIndividualStageId,
  recommendations: ToolRecommendation[],
): SuperIndividualWorkspace {
  return withTimestamp({
    ...workspace,
    recommendations: {
      ...workspace.recommendations,
      [stageId]: recommendations.map((item) => ({ ...item })),
    },
  })
}

export function setStageArtifact(
  workspace: SuperIndividualWorkspace,
  stageId: SuperIndividualStageId,
  artifact: string,
): SuperIndividualWorkspace {
  return withTimestamp({
    ...workspace,
    artifacts: { ...workspace.artifacts, [stageId]: artifact },
  })
}

export function setStageAIFeedback(
  workspace: SuperIndividualWorkspace,
  stageId: SuperIndividualStageId,
  feedback: CoachResponse,
): SuperIndividualWorkspace {
  return withTimestamp({
    ...workspace,
    aiFeedback: { ...workspace.aiFeedback, [stageId]: { ...feedback } },
  })
}

export function completeStage(
  workspace: SuperIndividualWorkspace,
  stageId: SuperIndividualStageId,
  requiredQuestionIds: string[],
): SuperIndividualWorkspace {
  const answers = workspace.stageAnswers[stageId] ?? {}
  for (const questionId of requiredQuestionIds) {
    if (!answers[questionId]?.trim()) {
      throw new Error(`missing required answer: ${questionId}`)
    }
  }
  return withTimestamp({
    ...workspace,
    stageStatus: { ...workspace.stageStatus, [stageId]: "complete" },
  })
}

export function resetWorkspace(storage?: StorageLike | null): SuperIndividualWorkspace {
  try {
    storage?.removeItem(STORAGE_KEY)
  } catch {
    // The in-memory reset still succeeds when browser storage is unavailable.
  }
  return emptyWorkspace()
}
