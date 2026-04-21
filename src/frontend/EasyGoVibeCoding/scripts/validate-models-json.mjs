/**
 * 构建期种子数据校验脚本
 *
 * 用途：确保 data/models.json 始终与 lib/model-schema.ts 保持一致。
 * 建议在 CI 里以 `node scripts/validate-models-json.mjs` 运行。
 *
 * 注意：为避免 Node 直接 import .ts 文件，这里用精简 JS 版 Schema 做一次防回归校验；
 * 深度语义校验仍由运行时 lib/models.ts 的 zod 执行。
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonPath = resolve(__dirname, "../data/models.json");

const REQUIRED_PAYLOAD_KEYS = ["updatedAt", "source", "models", "news"];
const REQUIRED_MODEL_KEYS = [
  "provider",
  "name",
  "releaseDate",
  "contextWindow",
  "highlights",
  "tier",
  "url",
];
const REQUIRED_NEWS_KEYS = ["date", "provider", "title", "summary", "url"];

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const ISO_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

function fail(msg) {
  console.error(`\u274c ${msg}`);
  process.exit(1);
}

function requireKeys(obj, keys, ctx) {
  for (const k of keys) {
    if (!(k in obj)) fail(`${ctx} missing key "${k}"`);
  }
}

const raw = readFileSync(jsonPath, "utf-8");
let payload;
try {
  payload = JSON.parse(raw);
} catch (e) {
  fail(`data/models.json is not valid JSON: ${e.message}`);
}

requireKeys(payload, REQUIRED_PAYLOAD_KEYS, "payload");

if (!ISO_REGEX.test(payload.updatedAt)) {
  fail(`updatedAt must be ISO8601, got "${payload.updatedAt}"`);
}
if (typeof payload.source !== "string" || payload.source.length === 0) {
  fail('payload.source must be non-empty string');
}
if (!Array.isArray(payload.models) || payload.models.length === 0) {
  fail("payload.models must be non-empty array");
}
if (!Array.isArray(payload.news)) {
  fail("payload.news must be array");
}

payload.models.forEach((m, i) => {
  requireKeys(m, REQUIRED_MODEL_KEYS, `models[${i}]`);
  if (!DATE_REGEX.test(m.releaseDate)) {
    fail(`models[${i}].releaseDate must be YYYY-MM-DD, got "${m.releaseDate}"`);
  }
  if (![1, 2, 3].includes(m.tier)) {
    fail(`models[${i}].tier must be 1|2|3, got ${m.tier}`);
  }
  if (!Array.isArray(m.highlights) || m.highlights.length === 0) {
    fail(`models[${i}].highlights must be non-empty array`);
  }
});

payload.news.forEach((n, i) => {
  requireKeys(n, REQUIRED_NEWS_KEYS, `news[${i}]`);
  if (!DATE_REGEX.test(n.date)) {
    fail(`news[${i}].date must be YYYY-MM-DD, got "${n.date}"`);
  }
  if (n.summary.length > 240) {
    fail(`news[${i}].summary exceeds 240 chars`);
  }
});

console.log(
  `\u2705 data/models.json valid: ${payload.models.length} models, ${payload.news.length} news`,
);
