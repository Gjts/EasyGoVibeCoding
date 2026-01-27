import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, UserPlus, Users, Briefcase, GraduationCap, Star } from "lucide-react"
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

const coreRoles = [
  {
    name: "AI 架构师",
    icon: Briefcase,
    responsibilities: ["工具选型", "架构设计", "技术路线规划"],
    skills: ["深度理解 AI 工具", "架构权衡思维", "技术前瞻性"],
    outputs: ["技术选型报告", "架构设计文档", "工具评估"],
  },
  {
    name: "AI 工程师",
    icon: UserPlus,
    responsibilities: ["使用 AI 工具开发", "创建 Skill/Pattern", "优化工作流"],
    skills: ["熟练使用 Cursor/Windsurf", "Prompt 工程", "代码审查"],
    outputs: ["代码", "Skill 库", "Patterns 库", "最佳实践文档"],
  },
  {
    name: "AI 产品经理",
    icon: Users,
    responsibilities: ["需求澄清", "Spec 编写", "AI 工具应用场景设计"],
    skills: ["Spec 驱动开发", "Reverse Interview", "MVP 思维"],
    outputs: ["PRD", "Spec 文档", "需求澄清记录"],
  },
  {
    name: "AI 培训师",
    icon: GraduationCap,
    responsibilities: ["团队培训", "知识沉淀", "最佳实践推广"],
    skills: ["培训能力", "文档编写", "案例总结"],
    outputs: ["培训材料", "学习路径", "案例库"],
  },
]

const crossDeptRoles = [
  {
    name: "HR + AI",
    responsibilities: ["招聘流程优化", "员工培训", "绩效分析", "AI 工具培训"],
    scenarios: [
      "使用 Fabric 生成招聘 JD、面试问题",
      "使用 Cursor 编写培训材料、员工手册",
      "使用 AI 工具分析员工反馈、生成报告",
    ],
    skills: ["基础 AI 工具使用", "Prompt 工程", "数据分析"],
    outputs: ["招聘文档", "培训材料", "分析报告"],
    privacy: "员工个人信息使用本地模型，不上传云端",
  },
  {
    name: "财务 + AI",
    responsibilities: ["成本分析", "预算规划", "财务报告", "合规检查"],
    scenarios: [
      "使用 Fabric 生成财务报告模板",
      "使用 AI 工具分析成本数据、生成洞察",
      "使用 Cursor 编写财务流程文档",
    ],
    skills: ["基础 AI 工具使用", "数据分析", "隐私保护意识"],
    outputs: ["财务报告", "成本分析", "流程文档"],
    privacy: "财务数据完全使用本地模型（Ollama），不上传云端",
  },
  {
    name: "法务 + AI",
    responsibilities: ["合同审查", "合规检查", "法律文档生成"],
    scenarios: [
      "使用 AI 工具辅助合同审查（注意隐私保护）",
      "使用 Fabric 生成法律文档模板",
      "使用 AI 工具进行合规性检查",
    ],
    skills: ["基础 AI 工具使用", "法律知识", "隐私保护"],
    outputs: ["合同审查报告", "法律文档", "合规报告"],
    privacy: "敏感法律文档使用本地模型",
  },
]

const teamSizes = [
  {
    size: "小团队（3-5 人）",
    config: "1 名 AI 架构师 + 2-3 名 AI 工程师 + 1 名 AI 产品经理",
    features: ["扁平化", "快速迭代", "知识共享"],
  },
  {
    size: "中型团队（6-15 人）",
    config: "1 名 AI 架构师 + 5-10 名 AI 工程师 + 1-2 名 AI 产品经理 + 1 名 AI 培训师",
    features: ["专业化分工", "知识库建设", "流程标准化"],
  },
  {
    size: "大型团队（16+ 人）",
    config: "AI 架构组 + AI 工程组 + AI 产品组 + AI 培训组",
    features: ["组织化", "体系化", "知识管理平台"],
  },
]

const skillMatrix = [
  { role: "AI 架构师", cursor: 5, windsurf: 4, fabric: 4, mcp: 5, skill: 4, agent: 5, spec: 4 },
  { role: "AI 工程师", cursor: 5, windsurf: 4, fabric: 3, mcp: 4, skill: 5, agent: 4, spec: 3 },
  { role: "AI 产品经理", cursor: 3, windsurf: 2, fabric: 3, mcp: 2, skill: 2, agent: 2, spec: 5 },
  { role: "AI 培训师", cursor: 4, windsurf: 3, fabric: 4, mcp: 3, skill: 4, agent: 3, spec: 4 },
  { role: "HR + AI", cursor: 2, windsurf: 1, fabric: 4, mcp: 1, skill: 1, agent: 1, spec: 3 },
  { role: "Finance + AI", cursor: 2, windsurf: 1, fabric: 4, mcp: 1, skill: 1, agent: 1, spec: 3 },
  { role: "Legal + AI", cursor: 2, windsurf: 1, fabric: 3, mcp: 1, skill: 1, agent: 1, spec: 4 },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "fill-primary text-primary" : "fill-none text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

export default function RolesPage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
      currentChapter="团队组建与角色定义"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 2 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          团队组建与角色定义
        </h1>
        <p className="text-lg text-muted-foreground">
          明确团队角色、职责和技能要求，是打造高效 AI 团队的基础。从核心角色到跨部门协作，构建完整的团队体系。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 核心角色定义 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            核心角色定义
          </h2>
          <p className="text-muted-foreground mb-6">
            AI 团队的核心角色及其职责、技能要求和产出。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {coreRoles.map((role) => {
              const Icon = role.icon
              return (
                <div key={role.name} className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{role.name}</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">职责</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {role.responsibilities.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">技能要求</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {role.skills.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">产出</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {role.outputs.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Section 2: 跨部门协作角色 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            跨部门协作角色
          </h2>
          <p className="text-muted-foreground mb-6">
            AI 工具不仅适用于技术团队，HR、财务、法务等部门也可以通过 AI 工具提升效率。
          </p>

          <div className="space-y-6 mb-6">
            {crossDeptRoles.map((role) => (
              <div key={role.name} className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-4">{role.name}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">职责</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {role.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">AI 应用场景</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {role.scenarios.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">技能要求</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {role.skills.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">产出</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {role.outputs.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">隐私保护：</strong>
                    {role.privacy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: 团队规模与配置 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            团队规模与配置
          </h2>
          <p className="text-muted-foreground mb-6">
            根据团队规模，合理配置人员角色，确保团队高效运转。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {teamSizes.map((team) => (
              <div key={team.size} className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-3">{team.size}</h3>
                <p className="text-sm text-muted-foreground mb-4">{team.config}</p>
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-foreground uppercase">特点</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {team.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: 技能要求矩阵 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            技能要求矩阵
          </h2>
          <p className="text-muted-foreground mb-6">
            不同角色对 AI 工具和技能的掌握程度要求（1-5 星）。
          </p>

          <div className="overflow-x-auto mb-6">
            <div className="p-6 rounded-xl border border-border bg-card min-w-full">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">角色</th>
                      <th className="text-center py-3 px-2 font-semibold text-foreground">Cursor</th>
                      <th className="text-center py-3 px-2 font-semibold text-foreground">Windsurf</th>
                      <th className="text-center py-3 px-2 font-semibold text-foreground">Fabric</th>
                      <th className="text-center py-3 px-2 font-semibold text-foreground">MCP</th>
                      <th className="text-center py-3 px-2 font-semibold text-foreground">Skill</th>
                      <th className="text-center py-3 px-2 font-semibold text-foreground">Agent</th>
                      <th className="text-center py-3 px-2 font-semibold text-foreground">Spec</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skillMatrix.map((row, idx) => (
                      <tr key={row.role} className={idx % 2 === 0 ? "bg-secondary/30" : ""}>
                        <td className="py-3 px-4 font-medium text-foreground">{row.role}</td>
                        <td className="py-3 px-2 text-center">
                          <StarRating rating={row.cursor} />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <StarRating rating={row.windsurf} />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <StarRating rating={row.fabric} />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <StarRating rating={row.mcp} />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <StarRating rating={row.skill} />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <StarRating rating={row.agent} />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <StarRating rating={row.spec} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">说明：</strong>
              ⭐⭐⭐⭐⭐ 精通 | ⭐⭐⭐⭐ 熟练 | ⭐⭐⭐ 掌握 | ⭐⭐ 了解 | ⭐ 基础
            </p>
          </div>
        </section>

        {/* 实战练习 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            实战练习
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">建议练习：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                设计一个 10 人 AI 团队的配置方案（角色、职责、技能要求）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                编写角色职责说明书（选择一个核心角色，详细描述）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                制定技能评估标准（如何评估团队成员对 AI 工具的掌握程度）
              </li>
            </ul>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握 AI 团队的核心角色定义（AI 架构师、AI 工程师、AI 产品经理、AI 培训师）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解跨部门协作角色（HR + AI、财务 + AI、法务 + AI）及其应用场景
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                能够根据团队规模配置人员（小/中/大团队配置方案）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                理解不同角色的技能要求矩阵（Cursor、Windsurf、Fabric、MCP、Skill、Agent、Spec）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/team/why" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：为什么需要 AI 团队？
          </Link>
        </Button>
        <Button asChild>
          <Link href="/team/tools" className="flex items-center gap-2">
            下一章：工具选型与统一配置
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
