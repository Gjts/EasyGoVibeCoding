import { randomUUID } from "node:crypto"
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises"
import { join } from "node:path"

function cachePath(cacheDir, key) {
  if (!/^[a-f0-9]{64}$/.test(key)) {
    throw new Error("Translation cache key must be a SHA-256 hex digest")
  }
  return join(cacheDir, `${key}.json`)
}

export async function readTranslationCache({ cacheDir, key }) {
  try {
    const raw = await readFile(cachePath(cacheDir, key), "utf8")
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null
  } catch (error) {
    if (error?.code === "ENOENT" || error instanceof SyntaxError) return null
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
