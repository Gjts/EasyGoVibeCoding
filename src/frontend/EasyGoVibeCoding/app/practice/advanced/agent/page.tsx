import { CourseLayout } from "@/components/course/course-layout"
import { practiceChapters } from "@/components/course/chapters"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Network, Target, GitBranch, Zap, CheckCircle2, Lightbulb, ShieldCheck, Workflow, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AgentPracticePage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={practiceChapters}
      currentChapter="场景5：Agent 实战"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Network className="h-4 w-4" />
          高级实战场景 · 场景5
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Agent 实战
        </h1>
        <p className="text-lg text-muted-foreground">
          以 ADD、多 Agent 协作和 Micro-Agent Pattern 为核心，掌握从任务拆解、角色分工到工程治理与交付验收的完整 Agent 落地方法，把智能体协作真正接入团队开发流程。
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              学习目标
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "掌握 ADD 从目标拆解到交付验收的完整流程，并能据此组织协作节奏",
                "能够设计 Planner / Executor / Reviewer 等角色协作关系",
                "理解多 Agent 系统中的上下文契约、权限边界与同步机制",
                "能够识别并治理上下文漂移、重复劳动和职责不清等问题",
              ].map((goal) => (
                <div key={goal} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Workflow className="h-6 w-6 text-primary" />
            方法论
          </h2>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">ADD 工作流</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              {[
                ["目标拆解", "先把目标拆成可验证、可交付的任务单元，而不是直接把模糊需求交给一个大 Agent。"],
                ["角色分工", "为不同角色定义输入、输出和责任边界，例如 Planner、Coding Agent、QA Agent、Reviewer。"],
                ["上下文契约", "明确共享什么上下文、何时同步、哪些事实必须引用代码或文档验证。"],
                ["验收闭环", "用测试、构建、人工检查和审阅意见形成交付闭环，而不是只看 Agent 是否“说完成了”。"],
              ].map(([title, desc], index) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">{index + 1}</span>
                  <div>
                    <strong className="text-foreground">{title}</strong>：{desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              多 Agent 协作模式
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="font-medium text-foreground mb-2">Planner / Executor / Reviewer</div>
                <p>适合交付链路清晰的任务，由 Planner 拆解，Executor 实现，Reviewer 负责质量门禁。</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="font-medium text-foreground mb-2">Specialist Swarm</div>
                <p>适合跨领域问题，如安全、性能、UI、架构各自给出独立判断，再由主控汇总。</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="font-medium text-foreground mb-2">Micro-Agent Network</div>
                <p>将复杂任务拆到最小职责单元，提升可替换性，但需要更严格的上下文管理。</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="font-medium text-foreground mb-2">Human-in-the-loop</div>
                <p>在人类审批、发布、外部系统写入等关键节点强制人工确认，控制高风险动作。</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              工程治理重点
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground ml-4">
              <li>• <strong>可观测性</strong>：记录每个 Agent 的输入、决策摘要、产出和失败原因</li>
              <li>• <strong>边界控制</strong>：规定哪些 Agent 只能读，哪些 Agent 可以写，哪些动作必须审批</li>
              <li>• <strong>去重机制</strong>：通过任务列表、owner 和依赖关系避免多个 Agent 做同一件事</li>
              <li>• <strong>成本控制</strong>：先用轻量角色做筛选，再调用高成本模型做关键决策</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            AI工具应用
          </h2>
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                用 Claude Code 组织协作链路
              </h3>
              <ul className="space-y-1 ml-4 text-sm text-muted-foreground">
                <li>• 用任务拆解和子代理分工，先明确谁负责探索、谁负责实现、谁负责评审</li>
                <li>• 用共享任务状态记录 owner、依赖和完成情况，降低上下文漂移</li>
                <li>• 对高风险动作设置人工确认，避免“自动化误伤”</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                用结构化日志做失败复盘
              </h3>
              <p className="text-sm text-muted-foreground">
                记录任务输入、关键判断、调用链路和失败原因，能帮助你区分问题来自需求拆解、上下文不足，还是执行阶段的实现错误。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            实战案例
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">案例1：多 Agent 代码评审流水线</h3>
            <ul className="space-y-2 ml-4 text-sm text-muted-foreground">
              <li>• 主控 Agent 负责读取变更范围并分配给安全、性能、可维护性专员</li>
              <li>• 各专员输出独立意见，避免“一个 Agent 包打天下”的盲区</li>
              <li>• Reviewer 汇总冲突意见，并给出是否允许合并的结论</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">案例2：需求到交付的 Agent 开发流程</h3>
            <ul className="space-y-2 ml-4 text-sm text-muted-foreground">
              <li>• Planner 读取 PRD 和代码结构，输出可执行任务清单</li>
              <li>• Coding Agent 按任务实现改动，QA Agent 运行验证，Reviewer 做最终把关</li>
              <li>• 在发布、数据库变更、外部系统写入等节点保留人工审批</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              学习成果检查清单
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                "能够把复杂目标拆成适合 Agent 执行的独立任务",
                "能够为不同 Agent 定义清晰输入、输出和权限边界",
                "理解多 Agent 协作中的同步、复核和升级机制",
                "知道如何用日志、任务状态和评审门禁治理失败模式",
                "能够区分“核心技能页”和“高级实战页”的不同教学目标",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link href="/practice/advanced/rag">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              上一场景：RAG 实战
            </Button>
          </Link>
          <Link href="/practice/advanced">
            <Button>
              返回高级实战场景
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </CourseLayout>
  )
}
