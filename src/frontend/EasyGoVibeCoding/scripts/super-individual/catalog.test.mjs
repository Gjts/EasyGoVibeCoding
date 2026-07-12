import test from "node:test"
import assert from "node:assert/strict"

import { TOOL_CATALOG } from "../../lib/super-individual/tool-catalog.ts"
import { validateToolCatalog } from "../../lib/super-individual/tool-catalog-schema.ts"

test("catalog has valid official HTTPS sources and unique ids", () => {
  const result = validateToolCatalog(
    TOOL_CATALOG,
    new Date("2026-07-12T00:00:00Z"),
  )

  assert.equal(result.success, true, JSON.stringify(result.errors))
  assert.equal(
    new Set(TOOL_CATALOG.map((item) => item.id)).size,
    TOOL_CATALOG.length,
  )
  assert.ok(
    TOOL_CATALOG.every((item) =>
      item.sources.every((source) => source.url.startsWith("https://")),
    ),
  )
})

test("catalog covers every course stage", () => {
  const covered = new Set(TOOL_CATALOG.flatMap((item) => item.stageIds))

  for (const id of [
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
  ]) {
    assert.ok(covered.has(id), `missing catalog coverage for ${id}`)
  }
})
