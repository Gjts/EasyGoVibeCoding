"use client"

import { useEffect, useSyncExternalStore } from "react"
import {
  LOCAL_LEARNER_PROFILE_EVENT,
  loadLocalLearnerProfile,
  touchLocalLearnerProfile,
  type LocalLearnerProfile,
} from "./local-learner-profile"

let cachedProfile: LocalLearnerProfile | null | undefined

function getProfileSnapshot(): LocalLearnerProfile | null {
  if (cachedProfile !== undefined) return cachedProfile
  cachedProfile = loadLocalLearnerProfile()
  return cachedProfile
}

function getProfileServerSnapshot(): LocalLearnerProfile | null {
  return null
}

function subscribeProfile(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  const notify = () => {
    cachedProfile = undefined
    onChange()
  }
  const storageHandler = (event: StorageEvent) => {
    if (!event.key || event.key.startsWith("egvc:local-learner-profile")) {
      notify()
    }
  }
  const hydrationRefresh = window.setTimeout(notify, 0)
  window.addEventListener("storage", storageHandler)
  window.addEventListener(LOCAL_LEARNER_PROFILE_EVENT, notify)
  return () => {
    window.clearTimeout(hydrationRefresh)
    window.removeEventListener("storage", storageHandler)
    window.removeEventListener(LOCAL_LEARNER_PROFILE_EVENT, notify)
  }
}

export function useLocalLearnerProfile(): LocalLearnerProfile | null {
  const profile = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getProfileServerSnapshot,
  )
  const profileId = profile?.id

  useEffect(() => {
    if (!profileId) return
    touchLocalLearnerProfile()
  }, [profileId])

  return profile
}
