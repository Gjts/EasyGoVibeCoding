import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { parseEnv } from "node:util"

export const DEPLOYMENT_SECRET_NAMES = Object.freeze([
  "TRANSLATION_API_BASE_URL",
  "TRANSLATION_API_KEY",
  "OPENAI_API_KEY",
  "RESEND_API_KEY",
  "SUPER_INDIVIDUAL_AI_BASE_URL",
  "SUPER_INDIVIDUAL_AI_API_KEY",
])

export function createSecretFreeEnvironment(parentEnv = process.env) {
  const env = { ...parentEnv }
  for (const name of DEPLOYMENT_SECRET_NAMES) env[name] = ""
  return env
}

export async function collectForbiddenMarkers(projectRoot, parentEnv = process.env) {
  const candidates = []
  for (const name of DEPLOYMENT_SECRET_NAMES) {
    const value = parentEnv?.[name]
    if (typeof value === "string" && value.length > 0) candidates.push({ name, value })
  }

  let dotenv = {}
  try {
    dotenv = parseEnv(await readFile(resolve(projectRoot, ".env.local"), "utf8"))
  } catch (error) {
    if (error?.code !== "ENOENT") throw new Error("Unable to read deployment secret markers from .env.local", { cause: error })
  }
  for (const name of DEPLOYMENT_SECRET_NAMES) {
    const value = dotenv[name]
    if (typeof value === "string" && value.length > 0) candidates.push({ name, value })
  }

  const seen = new Set()
  return candidates
    .filter(({ name, value }) => {
      const key = `${name}\0${value}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((left, right) => left.name.localeCompare(right.name))
}
