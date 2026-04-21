# model-updater

Cloudflare Worker，通过 Cron Trigger **每 6 小时**调用 LLM 联网搜索 API 抓取主流 AI 模型最新发布动态，写入 Pages 站点共享的 KV，由 Pages Function `/api/models` 对外暴露。

## 架构位置

```
src/backend/model-updater          # 本 Worker 工程
src/frontend/EasyGoVibeCoding
├── lib/model-schema.ts            # 三端共享 zod Schema（本 Worker 通过相对路径引用）
├── data/models.json               # 构建时种子数据（与 Worker 输出同 Schema）
├── functions/api/models.ts        # Pages Function：GET /api/models
└── components/home/latest-models-panel.tsx  # 前端展示组件
```

## 数据流

```
Cron 0 */6 * * *
   └─ Worker.scheduled
        └─ runUpdate(env)
             ├─ readLatest(KV)               → 作为上下文注入 prompt
             ├─ pickProvider(env).fetchPayload()
             ├─ ModelsPayloadSchema.parse()  → 严格校验，失败不写入
             ├─ writeLatest(KV)              → models:previous ← old, models:latest ← new
             ├─ appendHistory(KV)            → models:history:YYYY-MM
             └─ pruneHistory(KV)             → 保留最近 N 个月

前端浏览器
   └─ GET /api/models (Pages Function)
        └─ KV.get(models:latest) + ETag 协商缓存
```

## 首次部署步骤

> 前置条件：已经安装 `pnpm` / `npm` 以及登录 `wrangler`（`npx wrangler login`）。

### 1. 安装依赖

```bash
cd src/backend/model-updater
pnpm install   # 或 npm install
```

### 2. 确认复用的 KV namespace

`wrangler.toml` 中已配置：

```toml
[[kv_namespaces]]
binding = "SITE_STATS_KV"
id = "04e02c1e72b44bee95ad85eb96c6da07"
```

该 ID 与 Pages 项目 `src/frontend/EasyGoVibeCoding/wrangler.toml` 保持一致，确保 Worker 写入 / Pages Function 读取落在同一命名空间。如果换账号，需要先在 Pages 侧新建 KV 并把 ID 同步过来。

### 3. 配置 LLM 密钥（secret 方式，不落库）

默认 provider 是 **Perplexity**：

```bash
npx wrangler secret put PERPLEXITY_API_KEY
```

如果切换到 Anthropic：

```toml
# wrangler.toml 修改：
[vars]
LLM_PROVIDER = "anthropic"
LLM_MODEL = "claude-sonnet-4-5"
```

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

> 目前已实现 `perplexity` / `anthropic` 两个 provider；`openai` / `gemini` 占位会回退到 perplexity，后续可按相同接口扩展 `src/providers/`。

### 4. 部署

```bash
pnpm deploy   # 等价于 npx wrangler deploy
```

部署后可在 Cloudflare 面板看到：

- Workers → `model-updater` → Triggers：每 6 小时一次（UTC 0/6/12/18 点整）
- Workers → `model-updater` → Logs：可 `pnpm tail` 实时观察

### 5. 手动触发一次（用于首次填充 KV）

```bash
# 部署环境
curl -X POST https://model-updater.<your-account>.workers.dev/__run

# 本地 dev
pnpm dev
curl -X POST http://127.0.0.1:8787/__run
```

成功返回：

```json
{
  "status": "updated",
  "nowISO": "2026-04-20T12:00:00.000Z",
  "source": "perplexity-sonar-pro",
  "modelsCount": 8,
  "newsCount": 5
}
```

## KV key 约定


| Key                      | 说明                      | TTL                                    |
| ------------------------ | ----------------------- | -------------------------------------- |
| `models:latest`          | 最新一份成功数据                | 永久                                     |
| `models:previous`        | 上一次成功数据（回滚用）            | 永久                                     |
| `models:history:YYYY-MM` | 按月归档的历史数组               | 按 `HISTORY_MONTHS_TO_KEEP` 修剪（默认 6 个月） |
| `models:error:<ISO>`     | 失败时落盘的排查信息（raw text 预览） | 30 天                                   |


## 回滚

如果某次 Worker 产出数据明显错误，可以手动用 `previous` 覆盖 `latest`：

```bash
npx wrangler kv key get --binding=SITE_STATS_KV models:previous > /tmp/prev.json
npx wrangler kv key put --binding=SITE_STATS_KV models:latest "$(cat /tmp/prev.json)"
```

## 数据契约

所有 payload 必须通过 `src/frontend/EasyGoVibeCoding/lib/model-schema.ts` 里的 `ModelsPayloadSchema` 校验，字段含义：

- `updatedAt` ISO8601 UTC 时间戳
- `source` provider 标识，如 `perplexity-sonar-pro`
- `models[]` 当前主流模型，每项含 `provider / name / releaseDate / contextWindow / highlights / tier (1-3) / url / category / tags / description`
- `news[]` 最近 6 个月内重大发布，每项含 `date / provider / title / summary (≤240 字) / url`

Worker 在写入前会做三层防护：

1. `extractJsonString` 剥离 markdown 包裹
2. `ModelsPayloadSchema.parse` 严格字段校验
3. 校验失败自动重试一次，仍失败则保留旧 `models:latest` 不动

## 工程规则符合性

- 每个文件 < 200 行，职责单一（`env / prompt / providers/* / kv / updater / index`）
- 无 `if/else` 嵌套超过 2 层
- 前后端共享类型定义，避免重复手工维护
- API 响应结构与 zod Schema 1:1 对齐

