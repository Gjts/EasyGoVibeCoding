/**
 * Pages Function: GET /api/models
 *
 * 读取 Cloudflare KV 中的最新模型动态数据。
 * 数据由独立 Worker (src/backend/model-updater) 每 6 小时写入。
 *
 * 行为：
 * - KV 命中：返回 200 + 数据 + ETag + Cache-Control
 * - KV 空：返回 404 + fallback hint，前端应回退到本地 data/models.json
 * - KV 配置缺失：返回 500
 *
 * 注意：为了避免 Pages Function 捆绑 zod（额外约 60KB），这里做轻量字段校验，
 * 深度校验在前端 lib/models.ts 里用 zod 执行一次。
 */

interface Env {
  SITE_STATS_KV?: KVNamespace;
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, If-None-Match",
};

const LATEST_KEY = "models:latest";
const MAX_AGE_SECONDS = 300;

type MinimalPayload = {
  updatedAt: string;
  source: string;
  models: Array<Record<string, unknown>>;
  news?: Array<Record<string, unknown>>;
};

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
      ...(init?.headers || {}),
    },
  });
}

function hashString(input: string): string {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

function isValidPayload(value: unknown): value is MinimalPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (typeof v.updatedAt !== "string") return false;
  if (typeof v.source !== "string") return false;
  if (!Array.isArray(v.models) || v.models.length === 0) return false;
  return true;
}

export const onRequestOptions = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestGet = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  if (!env.SITE_STATS_KV) {
    return json(
      {
        error: "SITE_STATS_KV is not configured",
        hint: "Bind SITE_STATS_KV namespace in Cloudflare Pages project",
      },
      { status: 500 },
    );
  }

  let raw: string | null = null;
  try {
    raw = await env.SITE_STATS_KV.get(LATEST_KEY);
  } catch (error) {
    const message = error instanceof Error ? error.message : "KV read failed";
    return json({ error: "KV read failed", details: message }, { status: 502 });
  }

  if (!raw) {
    return json(
      {
        error: "models:latest not found",
        hint: "Worker has not populated KV yet; fallback to static data/models.json",
      },
      { status: 404 },
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json(
      { error: "Stored payload is not valid JSON" },
      { status: 502 },
    );
  }

  if (!isValidPayload(parsed)) {
    return json(
      { error: "Stored payload failed shape check" },
      { status: 502 },
    );
  }

  const etag = `W/"${hashString(raw)}"`;
  const ifNoneMatch = request.headers.get("if-none-match");
  if (ifNoneMatch && ifNoneMatch === etag) {
    return new Response(null, {
      status: 304,
      headers: {
        ...CORS_HEADERS,
        ETag: etag,
        "Cache-Control": `public, max-age=${MAX_AGE_SECONDS}`,
      },
    });
  }

  return json(
    { success: true, data: parsed },
    {
      headers: {
        ETag: etag,
        "Cache-Control": `public, max-age=${MAX_AGE_SECONDS}`,
      },
    },
  );
};
