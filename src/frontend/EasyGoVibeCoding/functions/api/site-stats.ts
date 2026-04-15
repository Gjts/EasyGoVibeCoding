interface Env {
  SITE_STATS_KV?: KVNamespace;
}

type StatsData = {
  pageViews: number;
  visitors: number;
  launchDate: string;
  updatedAt: string;
};

type VisitorRecord = {
  lastSeenAt: string;
  firstSeenAt: string;
  path?: string;
  userAgent?: string;
};

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

const STATS_KEY = "site-stats:totals";
const VISITOR_KEY_PREFIX = "site-stats:visitor:";
const LAUNCH_DATE = "2026-01-15T22:47:55+08:00";

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
      ...(init?.headers || {}),
    },
  });
}

function badRequest(message: string, details?: unknown) {
  return json(
    {
      error: message,
      ...(details !== undefined ? { details } : {}),
    },
    { status: 400 },
  );
}

function serverError(message: string, details?: unknown) {
  return json(
    {
      error: message,
      ...(details !== undefined ? { details } : {}),
    },
    { status: 500 },
  );
}

async function readStats(kv: KVNamespace): Promise<StatsData> {
  const raw = await kv.get(STATS_KEY, "json<StatsData>");
  if (
    raw &&
    typeof raw.pageViews === "number" &&
    typeof raw.visitors === "number"
  ) {
    return raw;
  }

  const initial: StatsData = {
    pageViews: 0,
    visitors: 0,
    launchDate: LAUNCH_DATE,
    updatedAt: new Date().toISOString(),
  };

  await kv.put(STATS_KEY, JSON.stringify(initial));
  return initial;
}

function getClientIp(request: Request): string {
  const headerCandidates = [
    "cf-connecting-ip",
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
  ];

  for (const header of headerCandidates) {
    const value = request.headers.get(header);
    if (!value) continue;

    const first = value.split(",")[0]?.trim();
    if (first) return first;
  }

  return "unknown";
}

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = Array.from(new Uint8Array(digest));
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function getVisitorKey(request: Request, path: string): Promise<string> {
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") || "unknown";
  const fingerprint = `${ip}::${userAgent}::${path}`;
  const hashed = await sha256(fingerprint);
  return `${VISITOR_KEY_PREFIX}${hashed}`;
}

async function trackVisit(request: Request, kv: KVNamespace) {
  const body = await request.json().catch(() => null);
  const path =
    body && typeof body.path === "string" && body.path.trim().length > 0
      ? body.path.trim()
      : "/";

  const stats = await readStats(kv);
  const visitorKey = await getVisitorKey(request, path);
  const existingVisitor = await kv.get(visitorKey, "json<VisitorRecord>");
  const now = new Date().toISOString();

  const nextStats: StatsData = {
    ...stats,
    pageViews: stats.pageViews + 1,
    visitors: existingVisitor ? stats.visitors : stats.visitors + 1,
    updatedAt: now,
  };

  const visitorRecord: VisitorRecord = existingVisitor ?? {
    firstSeenAt: now,
    lastSeenAt: now,
    path,
    userAgent: request.headers.get("user-agent") || undefined,
  };

  if (existingVisitor) {
    visitorRecord.lastSeenAt = now;
    visitorRecord.path = path;
  }

  await Promise.all([
    kv.put(STATS_KEY, JSON.stringify(nextStats)),
    kv.put(visitorKey, JSON.stringify(visitorRecord), {
      expirationTtl: 60 * 60 * 24 * 365,
    }),
  ]);

  return nextStats;
}

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
};

export const onRequestGet = async ({ env }: { env: Env }) => {
  try {
    if (!env.SITE_STATS_KV) {
      return serverError(
        "SITE_STATS_KV is not configured",
        "Bind a Cloudflare KV namespace named SITE_STATS_KV in your Pages project.",
      );
    }

    const stats = await readStats(env.SITE_STATS_KV);
    return json({
      success: true,
      data: stats,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return serverError("Failed to load site stats", message);
  }
};

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  try {
    if (!env.SITE_STATS_KV) {
      return serverError(
        "SITE_STATS_KV is not configured",
        "Bind a Cloudflare KV namespace named SITE_STATS_KV in your Pages project.",
      );
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return badRequest("Content-Type must be application/json");
    }

    const stats = await trackVisit(request, env.SITE_STATS_KV);

    return json({
      success: true,
      data: stats,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return serverError("Failed to track site stats", message);
  }
};
