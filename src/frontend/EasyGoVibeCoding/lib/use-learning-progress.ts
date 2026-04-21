"use client"

import { useSyncExternalStore } from "react"
import {
  loadProgress,
  recommendAIFrameworks,
  type FrameworksRecommendation,
  type LearningProgress,
} from "./learning-progress"

const EMPTY_PROGRESS: LearningProgress = { visits: {}, updatedAt: 0 }
const EMPTY_RECOMMENDATION: FrameworksRecommendation = {
  recommend: false,
  reason: null,
  readCount: 0,
  visitedFrameworks: false,
}

let cachedProgress: LearningProgress | null = null

function getProgressSnapshot(): LearningProgress {
  const fresh = loadProgress()
  if (cachedProgress && cachedProgress.updatedAt === fresh.updatedAt) {
    return cachedProgress
  }
  cachedProgress = fresh
  return fresh
}

function getProgressServerSnapshot(): LearningProgress {
  return EMPTY_PROGRESS
}

function subscribeProgress(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const handler = (event: StorageEvent) => {
    if (!event.key || event.key.startsWith("egvc:learning-progress")) {
      cachedProgress = null
      onChange()
    }
  }
  window.addEventListener("storage", handler)
  return () => window.removeEventListener("storage", handler)
}

/**
 * 客户端读取学习进度。SSR 阶段返回空进度，客户端 hydrate 后即时反映 localStorage。
 * 通过 storage 事件同步多标签页数据。
 */
export function useLearningProgress(): LearningProgress {
  return useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getProgressServerSnapshot,
  )
}

let cachedRecommendation: {
  updatedAt: number
  value: FrameworksRecommendation
} | null = null

function getRecommendationSnapshot(): FrameworksRecommendation {
  const progress = getProgressSnapshot()
  if (
    cachedRecommendation &&
    cachedRecommendation.updatedAt === progress.updatedAt
  ) {
    return cachedRecommendation.value
  }
  const value = recommendAIFrameworks(progress)
  cachedRecommendation = { updatedAt: progress.updatedAt, value }
  return value
}

function getRecommendationServerSnapshot(): FrameworksRecommendation {
  return EMPTY_RECOMMENDATION
}

export function useFrameworksRecommendation(): FrameworksRecommendation {
  return useSyncExternalStore(
    subscribeProgress,
    getRecommendationSnapshot,
    getRecommendationServerSnapshot,
  )
}
