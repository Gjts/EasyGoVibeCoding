import seedPayload from "../../../../frontend/EasyGoVibeCoding/data/models.json"
import type { PromptInput } from "../prompt"
import type { LlmProvider, ProviderResult } from "./types"

export const SeedProvider: LlmProvider = {
  id: "seed",
  async fetchPayload(_env, input: PromptInput): Promise<ProviderResult> {
    const parsedJson = {
      ...seedPayload,
      updatedAt: input.nowISO,
      source: "seed-static-fallback",
    }

    return {
      sourceLabel: "seed-static-fallback",
      rawText: JSON.stringify(parsedJson),
      parsedJson,
    }
  },
}
