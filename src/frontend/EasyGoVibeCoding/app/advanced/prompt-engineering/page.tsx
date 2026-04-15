import { CourseLayout } from "@/components/course/course-layout";
import { advancedChapters } from "@/components/course/chapters";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const patterns = [
  {
    title: "任务三要素",
    points: ["目标（你要什么）", "上下文（有什么）", "约束（不能做什么）"],
  },
  {
    title: "结构化输出",
    points: ["指定输出格式（JSON/表格/清单）", "指定边界（长度/字段/示例）", "先给大纲再展开"],
  },
  {
    title: "可验证性",
    points: ["要求给测试计划", "要求列出假设与风险", "要求给最小复现/回滚方案"],
  },
];

export default function PromptEngineeringPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={advancedChapters}
      currentChapter="Prompt Engineering"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          新增章节
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Prompt Engineering</h1>
        <p className="text-lg text-muted-foreground">
          把“会问问题”变成可复用的方法论：更少的 token、更稳定的质量、更强的可验收性。
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            最小可复用 Prompt 结构
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {patterns.map((p) => (
              <div key={p.title} className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-3">{p.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {p.points.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            实用模板（可直接复制）
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="text-sm text-muted-foreground mb-3">
              你可以把下面这段当作“通用工作指令”，每次只换任务内容即可。
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground whitespace-pre-wrap">{`你要完成一个工程任务。请按顺序输出：
1) 复述目标（1-2句）
2) 你需要的最小上下文清单（文件/接口/约束）
3) 你的实现方案（分步骤，能落地）
4) 风险与回滚方案
5) 测试计划（最少 3 条）

约束：
- 不要编造不存在的文件/接口
- 不确定的地方用 [需要确认] 标注`}</pre>
            </div>
          </div>
        </section>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/ai-guide" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：AI 使用说明书
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/prd" className="flex items-center gap-2">
            下一章：PRD 与文档驱动
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  );
}

