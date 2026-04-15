import { CourseLayout } from "@/components/course/course-layout";
import { superIndividualChapters } from "@/components/course/chapters";
import { Workflow, Repeat2, ListChecks, CheckCircle2 } from "lucide-react";

const habits = [
  "输入系统：收集 → 过滤 → 归档（灵感、需求、素材）",
  "产出系统：选题 → 草稿 → 交付 → 复用（模板化）",
  "反馈系统：数据 → 复盘 → 调整（周/月节奏）",
  "自动化系统：脚本/工具/Agent 替代重复劳动",
];

export default function SuperIndividualSystemsPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="把个人能力产品化与规模化"
      chapters={superIndividualChapters}
      currentChapter="系统与自动化"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Workflow className="h-4 w-4" />
          系统与自动化
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">系统与自动化</h1>
        <p className="text-lg text-muted-foreground">
          让你“持续稳定输出”的不是热情，而是系统：流程、清单、模板、自动化，把不确定性降到最低。
        </p>
      </div>

      <div className="space-y-8">
        <section className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Repeat2 className="h-5 w-5 text-primary" />
            四个系统
          </h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            {habits.map((h) => (
              <div key={h} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            最小可执行建议
          </h2>
          <div className="text-sm text-muted-foreground space-y-3">
            <p>
              从一个高频动作开始（例如：每周产出 1 篇文章 / 每周交付 1 个模板），把流程写成清单，
              然后用工具与 Agent 自动化其中 30% 的步骤。
            </p>
          </div>
        </section>
      </div>
    </CourseLayout>
  );
}

