import test from "node:test"
import assert from "node:assert/strict"

import {
  STORAGE_KEY,
  completeStage,
  emptyWorkspace,
  loadWorkspace,
  saveWorkspace,
  updateStageAnswer,
} from "../../lib/super-individual/workspace.ts"

function createMemoryStorage(seed = {}) {
  const values = new Map(Object.entries(seed))
  return {
    getItem(key) {
      return values.get(key) ?? null
    },
    setItem(key, value) {
      values.set(key, value)
    },
    removeItem(key) {
      values.delete(key)
    },
  }
}

test("workspace persists under the v1 key and restores answers", () => {
  const storage = createMemoryStorage()
  const workspace = updateStageAnswer(
    emptyWorkspace(),
    "discover",
    "problem",
    "Freelancers lose time preparing invoices",
  )

  assert.deepEqual(saveWorkspace(storage, workspace), { saved: true })
  assert.equal(
    loadWorkspace(storage).stageAnswers.discover.problem,
    "Freelancers lose time preparing invoices",
  )
  assert.ok(storage.getItem(STORAGE_KEY))
})

test("malformed storage returns an empty workspace without throwing", () => {
  const storage = createMemoryStorage({ [STORAGE_KEY]: "{" })
  assert.deepEqual(loadWorkspace(storage), emptyWorkspace())
})

test("completeStage refuses a stage with missing required answers", () => {
  assert.throws(
    () => completeStage(emptyWorkspace(), "discover", ["problem", "audience"]),
    /missing required answer: problem/,
  )
})

test("completeStage marks a fully answered stage complete", () => {
  let workspace = updateStageAnswer(
    emptyWorkspace(),
    "discover",
    "problem",
    "Manual invoicing",
  )
  workspace = updateStageAnswer(
    workspace,
    "discover",
    "audience",
    "Freelancers",
  )
  workspace = completeStage(workspace, "discover", ["problem", "audience"])
  assert.equal(workspace.stageStatus.discover, "complete")
})
