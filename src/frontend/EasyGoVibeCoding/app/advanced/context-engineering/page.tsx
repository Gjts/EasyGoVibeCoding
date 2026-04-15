import { CourseLayout } from "@/components/course/course-layout";
import { advancedChapters } from "@/components/course/chapters";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Database, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const layers = [
  {
    title: "静态上下文",
    desc: "规则、约束、架构规范（稳定不变）",
    items: ["项目规范（lint/约束）", "接口契约（OpenAPI）", "安全边界与权限模型"],
    icon: Shield,
  },
  {
    title: "工作区上下文",
    desc: "与当前任务强相关的文件与代码片段",
    items: ["相关文件路径", "最小必要片段（diff/函数）", "复现步骤与日志"],
    icon: Database,
  },
  {
    title: "动态上下文",
    desc: "随时间变化的状态与记忆（要可控）",
    items: ["检索结果（RAG）", "最近决策与原因", "临时结论与待验证假设"],
    icon: Sparkles,
  },
];

export default function ContextEngineeringPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={advancedChapters}
      currentChapter="Context Engineering"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          新增章节
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Context Engineering</h1>
        <p className="text-lg text-muted-foreground">
          上下文不是“越多越好”，而是“可控、可验证、可复用”。目标是用最小上下文得到稳定输出。
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">三层上下文模型</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {layers.map((l) => {
              const Icon = l.icon;
              return (
                <div key={l.title} className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{l.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{l.desc}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {l.items.map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">实践清单（建议默认执行）</h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "先给 AI：目标 + 当前现状 + 约束 + 输出格式",
                "把“参考资料”显式分组：规则/代码/日志/数据",
                "限制上下文：只给最相关的 3-8 个文件（或关键片段）",
                "对不确定的地方要求标注 [需要确认]，避免瞎编",
                "每次迭代都留痕：变更点 + 证据（测试/日志/截图）",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/data" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：数据持久化
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/testing" className="flex items-center gap-2">
            下一章：测试与质量
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  );
}

