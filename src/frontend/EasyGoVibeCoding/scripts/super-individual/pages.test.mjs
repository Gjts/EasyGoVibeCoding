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

test("super-individual native selects stay readable on light cards", async () => {
  const files = [
    "components/super-individual/profile-wizard.tsx",
    "components/super-individual/stage-workbench.tsx",
  ]

  for (const file of files) {
    const source = await readFile(resolve(file), "utf8")
    const selects = source.match(/<select\b[\s\S]*?<\/select>/g) ?? []

    assert.ok(selects.length > 0, `${file} must contain a native select`)
    for (const select of selects) {
      assert.match(select, /className="[^"]*\bbg-white\b[^"]*"/, `${file} selects must use a light background`)
      assert.match(select, /className="[^"]*\btext-gray-900\b[^"]*"/, `${file} selects must use readable dark text`)
    }
  }
})

test("the global learning progress control stays compact on mobile", async () => {
  const source = await readFile(
    resolve("components/learning/learning-progress-control.tsx"),
    "utf8",
  )

  assert.match(source, /className="[^"]*\bflex\b[^"]*\bsm:block\b[^"]*"/)
  assert.match(source, /className="[^"]*\bhidden\b[^"]*\bsm:block\b[^"]*"/)
  assert.match(source, /aria-label="下一章"/)
})
