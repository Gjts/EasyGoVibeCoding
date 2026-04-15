import { CourseLayout } from "@/components/course/course-layout";
import { superIndividualChapters } from "@/components/course/chapters";
import { TrendingUp, Package, BadgeDollarSign, CheckCircle2 } from "lucide-react";

const offers = [
  { title: "服务型（高客单）", desc: "咨询/陪跑/交付型项目，先用服务验证需求与价值。" },
  { title: "产品型（可规模化）", desc: "模板/课程/工具/订阅，把交付标准化与可复制化。" },
  { title: "渠道型（可复利）", desc: "内容、社区、合作分销，让获客成本持续下降。" },
];

export default function SuperIndividualMonetizationPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="把个人能力产品化与规模化"
      chapters={superIndividualChapters}
      currentChapter="产品化与商业化"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          <TrendingUp className="h-4 w-4" />
          产品化与商业化
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">产品化与商业化</h1>
        <p className="text-lg text-muted-foreground">
          目标不是“做更多”，而是把交付变成标准件：更少的沟通成本、更稳定的结果、更可预期的收入。
        </p>
      </div>

      <div className="space-y-8">
        <section className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            三种 Offer 形态
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map((o) => (
              <div key={o.title} className="p-4 rounded-lg bg-secondary/50">
                <div className="font-semibold text-foreground mb-2">{o.title}</div>
                <div className="text-sm text-muted-foreground">{o.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 rounded-xl border border-border bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BadgeDollarSign className="h-5 w-5 text-primary" />
            定价与交付（最小闭环）
          </h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            {[
              "明确交付物：文档/代码/视频/模板/清单",
              "明确边界：包含什么、不包含什么、次数与周期",
              "明确验收：什么叫完成（DoD）",
              "明确风险：失败如何处理（退款/补交付/延长）",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
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

