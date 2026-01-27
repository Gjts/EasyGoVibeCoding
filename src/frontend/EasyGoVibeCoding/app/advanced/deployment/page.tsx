import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Rocket, Settings, Activity, AlertCircle, Zap, Sparkles, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const chapters = [
  { title: "序：从工具到架构的 100 小时", href: "/advanced" },
  { title: "环境搭建与代码运行基础", href: "/advanced/environment" },
  { title: "AI 使用说明书", href: "/advanced/ai-guide" },
  { title: "PRD 与文档驱动", href: "/advanced/prd" },
  { title: "AI 原生开发模式", href: "/advanced/ai-native-patterns" },
  { title: "AI 适配架构范式", href: "/advanced/ai-architecture-patterns" },
  { title: "开发常识", href: "/advanced/dev-basics" },
  { title: "界面交互", href: "/advanced/ui" },
  { title: "数据持久化", href: "/advanced/data" },
  { title: "测试与质量", href: "/advanced/testing" },
  { title: "部署与运维", href: "/advanced/deployment" },
]

export default function DeploymentPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="部署与运维"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 10 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          部署与运维
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握如何利用 AI 提升部署效率和运维质量，学习 AI 辅助部署配置、环境管理、监控告警、故障诊断等最佳实践。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 0: 序言 - 结构化思考方法 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              使用 Sequential Thinking 学习 AI 驱动的部署与运维
            </p>
            <p className="text-muted-foreground mb-4">
              AI 在部署与运维中的应用涉及多个层面，使用<strong className="text-foreground">结构化思考方法</strong>可以帮助你系统掌握：
            </p>
            <div className="space-y-3">
              {[
                { step: "1", title: "部署策略概览", desc: "静态部署、容器化、Serverless 快速了解" },
                { step: "2", title: "AI 辅助部署配置", desc: "Dockerfile、CI/CD、Kubernetes 配置生成" },
                { step: "3", title: "AI 辅助环境管理", desc: "环境变量生成、配置优化、密钥管理" },
                { step: "4", title: "AI 驱动的监控告警", desc: "异常检测、性能预测、智能告警" },
                { step: "5", title: "AI 辅助故障诊断", desc: "故障定位、修复建议、预防措施" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {item.step}
                  </span>
                  <div>
                    <div className="font-medium text-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: 部署策略概览 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            部署策略概览
          </h2>
          <p className="text-muted-foreground mb-6">
            快速了解部署方式，为 AI 实践提供背景知识。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">静态部署</h3>
              <p className="text-sm text-muted-foreground">
                适合静态网站、SPA 应用（Vercel、Netlify、GitHub Pages）
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">容器化部署</h3>
              <p className="text-sm text-muted-foreground">
                使用 Docker 打包应用，灵活部署（Docker、Kubernetes）
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Serverless 部署</h3>
              <p className="text-sm text-muted-foreground">
                按需运行，自动扩缩容（Vercel Functions、AWS Lambda）
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: AI 在部署与运维中的最佳实践 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI 在部署与运维中的最佳实践
          </h2>
          <p className="text-muted-foreground mb-6">
            利用 AI 提升部署效率和运维质量，从部署配置到故障诊断的全流程 AI 辅助实践。
          </p>

          <Tabs defaultValue="deployment" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-6">
              <TabsTrigger value="deployment">部署配置</TabsTrigger>
              <TabsTrigger value="environment">环境管理</TabsTrigger>
              <TabsTrigger value="monitoring">监控告警</TabsTrigger>
              <TabsTrigger value="logging">日志分析</TabsTrigger>
              <TabsTrigger value="diagnosis">故障诊断</TabsTrigger>
              <TabsTrigger value="automation">运维自动化</TabsTrigger>
            </TabsList>

            {/* AI 辅助部署配置 */}
            <TabsContent value="deployment" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助部署配置</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">使用 AI 生成 Dockerfile</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      向 AI 描述应用需求，让它生成优化的 Dockerfile：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要为 Next.js 16 应用生成 Dockerfile，要求：
1. 使用多阶段构建优化镜像大小
2. 使用 Node.js 18 Alpine 镜像
3. 安装 pnpm 作为包管理器
4. 构建生产版本
5. 使用非 root 用户运行
6. 暴露 3000 端口
7. 优化构建缓存

请生成：
- 完整的 Dockerfile
- .dockerignore 文件
- 构建和运行说明`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的 Dockerfile 示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`# Dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 复制源代码并构建
COPY . .
RUN pnpm build

# 运行阶段
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成 CI/CD 配置</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我需要为 Next.js 项目配置 GitHub Actions CI/CD 流程：

要求：
- 在 push 到 main 分支时自动部署
- 运行测试和 lint
- 构建 Docker 镜像
- 推送到 Docker Hub
- 部署到生产环境
- 支持回滚

请生成：
- .github/workflows/deploy.yml
- 包含所有必要的步骤和配置`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的 CI/CD 配置示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Build Docker image
        run: docker build -t myapp:${'{'}${'{'} github.sha ${'}'}${'}'} .
      
      - name: Push to Docker Hub
        run: docker push myapp:${'{'}${'{'} github.sha ${'}'}${'}'}
      
      - name: Deploy to production
        run: |
          # 部署脚本
          kubectl set image deployment/myapp myapp=myapp:${'{'}${'{'} github.sha ${'}'}${'}'}`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成 Kubernetes 配置</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我需要为 Next.js 应用生成 Kubernetes 配置：

要求：
- Deployment：3 个副本，自动扩缩容（2-10）
- Service：NodePort 类型
- Ingress：使用 nginx，支持 HTTPS
- ConfigMap：环境变量配置
- 资源限制：CPU 500m，内存 512Mi

请生成所有必要的 YAML 配置文件。`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助环境管理 */}
            <TabsContent value="environment" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助环境管理</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成环境变量配置</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 生成完整的环境变量配置：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要为 Next.js + PostgreSQL + Redis 应用生成环境变量配置：

应用需求：
- 数据库连接（PostgreSQL）
- Redis 缓存
- JWT 密钥
- API 密钥
- 第三方服务（邮件、支付）

请生成：
- .env.example（示例文件，不含敏感信息）
- .env.local（本地开发配置模板）
- 环境变量说明文档
- 密钥生成建议`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的环境变量示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`# .env.example
# 数据库配置
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# Redis 配置
REDIS_URL=redis://localhost:6379
REDIS_TTL=3600

# JWT 配置
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# API 密钥
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG....

# 应用配置
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 优化配置文件</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

优化以下配置文件，使其更安全、更易维护：

[粘贴配置文件]

请：
1. 识别安全问题（硬编码密钥、敏感信息）
2. 提取可配置项
3. 添加配置验证
4. 提供优化建议`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助密钥管理</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

我需要为生产环境设置密钥管理方案：

需求：
- 存储数据库密码、API 密钥
- 支持密钥轮换
- 不同环境隔离
- 访问审计

请推荐：
- 密钥管理服务（AWS Secrets Manager、Vercel Env、HashiCorp Vault）
- 密钥轮换策略
- 访问控制方案`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 驱动的监控告警 */}
            <TabsContent value="monitoring" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 驱动的监控告警</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 异常检测和预测</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      将监控数据提供给 AI，让它检测异常并预测问题：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

分析以下监控数据，检测异常并预测潜在问题：

监控指标（过去 24 小时）：
- CPU 使用率：平均 45%，峰值 85%
- 内存使用率：平均 60%，峰值 90%
- 响应时间：平均 200ms，峰值 2s
- 错误率：平均 0.5%，峰值 5%
- 请求量：平均 1000/分钟，峰值 5000/分钟

请分析：
1. 是否存在异常模式？
2. 预测可能的问题（资源不足、性能瓶颈）
3. 建议的告警阈值
4. 优化建议`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 性能预测和优化建议</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`分析结果：

异常检测：
- 内存使用率在峰值时接近上限（90%），存在 OOM 风险
- 响应时间峰值（2s）是平均值的 10 倍，可能存在性能瓶颈
- 错误率峰值（5%）异常高，需要关注

预测：
- 如果请求量继续增长，可能在 2 小时内出现内存不足
- 响应时间可能进一步恶化

优化建议：
1. 增加内存限制或优化内存使用
2. 优化慢查询和 API 响应
3. 设置告警：内存 > 80%，响应时间 > 1s，错误率 > 1%`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 智能告警规则生成</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

根据以下应用特点，生成智能告警规则：

应用类型：Next.js + PostgreSQL + Redis
业务特点：
- 用户主要在白天活跃（9:00-22:00）
- 周末流量较低
- 促销活动时流量激增

请生成：
- Prometheus 告警规则
- 告警通知策略（邮件、Slack、PagerDuty）
- 告警分级（Critical、Warning、Info）`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助日志分析 */}
            <TabsContent value="logging" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助日志分析</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 日志解析和结构化</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 解析非结构化日志，提取关键信息：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

解析以下日志，提取关键信息并结构化：

日志内容：
[2024-01-15 10:23:45] ERROR: Database connection failed
[2024-01-15 10:23:46] WARN: Retrying connection...
[2024-01-15 10:23:50] ERROR: Connection timeout after 5s
[2024-01-15 10:23:51] INFO: Falling back to cache

请：
1. 提取时间戳、日志级别、消息
2. 识别错误模式
3. 生成结构化 JSON
4. 分析错误原因`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 错误模式识别</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

分析以下错误日志，识别错误模式：

[粘贴大量错误日志]

请：
1. 识别重复出现的错误模式
2. 统计错误频率
3. 分析错误关联性
4. 提供错误分类和优先级`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 根因分析</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

根据以下日志和监控数据，分析系统故障的根本原因：

故障时间：2024-01-15 10:00-10:30
错误日志：
[粘贴错误日志]

监控数据：
- CPU：100%
- 内存：95%
- 数据库连接数：500/500（满）
- 响应时间：10s+

请：
1. 分析故障的根本原因
2. 识别故障链（哪些问题导致了其他问题）
3. 提供修复建议
4. 建议预防措施`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助故障诊断 */}
            <TabsContent value="diagnosis" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助故障诊断</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 故障定位和诊断</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      将故障现象提供给 AI，让它定位问题：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

系统出现以下故障现象：

症状：
- 用户无法登录
- API 响应 500 错误
- 数据库查询超时
- 服务器 CPU 100%

时间线：
- 10:00 - 部署新版本
- 10:05 - 开始出现错误
- 10:15 - 错误率激增

请：
1. 分析可能的故障原因
2. 提供诊断步骤
3. 建议检查项
4. 提供临时解决方案`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成修复建议</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`诊断结果：

根本原因：
- 新版本代码存在内存泄漏
- 数据库连接未正确释放
- 导致连接池耗尽，CPU 100%

修复建议：
1. 立即回滚到上一版本
2. 修复内存泄漏代码
3. 添加连接池监控
4. 增加数据库连接数限制

临时解决方案：
- 重启应用服务
- 清理数据库连接
- 增加服务器资源`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 预防措施建议</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

根据以下故障历史，提供预防措施：

故障历史：
1. 内存泄漏导致 OOM（3 次）
2. 数据库连接池耗尽（5 次）
3. 第三方 API 超时（2 次）

请：
1. 分析故障模式
2. 提供预防措施
3. 建议监控指标
4. 生成运维检查清单`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助运维自动化 */}
            <TabsContent value="automation" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助运维自动化</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成运维脚本</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 生成常用的运维脚本：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要一个运维脚本，功能如下：
1. 检查服务器资源使用（CPU、内存、磁盘）
2. 检查应用健康状态（健康检查接口）
3. 检查数据库连接
4. 生成健康报告
5. 如果发现问题，发送告警

请生成：
- Shell 脚本（bash）
- 包含错误处理
- 支持配置文件
- 添加日志记录`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的运维脚本示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`#!/bin/bash
# health-check.sh

set -e

LOG_FILE="/var/log/health-check.log"
ALERT_EMAIL="ops@example.com"

log() {
  echo "[${'$'}(date +'%Y-%m-%d %H:%M:%S')] ${'$'}1" | tee -a "${'$'}LOG_FILE"
}

check_cpu() {
  local cpu_usage=${'$'}(top -bn1 | grep "Cpu(s)" | awk '{print ${'$'}2}' | cut -d'%' -f1)
  if (( ${'$'}(echo "${'$'}cpu_usage > 80" | bc -l) )); then
    log "WARNING: CPU usage is ${'$'}{cpu_usage}%"
    return 1
  fi
  return 0
}

check_memory() {
  local mem_usage=${'$'}(free | grep Mem | awk '{printf "%.0f", ${'$'}3/${'$'}2 * 100}')
  if [ "${'$'}mem_usage" -gt 80 ]; then
    log "WARNING: Memory usage is ${'$'}{mem_usage}%"
    return 1
  fi
  return 0
}

check_app() {
  if ! curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    log "ERROR: Application health check failed"
    return 1
  fi
  return 0
}

# 执行检查
check_cpu && check_memory && check_app
if [ ${'$'}? -ne 0 ]; then
  echo "Health check failed" | mail -s "Alert" "${'$'}ALERT_EMAIL"
  exit 1
fi

log "Health check passed"`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 优化运维流程</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

优化以下运维流程：

当前流程：
1. 手动检查服务器状态
2. 手动备份数据库
3. 手动清理日志
4. 手动更新文档

请：
1. 识别可以自动化的步骤
2. 提供自动化方案
3. 生成自动化脚本
4. 建议监控和告警`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成运维文档</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

根据以下系统信息，生成运维文档：

系统架构：
- Next.js 应用（3 个实例）
- PostgreSQL 数据库（主从）
- Redis 缓存
- Nginx 负载均衡

请生成：
- 部署流程文档
- 故障处理手册
- 运维检查清单
- 应急响应流程`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Section 3: 环境配置基础 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            环境配置基础
          </h2>
          <p className="text-muted-foreground mb-6">
            核心概念：环境变量管理、配置文件、密钥管理。详细实践请参考上方"AI 辅助环境管理"章节。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">环境变量管理</h3>
              <p className="text-sm text-muted-foreground">
                使用 .env 文件管理本地配置，生产环境通过平台配置注入
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">配置文件</h3>
              <p className="text-sm text-muted-foreground">
                环境分离（development、staging、production），配置验证和文档
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">密钥管理</h3>
              <p className="text-sm text-muted-foreground">
                使用密钥管理服务（AWS Secrets Manager、Vercel Env），定期轮换
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: 监控与日志基础 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            监控与日志基础
          </h2>
          <p className="text-muted-foreground mb-6">
            核心概念：应用监控、错误追踪、日志管理、性能监控。详细实践请参考上方"AI 驱动的监控告警"和"AI 辅助日志分析"章节。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">应用监控</h3>
              <p className="text-sm text-muted-foreground">
                性能指标（响应时间、吞吐量、错误率）、资源使用（CPU、内存、磁盘）、业务指标
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">错误追踪</h3>
              <p className="text-sm text-muted-foreground">
                自动捕获异常、堆栈追踪、用户上下文、告警通知（Sentry、Datadog）
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">日志管理</h3>
              <p className="text-sm text-muted-foreground">
                日志级别（DEBUG、INFO、WARN、ERROR）、结构化日志（JSON）、日志聚合和检索
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">性能监控</h3>
              <p className="text-sm text-muted-foreground">
                APM（应用性能监控）、慢查询分析、前端性能（Core Web Vitals）、实时监控
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: 运维实践基础 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-primary" />
            运维实践基础
          </h2>
          <p className="text-muted-foreground mb-6">
            核心概念：自动化部署、灾备方案、运维检查清单。详细实践请参考上方"AI 辅助运维自动化"和"AI 辅助故障诊断"章节。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">自动化部署</h3>
              <p className="text-sm text-muted-foreground">
                CI/CD pipeline、蓝绿部署、金丝雀发布、回滚机制
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">灾备方案</h3>
              <p className="text-sm text-muted-foreground">
                数据备份、故障转移、灾难恢复（RTO/RPO）、定期演练
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">运维检查清单</h3>
              <p className="text-sm text-muted-foreground">
                监控告警、日志收集、备份策略、回滚方案、文档更新
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: 实战示例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            实战示例
          </h2>
          <p className="text-muted-foreground mb-6">
            通过实际案例展示 AI 在部署与运维中的应用。
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">示例 1：AI 生成 Dockerfile 和 CI/CD 配置</h3>
              <p className="text-sm text-muted-foreground mb-4">
                使用 AI 为 Next.js 应用生成完整的部署配置：
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                <pre className="text-muted-foreground whitespace-pre-wrap">{`步骤 1：向 AI 描述需求
"我需要为 Next.js 16 应用生成 Dockerfile 和 GitHub Actions CI/CD 配置..."

步骤 2：AI 生成 Dockerfile
- 多阶段构建
- 优化镜像大小
- 非 root 用户运行

步骤 3：AI 生成 CI/CD 配置
- 自动测试和构建
- Docker 镜像推送
- 自动部署到生产环境

步骤 4：AI 优化配置
- 分析配置问题
- 提供优化建议
- 生成最佳实践文档`}</pre>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">示例 2：AI 驱动的监控告警</h3>
              <p className="text-sm text-muted-foreground mb-4">
                使用 AI 分析监控数据并生成告警规则：
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                <pre className="text-muted-foreground whitespace-pre-wrap">{`步骤 1：收集监控数据
- CPU、内存、响应时间、错误率
- 过去 24 小时的数据

步骤 2：AI 分析异常
- 识别异常模式
- 预测潜在问题
- 建议告警阈值

步骤 3：AI 生成告警规则
- Prometheus 告警规则
- 告警通知策略
- 告警分级（Critical、Warning、Info）

步骤 4：AI 优化建议
- 性能优化建议
- 资源扩容建议
- 预防措施`}</pre>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">示例 3：AI 辅助故障诊断</h3>
              <p className="text-sm text-muted-foreground mb-4">
                使用 AI 快速定位和修复系统故障：
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                <pre className="text-muted-foreground whitespace-pre-wrap">{`步骤 1：收集故障信息
- 错误日志
- 监控数据
- 故障时间线

步骤 2：AI 分析故障原因
- 识别根本原因
- 分析故障链
- 定位问题位置

步骤 3：AI 生成修复建议
- 临时解决方案
- 永久修复方案
- 预防措施

步骤 4：AI 生成运维文档
- 故障处理手册
- 运维检查清单
- 应急响应流程`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握使用 AI 生成 Dockerfile、CI/CD 配置、Kubernetes 配置等部署配置
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够使用 AI 辅助环境管理（环境变量生成、配置优化、密钥管理）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握 AI 驱动的监控告警（异常检测、性能预测、智能告警规则生成）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                能够使用 AI 辅助日志分析（日志解析、错误模式识别、根因分析）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                掌握 AI 辅助故障诊断（故障定位、修复建议、预防措施）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">6</span>
                能够使用 AI 辅助运维自动化（脚本生成、流程优化、文档生成）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/testing" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：测试与质量
          </Link>
        </Button>
        <Button variant="outline" disabled>
          已完成所有章节
        </Button>
      </div>
    </CourseLayout>
  )
}
