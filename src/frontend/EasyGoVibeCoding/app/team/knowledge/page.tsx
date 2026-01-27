import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Folder, FileText, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "团队篇概述", href: "/team" },
  { title: "为什么需要 AI 团队？", href: "/team/why" },
  { title: "团队组建与角色定义", href: "/team/roles" },
  { title: "工具选型与统一配置", href: "/team/tools" },
  { title: "工作流程与协作机制", href: "/team/workflow" },
  { title: "知识管理与沉淀", href: "/team/knowledge" },
  { title: "文化建设与学习型组织", href: "/team/culture" },
  { title: "成本管理与优化", href: "/team/cost" },
  { title: "安全与合规", href: "/team/security" },
  { title: "团队成长与职业发展", href: "/team/growth" },
  { title: "实战案例与最佳实践", href: "/team/cases" },
]

export default function KnowledgePage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
      currentChapter="知识管理与沉淀"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 5 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          知识管理与沉淀
        </h1>
        <p className="text-lg text-muted-foreground">
          建立知识库、文档体系和沉淀机制，让团队的知识资产不断积累和复用，避免重复造轮子。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 知识库建设 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            知识库建设
          </h2>
          <p className="text-muted-foreground mb-6">
            Skill 库、Patterns 库、最佳实践库是团队的核心知识资产。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary" />
                Skill 库管理
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50 font-mono">
                  <div className="text-foreground mb-2">.cursor/skills/</div>
                  <div className="text-muted-foreground">目录结构：按项目/技术栈分类</div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">命名规范</strong>：`project-name-skill-name.md`</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">版本管理</strong>：Git 管理，支持回滚</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">使用统计</strong>：跟踪 Skill 使用频率</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">质量评估</strong>：定期评估 Skill 效果，优化改进</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary" />
                Patterns 库管理
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50 font-mono">
                  <div className="text-foreground mb-2">fabric/patterns/</div>
                  <div className="text-muted-foreground">Fabric Patterns：团队共享 Patterns 目录</div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">分类管理</strong>：按任务类型分类（代码生成/代码审查/文档生成）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">质量评估</strong>：Patterns 效果评估和优化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">贡献机制</strong>：鼓励团队成员贡献 Patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">使用文档</strong>：每个 Pattern 都有使用说明和示例</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                最佳实践库
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">工具使用最佳实践</strong>：Cursor、Windsurf、Fabric 的使用技巧</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">Prompt 工程最佳实践</strong>：RTCC 框架、CoT、Few-Shot 等技巧</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">代码审查最佳实践</strong>：审查清单、反馈模板、审查流程</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong className="text-foreground">案例库</strong>：成功案例/失败案例，经验教训总结</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 文档体系 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            文档体系
          </h2>
          <p className="text-muted-foreground mb-6">
            建立完整的技术文档、流程文档和培训文档体系。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">技术文档</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 工具使用手册（Cursor/Windsurf/Fabric）</li>
                <li>• 配置指南（MCP/Skill/Patterns）</li>
                <li>• 故障排查手册</li>
                <li>• API 文档</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">流程文档</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 开发流程文档</li>
                <li>• 代码审查流程</li>
                <li>• 部署流程文档</li>
                <li>• 跨部门协作流程</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">培训文档</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 新人 onboarding 文档</li>
                <li>• 工具培训材料</li>
                <li>• 实战案例文档</li>
                <li>• 学习路径指南</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: 知识沉淀机制 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            知识沉淀机制
          </h2>
          <p className="text-muted-foreground mb-6">
            建立定期总结和案例沉淀机制，让知识不断积累和优化。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">定期总结</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">每周总结</div>
                  <ul className="space-y-1">
                    <li>• 工具使用心得</li>
                    <li>• 遇到的问题</li>
                    <li>• 解决方案</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">每月总结</div>
                  <ul className="space-y-1">
                    <li>• 最佳实践</li>
                    <li>• 工具更新</li>
                    <li>• 团队效率提升</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">每季度总结</div>
                  <ul className="space-y-1">
                    <li>• 知识库优化</li>
                    <li>• 流程改进</li>
                    <li>• 团队能力提升</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">案例沉淀</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">成功案例</div>
                  <ul className="space-y-1">
                    <li>• 记录成功使用 AI 工具的项目</li>
                    <li>• 分析成功因素</li>
                    <li>• 提炼可复用经验</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">失败案例</div>
                  <ul className="space-y-1">
                    <li>• 记录遇到的问题和解决方案</li>
                    <li>• 分析失败原因</li>
                    <li>• 避免重复犯错</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 md:col-span-2">
                  <div className="font-medium text-foreground mb-2">经验分享</div>
                  <ul className="space-y-1">
                    <li>• 团队成员的经验分享</li>
                    <li>• 工具使用技巧</li>
                    <li>• 最佳实践总结</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 实战练习 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            实战练习
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">建议练习：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                建立团队 Skill 库（创建目录结构、命名规范、版本管理）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                创建 Patterns 库（分类管理、质量评估、贡献机制）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                设计知识管理平台（文档体系、搜索功能、版本控制）
              </li>
            </ul>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握知识库建设方法（Skill 库、Patterns 库、最佳实践库）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够建立文档体系（技术文档、流程文档、培训文档）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解知识沉淀的重要性（定期总结、案例沉淀、经验分享）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/team/workflow" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：工作流程与协作机制
          </Link>
        </Button>
        <Button asChild>
          <Link href="/team/culture" className="flex items-center gap-2">
            下一章：文化建设与学习型组织
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
