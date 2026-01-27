import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Wrench, Workflow, FileCode, Link2, Zap, CheckCircle2, TrendingUp, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "实践篇概述", href: "/practice" },
  { title: "文科生 / 商科生项目", href: "/practice/humanities" },
  { title: "理工科学生项目", href: "/practice/engineering" },
  { title: "职场人士项目", href: "/practice/professional" },
  { title: "核心技能：AI Agent 开发", href: "/practice/agent" },
  { title: "核心技能：全栈项目实战", href: "/practice/fullstack" },
  { title: "核心技能：工具与效率", href: "/practice/efficiency" },
]

export default function EfficiencyPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
      currentChapter="核心技能：工具与效率"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 6 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          核心技能：工具与效率
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握工作流设计方法，学会编写自动化脚本，理解工具链集成的架构设计，通过系统化的方法提升开发效率。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 工作流设计 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Workflow className="h-6 w-6 text-primary" />
            工作流设计
          </h2>
          <p className="text-muted-foreground mb-6">
            工作流设计是提升效率的关键。通过系统化的分析和优化，识别瓶颈，自动化重复任务，提升整体效率。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">工作流分析</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">识别重复任务</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>记录工作日志</strong>：记录一周的工作内容，识别重复模式</li>
                    <li>• <strong>时间分析</strong>：统计每个任务的时间消耗，找出时间黑洞</li>
                    <li>• <strong>自动化候选</strong>：识别可以自动化的重复任务</li>
                    <li>• <strong>工具评估</strong>：评估自动化工具的成本和收益</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">识别瓶颈环节</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>流程映射</strong>：绘制完整的工作流程图</li>
                    <li>• <strong>时间测量</strong>：测量每个环节的时间</li>
                    <li>• <strong>瓶颈识别</strong>：找出耗时最长的环节</li>
                    <li>• <strong>优化方案</strong>：设计优化方案（并行化、缓存、优化算法）</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">工作流分析示例</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong>开发工作流</strong>：</p>
                    <p>1. 创建分支（2分钟）</p>
                    <p>2. 编写代码（2小时）</p>
                    <p>3. 运行测试（5分钟）</p>
                    <p>4. 提交代码（2分钟）</p>
                    <p>5. 创建PR（3分钟）</p>
                    <p>6. 等待审查（30分钟-2小时）← 瓶颈</p>
                    <p>7. 修复问题（30分钟）</p>
                    <p>8. 合并代码（1分钟）</p>
                    <p className="mt-2"><strong>优化方案</strong>：使用AI工具进行代码审查，减少等待时间</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">工作流优化</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">自动化</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 自动化重复任务</li>
                    <li>• 使用脚本和工具</li>
                    <li>• 减少人工干预</li>
                    <li>• 提升一致性</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">并行化</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 识别可并行任务</li>
                    <li>• 使用并行工具</li>
                    <li>• 减少等待时间</li>
                    <li>• 提升吞吐量</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">缓存</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 缓存重复计算</li>
                    <li>• 缓存API响应</li>
                    <li>• 减少重复工作</li>
                    <li>• 提升响应速度</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 实战案例 */}
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4">实战案例：开发工作流优化</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">优化前</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• 手动创建分支、提交代码</li>
                    <li>• 手动运行测试</li>
                    <li>• 手动创建PR</li>
                    <li>• 等待人工代码审查</li>
                    <li>• 手动部署</li>
                    <li><strong>总时间</strong>：约4-6小时（包含等待时间）</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">优化后</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• 使用Git alias快速创建分支</li>
                    <li>• CI/CD自动运行测试</li>
                    <li>• 使用GitHub CLI自动创建PR</li>
                    <li>• 使用AI工具进行代码审查</li>
                    <li>• 自动部署到测试环境</li>
                    <li><strong>总时间</strong>：约2-3小时（减少50%）</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">效率提升分析</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>时间节省</strong>：每次开发节省2-3小时</li>
                    <li>• <strong>质量提升</strong>：AI审查更全面，减少bug</li>
                    <li>• <strong>一致性</strong>：自动化确保流程一致</li>
                    <li>• <strong>ROI</strong>：自动化投入1天，每月节省20+小时</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 自动化脚本 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileCode className="h-6 w-6 text-primary" />
            自动化脚本
          </h2>
          <p className="text-muted-foreground mb-6">
            自动化脚本是提升效率的直接手段。通过编写脚本自动化重复任务，释放时间专注于创造性工作。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">脚本类型</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">构建脚本</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 编译代码</li>
                    <li>• 打包应用</li>
                    <li>• 生成资源</li>
                    <li>• 优化代码</li>
                  </ul>
                  <div className="mt-3 p-2 rounded bg-secondary font-mono text-xs">
                    npm run build
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">部署脚本</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 环境配置</li>
                    <li>• 文件上传</li>
                    <li>• 服务重启</li>
                    <li>• 健康检查</li>
                  </ul>
                  <div className="mt-3 p-2 rounded bg-secondary font-mono text-xs">
                    ./deploy.sh production
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">测试脚本</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 运行测试</li>
                    <li>• 生成报告</li>
                    <li>• 代码覆盖率</li>
                    <li>• 性能测试</li>
                  </ul>
                  <div className="mt-3 p-2 rounded bg-secondary font-mono text-xs">
                    npm test -- --coverage
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">脚本设计原则</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">可维护性</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>清晰命名</strong>：使用有意义的变量名和函数名</li>
                    <li>• <strong>注释充分</strong>：解释复杂逻辑和设计决策</li>
                    <li>• <strong>模块化</strong>：将脚本拆分为可复用的函数</li>
                    <li>• <strong>配置化</strong>：使用配置文件，避免硬编码</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">可扩展性</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>参数化</strong>：使用命令行参数或配置文件</li>
                    <li>• <strong>插件化</strong>：支持插件扩展功能</li>
                    <li>• <strong>版本管理</strong>：使用版本控制管理脚本</li>
                    <li>• <strong>向后兼容</strong>：保持API兼容性</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">错误处理</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>错误检查</strong>：检查命令执行结果</li>
                    <li>• <strong>错误信息</strong>：提供清晰的错误信息</li>
                    <li>• <strong>回滚机制</strong>：失败时能够回滚</li>
                    <li>• <strong>日志记录</strong>：记录执行过程和错误</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 实战案例 */}
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4">实战案例：CI/CD自动化脚本</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">GitHub Actions工作流</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre>{`name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          ./scripts/deploy.sh production`}</pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">部署脚本示例</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre>{`#!/bin/bash
# deploy.sh - 自动化部署脚本

set -e  # 遇到错误立即退出

ENV=\${1:-staging}
echo "Deploying to \$ENV..."

# 检查环境变量
if [ -z "\$DEPLOY_KEY" ]; then
  echo "Error: DEPLOY_KEY not set"
  exit 1
fi

# 构建应用
echo "Building application..."
npm run build

# 上传文件
echo "Uploading files..."
rsync -avz --delete dist/ user@server:/var/www/app/

# 重启服务
echo "Restarting service..."
ssh user@server "sudo systemctl restart app"

# 健康检查
echo "Health check..."
sleep 5
if curl -f http://server/health; then
  echo "Deployment successful!"
else
  echo "Deployment failed!"
  exit 1
fi`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 工具链集成 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Link2 className="h-6 w-6 text-primary" />
            工具链集成
          </h2>
          <p className="text-muted-foreground mb-6">
            工具链集成将多个工具连接起来，形成完整的工作流，实现数据流转和事件触发，提升整体效率。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">集成架构</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">工具间的数据流转</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                    Git → GitHub → CI/CD → 测试工具 → 部署工具 → 监控工具
                  </div>
                  <p className="ml-4 mt-2">数据在工具链中流动，每个工具处理数据的一部分，最终完成整个流程。</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">事件触发机制</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>Git Push</strong> → 触发CI/CD</li>
                    <li>• <strong>PR创建</strong> → 触发代码审查</li>
                    <li>• <strong>测试通过</strong> → 触发部署</li>
                    <li>• <strong>部署完成</strong> → 触发通知</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">集成模式</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">API集成</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 通过REST API调用</li>
                    <li>• 标准化接口</li>
                    <li>• 易于实现</li>
                    <li>• 适合：实时交互</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">Webhook集成</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 事件驱动</li>
                    <li>• 异步处理</li>
                    <li>• 解耦设计</li>
                    <li>• 适合：事件通知</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">文件集成</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 通过文件交换</li>
                    <li>• 简单直接</li>
                    <li>• 适合批处理</li>
                    <li>• 适合：数据导入导出</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4">效率提升：量化方法</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">ROI分析</h4>
                  <div className="p-3 rounded-lg bg-secondary/50 ml-4">
                    <p className="mb-2"><strong>投入</strong>：</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 工具链集成开发时间：20小时</li>
                      <li>• 工具订阅费用：$100/月</li>
                      <li>• 维护时间：2小时/月</li>
                    </ul>
                    <p className="mt-2 mb-2"><strong>收益</strong>：</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 每次部署节省时间：30分钟</li>
                      <li>• 每月部署次数：20次</li>
                      <li>• 每月节省时间：10小时</li>
                      <li>• 减少错误率：50%</li>
                    </ul>
                    <p className="mt-2"><strong>ROI</strong>：10小时/月 × $50/小时 = $500/月，投入$100/月，净收益$400/月</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">效率指标</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>时间节省</strong>：测量自动化前后的时间差异</li>
                    <li>• <strong>错误率</strong>：统计自动化前后的错误率</li>
                    <li>• <strong>吞吐量</strong>：测量单位时间内完成的任务数</li>
                    <li>• <strong>满意度</strong>：团队对工具链的满意度</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 实战案例 */}
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">实战案例：完整工具链集成方案</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">工具链组成</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                    Cursor (开发) →<br/>
                    GitHub (版本控制) →<br/>
                    GitHub Actions (CI/CD) →<br/>
                    Continue.dev (代码审查) →<br/>
                    Vercel (部署) →<br/>
                    Sentry (监控) →<br/>
                    Slack (通知)
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">集成流程</h4>
                  <ol className="space-y-1 ml-4">
                    <li>1. 在Cursor中开发代码</li>
                    <li>2. 提交代码到GitHub</li>
                    <li>3. GitHub Actions自动触发CI/CD</li>
                    <li>4. Continue.dev自动进行代码审查</li>
                    <li>5. 测试通过后自动部署到Vercel</li>
                    <li>6. Sentry监控应用错误</li>
                    <li>7. 部署完成通知到Slack</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">效率提升</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>部署时间</strong>：从30分钟减少到5分钟（减少83%）</li>
                    <li>• <strong>错误率</strong>：从10%减少到2%（减少80%）</li>
                    <li>• <strong>响应时间</strong>：问题发现时间从1小时减少到5分钟</li>
                    <li>• <strong>团队满意度</strong>：从6/10提升到9/10</li>
                  </ul>
                </div>
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
                掌握工作流设计的方法，能够识别重复任务和瓶颈环节，设计优化方案
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够编写自动化脚本，掌握脚本设计原则（可维护性、可扩展性、错误处理）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解工具链集成的架构设计，能够设计工具间的数据流转和事件触发机制
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握效率提升的量化方法，能够进行ROI分析和效率指标测量
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                具备系统化提升效率的能力，能够持续优化工作流和工具链
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/practice/fullstack" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：核心技能：全栈项目实战
          </Link>
        </Button>
        <Button asChild>
          <Link href="/practice" className="flex items-center gap-2">
            返回：实践篇概述
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
