import { parseSponsorEvent } from "../_shared/sponsor-event"

interface Env {
  SPONSOR_ANALYTICS?: AnalyticsEngineDataset
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  })
}

function hasSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  return origin === new URL(request.url).origin
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request
  env: Env
}) => {
  if (!hasSameOrigin(request)) {
    return json({ error: "Forbidden origin" }, 403)
  }
  if (!env.SPONSOR_ANALYTICS) {
    return json({ error: "Sponsor analytics is not configured" }, 503)
  }
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return json({ error: "Content-Type must be application/json" }, 400)
  }

  const rawBody = await request.text()
  if (rawBody.length > 2048) {
    return json({ error: "Payload too large" }, 413)
  }
  const input = (() => {
    try {
      return JSON.parse(rawBody) as unknown
    } catch {
      return null
    }
  })()
  const event = parseSponsorEvent(input)
  if (!event) {
    return json({ error: "Invalid sponsor event" }, 400)
  }

  env.SPONSOR_ANALYTICS.writeDataPoint({
    indexes: [event.campaignId],
    blobs: [event.eventType, event.slot, event.path],
    doubles: [1],
  })

  return new Response(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  })
}
