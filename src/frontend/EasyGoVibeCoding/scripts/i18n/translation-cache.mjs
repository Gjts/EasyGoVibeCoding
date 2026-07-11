import { randomUUID } from "node:crypto"
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises"
import { join } from "node:path"

function cachePath(cacheDir, key) {
  if (!/^[a-f0-9]{64}$/.test(key)) {
    throw new Error("Translation cache key must be a SHA-256 hex digest")
  }
  return join(cacheDir, `${key}.json`)
}

export async function readTranslationCache({ cacheDir, key, rejectCorrupt = false }) {
  try {
    const raw = await readFile(cachePath(cacheDir, key), "utf8")
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed
    if (rejectCorrupt) {
      throw new Error(`Translation cache entry ${key} must contain a JSON object`)
    }
    return null
  } catch (error) {
    if (error?.code === "ENOENT") return null
    if (error instanceof SyntaxError) {
      if (rejectCorrupt) {
        throw new Error(`Translation cache entry ${key} is not valid JSON`)
      }
      return null
    }
    throw error
  }
}

export async function writeTranslationCache({ cacheDir, key, catalog }) {
  await mkdir(cacheDir, { recursive: true })
  const destination = cachePath(cacheDir, key)
  const temporary = join(cacheDir, `.${key}.${process.pid}.${randomUUID()}.tmp`)

  try {
    await writeFile(temporary, `${JSON.stringify(catalog, null, 2)}\n`, "utf8")
    await rename(temporary, destination)
  } finally {
    await unlink(temporary).catch((error) => {
      if (error?.code !== "ENOENT") throw error
    })
  }
}
