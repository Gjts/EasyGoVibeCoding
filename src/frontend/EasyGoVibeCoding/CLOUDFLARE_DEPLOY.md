# Cloudflare Pages 部署指南

## 问题说明

**为什么 Easy-GO-Web3 可以发送邮件，但 EasyGoVibeCoding 发送不了？**

主要原因是：**Cloudflare Pages Functions 需要放在构建输出目录（`out`）中才能生效**。

**为什么本地会出现 `Failed to fetch site stats: 404`？**

这是因为站点统计接口 ` /api/site-stats ` 也是通过 **Cloudflare Pages Functions** 提供的。  
在本地使用 Next.js 开发模式、静态导出预览，或尚未部署到 Cloudflare Pages 时，这个接口并不存在，所以会返回 `404`。  
这属于预期现象，不代表统计功能代码本身有问题。

只有在以下条件满足后，站点统计接口和模型动态接口才会正常工作：

1. 项目已经构建完成
2. `functions` 已复制到 `out/functions`
3. 已部署到 **Cloudflare Pages**
4. Pages 项目中已绑定 `SITE_STATS_KV`
5. 如需真实邮箱反馈滚动展示，Pages 项目中已绑定 `FEEDBACK_KV`
6. `model-updater` Worker 已成功写入 `models:latest`（否则 `/api/models` 会提示回退到静态 `data/models.json`）

## 解决方案

### 1. 构建脚本已更新

已添加 `postbuild` 脚本，构建完成后会自动将 `functions` 目录复制到 `out/functions`。

### 2. 配置 Cloudflare Pages 环境变量

在 Cloudflare Pages 控制台中配置以下环境变量和绑定：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入你的 Pages 项目
3. 进入 **Settings** → **Environment variables**
4. 添加以下环境变量：

```
RESEND_API_KEY = 你的_Resend_API_密钥
```

KV 绑定：

```text
SITE_STATS_KV = 与 Worker 共享的 KV namespace
FEEDBACK_KV = 用于存储待确认和已确认的邮箱反馈
```

**重要**：
- 确保在 **Production**、**Preview** 和 **Branch deployments** 中都添加了环境变量
- 环境变量名称必须完全匹配：`RESEND_API_KEY`（区分大小写）
- `SITE_STATS_KV` 同时服务站点统计和模型动态读取；Pages 与 `src/backend/model-updater` Worker 必须指向同一个 KV namespace
- `FEEDBACK_KV` 用于双重确认反馈展示；当前 `wrangler.toml` 复用同一 KV namespace，并通过 `email-feedback:*` 前缀隔离

### 3. 验证部署

部署后，检查以下内容：

1. **检查 Functions 是否部署**：
   - 在 Cloudflare Pages 控制台的 **Functions** 标签页中，应该能看到 `api/send-email`、`api/site-stats`、`api/models`、`api/feedback`、`api/feedback/confirm` 函数

2. **检查环境变量**：
   - 在 **Settings** → **Environment variables** 中确认 `RESEND_API_KEY` 已配置
   - 在 **Settings** → **Functions** 或绑定区域确认 `SITE_STATS_KV` 和 `FEEDBACK_KV` 已绑定

3. **测试邮件发送**：
   - 访问网站的联系表单
   - 填写并提交表单
   - 检查浏览器控制台是否有错误
   - 检查 Cloudflare Pages 的 **Functions** 日志

### 4. 本地测试

本地测试时，创建 `.env.local` 文件：

```bash
RESEND_API_KEY=你的_Resend_API_密钥
```

然后运行：

```bash
pnpm build
pnpm pages:deploy
```

**注意：**

- 本地可以测试页面渲染和普通前端逻辑
- 本地不一定能直接测试 `Cloudflare Pages Functions`
- ` /api/site-stats ` 真实统计接口需要部署到 Cloudflare Pages 后才可访问
- ` /api/models ` 真实模型接口需要部署到 Cloudflare Pages 且 KV 中存在 `models:latest` 后才可返回实时数据
- ` /api/feedback ` 真实反馈接口需要部署到 Cloudflare Pages 且绑定 `FEEDBACK_KV` 后才会返回已确认反馈
- 如果你在本地控制台看到 `404`，通常是因为统计接口还没有部署，不是页面本身报错

## 常见问题

### Q: 为什么需要复制 functions 目录？

A: Next.js 的静态导出（`output: 'export'`）只会导出静态文件，不会自动复制 `functions` 目录。Cloudflare Pages Functions 需要放在构建输出目录中才能被识别和执行。

### Q: 如何获取 Resend API Key？

A: 
1. 访问 [Resend](https://resend.com/)
2. 注册/登录账号
3. 进入 **API Keys** 页面
4. 创建新的 API Key
5. 复制 API Key 并配置到 Cloudflare Pages 环境变量中

### Q: 部署后仍然无法发送邮件？

A: 检查以下几点：
1. ✅ `out/functions/api/send-email.ts` 文件是否存在
2. ✅ Cloudflare Pages 环境变量 `RESEND_API_KEY` 是否配置正确
3. ✅ 检查 Cloudflare Pages Functions 日志中的错误信息
4. ✅ 确认 Resend API Key 是否有效（可以在 Resend 控制台查看使用情况）

### Q: 如何验证真实反馈双重授权？

A: 按以下链路检查：
1. ✅ 用户提交反馈时勾选公开展示授权
2. ✅ 站点向用户邮箱发送确认邮件
3. ✅ 用户点击 `/api/feedback/confirm?token=...` 确认链接
4. ✅ KV 中出现 `email-feedback:confirmed:index` 和 `email-feedback:confirmed:...`
5. ✅ 首页反馈滚动区通过 `/api/feedback` 读取已确认、已脱敏的反馈

### Q: 为什么站点统计接口返回 404？

A: 通常是以下原因之一：
1. ✅ 当前还在本地开发环境，不是在 Cloudflare Pages 上访问
2. ✅ `out/functions/api/site-stats.ts` 没有被复制到构建输出目录
3. ✅ Cloudflare Pages 项目尚未重新部署
4. ✅ `SITE_STATS_KV` 绑定尚未在 Pages 项目中正确配置
5. ✅ 访问的是静态导出内容，但对应 Functions 还未生效

### Q: 如何验证站点统计是否部署成功？

A: 检查以下几点：
1. ✅ `out/functions/api/site-stats.ts` 文件是否存在
2. ✅ Cloudflare Pages 项目中已绑定 `SITE_STATS_KV`
3. ✅ 重新部署后，在 Pages 的 Functions 列表中可以看到 `api/site-stats`
4. ✅ 首次访问线上站点后，KV 中会自动出现：
   - `site-stats:totals`
   - `site-stats:visitor:...`

### Q: 为什么最新模型接口返回 fallback 或 404？

A: 通常是以下原因之一：
1. ✅ 当前还在本地开发环境，不是在 Cloudflare Pages 上访问
2. ✅ `out/functions/api/models.ts` 没有被复制到构建输出目录
3. ✅ Pages 项目未绑定 `SITE_STATS_KV`
4. ✅ `model-updater` Worker 尚未成功写入 `models:latest`
5. ✅ 前端会自动回退到 `data/models.json`，这属于预期降级链路

## 文件结构

部署后的文件结构应该是：

```
out/
├── _next/
├── ...
└── functions/          ← 这个目录必须存在
    └── api/
        ├── feedback/
        │   ├── confirm.ts
        │   └── index.ts
        ├── models.ts
        ├── send-email.ts
        └── site-stats.ts
```

## 参考

- [Cloudflare Pages Functions 文档](https://developers.cloudflare.com/pages/platform/functions/)
- [Resend API 文档](https://resend.com/docs/api-reference/emails/send-email)
- [Cloudflare Workers KV 文档](https://developers.cloudflare.com/kv/)
