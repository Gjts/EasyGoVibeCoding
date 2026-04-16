import { CourseLayout } from "@/components/course/course-layout"
import { practiceChapters } from "@/components/course/chapters"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Database, Target, Search, Layers, Zap, CheckCircle2, Lightbulb, ShieldCheck, FileSearch } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RagPracticePage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={practiceChapters}
      currentChapter="场景4：RAG 实战"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Database className="h-4 w-4" />
          高级实战场景 · 场景4
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          RAG 实战
        </h1>
        <p className="text-lg text-muted-foreground">
          面向企业知识库、私有文档助手和长代码分析场景，掌握从语料准备、检索链路设计到效果评估与持续优化的完整 RAG 落地流程，真正把 RAG 做成可迭代的工程系统。
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
                "理解 RAG-DD 的端到端落地流程，并能把问题拆到语料、检索、生成各层验证",
                "能够设计知识库分块、元数据、更新机制与权限边界",
                "掌握检索、重排序、上下文组装之间的关键权衡",
                "能够通过评估集与失败复盘持续优化 RAG 效果",
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
            <FileSearch className="h-6 w-6 text-primary" />
            方法论
          </h2>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">RAG-DD 工作流</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              {[
                ["问题定义", "明确用户问题类型、可接受延迟、回答可信度要求，以及是否需要引用来源。"],
                ["语料治理", "清理文档、去重、打标签、建立更新时间和权限边界，避免把脏数据直接送进知识库。"],
                ["检索设计", "决定分块策略、向量检索或混合检索、是否需要重排序，以及最终注入模型的上下文结构。"],
                ["评估迭代", "通过命中率、召回率、答案准确率与失败样本复盘，持续优化分块、召回和 Prompt。"],
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
              <Layers className="h-5 w-5 text-primary" />
              检索链路设计
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">知识分块</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 以语义完整性优先，不要只按固定字数粗暴切片</li>
                  <li>• 为每个 chunk 增加来源、时间、业务域、权限等元数据</li>
                  <li>• 对架构文档、接口文档、代码说明书使用不同的分块策略</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">检索与重排序</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 通用问答优先考虑混合检索，兼顾语义召回与关键词精确匹配</li>
                  <li>• 对长代码分析场景，重排序通常比单纯增加 top-k 更有效</li>
                  <li>• 上下文组装时要保留来源和层级，避免片段脱离原语境</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs">
                  <strong className="text-foreground">实践原则</strong>：先做“能解释为什么答成这样”的 RAG，再追求“看起来更聪明”的回答质量。
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              评估与治理
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground ml-4">
              <li>• <strong>召回评估</strong>：问题对应的正确文档是否被检索出来</li>
              <li>• <strong>答案评估</strong>：回答是否准确、完整、是否引用了正确来源</li>
              <li>• <strong>失败复盘</strong>：区分是检索失败、上下文污染还是生成阶段幻觉</li>
              <li>• <strong>权限治理</strong>：按知识域和用户身份隔离文档，避免越权召回</li>
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
                用 Claude 设计评估集
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>让 AI 从历史 FAQ、工单、文档目录中生成评估问题集，覆盖查询改写、模糊问法和长尾场景。</p>
                <p className="text-xs">重点不是“让 AI 评自己”，而是让 AI 帮你快速构造覆盖面更广的测试样本。</p>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                用向量数据库和重排序模型优化召回
              </h3>
              <ul className="space-y-1 ml-4 text-sm text-muted-foreground">
                <li>• 向量数据库负责初步召回，尽量保证“找得到”</li>
                <li>• 重排序模型负责把最相关的文档排到前面，保证“送得准”</li>
                <li>• 对失败样本做 Top-K 对比，比盲目调 Prompt 更有价值</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            实战案例
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">案例1：企业内部知识库问答</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>目标：让员工用自然语言查询制度、流程、FAQ 和架构文档，并返回带出处的答案。</p>
              <ul className="space-y-1 ml-4">
                <li>• 语料来源：制度文档、Wiki、FAQ、SOP</li>
                <li>• 关键设计：文档分域、权限控制、版本更新时间</li>
                <li>• 核心指标：命中率、引用正确率、问题解决率</li>
              </ul>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-xl font-semibold text-foreground mb-4">案例2：大型代码仓库检索增强助手</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>目标：结合代码注释、README、架构设计文档和模块边界信息，辅助开发者快速定位实现逻辑。</p>
              <ul className="space-y-1 ml-4">
                <li>• 语料来源：代码说明、架构文档、接口契约、变更记录</li>
                <li>• 关键设计：按模块和上下游关系组织上下文，而不是只塞代码片段</li>
                <li>• 失败重点：召回到过期文档、缺失模块边界、片段脱离语义上下文</li>
              </ul>
            </div>
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
                "能够根据场景设计 RAG 的语料、分块和检索链路",
                "理解向量检索、混合检索和重排序的适用边界",
                "能够建立最小可用的 RAG 评估集与失败复盘机制",
                "知道如何处理来源引用、权限隔离和知识更新问题",
                "能把 RAG 作为工程系统而不是单次 Prompt 技巧来设计",
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
          <Link href="/practice/advanced/transition">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              上一场景：业务线切换实战
            </Button>
          </Link>
          <Link href="/practice/advanced/agent">
            <Button>
              下一场景：Agent 实战
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </CourseLayout>
  )
}
