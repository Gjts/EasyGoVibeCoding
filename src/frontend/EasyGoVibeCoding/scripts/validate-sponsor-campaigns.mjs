import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { parseSponsorCampaigns } from "../lib/sponsor-schema.ts"

const here = dirname(fileURLToPath(import.meta.url))
const jsonPath = resolve(here, "../data/sponsor-campaigns.json")

try {
  const raw = JSON.parse(readFileSync(jsonPath, "utf8"))
  const payload = parseSponsorCampaigns(raw)
  console.log(
    "✅ data/sponsor-campaigns.json valid: " +
      payload.campaigns.length +
      " campaigns",
  )
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error("❌ " + message)
  process.exit(1)
}
