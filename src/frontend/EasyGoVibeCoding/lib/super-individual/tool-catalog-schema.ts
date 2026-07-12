import { z } from "zod"

import type { ToolCatalogItem } from "./types.ts"

const nonEmptyString = z.string().trim().min(1)
const httpsUrl = z.string().url().refine((value) => value.startsWith("https://"), {
  message: "URL must use HTTPS",
})

const stageIdSchema = z.enum([
  "discover",
  "validate",
  "mvp",
  "build",
  "backend",
  "deploy",
  "payments",
  "analytics",
  "automation",
  "iterate",
])

export const toolCatalogItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: nonEmptyString,
  stageIds: z.array(stageIdSchema).min(1),
  categories: z.array(nonEmptyString).min(1),
  officialUrl: httpsUrl,
  entityTypes: z.array(nonEmptyString).min(1),
  regions: z.array(nonEmptyString).min(1),
  productTypes: z.array(nonEmptyString).min(1),
  skillLevels: z.array(nonEmptyString).min(1),
  freeTierSummary: nonEmptyString,
  limitations: z.array(nonEmptyString).min(1),
  upgradeSignals: z.array(nonEmptyString).min(1),
  alternatives: z.array(z.string()),
  sources: z
    .array(z.object({ label: nonEmptyString, url: httpsUrl }))
    .min(1),
  lastVerifiedAt: z.string().date(),
  verificationDays: z.union([z.literal(30), z.literal(90)]),
  status: z.enum(["active", "recheck", "retired"]),
})

export interface CatalogValidationResult {
  success: boolean
  errors: string[]
  staleIds: string[]
}

export function isToolEntryStale(
  item: ToolCatalogItem,
  now = new Date(),
): boolean {
  const verifiedAt = new Date(`${item.lastVerifiedAt}T00:00:00Z`)
  if (Number.isNaN(verifiedAt.getTime())) return true
  return now.getTime() - verifiedAt.getTime() > item.verificationDays * 86_400_000
}

export function validateToolCatalog(
  items: readonly ToolCatalogItem[],
  now = new Date(),
): CatalogValidationResult {
  const errors: string[] = []
  const seen = new Set<string>()

  for (const [index, item] of items.entries()) {
    const parsed = toolCatalogItemSchema.safeParse(item)
    if (!parsed.success) {
      errors.push(
        ...parsed.error.issues.map(
          (issue) => `${item.id || `item-${index}`}: ${issue.path.join(".")} ${issue.message}`,
        ),
      )
    }
    if (seen.has(item.id)) errors.push(`${item.id}: duplicate id`)
    seen.add(item.id)
  }

  return {
    success: errors.length === 0,
    errors,
    staleIds: items.filter((item) => isToolEntryStale(item, now)).map((item) => item.id),
  }
}
