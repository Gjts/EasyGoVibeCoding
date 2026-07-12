import test from "node:test"
import assert from "node:assert/strict"

import {
  createCoachHandler,
  onRequestPost,
} from "../../functions/api/super-individual/coach.ts"

function validBody(overrides = {}) {
  return {
    locale: "zh-CN",
    stageId: "payments",
    answers: { checkout: "比较 MoR 与直接收单" },
    candidateTools: ["paddle", "stripe"],
    action: "feedback",
    ...overrides,
  }
}

function jsonRequest(body) {
  return new Request("https://example.test/api/super-individual/coach", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
}

function validEnv() {
  return {
    SUPER_INDIVIDUAL_AI_BASE_URL: "https://relay.example/v1",
    SUPER_INDIVIDUAL_AI_API_KEY: "fixture-key",
    SUPER_INDIVIDUAL_AI_MODEL: "fixture-model",
  }
}

function validCoachResponse() {
  return {
    feedback: "先确认主体资格，再比较税务责任。",
    followUpQuestions: ["你已经核验哪些官方资格页面？"],
    missingConsiderations: ["退款与争议处理"],
    suggestedArtifact: "记录平台、核验日期和仍不确定的条件。",
    disclaimer: "平台资格以官方审核为准。",
  }
}

function validOpenAIResponse(content) {
  return { choices: [{ message: { content: JSON.stringify(content) } }] }
}

test("coach rejects oversized answers before calling upstream", async () => {
  const response = await onRequestPost({
    request: jsonRequest(validBody({ answers: { note: "x".repeat(9001) } })),
    env: validEnv(),
  })
  assert.equal(response.status, 400)
})

test("coach reports unconfigured service without exposing environment values", async () => {
  const response = await onRequestPost({ request: jsonRequest(validBody()), env: {} })
  assert.equal(response.status, 503)
  assert.doesNotMatch(await response.text(), /fixture-key|sk-|api[_-]?key/i)
})

test("coach validates and returns upstream structured output", async () => {
  const handler = createCoachHandler({
    fetchImpl: async () =>
      new Response(JSON.stringify(validOpenAIResponse(validCoachResponse()))),
  })
  const response = await handler({
    request: jsonRequest(validBody()),
    env: validEnv(),
  })
  assert.equal(response.status, 200)
  const body = await response.json()
  assert.equal(body.success, true)
  assert.deepEqual(body.data, validCoachResponse())
})

test("coach hides invalid upstream bodies", async () => {
  const handler = createCoachHandler({
    fetchImpl: async () => new Response("private upstream failure", { status: 502 }),
  })
  const response = await handler({
    request: jsonRequest(validBody()),
    env: validEnv(),
  })
  assert.equal(response.status, 502)
  assert.doesNotMatch(await response.text(), /private upstream failure/)
})
