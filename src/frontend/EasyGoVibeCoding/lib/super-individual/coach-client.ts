import { z } from "zod"

import type { CoachRequest, CoachResponse } from "./types.ts"

const responseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    feedback: z.string(),
    followUpQuestions: z.array(z.string()),
    missingConsiderations: z.array(z.string()),
    suggestedArtifact: z.string(),
    disclaimer: z.string().optional(),
  }),
})

export type CoachClientErrorCode =
  | "unconfigured"
  | "timeout"
  | "rate-limited"
  | "invalid-response"
  | "upstream-failed"

export class CoachClientError extends Error {
  constructor(public readonly code: CoachClientErrorCode) {
    super(code)
    this.name = "CoachClientError"
  }
}

export async function requestCoachFeedback(
  input: CoachRequest,
  externalSignal?: AbortSignal,
): Promise<CoachResponse> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 22_000)
  const abort = () => controller.abort()
  externalSignal?.addEventListener("abort", abort, { once: true })
  try {
    const response = await fetch("/api/super-individual/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      signal: controller.signal,
    })
    const body = await response.json().catch(() => null)
    if (!response.ok) {
      const code = body && typeof body.code === "string" ? body.code : "upstream-failed"
      if (code === "unconfigured" || code === "timeout" || code === "rate-limited") {
        throw new CoachClientError(code)
      }
      throw new CoachClientError("upstream-failed")
    }
    const parsed = responseSchema.safeParse(body)
    if (!parsed.success) throw new CoachClientError("invalid-response")
    return parsed.data.data
  } catch (error) {
    if (error instanceof CoachClientError) throw error
    if (controller.signal.aborted) throw new CoachClientError("timeout")
    throw new CoachClientError("upstream-failed")
  } finally {
    clearTimeout(timeout)
    externalSignal?.removeEventListener("abort", abort)
  }
}
