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

test("the launch report print action stays readable on its light card", async () => {
  const source = await readFile(
    resolve("components/super-individual/launch-report.tsx"),
    "utf8",
  )
  const printButton = source.match(
    /<Button\b[^>]*onClick=\{\(\) => window\.print\(\)\}[^>]*>[\s\S]*?打印 \/ 保存为 PDF[\s\S]*?<\/Button>/,
  )?.[0]

  assert.ok(printButton, "launch report must keep its print action")
  assert.match(printButton, /variant="ghost"/)
  assert.match(printButton, /className="[^"]*\bborder-gray-300\b[^"]*"/)
  assert.match(printButton, /className="[^"]*\bbg-white\b[^"]*"/)
  assert.match(printButton, /className="[^"]*\btext-gray-800\b[^"]*"/)
})

test("the stage artifact action stays readable on its light card", async () => {
  const source = await readFile(
    resolve("components/super-individual/stage-workbench.tsx"),
    "utf8",
  )
  const saveButton = source.match(
    /<Button\b[^>]*onClick=\{saveOutput\}[^>]*>[\s\S]*?生成并保存成果[\s\S]*?<\/Button>/,
  )?.[0]

  assert.ok(saveButton, "stage workbench must keep its artifact action")
  assert.match(saveButton, /variant="ghost"/)
  assert.match(saveButton, /className="[^"]*\bborder-gray-300\b[^"]*"/)
  assert.match(saveButton, /className="[^"]*\bbg-white\b[^"]*"/)
  assert.match(saveButton, /className="[^"]*\btext-gray-800\b[^"]*"/)
})

test("the disabled AI coach action stays readable on its light panel", async () => {
  const source = await readFile(
    resolve("components/super-individual/coach-panel.tsx"),
    "utf8",
  )
  const coachButton = source.match(
    /<Button\b[^>]*disabled=\{loading \|\| Object\.keys\(answers\)\.length === 0\}[^>]*>[\s\S]*?让 AI 检查我的答案[\s\S]*?<\/Button>/,
  )?.[0]

  assert.ok(coachButton, "coach panel must keep its feedback action")
  assert.match(coachButton, /variant="ghost"/)
  assert.match(coachButton, /className="[^"]*\bborder-gray-300\b[^"]*"/)
  assert.match(coachButton, /className="[^"]*\bbg-white\b[^"]*"/)
  assert.match(coachButton, /className="[^"]*\btext-gray-800\b[^"]*"/)
  assert.match(coachButton, /className="[^"]*\bdisabled:bg-gray-100\b[^"]*"/)
  assert.match(coachButton, /className="[^"]*\bdisabled:text-gray-600\b[^"]*"/)
  assert.match(coachButton, /className="[^"]*\bdisabled:opacity-100\b[^"]*"/)
})

test("the stage artifact preview keeps dark text on its light surface", async () => {
  const source = await readFile(
    resolve("components/super-individual/stage-workbench.tsx"),
    "utf8",
  )
  const artifactPreview = source.match(
    /<output\b[^>]*>[\s\S]*?workspace\.artifacts\[stage\.id\][\s\S]*?<\/output>/,
  )?.[0]

  assert.ok(artifactPreview, "stage artifacts must render as output, not a code block")
  assert.match(artifactPreview, /className="[^"]*\bblock\b[^"]*"/)
  assert.match(artifactPreview, /className="[^"]*\bbg-white\b[^"]*"/)
  assert.match(artifactPreview, /className="[^"]*\btext-gray-700\b[^"]*"/)
  assert.match(artifactPreview, /className="[^"]*\bwhitespace-pre-wrap\b[^"]*"/)
})

test("dark super-individual surfaces override the course layout text color", async () => {
  const cases = [
    ["components/super-individual/journey-dashboard.tsx", "section", "bg-gray-950"],
    ["components/super-individual/stage-workbench.tsx", "header", "from-violet-700"],
  ]

  for (const [file, tag, surfaceClass] of cases) {
    const source = await readFile(resolve(file), "utf8")
    const surface = source.match(
      new RegExp(`<${tag}[^>]*className="[^"]*${surfaceClass}[^"]*"[^>]*>[\\s\\S]*?<\\/${tag}>`),
    )?.[0]

    assert.ok(surface, `${file} must keep its dark surface`)
    assert.match(surface, /data-course-tone="dark"/)
  }

  const globalStyles = await readFile(resolve("app/globals.css"), "utf8")
  assert.match(globalStyles, /\[data-course-tone="dark"\]\[data-course-tone="dark"\]\[data-course-tone="dark"\][^{]*h1[^{]*\{[^}]*color:\s*rgb\(255 255 255\)\s*!important/s)
  assert.match(globalStyles, /\[data-course-tone="dark"\]\[data-course-tone="dark"\]\s+\[data-course-tone-text="muted"\][^{]*\{[^}]*color:\s*rgb\(209 213 219\)\s*!important/s)
})
