import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Award, X, Check, Users, TrendingUp, Shield } from "lucide-react"
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

const successCases = [
  {
    title: "小团队快速转型",
    background: "5 人团队，从传统开发转向 AI 辅助开发",
    solution: "统一使用 Cursor，建立 Skill 库",
    result: "开发效率提升 3 倍，代码质量提升",
  },
  {
    title: "中型团队知识管理",
    background: "15 人团队，工具使用散乱",
    solution: "统一工具栈，建立知识库，制定规范",
    result: "知识沉淀，团队协作效率提升",
  },
  {
    title: "大型企业 AI 团队建设",
    background: "50+ 人团队，需要企业级方案",
    solution: "多工具组合，企业级配置，安全合规",
    result: "规模化应用，成本优化，安全合规",
  },
  {
    title: "HR 部门 AI 应用",
    background: "HR 部门需要提升招聘和培训效率",
    solution: "使用 Fabric 生成招聘 JD、使用 Cursor 编写培训材料",
    privacy: "员工个人信息使用本地模型，不上传云端",
    result: "招聘效率提升 2 倍，培训材料质量提升",
  },
  {
    title: "财务部门 AI 应用",
    background: "财务部门需要提升报告生成和分析效率",
    solution: "使用 Fabric 生成报告模板、使用本地模型分析数据",
    privacy: "财务数据完全使用本地模型（Ollama），不上传云端",
    result: "报告生成时间减少 60%，数据分析效率提升",
  },
  {
    title: "跨部门协作案例",
    background: "技术、HR、财务部门需要协作",
    solution: "建立数据分类体系、统一工具选择规范、跨部门协作流程",
    privacy: "敏感数据使用本地模型，建立审批流程",
    result: "跨部门协作效率提升，数据安全得到保障",
  },
]

const failureCases = [
  {
    title: "工具选型失误",
    problem: "选择了不适合团队的工具",
    lesson: "工具选型需要充分评估",
    solution: "建立工具评估流程",
  },
  {
    title: "知识管理缺失",
    problem: "没有建立知识库，重复造轮子",
    lesson: "知识管理是团队成功的关键",
    solution: "建立知识库，鼓励知识分享",
  },
  {
    title: "财务数据泄露风险",
    problem: "财务部门使用云端 AI 工具处理敏感数据",
    lesson: "敏感数据必须使用本地模型",
    solution: "建立数据分类体系，财务数据使用 Ollama",
  },
  {
    title: "跨部门协作混乱",
    problem: "不同部门使用不同工具，数据共享不规范",
    lesson: "需要建立统一的协作规范",
    solution: "建立跨部门协作流程，统一工具选择规范",
  },
]

export default function CasesPage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
      currentChapter="实战案例与最佳实践"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 10 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          实战案例与最佳实践
        </h1>
        <p className="text-lg text-muted-foreground">
          通过真实案例学习成功经验，避免常见错误，掌握最佳实践。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 成功案例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            成功案例
          </h2>
          <p className="text-muted-foreground mb-6">
            学习成功团队的经验，了解关键成功因素。
          </p>

          <div className="space-y-6 mb-6">
            {successCases.map((caseItem, idx) => (
              <div key={caseItem.title} className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-3">{caseItem.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>
                        <strong className="text-foreground">背景：</strong>{caseItem.background}
                      </div>
                      <div>
                        <strong className="text-foreground">方案：</strong>{caseItem.solution}
                      </div>
                      {caseItem.privacy && (
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <strong className="text-foreground">隐私保护：</strong>{caseItem.privacy}
                        </div>
                      )}
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <strong className="text-foreground">结果：</strong>{caseItem.result}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: 失败案例与教训 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <X className="h-6 w-6 text-destructive" />
            失败案例与教训
          </h2>
          <p className="text-muted-foreground mb-6">
            从失败中学习，避免重复犯错。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {failureCases.map((caseItem) => (
              <div key={caseItem.title} className="p-6 rounded-xl border border-destructive/50 bg-destructive/5">
                <h3 className="font-semibold text-foreground mb-3">{caseItem.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <strong className="text-foreground">问题：</strong>{caseItem.problem}
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <strong className="text-foreground">教训：</strong>{caseItem.lesson}
                  </div>
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <strong className="text-foreground">解决方案：</strong>{caseItem.solution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: 最佳实践总结 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Check className="h-6 w-6 text-primary" />
            最佳实践总结
          </h2>
          <p className="text-muted-foreground mb-6">
            总结成功经验，形成可复用的最佳实践。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                工具使用最佳实践
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">统一工具栈</strong>，避免工具散乱</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">建立配置模板</strong>，提高效率</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">定期更新工具</strong>，跟上技术趋势</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">工具使用规范</strong>，确保质量</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                团队协作最佳实践
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">建立知识库</strong>，沉淀最佳实践</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">鼓励知识分享</strong>，形成学习文化</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">定期总结</strong>，持续改进</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">代码审查机制</strong>，确保质量</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                成本管理最佳实践
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">合理选择模型</strong>，优化成本</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">监控使用情况</strong>，及时调整</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">建立成本预算</strong>，控制支出</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">使用限额机制</strong>，防止超支</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                跨部门协作最佳实践
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">建立数据分类体系</strong>，明确数据敏感度</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">根据数据敏感度选择工具</strong>（云端/本地）</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">建立跨部门协作流程</strong>和审批机制</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">定期进行合规检查</strong>和隐私保护培训</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                隐私保护最佳实践
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">财务数据</strong>：使用本地模型（Ollama），不上传云端</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">HR 数据</strong>：个人信息使用本地模型，脱敏后使用云端工具</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">数据脱敏</strong>：建立脱敏规则，验证脱敏效果</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">审计记录</strong>：记录所有敏感数据使用情况</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 实战练习 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            实战练习
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">建议练习：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                分析成功案例（选择一个成功案例，深入分析成功因素）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                总结失败教训（选择一个失败案例，总结教训和改进措施）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                制定最佳实践文档（基于案例总结，制定团队最佳实践文档）
              </li>
            </ul>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                理解成功案例的关键因素（工具选型、知识管理、协作机制）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够避免常见错误（工具选型失误、知识管理缺失、安全风险）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握最佳实践（工具使用、团队协作、成本管理、跨部门协作、隐私保护）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/team/growth" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：团队成长与职业发展
          </Link>
        </Button>
        <Button asChild>
          <Link href="/team" className="flex items-center gap-2">
            返回：团队篇概述
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
