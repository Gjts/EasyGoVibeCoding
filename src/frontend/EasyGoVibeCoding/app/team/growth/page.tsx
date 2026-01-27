import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TrendingUp, GraduationCap, Briefcase, Target } from "lucide-react"
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

export default function GrowthPage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
      currentChapter="团队成长与职业发展"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 9 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          团队成长与职业发展
        </h1>
        <p className="text-lg text-muted-foreground">
          设计清晰的技能提升路径和职业发展通道，建立完善的培训计划，帮助团队成员持续成长。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 技能提升路径 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            技能提升路径
          </h2>
          <p className="text-muted-foreground mb-6">
            从初级到专家，清晰的技能提升路径。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">初级 → 中级</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">技能要求</div>
                  <ul className="space-y-1">
                    <li>• 熟练使用基础工具（Cursor、Copilot）</li>
                    <li>• 能够创建简单 Skill</li>
                    <li>• 理解 Prompt 工程基础</li>
                    <li>• 掌握代码补全技巧</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">学习重点</div>
                  <ul className="space-y-1">
                    <li>• 工具基础使用</li>
                    <li>• Prompt 工程基础</li>
                    <li>• Skill 创建入门</li>
                    <li>• 代码审查基础</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">中级 → 高级</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">技能要求</div>
                  <ul className="space-y-1">
                    <li>• 掌握高级工具特性（Agent、MCP）</li>
                    <li>• 能够设计复杂工作流</li>
                    <li>• 理解架构选型</li>
                    <li>• 掌握成本优化技巧</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">学习重点</div>
                  <ul className="space-y-1">
                    <li>• Agent 模式深度使用</li>
                    <li>• MCP Server 配置和开发</li>
                    <li>• 复杂工作流设计</li>
                    <li>• 架构权衡思维</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4">高级 → 专家</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">技能要求</div>
                  <ul className="space-y-1">
                    <li>• 工具选型与架构设计</li>
                    <li>• 团队知识管理</li>
                    <li>• 技术路线规划</li>
                    <li>• 跨部门协作设计</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">学习重点</div>
                  <ul className="space-y-1">
                    <li>• 工具评估方法</li>
                    <li>• 架构设计能力</li>
                    <li>• 知识管理体系设计</li>
                    <li>• 团队文化建设</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 职业发展 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            职业发展
          </h2>
          <p className="text-muted-foreground mb-6">
            清晰的职业发展通道，帮助团队成员规划职业路径。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                AI 工程师 → AI 架构师
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">技术深度</div>
                  <ul className="space-y-1">
                    <li>• 深入理解 AI 工具原理</li>
                    <li>• 掌握多种工具和架构</li>
                    <li>• 理解技术权衡</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">技术广度</div>
                  <ul className="space-y-1">
                    <li>• 了解多种工具和架构</li>
                    <li>• 掌握工具选型方法</li>
                    <li>• 理解技术趋势</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">架构能力</div>
                  <ul className="space-y-1">
                    <li>• 能够设计技术方案</li>
                    <li>• 具备架构权衡思维</li>
                    <li>• 能够规划技术路线</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                AI 工程师 → AI 产品经理
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">产品思维</div>
                  <ul className="space-y-1">
                    <li>• 理解用户需求</li>
                    <li>• MVP 思维</li>
                    <li>• 产品设计能力</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">沟通能力</div>
                  <ul className="space-y-1">
                    <li>• 需求澄清能力</li>
                    <li>• 团队协作能力</li>
                    <li>• 跨部门沟通能力</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">项目管理</div>
                  <ul className="space-y-1">
                    <li>• 项目规划能力</li>
                    <li>• 进度管理能力</li>
                    <li>• 风险管理能力</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 培训计划 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            培训计划
          </h2>
          <p className="text-muted-foreground mb-6">
            为不同阶段的团队成员设计针对性的培训计划。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">新人培训（5 周）</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">工具基础培训（2 周）</div>
                  <ul className="space-y-1">
                    <li>• Cursor 安装和配置</li>
                    <li>• Fabric 安装和配置</li>
                    <li>• 基础 Prompt 工程</li>
                    <li>• 代码补全使用</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">实战项目培训（2 周）</div>
                  <ul className="space-y-1">
                    <li>• 完成第一个实战项目</li>
                    <li>• Skill 创建实践</li>
                    <li>• Patterns 使用实践</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">知识库使用培训（1 周）</div>
                  <ul className="space-y-1">
                    <li>• Skill 库使用</li>
                    <li>• Patterns 库使用</li>
                    <li>• 最佳实践学习</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">进阶培训（3 周）</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">高级特性培训（1 周）</div>
                  <ul className="space-y-1">
                    <li>• Agent 模式深度使用</li>
                    <li>• MCP Server 配置</li>
                    <li>• 复杂工作流设计</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">架构设计培训（1 周）</div>
                  <ul className="space-y-1">
                    <li>• 工具选型方法</li>
                    <li>• 架构权衡思维</li>
                    <li>• 技术路线规划</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">团队协作培训（1 周）</div>
                  <ul className="space-y-1">
                    <li>• 跨部门协作</li>
                    <li>• 知识管理</li>
                    <li>• 文化建设</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 实战练习 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            实战练习
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">建议练习：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                设计技能提升路径（初级 → 中级 → 高级 → 专家的完整路径）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                制定培训计划（新人培训、进阶培训、专家培训）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                建立职业发展体系（职业通道、评估标准、发展计划）
              </li>
            </ul>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握团队成长方法（技能提升路径、职业发展通道）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够设计职业发展路径（AI 工程师 → AI 架构师/产品经理）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解培训的重要性（新人培训、进阶培训、专家培训）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/team/security" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：安全与合规
          </Link>
        </Button>
        <Button asChild>
          <Link href="/team/cases" className="flex items-center gap-2">
            下一章：实战案例与最佳实践
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
