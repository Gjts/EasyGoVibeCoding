import { CourseLayout } from "@/components/course/course-layout";
import { superIndividualChapters } from "@/components/course/chapters";
import { Sparkles, Megaphone, Search, Users, CheckCircle2 } from "lucide-react";

const channels = [
  { title: "内容", icon: Megaphone, items: ["选题库", "内容模板", "发布节奏"] },
  { title: "SEO", icon: Search, items: ["关键词集群", "落地页结构", "持续更新"] },
  { title: "社区/合作", icon: Users, items: ["合作清单", "互推机制", "案例共创"] },
];

export default function SuperIndividualGrowthPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="把个人能力产品化与规模化"
      chapters={superIndividualChapters}
      currentChapter="增长与渠道"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <Sparkles className="h-4 w-4" />
          增长与渠道
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">增长与渠道</h1>
        <p className="text-lg text-muted-foreground">
          渠道的目标是“可复利”。先做一个你能坚持 3 个月的渠道，再逐步叠加第二个。
        </p>
      </div>

      <div className="space-y-8">
        <section className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">三条主渠道</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="font-semibold text-foreground">{c.title}</div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {c.items.map((it) => (
                      <div key={it} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </CourseLayout>
  );
}

