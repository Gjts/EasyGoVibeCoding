# EasyGoVibeCoding

**AI 编程工具综合培训网站**

AI 编程工具不是魔法，是工程。理解机制才能驾驭工具。

## 项目简介

EasyGoVibeCoding 是一个面向开发者、团队和企业的 AI 编程工具与架构培训平台。当前实现已经从早期“纯内容规划站”演进为：

- Next.js 16 + React 19 + Tailwind CSS 4 的静态导出前端
- Cloudflare Pages 承载静态页面与 Pages Functions
- Cloudflare Worker 定时更新模型动态并写入 KV
- 多模块课程页面、站内搜索、学习访问仪表盘、GitHub 热门项目、日本站 MVP 和最新模型面板

## 快速开始

前端项目位于：

```bash
src/frontend/EasyGoVibeCoding
```

常用命令：

```bash
cd src/frontend/EasyGoVibeCoding
pnpm install
pnpm dev
```

访问 `http://localhost:3000`。

构建与部署：

```bash
pnpm build
pnpm pages:deploy
```

说明：

- `pnpm build` 通过 `scripts/build-with-meta.js` 执行静态构建。
- `postbuild` 会复制 `functions/` 到 `out/functions`。
- Cloudflare Pages 使用 `out/` 作为部署目录。
- Pages Functions 当前包含 `/api/send-email`、`/api/site-stats`、`/api/models`。

## 项目结构

```text
EasyGoVibeCoding/
├── docs/
│   ├── bussiness/
│   │   ├── PRD.md
│   │   └── Task_Details.md
│   └── develop/
│       └── Architecture_Design.md
├── src/
│   ├── frontend/
│   │   └── EasyGoVibeCoding/
│   │       ├── app/                 # Next.js App Router 页面
│   │       ├── components/          # React 组件
│   │       ├── data/                # 静态种子数据
│   │       ├── functions/           # Cloudflare Pages Functions
│   │       ├── hooks/
│   │       ├── lib/
│   │       ├── public/
│   │       └── scripts/
│   └── backend/
│       └── model-updater/           # Cloudflare Worker：模型动态更新
├── AI编程工具综合培训网站大纲.md
├── 模型信息更新记录.md
├── AGENTS.md
├── CLAUDE.md
└── README.md
```

## 当前内容模块

| 模块 | 路由 | 状态 |
| --- | --- | --- |
| 首页 | `/` | 已实现，含日本市场横幅、最新模型、GitHub 热门、学习仪表盘 |
| 基础篇 | `/basics/*` | 已实现多页 |
| 进阶篇 | `/advanced/*` | 已实现多页，含 AI 框架、上下文工程、部署、测试等 |
| 工具篇 | `/tools/*` | 已实现多页，含工具选型页 |
| 架构篇 | `/architecture/*` | 已实现多页 |
| 实践篇 | `/practice/*` | 已实现多页 |
| 团队篇 | `/team/*` | 已实现多页 |
| 生态导航 | `/ecosystem` | 已实现 |
| 优质资源 | `/resources` | 已实现 |
| 超级个体篇 | `/super-individual/*` | 已实现多页 |
| GitHub 热门项目 | `/github-hot` | 已实现 |
| 日本站 MVP | `/ja/*` | 已实现 landing、等待名单和法务页面 |

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 前端框架 | Next.js 16 |
| UI 框架 | React 19 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 4 |
| 组件 | shadcn/ui、Radix UI |
| 图标 | Lucide React |
| 图表 | Recharts |
| 表单 | React Hook Form + Zod |
| 部署 | Cloudflare Pages |
| API | Cloudflare Pages Functions |
| 定时任务 | Cloudflare Worker |

## 当前功能状态

已实现：

- 静态站点构建与 Cloudflare Pages 部署链路
- 多模块课程页面
- Header 搜索对话框与快捷键入口
- 首页最新模型动态面板
- `/api/models` KV 数据读取与静态种子回退
- `/api/site-stats` 访问统计
- `/api/send-email` 邮件发送
- 本地访问式学习仪表盘
- 日本站 MVP 页面

部分完成：

- 学习进度：当前主要是本地访问追踪，不是完整账号体系。
- 工具选型：已有页面内容，但不是完整问答式决策助手。
- 主题能力：`ThemeProvider` 组件存在，但根布局尚未接入完整主题切换体验。
- 模型动态：已接入 Worker/KV 机制，但仍需要定期人工抽查官方来源。

未完成或待补：

- 测试框架
- CI/CD 工作流
- 社区评论/Q&A
- 构建期 MDX 内容系统
- sitemap/robots 生成
- 邮件表单防滥用与更严格的错误返回策略

## 验证现状

最近一次深查记录：

- `pnpm build` 通过，静态导出 87 个页面。
- `pnpm exec tsc --noEmit --incremental false` 通过。
- `pnpm validate:models` 通过。
- `pnpm lint` 尚未通过，当前存在较多 lint 问题。
- `next.config.mjs` 当前仍设置 `typescript.ignoreBuildErrors: true`，生产前应移除并保持构建类型校验开启。

## 关键文档

| 文档 | 说明 |
| --- | --- |
| `docs/bussiness/PRD.md` | 产品需求与当前实现状态 |
| `docs/bussiness/Task_Details.md` | 任务拆解与状态口径 |
| `docs/develop/Architecture_Design.md` | 当前技术架构与历史规划差异 |
| `AI编程工具综合培训网站大纲.md` | 课程与内容结构大纲 |
| `模型信息更新记录.md` | 最新模型数据维护规则 |
| `src/frontend/EasyGoVibeCoding/CLOUDFLARE_DEPLOY.md` | Cloudflare Pages 部署说明 |
| `src/backend/model-updater/README.md` | 模型更新 Worker 说明 |

## 维护原则

- 新内容优先沿用当前 `app/**/page.tsx` 页面结构；不要默认新建 MDX/content 流程。
- 动态模型内容必须有官方模型页、API 文档或官方发布页支撑。
- 新增 API 时同步更新 Cloudflare Pages Functions、部署文档和环境变量说明。
- 生产前必须解决 lint、测试、CI、sitemap/robots 和 `ignoreBuildErrors` 问题。

## License

MIT
