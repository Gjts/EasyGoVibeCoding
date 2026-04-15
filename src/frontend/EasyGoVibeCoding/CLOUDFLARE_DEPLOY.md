# Cloudflare Pages 部署指南

## 问题说明

**为什么 Easy-GO-Web3 可以发送邮件，但 EasyGoVibeCoding 发送不了？**

主要原因是：**Cloudflare Pages Functions 需要放在构建输出目录（`out`）中才能生效**。

**为什么本地会出现 `Failed to fetch site stats: 404`？**

这是因为站点统计接口 ` /api/site-stats ` 也是通过 **Cloudflare Pages Functions** 提供的。  
在本地使用 Next.js 开发模式、静态导出预览，或尚未部署到 Cloudflare Pages 时，这个接口并不存在，所以会返回 `404`。  
这属于预期现象，不代表统计功能代码本身有问题。

只有在以下条件满足后，站点统计接口才会正常工作：

1. 项目已经构建完成
2. `functions` 已复制到 `out/functions`
3. 已部署到 **Cloudflare Pages**
4. Pages 项目中已绑定 `SITE_STATS_KV`

## 解决方案

### 1. 构建脚本已更新

已添加 `postbuild` 脚本，构建完成后会自动将 `functions` 目录复制到 `out/functions`。

### 2. 配置 Cloudflare Pages 环境变量

在 Cloudflare Pages 控制台中配置以下环境变量：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入你的 Pages 项目
3. 进入 **Settings** → **Environment variables**
4. 添加以下环境变量：

```
RESEND_API_KEY = 你的_Resend_API_密钥
```

**重要**：
- 确保在 **Production**、**Preview** 和 **Branch deployments** 中都添加了环境变量
- 环境变量名称必须完全匹配：`RESEND_API_KEY`（区分大小写）

### 3. 验证部署

部署后，检查以下内容：

1. **检查 Functions 是否部署**：
   - 在 Cloudflare Pages 控制台的 **Functions** 标签页中，应该能看到 `api/send-email` 函数

2. **检查环境变量**：
   - 在 **Settings** → **Environment variables** 中确认 `RESEND_API_KEY` 已配置

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
npm run build
npm run pages:deploy
```

**注意：**

- 本地可以测试页面渲染和普通前端逻辑
- 本地不一定能直接测试 `Cloudflare Pages Functions`
- ` /api/site-stats ` 真实统计接口需要部署到 Cloudflare Pages 后才可访问
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

## 文件结构

部署后的文件结构应该是：

```
out/
├── _next/
├── api/
├── ...
└── functions/          ← 这个目录必须存在
    └── api/
        ├── send-email.ts
        └── site-stats.ts
```

## 参考

- [Cloudflare Pages Functions 文档](https://developers.cloudflare.com/pages/platform/functions/)
- [Resend API 文档](https://resend.com/docs/api-reference/emails/send-email)
