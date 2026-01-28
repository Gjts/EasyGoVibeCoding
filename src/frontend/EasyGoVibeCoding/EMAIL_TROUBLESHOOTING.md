# 邮件发送问题排查指南

## 问题：EasyGoVibeCoding 发送邮件失败，但 Easy-GO-Web3 可以成功

## 快速检查清单

### 1. ✅ 检查 Cloudflare Pages 环境变量配置

**步骤：**
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages** → 选择 `easy-go-vibe-coding` 项目
3. 进入 **Settings** → **Environment variables**
4. 确认以下环境变量已配置：
   - **变量名**：`RESEND_API_KEY`（必须完全匹配，区分大小写）
   - **值**：你的 Resend API Key
   - **环境**：确保在 **Production**、**Preview** 和 **Branch deployments** 中都添加了

**验证方法：**
- 在 Cloudflare Pages 控制台的 **Functions** 标签页中查看日志
- 如果看到 "Missing RESEND_API_KEY" 错误，说明环境变量未配置

### 2. ✅ 检查 Functions 是否正确部署

**步骤：**
1. 在 Cloudflare Pages 控制台，进入 **Functions** 标签页
2. 确认能看到 `api/send-email` 函数
3. 如果看不到，说明 functions 文件没有被正确部署

**解决方法：**
```bash
# 重新构建并部署
cd src/frontend/EasyGoVibeCoding
npm run build
npm run pages:deploy
```

**验证文件结构：**
部署后，`out` 目录应该包含：
```
out/
└── functions/
    └── api/
        └── send-email.ts
```

### 3. ✅ 检查构建脚本

确认 `package.json` 中有 `postbuild` 脚本：
```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "node scripts/copy-functions.js"
  }
}
```

### 4. ✅ 检查 Resend API Key 是否有效

**步骤：**
1. 访问 [Resend Dashboard](https://resend.com/api-keys)
2. 确认 API Key 状态为 **Active**
3. 检查 API Key 的使用限制和配额

**测试 API Key：**
```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "onboarding@resend.dev",
    "to": ["1301385382gjts@gmail.com"],
    "subject": "Test Email",
    "html": "<p>Test</p>"
  }'
```

### 5. ✅ 检查浏览器控制台错误

**步骤：**
1. 打开网站的联系表单页面
2. 打开浏览器开发者工具（F12）
3. 切换到 **Console** 标签页
4. 填写表单并提交
5. 查看是否有错误信息

**常见错误：**
- `Failed to fetch` - 可能是 CORS 问题或网络问题
- `500 Internal Server Error` - 服务器端错误，检查 Cloudflare Functions 日志
- `400 Bad Request` - 请求格式错误，检查表单数据

### 6. ✅ 检查 Cloudflare Functions 日志

**步骤：**
1. 在 Cloudflare Pages 控制台，进入 **Functions** 标签页
2. 点击 `api/send-email` 函数
3. 查看 **Logs** 标签页
4. 查看最近的错误日志

**常见日志信息：**
- `Missing RESEND_API_KEY` - 环境变量未配置
- `Resend HTTP error: 401` - API Key 无效或过期
- `Resend HTTP error: 422` - 请求参数错误
- `Resend HTTP error: 429` - API 调用频率限制

## 对比 Easy-GO-Web3 项目

### 检查 Easy-GO-Web3 的配置

1. **环境变量配置：**
   - 在 Cloudflare Pages 中检查 `easy-go-web3` 项目的环境变量
   - 确认 `RESEND_API_KEY` 已配置

2. **Functions 部署：**
   - 检查 `easy-go-web3` 项目的 Functions 是否正常部署
   - 对比两个项目的部署配置

3. **代码差异：**
   - 两个项目的 `functions/api/send-email.ts` 代码应该相同
   - 如果不同，需要同步代码

## 解决方案

### 方案 1：重新配置环境变量

1. 在 Cloudflare Pages 控制台中删除旧的 `RESEND_API_KEY` 环境变量
2. 重新添加环境变量，确保：
   - 变量名完全匹配：`RESEND_API_KEY`
   - 值正确（没有多余的空格）
   - 在所有环境中都配置了（Production、Preview、Branch deployments）
3. 重新部署项目

### 方案 2：重新部署 Functions

```bash
# 清理旧的构建文件
rm -rf out

# 重新构建
npm run build

# 验证 functions 是否被复制
ls -la out/functions/api/send-email.ts

# 重新部署
npm run pages:deploy
```

### 方案 3：使用相同的 Resend API Key

如果 Easy-GO-Web3 可以正常工作，可以：
1. 在 Cloudflare Pages 控制台中查看 `easy-go-web3` 项目的环境变量
2. 复制相同的 `RESEND_API_KEY` 值
3. 在 `easy-go-vibe-coding` 项目中使用相同的 API Key

## 改进的代码特性

最新版本的 `functions/api/send-email.ts` 包含以下改进：

1. **CORS 支持** - 支持跨域请求
2. **详细的错误日志** - 记录更多调试信息
3. **邮箱格式验证** - 客户端和服务器端双重验证
4. **更好的错误信息** - 返回详细的错误描述，便于排查问题

## 测试步骤

1. **本地测试：**
   ```bash
   # 创建 .env.local 文件
   echo "RESEND_API_KEY=your_api_key_here" > .env.local
   
   # 构建项目
   npm run build
   
   # 使用 wrangler 本地测试
   wrangler pages dev out
   ```

2. **生产环境测试：**
   - 部署后，访问网站的联系表单
   - 填写测试信息并提交
   - 检查 Cloudflare Functions 日志
   - 检查邮箱是否收到邮件

## 联系支持

如果以上步骤都无法解决问题，请提供以下信息：

1. Cloudflare Pages Functions 日志（最近的错误日志）
2. 浏览器控制台错误信息
3. 环境变量配置截图（隐藏敏感信息）
4. Resend API Key 状态（是否有效、是否有配额限制）
