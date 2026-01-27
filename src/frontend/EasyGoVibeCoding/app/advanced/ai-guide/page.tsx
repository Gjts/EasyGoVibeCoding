import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Zap, MessageSquare, TrendingUp, Zap as ZapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "序：从工具到架构的 100 小时", href: "/advanced" },
  { title: "环境搭建与代码运行基础", href: "/advanced/environment" },
  { title: "AI 使用说明书", href: "/advanced/ai-guide" },
  { title: "PRD 与文档驱动", href: "/advanced/prd" },
  { title: "开发常识", href: "/advanced/dev-basics" },
  { title: "界面交互", href: "/advanced/ui" },
  { title: "数据持久化", href: "/advanced/data" },
  { title: "测试与质量", href: "/advanced/testing" },
  { title: "部署与运维", href: "/advanced/deployment" },
]

const models = [
  { name: "Claude Opus 4.5", provider: "Anthropic", strength: "复杂推理、长文本处理" },
  { name: "GPT-5.2", provider: "OpenAI", strength: "代码生成、多模态" },
  { name: "Gemini 3.0 Pro", provider: "Google", strength: "多模态、长上下文" },
  { name: "Kimi K2", provider: "月之暗面", strength: "超长上下文、中文优化" },
  { name: "GLM-4.6", provider: "智谱AI", strength: "中文理解、代码生成" },
]

export default function AIGuidePage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="AI 使用说明书"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 2 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI 使用说明书
        </h1>
        <p className="text-lg text-muted-foreground">
          深入了解大模型生态，掌握 Token、Context、Attention 核心机制，学会高级 Prompt 工程技巧，做出明智的模型选择。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 大模型生态全景 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            大模型生态全景
          </h2>
          <p className="text-muted-foreground mb-6">
            了解主流大模型提供商及其产品特点，是做出正确选择的基础。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {models.map((model) => (
              <div key={model.name} className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{model.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {model.provider}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{model.strength}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">模型选择建议</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span><strong className="text-foreground">复杂任务</strong>：Claude Opus 4.5、GPT-5.2（第一梯队）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span><strong className="text-foreground">日常开发</strong>：Claude Sonnet 4.5、Gemini 3.0 Pro（第二梯队）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span><strong className="text-foreground">轻量任务</strong>：Qwen3、SWE、Grok4（第三梯队）</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 核心技术深度解析 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            核心技术深度解析
          </h2>
          <p className="text-muted-foreground mb-6">
            Token、Context、Attention 是理解大模型工作原理的三大核心概念。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Token：AI 的语言单位</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Token 是模型处理文本的基本单位，不是简单的字符或单词。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>中文</strong>：通常 1 个汉字 ≈ 1-2 个 Token</li>
                <li>• <strong>英文</strong>：1 个单词 ≈ 1-3 个 Token（取决于长度）</li>
                <li>• <strong>代码</strong>：符号和关键字通常占用更多 Token</li>
                <li>• <strong>成本计算</strong>：API 调用按 Token 数量计费</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Context：上下文窗口</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Context 窗口决定了模型能"记住"多少信息。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>小窗口</strong>（4K-8K）：适合简单对话、代码补全</li>
                <li>• <strong>中窗口</strong>（32K-128K）：适合文档分析、多轮对话</li>
                <li>• <strong>大窗口</strong>（200K+）：适合长文档、代码库分析</li>
                <li>• <strong>超长窗口</strong>（1M+）：Kimi K2、Claude 3.5 等支持</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">Attention：注意力机制</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Attention 机制让模型能够关注输入中的关键信息，就像用荧光笔标记重点。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Self-Attention</strong>：模型内部不同位置之间的关联</li>
                <li>• <strong>Multi-Head Attention</strong>：从多个角度理解信息</li>
                <li>• <strong>位置编码</strong>：让模型理解词序和位置关系</li>
                <li>• <strong>计算复杂度</strong>：O(n²)，这是 Transformer 的瓶颈</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Prompt 工程高级技巧 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Prompt 工程高级技巧
          </h2>
          <p className="text-muted-foreground mb-6">
            高质量的 Prompt 是获得理想输出的关键。掌握这些技巧，让你的 AI 助手更"听话"。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Chain of Thought (CoT)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                让模型展示推理过程，提高复杂问题的准确性。
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm text-muted-foreground">
                <div className="text-foreground mb-2">示例：</div>
                <div>"请分析这个代码的性能问题，并给出优化建议。请按以下步骤思考：</div>
                <div>1. 识别性能瓶颈</div>
                <div>2. 分析原因</div>
                <div>3. 提出优化方案"</div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Few-Shot Learning</h3>
              <p className="text-sm text-muted-foreground mb-3">
                通过提供示例，让模型快速学习特定格式或风格。
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm text-muted-foreground">
                <div className="text-foreground mb-2">示例：</div>
                <div>输入：苹果 → 输出：fruit</div>
                <div>输入：汽车 → 输出：vehicle</div>
                <div>输入：代码 → 输出：?</div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">System Prompts</h3>
              <p className="text-sm text-muted-foreground mb-3">
                系统提示词定义了 AI 的角色、能力和行为准则。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>角色定义</strong>："你是一位资深的前端开发工程师"</li>
                <li>• <strong>能力说明</strong>："擅长 React、TypeScript、Tailwind CSS"</li>
                <li>• <strong>输出格式</strong>："请使用 Markdown 格式，包含代码示例"</li>
                <li>• <strong>约束条件</strong>："遵循最佳实践，确保代码可维护"</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 模型选择策略 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            模型选择策略
          </h2>
          <p className="text-muted-foreground mb-6">
            根据任务特点、资源约束和成本考虑，选择合适的模型。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">成本优先</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 选择第三梯队模型</li>
                <li>• 优化 Token 使用</li>
                <li>• 批量处理请求</li>
                <li>• 使用缓存减少重复调用</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">质量优先</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 选择第一梯队模型</li>
                <li>• 使用 CoT 提升准确性</li>
                <li>• 多轮对话优化结果</li>
                <li>• 人工审核关键输出</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">速度优先</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 选择响应快的模型</li>
                <li>• 减少 Context 长度</li>
                <li>• 使用流式输出</li>
                <li>• 并行处理多个请求</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">混合策略</h3>
            <p className="text-sm text-muted-foreground">
              根据任务复杂度动态选择模型：简单任务用轻量模型，复杂任务用强大模型。
              这样可以平衡成本、质量和速度。
            </p>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ZapIcon className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                了解主流大模型的特点和适用场景（Claude、GPT、Gemini等）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                深入理解 Token、Context、Attention 的核心机制
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握 Prompt 工程高级技巧（CoT、Few-Shot、System Prompts）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                能够根据场景（成本/质量/速度）选择合适的模型
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/environment" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：环境搭建
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/prd" className="flex items-center gap-2">
            下一章：PRD 与文档驱动
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
