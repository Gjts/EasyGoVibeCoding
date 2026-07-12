"use client"

import { useCallback, useSyncExternalStore } from "react"

import type {
  CoachResponse,
  SuperIndividualProfile,
  SuperIndividualStageId,
  SuperIndividualWorkspace,
  ToolRecommendation,
} from "./types.ts"
import {
  STORAGE_KEY,
  WORKSPACE_EVENT,
  completeStage,
  emptyWorkspace,
  loadWorkspace,
  resetWorkspace,
  saveWorkspace,
  setStageAIFeedback,
  setStageArtifact,
  setStageRecommendations,
  setWorkspaceProfile,
  updateStageAnswer,
} from "./workspace.ts"

const serverWorkspace = emptyWorkspace()
let cachedWorkspace = serverWorkspace
let initialized = false

function browserStorage(): Storage | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

function getSnapshot(): SuperIndividualWorkspace {
  if (!initialized) {
    cachedWorkspace = loadWorkspace(browserStorage())
    initialized = true
  }
  return cachedWorkspace
}

function getServerSnapshot(): SuperIndividualWorkspace {
  return serverWorkspace
}

function subscribe(listener: () => void): () => void {
  if (typeof window === "undefined") return () => undefined
  const refresh = () => {
    cachedWorkspace = loadWorkspace(browserStorage())
    initialized = true
    listener()
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key && event.key !== STORAGE_KEY) return
    refresh()
  }
  window.addEventListener("storage", onStorage)
  window.addEventListener(WORKSPACE_EVENT, refresh)
  return () => {
    window.removeEventListener("storage", onStorage)
    window.removeEventListener(WORKSPACE_EVENT, refresh)
  }
}

function commit(
  updater: (workspace: SuperIndividualWorkspace) => SuperIndividualWorkspace,
): void {
  cachedWorkspace = updater(getSnapshot())
  saveWorkspace(browserStorage(), cachedWorkspace)
  window.dispatchEvent(new Event(WORKSPACE_EVENT))
}

export function useSuperIndividualWorkspace() {
  const workspace = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return {
    workspace,
    storageAvailable: browserStorage() !== null,
    setProfile: useCallback(
      (profile: SuperIndividualProfile) =>
        commit((current) => setWorkspaceProfile(current, profile)),
      [],
    ),
    setAnswer: useCallback(
      (stageId: SuperIndividualStageId, questionId: string, value: string) =>
        commit((current) =>
          updateStageAnswer(current, stageId, questionId, value),
        ),
      [],
    ),
    setRecommendations: useCallback(
      (stageId: SuperIndividualStageId, recommendations: ToolRecommendation[]) =>
        commit((current) =>
          setStageRecommendations(current, stageId, recommendations),
        ),
      [],
    ),
    setArtifact: useCallback(
      (stageId: SuperIndividualStageId, artifact: string) =>
        commit((current) => setStageArtifact(current, stageId, artifact)),
      [],
    ),
    setAIFeedback: useCallback(
      (stageId: SuperIndividualStageId, feedback: CoachResponse) =>
        commit((current) => setStageAIFeedback(current, stageId, feedback)),
      [],
    ),
    markStageComplete: useCallback(
      (stageId: SuperIndividualStageId, requiredQuestionIds: string[]) =>
        commit((current) =>
          completeStage(current, stageId, requiredQuestionIds),
        ),
      [],
    ),
    reset: useCallback(() => {
      cachedWorkspace = resetWorkspace(browserStorage())
      initialized = true
      window.dispatchEvent(new Event(WORKSPACE_EVENT))
    }, []),
  }
}
