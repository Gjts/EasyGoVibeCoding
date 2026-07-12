import test from "node:test"
import assert from "node:assert/strict"

import {
  SUPER_INDIVIDUAL_STAGES,
  getStagesForRoute,
} from "../../lib/super-individual/curriculum.ts"

test("curriculum defines the approved ten stages once and in order", () => {
  assert.deepEqual(
    SUPER_INDIVIDUAL_STAGES.map((stage) => stage.id),
    [
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
    ],
  )
  assert.equal(
    new Set(SUPER_INDIVIDUAL_STAGES.map((stage) => stage.id)).size,
    10,
  )
})

test("systems route contains the sequential build-to-payment stages", () => {
  assert.deepEqual(
    getStagesForRoute("/super-individual/systems").map((stage) => stage.id),
    ["build", "backend", "deploy", "payments"],
  )
})

test("every stage has unique questions, required input and an artifact", () => {
  for (const stage of SUPER_INDIVIDUAL_STAGES) {
    const ids = stage.questions.map((question) => question.id)
    assert.equal(new Set(ids).size, ids.length, `${stage.id} has duplicate questions`)
    assert.ok(stage.questions.some((question) => question.required))
    assert.ok(stage.artifactTitle.trim())
    assert.ok(stage.artifactTemplate.trim())
  }
})
