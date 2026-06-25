const STORAGE_KEY = "egvc:local-learner-profile:v1"

export const LOCAL_LEARNER_PROFILE_EVENT = "egvc:local-learner-profile-change"

export type LearnerRole =
  | "student"
  | "developer"
  | "product"
  | "designer"
  | "manager"
  | "founder"
  | "other"

export interface LocalLearnerProfile {
  version: 1
  id: string
  name: string
  role: LearnerRole
  email?: string
  goal?: string
  feedbackConsent: boolean
  createdAt: number
  updatedAt: number
  lastSeenAt: number
}

export interface LocalLearnerProfileInput {
  name: string
  role: LearnerRole
  email?: string
  goal?: string
  feedbackConsent?: boolean
}

export const LEARNER_ROLE_LABELS: Record<LearnerRole, string> = {
  student: "学生",
  developer: "开发者",
  product: "产品经理",
  designer: "设计师",
  manager: "团队管理者",
  founder: "创业者 / 独立开发者",
  other: "其他",
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function clampText(value: string | undefined, max: number): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  return trimmed.slice(0, max)
}

function createLocalId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `local_${crypto.randomUUID()}`
  }
  return `local_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function dispatchProfileChange(): void {
  if (!isBrowser()) return
  window.dispatchEvent(new Event(LOCAL_LEARNER_PROFILE_EVENT))
}

function normalizeProfile(value: unknown): LocalLearnerProfile | null {
  if (!value || typeof value !== "object") return null
  const profile = value as Partial<LocalLearnerProfile>
  const name = clampText(profile.name, 24)
  const role = profile.role
  if (!name || !role || !(role in LEARNER_ROLE_LABELS)) return null

  const now = Date.now()
  return {
    version: 1,
    id: profile.id || createLocalId(),
    name,
    role,
    email: clampText(profile.email, 80),
    goal: clampText(profile.goal, 80),
    feedbackConsent: Boolean(profile.feedbackConsent),
    createdAt: typeof profile.createdAt === "number" ? profile.createdAt : now,
    updatedAt: typeof profile.updatedAt === "number" ? profile.updatedAt : now,
    lastSeenAt: typeof profile.lastSeenAt === "number" ? profile.lastSeenAt : now,
  }
}

export function loadLocalLearnerProfile(): LocalLearnerProfile | null {
  if (!isBrowser()) return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return normalizeProfile(JSON.parse(raw))
  } catch {
    return null
  }
}

export function saveLocalLearnerProfile(
  input: LocalLearnerProfileInput,
  existing?: LocalLearnerProfile | null,
): LocalLearnerProfile {
  const now = Date.now()
  const profile: LocalLearnerProfile = {
    version: 1,
    id: existing?.id ?? createLocalId(),
    name: clampText(input.name, 24) ?? "学习者",
    role: input.role,
    email: clampText(input.email, 80),
    goal: clampText(input.goal, 80),
    feedbackConsent: Boolean(input.feedbackConsent),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    lastSeenAt: now,
  }

  if (isBrowser()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    dispatchProfileChange()
  }

  return profile
}

export function touchLocalLearnerProfile(): LocalLearnerProfile | null {
  const profile = loadLocalLearnerProfile()
  if (!profile || !isBrowser()) return profile
  const next = {
    ...profile,
    lastSeenAt: Date.now(),
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  dispatchProfileChange()
  return next
}

export function clearLocalLearnerProfile(): void {
  if (!isBrowser()) return
  window.localStorage.removeItem(STORAGE_KEY)
  dispatchProfileChange()
}
