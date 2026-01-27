import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Shield, Lock, FileCheck, AlertTriangle, Users } from "lucide-react"
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

const dataLevels = [
  {
    level: "Level 1: 公开数据",
    definition: "可以公开的信息，无敏感内容",
    tools: "可以使用任何云端 AI 工具",
    examples: ["公开的技术文档", "博客文章", "公开的 API 文档"],
  },
  {
    level: "Level 2: 内部数据",
    definition: "内部使用，不对外公开",
    tools: "使用企业版工具（有数据保护协议）",
    examples: ["内部技术文档", "项目文档", "内部 Wiki"],
  },
  {
    level: "Level 3: 敏感数据",
    definition: "包含个人信息、商业机密",
    tools: "使用本地模型（Ollama），不上传云端",
    examples: ["员工信息", "客户数据", "财务数据"],
  },
  {
    level: "Level 4: 机密数据",
    definition: "高度敏感，法律要求保护",
    tools: "禁止使用 AI 工具，或使用完全离线的本地模型",
    examples: ["财务数据", "法律合同", "医疗记录"],
  },
]

export default function SecurityPage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
      currentChapter="安全与合规"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 8 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          安全与合规
        </h1>
        <p className="text-lg text-muted-foreground">
          建立数据分类体系，保护财务和 HR 数据隐私，确保合规要求，实现跨部门安全协作。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 代码安全 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            代码安全
          </h2>
          <p className="text-muted-foreground mb-6">
            保护代码安全，防止敏感信息泄露。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                代码上传策略
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">敏感代码不上传</strong>：使用本地模型处理敏感代码</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">代码脱敏处理</strong>：移除 API Key、密码、密钥等敏感信息</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">代码审查机制</strong>：AI 辅助 + 人工审查，确保安全</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">白名单机制</strong>：明确哪些代码可以上传</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                API Key 管理
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">统一密钥管理工具</strong>：使用 1Password、Vault 等工具</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">密钥轮换机制</strong>：定期轮换 API Key</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">密钥访问控制</strong>：设置访问权限，最小权限原则</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">密钥使用监控</strong>：记录所有密钥使用情况</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 数据保护与隐私 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            数据保护与隐私
          </h2>
          <p className="text-muted-foreground mb-6">
            建立数据分类体系，根据数据敏感度选择合适的工具和处理方式。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">数据分类体系</h3>
              <div className="space-y-4">
                {dataLevels.map((level, idx) => (
                  <div key={level.level} className={`p-4 rounded-lg ${idx >= 2 ? "bg-destructive/5 border border-destructive/20" : "bg-secondary/50"}`}>
                    <div className="font-semibold text-foreground mb-2">{level.level}</div>
                    <p className="text-sm text-muted-foreground mb-2">{level.definition}</p>
                    <div className="text-sm text-muted-foreground mb-2">
                      <strong className="text-foreground">工具选择：</strong>{level.tools}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong className="text-foreground">示例：</strong>{level.examples.join("、")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                财务数据隐私保护
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <div className="font-medium text-foreground mb-2">财务数据分类</div>
                  <ul className="space-y-1">
                    <li>• <strong>公开财务信息</strong>：可以使用云端工具（如公开的财报）</li>
                    <li>• <strong>内部财务数据</strong>：使用企业版工具，有数据保护协议</li>
                    <li>• <strong>敏感财务数据</strong>：使用本地模型（Ollama），完全离线</li>
                    <li>• <strong>机密财务数据</strong>：禁止使用 AI 工具</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">财务数据使用规范</div>
                  <ul className="space-y-1">
                    <li>• <strong>数据脱敏</strong>：财务数据使用前必须脱敏（金额、账户号等）</li>
                    <li>• <strong>工具选择</strong>：财务数据优先使用本地模型</li>
                    <li>• <strong>审批流程</strong>：使用 AI 工具处理财务数据需要审批</li>
                    <li>• <strong>审计记录</strong>：记录所有财务数据相关的 AI 工具使用</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">财务报告生成</div>
                  <ul className="space-y-1">
                    <li>• 使用 Fabric 生成报告模板（不含实际数据）</li>
                    <li>• 使用本地模型分析财务数据</li>
                    <li>• 使用 Cursor 编写财务文档（不含敏感数据）</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                HR 数据隐私保护
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <div className="font-medium text-foreground mb-2">HR 数据分类</div>
                  <ul className="space-y-1">
                    <li>• <strong>公开信息</strong>：招聘 JD、公开的培训材料</li>
                    <li>• <strong>内部信息</strong>：员工手册、培训计划</li>
                    <li>• <strong>敏感信息</strong>：员工个人信息、绩效数据、薪资信息</li>
                    <li>• <strong>机密信息</strong>：员工健康信息、背景调查数据</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">HR 数据使用规范</div>
                  <ul className="space-y-1">
                    <li>• <strong>个人信息保护</strong>：员工个人信息不上传云端</li>
                    <li>• <strong>数据分析</strong>：使用本地模型分析员工数据</li>
                    <li>• <strong>报告生成</strong>：使用模板生成报告，不包含个人识别信息</li>
                    <li>• <strong>合规要求</strong>：遵守 GDPR、个人信息保护法等法规</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-2">HR AI 应用场景</div>
                  <ul className="space-y-1">
                    <li>• 招聘 JD 生成：使用 Fabric 生成招聘描述（不含敏感信息）</li>
                    <li>• 面试问题生成：使用 AI 生成面试问题模板</li>
                    <li>• 培训材料编写：使用 Cursor 编写培训文档</li>
                    <li>• 数据分析：使用本地模型分析员工反馈（脱敏后）</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">数据脱敏</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">脱敏规则</div>
                  <ul className="space-y-1">
                    <li>• 个人信息：姓名、身份证号、手机号 → 脱敏</li>
                    <li>• 财务信息：金额、账户号、交易记录 → 脱敏</li>
                    <li>• 商业机密：客户信息、合同内容 → 脱敏</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">脱敏工具</div>
                  <ul className="space-y-1">
                    <li>• 自动脱敏脚本</li>
                    <li>• 脱敏规则配置</li>
                    <li>• 脱敏效果验证</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">脱敏流程</div>
                  <ol className="space-y-1 list-decimal list-inside">
                    <li>数据分类：识别敏感数据</li>
                    <li>脱敏处理：应用脱敏规则</li>
                    <li>效果验证：检查脱敏效果</li>
                    <li>使用 AI 工具：处理脱敏后的数据</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 合规要求 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-primary" />
            合规要求
          </h2>
          <p className="text-muted-foreground mb-6">
            遵守相关法律法规，建立审计和日志机制。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">法律法规遵循</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">个人信息保护</div>
                  <ul className="space-y-1">
                    <li>• GDPR（欧盟）</li>
                    <li>• 个人信息保护法（中国）</li>
                    <li>• 数据最小化原则</li>
                    <li>• 目的限制原则</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">财务合规</div>
                  <ul className="space-y-1">
                    <li>• 财务数据保护</li>
                    <li>• 审计要求</li>
                    <li>• 合规检查</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">行业合规</div>
                  <ul className="space-y-1">
                    <li>• 医疗数据：HIPAA</li>
                    <li>• 金融数据：金融监管</li>
                    <li>• 教育数据：FERPA</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">审计与日志</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">工具使用日志</div>
                  <ul className="space-y-1">
                    <li>• 记录所有 AI 工具使用情况</li>
                    <li>• 记录数据上传情况</li>
                    <li>• 记录模型选择情况</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">API 调用日志</div>
                  <ul className="space-y-1">
                    <li>• 记录 API 调用时间、内容、结果</li>
                    <li>• 记录 Token 使用情况</li>
                    <li>• 记录成本信息</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">敏感数据访问日志</div>
                  <ul className="space-y-1">
                    <li>• 记录敏感数据访问情况</li>
                    <li>• 记录数据脱敏情况</li>
                    <li>• 记录审批流程</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">合规检查</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">定期合规检查</div>
                  <ul className="space-y-1">
                    <li>• 每月检查：工具使用合规性</li>
                    <li>• 每季度检查：数据保护合规性</li>
                    <li>• 每年检查：全面合规审计</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">合规问题整改</div>
                  <ul className="space-y-1">
                    <li>• 发现问题 → 立即整改</li>
                    <li>• 整改措施 → 记录归档</li>
                    <li>• 整改效果 → 验证确认</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">合规报告</div>
                  <ul className="space-y-1">
                    <li>• 月度合规报告</li>
                    <li>• 季度合规报告</li>
                    <li>• 年度审计报告</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: 跨部门隐私保护协作 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            跨部门隐私保护协作
          </h2>
          <p className="text-muted-foreground mb-6">
            建立跨部门协作规范，确保数据安全。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">HR 与财务协作</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">数据共享规范</strong>：明确哪些数据可以共享</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">工具选择</strong>：根据数据敏感度选择工具</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">审批流程</strong>：跨部门数据使用需要审批</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">法务与财务协作</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">合同审查</strong>：使用本地模型审查财务相关合同</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">合规检查</strong>：使用 AI 工具检查财务合规性</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-foreground">文档生成</strong>：使用模板生成财务法律文档</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 实战练习 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            实战练习
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">建议练习：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                制定数据分类体系（Level 1-4 的定义和使用规范）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                设计财务数据保护方案（数据分类、使用规范、审批流程）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                建立 HR 数据隐私保护流程（数据分类、使用规范、合规要求）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                创建跨部门协作规范（数据共享、工具选择、审批流程）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                设计合规检查流程（定期检查、问题整改、合规报告）
              </li>
            </ul>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握数据分类和保护方法（Level 1-4 数据分类体系）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够保护财务和 HR 数据隐私（数据分类、使用规范、审批流程）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解合规要求（法律法规遵循、审计日志、合规检查）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                掌握跨部门隐私保护协作方法（HR、财务、法务部门的协作规范）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/team/cost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：成本管理与优化
          </Link>
        </Button>
        <Button asChild>
          <Link href="/team/growth" className="flex items-center gap-2">
            下一章：团队成长与职业发展
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
