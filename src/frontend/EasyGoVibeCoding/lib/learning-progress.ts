/**
 * 学习进度追踪：基于 localStorage 的轻量级访问记录。
 *
 * - 不采集 PII，仅记录课程类路径与访问时间戳
 * - 不依赖后端，完全在客户端运行
 * - 用于首页"下一步推荐"等个性化展示
 */

import { stripLocaleBasePath } from "@/lib/i18n-routing"

const STORAGE_KEY = "egvc:learning-progress:v1"
export const LEARNING_PROGRESS_EVENT = "egvc:learning-progress-change"

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

export interface LearningRouteMeta {
  path: string
  title: string
  category: LearningCategory
}

export const LEARNING_ROUTES: LearningRouteMeta[] = [
  { path: "/basics", title: "基础篇概述", category: "basics" },
  { path: "/basics/awakening", title: "认知觉醒", category: "basics" },
  { path: "/basics/mindset", title: "AI 编程思维", category: "basics" },
  { path: "/basics/principles", title: "核心原理", category: "basics" },
  { path: "/basics/tools", title: "工具入门", category: "basics" },
  { path: "/basics/skills", title: "基础技能", category: "basics" },
  { path: "/basics/practice", title: "入门实践", category: "basics" },
  { path: "/tools", title: "工具篇概述", category: "tools" },
  { path: "/tools/core", title: "核心工具", category: "tools" },
  { path: "/tools/ide", title: "AI IDE", category: "tools" },
  { path: "/tools/cli", title: "CLI 工具", category: "tools" },
  { path: "/tools/web", title: "Web 工具", category: "tools" },
  { path: "/tools/fabric", title: "Fabric 工作流", category: "tools" },
  { path: "/tools/enterprise", title: "企业级工具", category: "tools" },
  { path: "/tools/selection", title: "工具选择助手", category: "tools" },
  { path: "/advanced", title: "进阶篇概述", category: "advanced" },
  { path: "/advanced/environment", title: "环境搭建与代码运行基础", category: "advanced" },
  { path: "/advanced/ai-guide", title: "AI 使用说明书", category: "advanced" },
  { path: "/advanced/prompt-engineering", title: "Prompt Engineering", category: "advanced" },
  { path: "/advanced/prd", title: "PRD 与文档驱动", category: "advanced" },
  { path: "/advanced/ai-native-patterns", title: "AI 原生开发模式", category: "advanced" },
  { path: "/advanced/ai-architecture-patterns", title: "AI 适配架构范式", category: "advanced" },
  { path: "/advanced/dev-basics", title: "开发常识", category: "advanced" },
  { path: "/advanced/ui", title: "界面交互", category: "advanced" },
  { path: "/advanced/data", title: "数据持久化", category: "advanced" },
  { path: "/advanced/context-engineering", title: "Context Engineering", category: "advanced" },
  { path: "/advanced/testing", title: "测试与质量", category: "advanced" },
  { path: "/advanced/harness-engineering", title: "Harness Engineering", category: "advanced" },
  { path: "/advanced/deployment", title: "部署与运维", category: "advanced" },
  { path: "/advanced/ai-frameworks", title: "AI 应用框架全景", category: "ai-frameworks" },
  { path: "/advanced/ai-frameworks/langchain", title: "LangChain 详解", category: "ai-frameworks" },
  { path: "/advanced/ai-frameworks/llamaindex", title: "LlamaIndex 详解", category: "ai-frameworks" },
  { path: "/advanced/ai-frameworks/langgraph", title: "LangGraph 详解", category: "ai-frameworks" },
  { path: "/advanced/ai-frameworks/autogpt", title: "AutoGPT 详解", category: "ai-frameworks" },
  { path: "/advanced/ai-frameworks/metagpt", title: "MetaGPT 详解", category: "ai-frameworks" },
  { path: "/architecture", title: "架构篇概述", category: "architecture" },
  { path: "/architecture/transformer", title: "Transformer 总览", category: "architecture" },
  { path: "/architecture/transformer-core", title: "Transformer 核心机制", category: "architecture" },
  { path: "/architecture/transformer-limits", title: "Transformer 局限", category: "architecture" },
  { path: "/architecture/mamba", title: "Mamba 架构", category: "architecture" },
  { path: "/architecture/moe", title: "MoE 架构", category: "architecture" },
  { path: "/architecture/rag", title: "RAG 架构", category: "architecture" },
  { path: "/architecture/comparison", title: "架构对比", category: "architecture" },
  { path: "/architecture/emerging", title: "新兴架构", category: "architecture" },
  { path: "/architecture/future", title: "未来趋势", category: "architecture" },
  { path: "/practice", title: "实践篇概述", category: "practice" },
  { path: "/practice/humanities", title: "文科生 / 商科生项目", category: "practice" },
  { path: "/practice/engineering", title: "理工科学生项目", category: "practice" },
  { path: "/practice/professional", title: "职场人士项目", category: "practice" },
  { path: "/practice/advanced", title: "高级实战场景", category: "practice" },
  { path: "/practice/advanced/new-project", title: "从零开始创建新项目", category: "practice" },
  { path: "/practice/advanced/onboarding", title: "快速熟悉新公司项目", category: "practice" },
  { path: "/practice/advanced/transition", title: "业务线切换实战", category: "practice" },
  { path: "/practice/advanced/rag", title: "RAG 实战", category: "practice" },
  { path: "/practice/advanced/agent", title: "Agent 实战", category: "practice" },
  { path: "/practice/agent", title: "AI Agent 开发", category: "practice" },
  { path: "/practice/fullstack", title: "全栈项目实战", category: "practice" },
  { path: "/practice/efficiency", title: "工具与效率", category: "practice" },
  { path: "/team", title: "团队篇概述", category: "team" },
  { path: "/team/why", title: "为什么需要 AI 团队", category: "team" },
  { path: "/team/roles", title: "团队角色", category: "team" },
  { path: "/team/workflow", title: "团队工作流", category: "team" },
  { path: "/team/tools", title: "团队工具链", category: "team" },
  { path: "/team/knowledge", title: "知识管理", category: "team" },
  { path: "/team/security", title: "安全与治理", category: "team" },
  { path: "/team/cost", title: "成本管理", category: "team" },
  { path: "/team/culture", title: "团队文化", category: "team" },
  { path: "/team/growth", title: "成长路径", category: "team" },
  { path: "/team/cases", title: "团队案例", category: "team" },
  { path: "/super-individual", title: "超级个体概述", category: "super-individual" },
  { path: "/super-individual/strategy", title: "定位与策略", category: "super-individual" },
  { path: "/super-individual/monetization", title: "产品化与商业化", category: "super-individual" },
  { path: "/super-individual/systems", title: "系统与自动化", category: "super-individual" },
  { path: "/super-individual/growth", title: "增长与渠道", category: "super-individual" },
  { path: "/super-individual/cases", title: "案例与复盘", category: "super-individual" },
  { path: "/ecosystem", title: "生态导航", category: "ecosystem" },
  { path: "/resources", title: "优质资源", category: "resources" },
]

export interface VisitRecord {
  path: string
  category: LearningCategory
  firstSeen: number
  lastSeen: number
  visits: number
}

export interface CompletionRecord {
  path: string
  category: LearningCategory
  completedAt: number
}

export interface LearningProgress {
  version: 2
  visits: Record<string, VisitRecord>
  completed: Record<string, CompletionRecord>
  updatedAt: number
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

function emptyProgress(): LearningProgress {
  return { version: 2, visits: {}, completed: {}, updatedAt: 0 }
}

export function normalizePath(path: string): string {
  const canonicalPath = stripLocaleBasePath(path)
  if (canonicalPath === "/") return canonicalPath
  return canonicalPath.replace(/\/+$/, "")
}

export function classifyPath(path: string): LearningCategory | null {
  const normalizedPath = normalizePath(path)
  for (const entry of LEARNING_PREFIXES) {
    if (
      normalizedPath === entry.prefix ||
      normalizedPath.startsWith(`${entry.prefix}/`)
    ) {
      return entry.category
    }
  }
  return null
}

export function getLearningRoute(path: string): LearningRouteMeta | null {
  const normalizedPath = normalizePath(path)
  return LEARNING_ROUTES.find((route) => route.path === normalizedPath) ?? null
}

export function getLearningTitle(path: string): string {
  const route = getLearningRoute(path)
  if (route) return route.title
  const normalizedPath = normalizePath(path)
  if (normalizedPath === "/") return "首页"
  return normalizedPath
    .replace(/^\//, "")
    .split("/")
    .map((segment) => segment.replace(/-/g, " "))
    .join(" · ")
}

function normalizeProgress(input: unknown): LearningProgress {
  if (!input || typeof input !== "object") return emptyProgress()
  const value = input as Partial<LearningProgress>
  const visits: Record<string, VisitRecord> = {}
  const completed: Record<string, CompletionRecord> = {}

  if (value.visits && typeof value.visits === "object") {
    for (const [storedPath, rawRecord] of Object.entries(value.visits)) {
      if (!rawRecord || typeof rawRecord !== "object") continue
      const record = rawRecord as VisitRecord
      const path = normalizePath(record.path || storedPath)
      const previous = visits[path]
      visits[path] = {
        ...record,
        path,
        firstSeen: previous
          ? Math.min(previous.firstSeen, record.firstSeen)
          : record.firstSeen,
        lastSeen: previous ? Math.max(previous.lastSeen, record.lastSeen) : record.lastSeen,
        visits: (previous?.visits ?? 0) + record.visits,
      }
    }
  }

  if (value.completed && typeof value.completed === "object") {
    for (const [storedPath, rawRecord] of Object.entries(value.completed)) {
      if (!rawRecord || typeof rawRecord !== "object") continue
      const record = rawRecord as CompletionRecord
      const path = normalizePath(record.path || storedPath)
      const previous = completed[path]
      if (!previous || record.completedAt >= previous.completedAt) {
        completed[path] = { ...record, path }
      }
    }
  }

  return {
    version: 2,
    visits,
    completed,
    updatedAt: typeof value.updatedAt === "number" ? value.updatedAt : 0,
  }
}

export function loadProgress(): LearningProgress {
  if (!isBrowser()) {
    return emptyProgress()
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    const parsed = normalizeProgress(JSON.parse(raw))
    const normalized = JSON.stringify(parsed)
    if (normalized !== raw) window.localStorage.setItem(STORAGE_KEY, normalized)
    return parsed
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(progress: LearningProgress): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    window.dispatchEvent(new Event(LEARNING_PROGRESS_EVENT))
  } catch {
    // quota / privacy mode — silently ignore
  }
}

export function recordVisit(path: string): LearningProgress {
  const normalizedPath = normalizePath(path)
  const category = classifyPath(normalizedPath)
  if (!category) return loadProgress()

  const progress = loadProgress()
  const now = Date.now()
  const prev = progress.visits[normalizedPath]
  progress.visits[normalizedPath] = {
    path: normalizedPath,
    category,
    firstSeen: prev?.firstSeen ?? now,
    lastSeen: now,
    visits: (prev?.visits ?? 0) + 1,
  }
  progress.updatedAt = now
  saveProgress(progress)
  return progress
}

export function markComplete(path: string): LearningProgress {
  const normalizedPath = normalizePath(path)
  const category = classifyPath(normalizedPath)
  if (!category) return loadProgress()

  const progress = loadProgress()
  const now = Date.now()
  const prevVisit = progress.visits[normalizedPath]
  progress.visits[normalizedPath] = {
    path: normalizedPath,
    category,
    firstSeen: prevVisit?.firstSeen ?? now,
    lastSeen: now,
    visits: prevVisit?.visits ?? 1,
  }
  progress.completed[normalizedPath] = {
    path: normalizedPath,
    category,
    completedAt: now,
  }
  progress.updatedAt = now
  saveProgress(progress)
  return progress
}

export function markIncomplete(path: string): LearningProgress {
  const normalizedPath = normalizePath(path)
  const progress = loadProgress()
  if (!progress.completed[normalizedPath]) return progress
  delete progress.completed[normalizedPath]
  progress.updatedAt = Date.now()
  saveProgress(progress)
  return progress
}

export function toggleComplete(path: string): LearningProgress {
  const normalizedPath = normalizePath(path)
  const progress = loadProgress()
  if (progress.completed[normalizedPath]) {
    return markIncomplete(normalizedPath)
  }
  return markComplete(normalizedPath)
}

export function isPathCompleted(progress: LearningProgress, path: string): boolean {
  return Boolean(progress.completed[normalizePath(path)])
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

export function countCompletedByCategory(
  progress: LearningProgress,
): Record<LearningCategory, number> {
  const out: Record<string, number> = {}
  for (const rec of Object.values(progress.completed)) {
    out[rec.category] = (out[rec.category] ?? 0) + 1
  }
  return out as Record<LearningCategory, number>
}

export function getCategoryTotal(category: LearningCategory): number {
  return LEARNING_ROUTES.filter((route) => route.category === category).length
}

export interface LearningStats {
  totalVisited: number
  totalCompleted: number
  totalTrackable: number
  completionPercent: number
}

export function getLearningStats(progress: LearningProgress): LearningStats {
  const totalTrackable = LEARNING_ROUTES.length
  const totalCompleted = Object.keys(progress.completed).length
  return {
    totalVisited: Object.keys(progress.visits).length,
    totalCompleted,
    totalTrackable,
    completionPercent:
      totalTrackable === 0
        ? 0
        : Math.min(100, Math.round((totalCompleted / totalTrackable) * 100)),
  }
}

export interface LearningTarget {
  path: string
  title: string
  category: LearningCategory
}

export function getResumeTarget(progress: LearningProgress): LearningTarget | null {
  const recent = Object.values(progress.visits).sort((a, b) => b.lastSeen - a.lastSeen)
  const target =
    recent.find((visit) => !isPathCompleted(progress, visit.path)) ?? recent[0]
  if (!target) return null
  return {
    path: target.path,
    title: getLearningTitle(target.path),
    category: target.category,
  }
}

export function getNextLearningRoute(
  progress: LearningProgress,
  currentPath?: string | null,
): LearningTarget | null {
  const normalizedPath = currentPath ? normalizePath(currentPath) : null
  const currentRoute = normalizedPath ? getLearningRoute(normalizedPath) : null
  const currentIndex = normalizedPath
    ? LEARNING_ROUTES.findIndex((route) => route.path === normalizedPath)
    : -1
  const sameCategoryAfterCurrent =
    currentRoute && currentIndex >= 0
      ? LEARNING_ROUTES.slice(currentIndex + 1).find(
          (route) =>
            route.category === currentRoute.category &&
            !isPathCompleted(progress, route.path),
        )
      : null
  const fallback =
    sameCategoryAfterCurrent ??
    LEARNING_ROUTES.find((route) => !isPathCompleted(progress, route.path))

  if (!fallback) return null
  return {
    path: fallback.path,
    title: fallback.title,
    category: fallback.category,
  }
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
