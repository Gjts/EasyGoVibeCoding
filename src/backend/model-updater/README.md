# model-updater

Cloudflare Worker，通过 Cron Trigger **每 6 小时**刷新主流 AI 模型发布动态，写入 Pages 站点共享的 KV，由 Pages Function `/api/models` 对外暴露。配置 OpenRouter / Perplexity / Anthropic API key 后会调用联网检索；未配置外部 key 时会写入已校验的 `data/models.json` 静态兜底数据，并把 `source` 标记为 `seed-static-fallback`。

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

默认 provider 是 **OpenRouter**：

```bash
npx wrangler secret put OPENROUTER_API_KEY
```

默认模型池使用 OpenRouter 免费模型，并启用 OpenRouter `web` plugin 做联网检索：

1. `openrouter/free`
2. `openai/gpt-oss-120b:free`
3. `nvidia/nemotron-3-super-120b-a12b:free`

Worker 会按顺序尝试，某个模型接口失败或返回内容无法通过 Schema 校验时，会继续尝试下一个模型。
每个免费模型默认最多等待 14 秒，可通过 `OPENROUTER_MODEL_TIMEOUT_MS` 调整；如果免费模型超时或限流，Worker 会使用 OpenRouter 官方模型目录兜底，避免整次刷新请求失败。

如果暂时不配置 `OPENROUTER_API_KEY`、`PERPLEXITY_API_KEY` 或 `ANTHROPIC_API_KEY`，Worker 仍会使用 `data/models.json` 作为静态校验兜底写入 KV，保证定时任务和首页“请求最新”链路可用；这时接口返回的 `source` 会是 `seed-static-fallback`。要获得真正的实时联网检索结果，必须配置一个外部 provider key。

手动刷新端点也需要 secret，避免公开环境被外部刷调用：

```bash
npx wrangler secret put RUN_TOKEN
```

同一个值还需要配置到 Cloudflare Pages 项目的 `MODEL_UPDATER_TOKEN`，供 `/api/models/refresh` 服务端通过 Service Binding 调用使用。

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

如果切换到 Perplexity：

```toml
# wrangler.toml 修改：
[vars]
LLM_PROVIDER = "perplexity"
LLM_MODEL = "sonar-pro"
```

```bash
npx wrangler secret put PERPLEXITY_API_KEY
```

> 目前已实现 `openrouter` / `perplexity` / `anthropic` / `seed` 四个 provider；`openai` / `gemini` 占位会回退到 `seed`，后续可按相同接口扩展 `src/providers/`。

### 4. 部署

```bash
pnpm deploy   # 等价于 npx wrangler deploy
```

部署后可在 Cloudflare 面板看到：

- Workers → `model-updater` → Triggers：每 6 小时一次（UTC 0/6/12/18 点整）
- Workers → `model-updater` → Logs：可 `pnpm tail` 实时观察

### 5. 手动触发一次（用于首次填充 KV）

当前 `/__run` 手动触发端点用于部署后的人工填充和排错，必须携带 `RUN_TOKEN`。

```bash
# 部署环境
curl -X POST https://model-updater.<your-account>.workers.dev/__run \
  -H "Authorization: Bearer <RUN_TOKEN>"

# 本地 dev
pnpm dev
curl -X POST http://127.0.0.1:8787/__run \
  -H "Authorization: Bearer <RUN_TOKEN>"
```

成功返回：

```json
{
  "status": "updated",
  "nowISO": "2026-05-11T00:00:00.000Z",
  "source": "openrouter-openrouter/free",
  "modelsCount": 8,
  "newsCount": 5
}
```

### 6. 连接 Pages 首页刷新按钮

Cloudflare Pages 项目需要绑定 `model-updater` Worker：

```toml
[[services]]
binding = "MODEL_UPDATER"
service = "model-updater"
```

并设置：

```text
MODEL_UPDATER_TOKEN=<RUN_TOKEN>
# 可选公网 fallback；通常不需要
MODEL_UPDATER_URL=https://model-updater.<your-account>.workers.dev/__run
```

首页“请求最新”按钮会调用 `POST /api/models/refresh`。该 Pages Function 优先通过 `MODEL_UPDATER` Service Binding 内部请求 `model-updater /__run`，Worker 更新 KV 后，Pages Function 会读取 `models:latest` 并在同一个响应里返回最新数据。

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
- `source` provider 标识，如 `openrouter-openrouter/free`
- `models[]` 当前主流模型，每项含 `provider / name / releaseDate / contextWindow / highlights / tier (1-3) / url / category / tags / description`
  - `tier` 是能力分级，不是发布时间排序：`1=旗舰/高强度模型`，`2=平衡主力模型`，`3=轻量/免费/低成本模型`
  - 首页第一梯队优先按御三家各取一个旗舰代表（Anthropic / OpenAI / Google），避免同一家模型家族占满全部旗舰位
- `news[]` 最近 6 个月内重大发布，每项含 `date / provider / title / summary (≤240 字) / url`

Worker 在写入前会做三层防护：

1. `extractJsonString` 剥离 markdown 包裹
2. `ModelsPayloadSchema.parse` 严格字段校验
3. 校验失败自动重试一次，仍失败则保留旧 `models:latest` 不动

## 内容口径

- 模型 ID、上下文窗口、价格、稳定性和工具能力以官方模型页/API 文档为准。
- 新闻稿可作为背景材料，但不应覆盖官方模型页/API 文档。
- 对无法由官方来源确认的条目，Worker 应省略或降级描述，不能写成“最新旗舰”或“已开放 API”。
- 前端 `data/models.json` 既是构建时 fallback，也是未配置外部 provider key 时的 Worker 静态兜底；线上真实数据优先来自 KV 的 `models:latest`，并通过 `source` 区分实时检索还是静态兜底。

## 工程规则符合性

- 每个文件 < 200 行，职责单一（`env / prompt / providers/* / kv / updater / index`）
- 无 `if/else` 嵌套超过 2 层
- 前后端共享类型定义，避免重复手工维护
- API 响应结构与 zod Schema 1:1 对齐

