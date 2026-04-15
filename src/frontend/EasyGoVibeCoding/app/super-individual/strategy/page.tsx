import { CourseLayout } from "@/components/course/course-layout";
import { superIndividualChapters } from "@/components/course/chapters";
import { Target, Compass, Layers, CheckCircle2 } from "lucide-react";

const checklist = [
  "你要服务的具体人群是谁（越具体越好）",
  "你提供的核心结果是什么（可验证/可交付）",
  "你和同类相比的差异化是什么（速度/质量/成本/风格/渠道）",
  "你选择的切入场景是什么（高频痛点/付费意愿/可复制）",
];

export default function SuperIndividualStrategyPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="把个人能力产品化与规模化"
      chapters={superIndividualChapters}
      currentChapter="定位与策略"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Target className="h-4 w-4" />
          定位与策略
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">定位与策略</h1>
        <p className="text-lg text-muted-foreground">
          先把“你要解决谁的什么问题”说清楚，再谈工具、渠道和增长。定位清晰，后续所有动作才会累积。
        </p>
      </div>

      <div className="space-y-8">
        <section className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            三句定位模板
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">我帮助</strong>（目标人群）在（场景）里实现（核心结果），通过（方法/系统）。
            </p>
            <p>
              <strong className="text-foreground">我不做</strong>：列出 2-3 个明确的边界，减少干扰与机会成本。
            </p>
            <p>
              <strong className="text-foreground">我的优势</strong>：写下你“可被验证”的优势证据（作品、案例、数据、资历）。
            </p>
          </div>
        </section>

        <section className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            快速检查清单
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {checklist.map((item) => (
              <div key={item} className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CourseLayout>
  );
}

