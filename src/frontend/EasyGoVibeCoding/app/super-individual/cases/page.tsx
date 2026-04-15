import { CourseLayout } from "@/components/course/course-layout";
import { superIndividualChapters } from "@/components/course/chapters";
import { BookOpen, ClipboardCheck, CheckCircle2 } from "lucide-react";

const retro = [
  "本周做了什么？哪些是可复用的？",
  "哪些动作带来了结果？哪些只是忙？",
  "一个“最小改动”是什么？下周只改这一件。",
  "把成果沉淀为：模板/清单/脚本/页面。",
];

export default function SuperIndividualCasesPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="把个人能力产品化与规模化"
      chapters={superIndividualChapters}
      currentChapter="案例与复盘"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <BookOpen className="h-4 w-4" />
          案例与复盘
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">案例与复盘</h1>
        <p className="text-lg text-muted-foreground">
          复盘不是总结，而是把经验变成“下次可以直接复用的资产”。
        </p>
      </div>

      <div className="space-y-8">
        <section className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            每周复盘清单（建议 30 分钟）
          </h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            {retro.map((r) => (
              <div key={r} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CourseLayout>
  );
}

