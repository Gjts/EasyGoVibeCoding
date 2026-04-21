/**
 * 学习进度追踪：基于 localStorage 的轻量级访问记录。
 *
 * - 不采集 PII，仅记录课程类路径与访问时间戳
 * - 不依赖后端，完全在客户端运行
 * - 用于首页"下一步推荐"等个性化展示
 */

const STORAGE_KEY = "egvc:learning-progress:v1"

export type LearningCategory =
  | "basics"
  | "advanced"
  | "architecture"
  | "tools"
  | "practice"
  | "team"
  | "super-individual"
  | "ecosystem"
  | "resources"
  | "ai-frameworks"
  | "other"

const LEARNING_PREFIXES: { prefix: string; category: LearningCategory }[] = [
  { prefix: "/advanced/ai-frameworks", category: "ai-frameworks" },
  { prefix: "/basics", category: "basics" },
  { prefix: "/advanced", category: "advanced" },
  { prefix: "/architecture", category: "architecture" },
  { prefix: "/tools", category: "tools" },
  { prefix: "/practice", category: "practice" },
  { prefix: "/team", category: "team" },
  { prefix: "/super-individual", category: "super-individual" },
  { prefix: "/ecosystem", category: "ecosystem" },
  { prefix: "/resources", category: "resources" },
]

export interface VisitRecord {
  path: string
  category: LearningCategory
  firstSeen: number
  lastSeen: number
  visits: number
}

export interface LearningProgress {
  visits: Record<string, VisitRecord>
  updatedAt: number
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

export function classifyPath(path: string): LearningCategory | null {
  for (const entry of LEARNING_PREFIXES) {
    if (path === entry.prefix || path.startsWith(`${entry.prefix}/`)) {
      return entry.category
    }
  }
  return null
}

export function loadProgress(): LearningProgress {
  if (!isBrowser()) {
    return { visits: {}, updatedAt: 0 }
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { visits: {}, updatedAt: 0 }
    const parsed = JSON.parse(raw) as LearningProgress
    if (!parsed || typeof parsed !== "object" || !parsed.visits) {
      return { visits: {}, updatedAt: 0 }
    }
    return parsed
  } catch {
    return { visits: {}, updatedAt: 0 }
  }
}

export function saveProgress(progress: LearningProgress): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // quota / privacy mode — silently ignore
  }
}

export function recordVisit(path: string): LearningProgress {
  const category = classifyPath(path)
  if (!category) return loadProgress()

  const progress = loadProgress()
  const now = Date.now()
  const prev = progress.visits[path]
  progress.visits[path] = {
    path,
    category,
    firstSeen: prev?.firstSeen ?? now,
    lastSeen: now,
    visits: (prev?.visits ?? 0) + 1,
  }
  progress.updatedAt = now
  saveProgress(progress)
  return progress
}

export function countByCategory(
  progress: LearningProgress,
): Record<LearningCategory, number> {
  const out: Record<string, number> = {}
  for (const rec of Object.values(progress.visits)) {
    out[rec.category] = (out[rec.category] ?? 0) + 1
  }
  return out as Record<LearningCategory, number>
}

/**
 * 判断是否应该把"五大 AI 框架详解"作为下一步推荐高亮出来。
 *
 * 触发条件（任一满足即可）：
 * 1. 访问过 ≥ 2 个进阶篇页面（且未读过 ai-frameworks）
 * 2. 访问过 ≥ 3 个基础篇页面
 * 3. 访问过任何 architecture 或 practice 页面，但未读过 ai-frameworks
 */
export interface FrameworksRecommendation {
  recommend: boolean
  reason: string | null
  readCount: number
  visitedFrameworks: boolean
}

export function recommendAIFrameworks(
  progress: LearningProgress,
): FrameworksRecommendation {
  const counts = countByCategory(progress)
  const visitedFrameworks = (counts["ai-frameworks"] ?? 0) > 0
  const advancedCount = counts["advanced"] ?? 0
  const basicsCount = counts["basics"] ?? 0
  const archCount = counts["architecture"] ?? 0
  const practiceCount = counts["practice"] ?? 0
  const totalLearning =
    advancedCount + basicsCount + archCount + practiceCount + (counts["tools"] ?? 0)

  if (visitedFrameworks) {
    return {
      recommend: true,
      reason: `欢迎回来，继续深入 · 已阅读 ${counts["ai-frameworks"]} 个框架详解页`,
      readCount: totalLearning,
      visitedFrameworks: true,
    }
  }
  if (advancedCount >= 2) {
    return {
      recommend: true,
      reason: `已完成 ${advancedCount} 个进阶章节 · 下一步建议`,
      readCount: totalLearning,
      visitedFrameworks: false,
    }
  }
  if (archCount >= 1 || practiceCount >= 1) {
    return {
      recommend: true,
      reason: "已涉猎架构/实战 · AI 框架是连接理论与项目的关键一环",
      readCount: totalLearning,
      visitedFrameworks: false,
    }
  }
  if (basicsCount >= 3) {
    return {
      recommend: true,
      reason: `已完成 ${basicsCount} 个基础章节 · 准备进入实战框架`,
      readCount: totalLearning,
      visitedFrameworks: false,
    }
  }
  return {
    recommend: false,
    reason: null,
    readCount: totalLearning,
    visitedFrameworks: false,
  }
}
