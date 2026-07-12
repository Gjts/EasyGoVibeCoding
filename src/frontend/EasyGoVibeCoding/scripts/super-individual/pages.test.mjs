import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"

const pages = [
  ["app/super-individual/page.tsx", "JourneyDashboard"],
  ["app/super-individual/strategy/page.tsx", "StageWorkbench"],
  ["app/super-individual/monetization/page.tsx", "StageWorkbench"],
  ["app/super-individual/systems/page.tsx", "StageWorkbench"],
  ["app/super-individual/growth/page.tsx", "StageWorkbench"],
  ["app/super-individual/cases/page.tsx", "StageWorkbench"],
]

test("all existing super-individual routes use the shared journey components", async () => {
  for (const [file, component] of pages) {
    const source = await readFile(resolve(file), "utf8")
    assert.match(source, /CourseLayout/, `${file} must preserve CourseLayout`)
    assert.ok(source.includes(component), `${file} must render ${component}`)
  }
})

test("obsolete outline-only sections are removed from route pages", async () => {
  const sources = await Promise.all(
    pages.map(([file]) => readFile(resolve(file), "utf8")),
  )
  const combined = sources.join("\n")
  assert.ok(!combined.includes("三种 Offer 形态"))
  assert.ok(!combined.includes("四个系统"))
})
