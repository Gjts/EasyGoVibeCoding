# Cloudflare Pages 部署指南

## 问题说明

**为什么 Easy-GO-Web3 可以发送邮件，但 EasyGoVibeCoding 发送不了？**

主要原因是：**Cloudflare Pages Functions 需要放在构建输出目录（`out`）中才能生效**。

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

## 文件结构

部署后的文件结构应该是：

```
out/
├── _next/
├── api/
├── ...
└── functions/          ← 这个目录必须存在
    └── api/
        └── send-email.ts
```

## 参考

- [Cloudflare Pages Functions 文档](https://developers.cloudflare.com/pages/platform/functions/)
- [Resend API 文档](https://resend.com/docs/api-reference/emails/send-email)
