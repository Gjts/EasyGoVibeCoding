import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Layers, Sparkles, Brain, Settings, Globe, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "工具篇概述", href: "/tools" },
  { title: "IDE 类工具详解", href: "/tools/ide" },
  { title: "网页编辑类工具详解", href: "/tools/web" },
  { title: "命令行类工具详解", href: "/tools/cli" },
  { title: "核心技术深度解析", href: "/tools/core" },
  { title: "Fabric AI 增强框架", href: "/tools/fabric" },
  { title: "工具选型决策", href: "/tools/selection" },
  { title: "企业级实践", href: "/tools/enterprise" },
]

export default function FabricPage() {
  return (
    <CourseLayout
      title="工具篇"
      description="AI 编程工具深度解析"
      chapters={chapters}
      currentChapter="Fabric AI 增强框架"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 5 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Fabric AI 增强框架
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握 Fabric 框架的使用方法，理解 Patterns 系统和 Prompt 策略，能够创建自定义 Patterns 并集成到企业工作流中。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: Fabric 基础 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            Fabric 基础
          </h2>
          <p className="text-muted-foreground mb-6">
            Fabric 是一个 AI 增强框架，通过 Patterns 系统将复杂的 Prompt 工程简化为可复用的模式。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Fabric 哲学</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Fabric 的核心设计理念：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>模式化</strong>：将 Prompt 工程模式化，避免重复编写</li>
                <li>• <strong>可复用</strong>：Patterns 可以在不同场景中复用</li>
                <li>• <strong>可组合</strong>：多个 Patterns 可以组合使用</li>
                <li>• <strong>可扩展</strong>：轻松创建自定义 Patterns</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Patterns 系统</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Patterns 是 Fabric 的核心概念，每个 Pattern 代表一个可复用的 AI 能力：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>文本处理 Patterns</strong>：总结、翻译、提取信息</li>
                <li>• <strong>代码 Patterns</strong>：代码审查、重构、生成</li>
                <li>• <strong>分析 Patterns</strong>：数据分析、趋势预测</li>
                <li>• <strong>创作 Patterns</strong>：写作、创意生成</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">安装与配置</h3>
              <div className="space-y-2 text-sm text-muted-foreground font-mono">
                <div># 安装 Fabric</div>
                <div>pip install fabric-ai</div>
                <div className="mt-3"># 配置 API Key</div>
                <div>export FABRIC_API_KEY="your-api-key"</div>
                <div className="mt-3"># 第一个命令</div>
                <div>fabric --pattern summarize "your text"</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Patterns 使用 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Patterns 使用
          </h2>
          <p className="text-muted-foreground mb-6">
            掌握 Patterns 的使用技巧，提升 AI 工作效率。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">常见 Patterns 分类</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>文本处理</strong>：summarize、translate、extract</li>
                <li>• <strong>代码相关</strong>：review、refactor、generate</li>
                <li>• <strong>数据分析</strong>：analyze、predict、visualize</li>
                <li>• <strong>文档生成</strong>：document、explain、tutorial</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">使用技巧</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>组合使用</strong>：多个 Patterns 串联执行</li>
                <li>• <strong>参数传递</strong>：使用变量自定义行为</li>
                <li>• <strong>流式输出</strong>：实时查看处理进度</li>
                <li>• <strong>批量处理</strong>：一次处理多个文件</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">变量与参数</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Patterns 支持参数化，让同一个 Pattern 适应不同场景：
            </p>
            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm text-muted-foreground">
              <div>fabric --pattern translate \</div>
              <div>  --from en --to zh \</div>
              <div>  --style formal \</div>
              <div>  "your text"</div>
            </div>
          </div>
        </section>

        {/* Section 3: Prompt 策略 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Prompt 策略
          </h2>
          <p className="text-muted-foreground mb-6">
            Fabric 支持多种高级 Prompt 策略，提升 AI 输出质量。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Chain-of-Thought (CoT)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                让 AI 展示推理过程，提高复杂问题的准确性。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 逐步推理</li>
                <li>• 中间步骤可见</li>
                <li>• 适合复杂问题</li>
                <li>• 提高准确性</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Tree-of-Thought (ToT)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                探索多个推理路径，选择最佳方案。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 多路径探索</li>
                <li>• 路径评估</li>
                <li>• 最佳路径选择</li>
                <li>• 适合创意任务</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">Atom-of-Thought (AoT)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                将复杂问题分解为原子级思考单元。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 问题分解</li>
                <li>• 原子级处理</li>
                <li>• 结果组合</li>
                <li>• 适合系统性问题</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">策略选择指南</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>简单问题</strong>：直接提问，无需特殊策略</li>
              <li>• <strong>复杂推理</strong>：使用 CoT，展示推理过程</li>
              <li>• <strong>创意任务</strong>：使用 ToT，探索多种可能性</li>
              <li>• <strong>系统分析</strong>：使用 AoT，分解后处理</li>
            </ul>
          </div>
        </section>

        {/* Section 4: 自定义 Patterns */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            自定义 Patterns
          </h2>
          <p className="text-muted-foreground mb-6">
            创建自定义 Patterns，满足特定业务需求。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-3">创建自定义 Pattern</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">定义 Pattern</strong>：编写 Pattern 文件，包含指令和上下文
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">测试 Pattern</strong>：使用示例数据测试 Pattern 效果
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">优化迭代</strong>：根据测试结果优化 Pattern
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">分享使用</strong>：将 Pattern 添加到团队库
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Pattern 最佳实践</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 清晰的指令</li>
                <li>• 明确的输出格式</li>
                <li>• 示例和约束</li>
                <li>• 错误处理</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">团队 Patterns 管理</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 版本控制</li>
                <li>• 文档化</li>
                <li>• 评审机制</li>
                <li>• 使用统计</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: 多AI提供商与企业集成 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            多AI提供商与企业集成
          </h2>
          <p className="text-muted-foreground mb-6">
            配置多个 AI 提供商，实现企业级集成。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">多AI提供商配置</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 配置多个 API Key</li>
                <li>• 模型选择策略</li>
                <li>• 自动切换</li>
                <li>• 成本优化</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">本地模型（Ollama）</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 集成 Ollama</li>
                <li>• 本地模型使用</li>
                <li>• 隐私保护</li>
                <li>• 成本控制</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-3">REST API 与企业集成</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>REST API 服务器</strong>：启动 Fabric API 服务，供其他应用调用</li>
              <li>• <strong>Web 界面</strong>：提供 Web UI，方便非技术用户使用</li>
              <li>• <strong>Ollama 兼容模式</strong>：兼容 Ollama API，无缝切换</li>
              <li>• <strong>企业集成</strong>：集成到企业工作流和系统中</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">成本优化策略</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>任务分配</strong>：简单任务用轻量模型，复杂任务用强大模型</li>
              <li>• <strong>本地优先</strong>：优先使用本地模型（Ollama）</li>
              <li>• <strong>缓存机制</strong>：缓存常见 Pattern 的结果</li>
              <li>• <strong>使用监控</strong>：监控 API 调用和成本</li>
            </ul>
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
                掌握 Fabric 框架的使用方法，理解 Patterns 系统和设计理念
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够创建自定义 Patterns，满足特定业务需求
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解不同 Prompt 策略（CoT、ToT、AoT）的适用场景
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                能够配置多AI提供商，实现企业级集成和成本优化
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/tools/core" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：核心技术深度解析
          </Link>
        </Button>
        <Button asChild>
          <Link href="/tools/selection" className="flex items-center gap-2">
            下一章：工具选型决策
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
