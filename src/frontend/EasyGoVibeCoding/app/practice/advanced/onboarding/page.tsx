import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Target, Code, Zap, FileText, Search, CheckCircle2, Lightbulb, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "实践篇概述", href: "/practice" },
  { title: "文科生 / 商科生项目", href: "/practice/humanities" },
  { title: "理工科学生项目", href: "/practice/engineering" },
  { title: "职场人士项目", href: "/practice/professional" },
  { 
    title: "高级实战场景", 
    href: "/practice/advanced",
    sections: [
      { title: "场景1：从零开始创建新项目", href: "/practice/advanced/new-project" },
      { title: "场景2：快速熟悉新公司项目", href: "/practice/advanced/onboarding" },
      { title: "场景3：业务线切换实战", href: "/practice/advanced/transition" },
    ]
  },
  { title: "核心技能：AI Agent 开发", href: "/practice/agent" },
  { title: "核心技能：全栈项目实战", href: "/practice/fullstack" },
  { title: "核心技能：工具与效率", href: "/practice/efficiency" },
]

export default function OnboardingPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
      currentChapter="场景2：快速熟悉新公司项目"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <BookOpen className="h-4 w-4" />
          高级实战场景 · 场景2
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          快速熟悉新公司项目
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握快速理解新项目的系统方法，从代码阅读到项目理解，从快速上手到知识沉淀。通过AI工具加速代码阅读和理解，快速融入新团队。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* 学习目标 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              学习目标
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "掌握快速理解新项目的系统方法",
                "能够使用AI工具加速代码阅读和理解",
                "具备知识沉淀和分享能力",
                "理解项目理解框架（业务理解 → 架构理解 → 代码理解）",
              ].map((goal) => (
                <div key={goal} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 方法论 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            方法论
          </h2>

          {/* 代码阅读策略 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">代码阅读策略</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">自顶向下（Top-Down）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>适用场景</strong>：需要快速了解整体架构和业务流程</li>
                  <li>• <strong>阅读顺序</strong>：README → 架构文档 → 入口文件 → 主要模块 → 具体实现</li>
                  <li>• <strong>优势</strong>：快速建立整体认知，理解业务逻辑</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">自底向上（Bottom-Up）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>适用场景</strong>：需要深入理解某个具体功能或模块</li>
                  <li>• <strong>阅读顺序</strong>：具体实现 → 模块接口 → 模块依赖 → 整体架构</li>
                  <li>• <strong>优势</strong>：深入理解实现细节，掌握技术细节</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs">
                  <strong className="text-foreground">AI工具应用</strong>：使用Windsurf的Fast Context或Cursor Agent，快速理解大型代码库的整体结构和关键模块。
                </p>
              </div>
            </div>
          </div>

          {/* 项目理解框架 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">项目理解框架</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">业务理解</strong>：理解业务目标、用户需求、业务流程、业务规则
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• 阅读产品文档、需求文档、用户故事</li>
                    <li>• 理解业务模型和数据模型</li>
                    <li>• 使用AI工具：NotebookLM整理业务文档</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">架构理解</strong>：理解系统架构、模块划分、技术栈、数据流
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• 阅读架构文档、技术文档</li>
                    <li>• 理解模块依赖关系和数据流</li>
                    <li>• 使用AI工具：Windsurf分析代码结构、Cursor Agent生成架构图</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">代码理解</strong>：理解代码结构、关键实现、设计模式、最佳实践
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• 阅读关键代码、理解实现逻辑</li>
                    <li>• 理解代码风格和设计模式</li>
                    <li>• 使用AI工具：Cursor Agent代码问答、Zread代码分析</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 快速上手工作流 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">快速上手工作流</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">阶段1：文档阅读（1-2天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 阅读README、架构文档、API文档</li>
                  <li>• 理解项目目标、技术栈、开发流程</li>
                  <li>• 使用AI工具：NotebookLM整理文档、Fabric生成摘要</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">阶段2：代码探索（2-3天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 运行项目，理解启动流程</li>
                  <li>• 探索关键模块，理解代码结构</li>
                  <li>• 使用AI工具：Windsurf快速理解、Cursor Agent代码问答</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">阶段3：小功能开发（3-5天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 选择一个小功能进行开发</li>
                  <li>• 理解开发流程、代码规范、测试要求</li>
                  <li>• 使用AI工具：Cursor Agent辅助开发、代码审查</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">阶段4：重构优化（持续）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 发现代码问题，提出优化建议</li>
                  <li>• 重构代码，提升代码质量</li>
                  <li>• 使用AI工具：Cursor Agent代码优化、重构建议</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 知识沉淀方法 */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">知识沉淀方法</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">笔记和文档</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>学习笔记</strong>：记录关键概念、架构设计、代码模式</li>
                  <li>• <strong>问题记录</strong>：记录遇到的问题和解决方案</li>
                  <li>• <strong>最佳实践</strong>：总结项目中的最佳实践和设计模式</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Skill/Pattern创建</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>Cursor Skill</strong>：将项目特定的开发模式封装为Skill</li>
                  <li>• <strong>Fabric Pattern</strong>：将常用的代码模式封装为Pattern</li>
                  <li>• <strong>团队共享</strong>：Skill和Pattern可以在团队中共享和复用</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">知识分享</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>技术分享</strong>：在团队中分享学习心得和最佳实践</li>
                  <li>• <strong>文档更新</strong>：更新项目文档，补充缺失的信息</li>
                  <li>• <strong>代码审查</strong>：通过代码审查学习和分享知识</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* AI工具应用 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            AI工具应用
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用Windsurf的Fast Context快速理解大型代码库
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Windsurf的Fast Context技术可以快速分析大型代码库，理解整体结构：</p>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>快速索引</strong>：自动索引整个代码库，建立代码地图</li>
                  <li>• <strong>智能搜索</strong>：快速搜索相关代码和文件</li>
                  <li>• <strong>上下文理解</strong>：理解代码之间的依赖关系和数据流</li>
                  <li>• <strong>架构分析</strong>：自动分析系统架构和模块划分</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用Cursor Agent进行代码探索和问答
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>使用Cursor的Agent模式，通过问答方式理解代码：</p>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="font-medium text-foreground mb-2">示例问题：</p>
                  <ul className="space-y-1 text-xs">
                    <li>• "这个函数是做什么的？"</li>
                    <li>• "这个模块依赖哪些其他模块？"</li>
                    <li>• "数据是如何从API流向UI的？"</li>
                    <li>• "这个设计模式是什么？为什么要这样设计？"</li>
                  </ul>
                </div>
                <ul className="space-y-1 ml-4">
                  <li>• AI会分析代码，回答你的问题</li>
                  <li>• 可以深入追问，理解实现细节</li>
                  <li>• 生成代码注释和文档</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用Zread进行GitHub仓库分析
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Zread可以快速分析GitHub仓库，理解项目结构：</p>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>仓库概览</strong>：快速了解项目结构、技术栈、依赖关系</li>
                  <li>• <strong>代码分析</strong>：分析代码质量、复杂度、设计模式</li>
                  <li>• <strong>提交历史</strong>：理解项目演进历史和关键变更</li>
                  <li>• <strong>问题识别</strong>：识别潜在问题和改进空间</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用NotebookLM进行文档整理和知识提取
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>NotebookLM可以整理项目文档，提取关键信息：</p>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>文档导入</strong>：导入README、架构文档、API文档</li>
                  <li>• <strong>知识提取</strong>：自动提取关键概念、架构设计、API接口</li>
                  <li>• <strong>问答系统</strong>：基于文档内容回答问题</li>
                  <li>• <strong>知识总结</strong>：生成项目概览和知识图谱</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                使用Fabric进行代码摘要生成
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>使用Fabric的Patterns自动生成代码摘要：</p>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>代码摘要</strong>：自动生成函数、模块、文件的摘要</li>
                  <li>• <strong>架构文档</strong>：根据代码生成架构文档</li>
                  <li>• <strong>API文档</strong>：根据代码注释生成API文档</li>
                  <li>• <strong>学习笔记</strong>：生成学习笔记和知识总结</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 实战案例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            实战案例
          </h2>

          {/* 案例1 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">案例1：快速熟悉Monorepo项目</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">项目特点</h4>
                <ul className="space-y-1 ml-4">
                  <li>• Monorepo结构，包含多个包和服务</li>
                  <li>• 使用pnpm workspaces管理依赖</li>
                  <li>• 代码量庞大，模块间依赖复杂</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤1：使用Windsurf快速理解结构（1天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 打开Windsurf，加载整个Monorepo</li>
                  <li>• 使用Fast Context分析项目结构</li>
                  <li>• 理解包之间的依赖关系</li>
                  <li>• 识别核心包和关键模块</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤2：使用Cursor Agent探索关键模块（2天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 选择核心包，使用Cursor Agent进行代码问答</li>
                  <li>• 理解模块的职责和接口</li>
                  <li>• 理解数据流和调用链</li>
                  <li>• 生成模块文档和架构图</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤3：开发一个小功能（3天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 选择一个小功能进行开发</li>
                  <li>• 理解开发流程和代码规范</li>
                  <li>• 使用Cursor Agent辅助开发</li>
                  <li>• 提交代码，进行代码审查</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤4：知识沉淀（持续）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 创建Cursor Skill，封装项目特定的开发模式</li>
                  <li>• 更新项目文档，补充缺失的信息</li>
                  <li>• 在团队中分享学习心得</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 案例2 */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">案例2：快速熟悉遗留系统</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">项目特点</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 遗留系统，代码质量参差不齐</li>
                  <li>• 文档缺失或不完整</li>
                  <li>• 技术栈较老，需要理解历史设计</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤1：使用Zread分析GitHub仓库（半天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 使用Zread分析仓库结构</li>
                  <li>• 理解技术栈和依赖关系</li>
                  <li>• 查看提交历史，理解项目演进</li>
                  <li>• 识别关键文件和模块</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤2：使用NotebookLM整理文档（1天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 导入现有的文档和README</li>
                  <li>• 使用NotebookLM提取关键信息</li>
                  <li>• 生成项目概览和知识图谱</li>
                  <li>• 基于文档内容进行问答</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤3：使用Cursor Agent理解代码（2-3天）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 选择关键模块，使用Cursor Agent进行代码问答</li>
                  <li>• 理解业务逻辑和实现细节</li>
                  <li>• 识别代码问题和改进空间</li>
                  <li>• 生成代码注释和文档</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">步骤4：重构和优化（持续）</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 识别代码问题，提出重构建议</li>
                  <li>• 使用Cursor Agent辅助重构</li>
                  <li>• 更新文档，记录重构过程</li>
                  <li>• 创建最佳实践文档</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 学习成果检查清单 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              学习成果检查清单
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                "掌握代码阅读策略（自顶向下 vs 自底向上），能够根据场景选择合适的策略",
                "理解项目理解框架（业务理解 → 架构理解 → 代码理解），能够系统化地理解新项目",
                "掌握快速上手工作流（文档阅读 → 代码探索 → 小功能开发 → 重构优化）",
                "能够使用Windsurf的Fast Context快速理解大型代码库",
                "能够使用Cursor Agent进行代码探索和问答",
                "能够使用Zread进行GitHub仓库分析",
                "能够使用NotebookLM和Fabric进行文档整理和知识提取",
                "具备知识沉淀和分享能力，能够创建Skill/Pattern和更新文档",
                "完成至少一个实战案例（Monorepo项目或遗留系统）",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/practice/advanced/new-project">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              上一场景：从零开始创建新项目
            </Button>
          </Link>
          <Link href="/practice/advanced/transition">
            <Button>
              下一场景：业务线切换实战
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </CourseLayout>
  )
}
