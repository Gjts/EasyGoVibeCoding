export const SPONSOR_EVENT_SLOTS = [
  "super-individual-home",
  "super-individual-monetization",
] as const

const EVENT_TYPES = ["viewable_impression", "click"] as const
const ALLOWED_KEYS = new Set([
  "schemaVersion",
  "eventType",
  "campaignId",
  "slot",
  "path",
])

export interface SponsorEvent {
  schemaVersion: 1
  eventType: (typeof EVENT_TYPES)[number]
  campaignId: string
  slot: (typeof SPONSOR_EVENT_SLOTS)[number]
  path: string
}

export async function readBodyWithinLimit(
  body: ReadableStream<Uint8Array> | null,
  maxBytes: number,
): Promise<string | null> {
  if (!body) return ""

  const reader = body.getReader()
  const decoder = new TextDecoder()
  let bytesRead = 0
  let text = ""

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) return text + decoder.decode()

      bytesRead += value.byteLength
      if (bytesRead > maxBytes) {
        await reader.cancel()
        return null
      }

      text += decoder.decode(value, { stream: true })
    }
  } finally {
    reader.releaseLock()
  }
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return Boolean(input) && typeof input === "object" && !Array.isArray(input)
}

export function parseSponsorEvent(input: unknown): SponsorEvent | null {
  if (!isRecord(input)) return null
  if (Object.keys(input).some((key) => !ALLOWED_KEYS.has(key))) return null
  if (input.schemaVersion !== 1) return null
  if (
    typeof input.eventType !== "string" ||
    !EVENT_TYPES.includes(input.eventType as SponsorEvent["eventType"])
  ) {
    return null
  }
  if (
    typeof input.campaignId !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.campaignId) ||
    input.campaignId.length > 80
  ) {
    return null
  }
  if (
    typeof input.slot !== "string" ||
    !SPONSOR_EVENT_SLOTS.includes(input.slot as SponsorEvent["slot"])
  ) {
    return null
  }
  if (
    typeof input.path !== "string" ||
    !/^\/super-individual(?:\/[a-z0-9-]+)?$/.test(input.path) ||
    input.path.length > 120
  ) {
    return null
  }

  return input as unknown as SponsorEvent
}
