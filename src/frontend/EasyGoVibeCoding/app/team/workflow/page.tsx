import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, GitBranch, Users, FileCheck, MessageSquare, Shield } from "lucide-react"
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

export default function WorkflowPage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
      currentChapter="工作流程与协作机制"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 4 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          工作流程与协作机制
        </h1>
        <p className="text-lg text-muted-foreground">
          建立高效的 AI 辅助开发流程，设计协作机制，实现跨部门协作，确保团队高效运转。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: AI 辅助开发流程 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            AI 辅助开发流程
          </h2>
          <p className="text-muted-foreground mb-6">
            将 AI 工具深度融入开发流程的每个阶段，从需求到交付的全流程优化。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                需求阶段
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">1</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">Reverse Interview：用 AI 辅助需求澄清</div>
                    <p>使用 AI 工具进行需求访谈，快速识别需求中的模糊点和矛盾点。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">2</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">Spec 编写：使用 AI 生成 Spec 初稿</div>
                    <p>基于需求澄清结果，使用 AI 生成 PRD 和 Spec 文档初稿，人工审核和完善。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">3</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">WBS 分解：AI 辅助任务分解</div>
                    <p>将 Spec 分解为可执行的任务，AI 辅助生成 WBS（工作分解结构）。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                开发阶段
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">1</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">代码生成：使用 Cursor/Windsurf 生成代码</div>
                    <p>根据 Spec 和 WBS，使用 AI 工具生成代码，人工审查和优化。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">2</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">代码审查：AI 辅助代码审查</div>
                    <p>使用 Cursor Agent Review 模式进行代码审查，检查规范、安全、性能。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">3</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">测试生成：AI 生成单元测试</div>
                    <p>基于代码逻辑，AI 生成单元测试用例，提高测试覆盖率。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                交付阶段
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">1</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">文档生成：Fabric 生成变更日志、API 文档</div>
                    <p>使用 Fabric Patterns 自动生成变更日志和 API 文档，确保文档与代码同步。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">2</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">部署自动化：CI/CD 集成 AI 工具</div>
                    <p>在 CI/CD 流程中集成 AI 工具，自动进行代码审查、测试生成、文档更新。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">3</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">监控与反馈：AI 辅助问题分析</div>
                    <p>使用 AI 工具分析生产环境问题，快速定位和解决问题。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 协作机制 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            协作机制
          </h2>
          <p className="text-muted-foreground mb-6">
            建立有效的协作机制，促进知识分享和问题解决。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                代码审查流程
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 使用 Cursor Agent Review 模式</li>
                <li>• 审查清单（规范检查、安全检查、性能检查）</li>
                <li>• 审查反馈模板</li>
                <li>• AI 辅助 + 人工审查</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                知识分享机制
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 每周技术分享（新工具、新技巧、案例）</li>
                <li>• Skill/Pattern 贡献奖励</li>
                <li>• 最佳实践文档化</li>
                <li>• 内部 Wiki 建设</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-primary" />
                问题解决流程
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• AI 工具使用问题 → 内部 Wiki</li>
                <li>• 技术难题 → AI 辅助分析 + 团队讨论</li>
                <li>• 工具 Bug → 统一反馈渠道</li>
                <li>• 问题跟踪和解决记录</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: 跨部门协作流程 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            跨部门协作流程
          </h2>
          <p className="text-muted-foreground mb-6">
            HR、财务、法务等部门如何与 AI 工具协作，提升工作效率。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">HR 部门协作</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <div className="font-medium text-foreground mb-2">招聘流程</div>
                  <ul className="space-y-1">
                    <li>• 使用 Fabric 生成招聘 JD、面试问题</li>
                    <li>• 使用 AI 工具生成评估标准</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">员工培训</div>
                  <ul className="space-y-1">
                    <li>• 使用 Cursor 编写培训材料</li>
                    <li>• 使用 AI 生成培训内容</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">绩效分析</div>
                  <ul className="space-y-1">
                    <li>• 使用 AI 工具分析员工数据（注意隐私保护）</li>
                    <li>• 使用本地模型处理敏感信息</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">协作工具</div>
                  <ul className="space-y-1">
                    <li>• Fabric Patterns（HR 专用）</li>
                    <li>• Cursor（文档编写）</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">财务部门协作</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <div className="font-medium text-foreground mb-2">成本分析</div>
                  <ul className="space-y-1">
                    <li>• 使用 AI 工具分析成本数据</li>
                    <li>• 使用本地模型生成报告</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">预算规划</div>
                  <ul className="space-y-1">
                    <li>• 使用 Fabric 生成预算模板</li>
                    <li>• 使用 AI 生成分析报告</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">财务报告</div>
                  <ul className="space-y-1">
                    <li>• 使用 Cursor 编写财务文档</li>
                    <li>• 使用 AI 生成报告（不含敏感数据）</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="font-medium text-foreground mb-1">隐私保护</div>
                  <p className="text-xs">财务数据完全使用本地模型（Ollama），不上传云端</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">法务部门协作</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <div className="font-medium text-foreground mb-2">合同审查</div>
                  <ul className="space-y-1">
                    <li>• 使用 AI 工具辅助审查（本地处理）</li>
                    <li>• 敏感合同不上传云端</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">合规检查</div>
                  <ul className="space-y-1">
                    <li>• 使用 AI 工具检查合规性</li>
                    <li>• 生成合规报告</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">法律文档</div>
                  <ul className="space-y-1">
                    <li>• 使用 Fabric 生成法律文档模板</li>
                    <li>• 使用 Cursor 编写法律文档</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="font-medium text-foreground mb-1">安全要求</div>
                  <p className="text-xs">敏感法律文档使用本地模型</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                跨部门协作规范
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">数据分类</strong>：明确哪些数据可以使用 AI 工具</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">工具选择</strong>：根据数据敏感度选择工具（云端/本地）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">审批流程</strong>：敏感数据使用 AI 工具需要审批</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">审计记录</strong>：记录所有 AI 工具使用情况</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 版本控制与分支策略 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            版本控制与分支策略
          </h2>
          <p className="text-muted-foreground mb-6">
            建立规范的版本控制流程，确保 AI 生成代码的质量和可追溯性。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Git 工作流</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Feature 分支：使用 AI 工具开发新功能</li>
                <li>• Code Review：AI 辅助 + 人工审查</li>
                <li>• 合并策略：确保 AI 生成代码的质量</li>
                <li>• 提交信息规范：清晰描述变更内容</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">文档版本控制</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Spec 文档版本管理</li>
                <li>• Skill/Pattern 版本管理</li>
                <li>• 最佳实践文档版本管理</li>
                <li>• 变更日志记录</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 实战练习 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            实战练习
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">建议练习：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                设计 AI 辅助开发流程（需求 → 开发 → 交付的完整流程）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                建立代码审查机制（审查清单、反馈模板、审查流程）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                创建知识分享平台（内部 Wiki、技术分享会、案例库）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                设计跨部门协作流程（HR/财务/法务部门的 AI 应用场景和规范）
              </li>
            </ul>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握 AI 辅助开发流程（需求阶段、开发阶段、交付阶段）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够建立有效的协作机制（代码审查、知识分享、问题解决）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解版本控制的重要性（Git 工作流、文档版本控制）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握跨部门 AI 协作方法（HR、财务、法务部门的协作流程和规范）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/team/tools" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：工具选型与统一配置
          </Link>
        </Button>
        <Button asChild>
          <Link href="/team/knowledge" className="flex items-center gap-2">
            下一章：知识管理与沉淀
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
