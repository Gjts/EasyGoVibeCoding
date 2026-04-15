import { CourseLayout } from "@/components/course/course-layout";
import { advancedChapters } from "@/components/course/chapters";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Gauge, ShieldCheck, TestTube2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const blocks = [
  {
    title: "Eval Harness（评测基建）",
    icon: TestTube2,
    items: [
      "定义输入集合（golden set）与标签",
      "定义输出判定（rule-based + LLM judge）",
      "离线回归：每次变更都跑一遍",
    ],
  },
  {
    title: "质量门禁（Quality Gate）",
    icon: ShieldCheck,
    items: [
      "失败阈值（例如 pass-rate ≥ 95%）",
      "关键用例必须全绿（critical path）",
      "漂移监控与告警（prompt/model/数据）",
    ],
  },
  {
    title: "可观测性（Observability）",
    icon: Gauge,
    items: [
      "记录 traceId + prompt/version + latency",
      "采样保存输入/输出用于复盘（脱敏）",
      "线上回归：shadow traffic / canary",
    ],
  },
];

export default function HarnessEngineeringPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={advancedChapters}
      currentChapter="Harness Engineering"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          新增章节
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Harness Engineering</h1>
        <p className="text-lg text-muted-foreground">
          面向 AI 系统的“测试基建”：把结果变稳定，把回归可自动化，把质量能量化。
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">核心组成</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {blocks.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{b.title}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {b.items.map((x) => (
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
          <h2 className="text-2xl font-semibold text-foreground mb-4">最小落地（MVP）</h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>选 20 条关键用例（覆盖核心链路 + 失败高发点）。</li>
              <li>写 1 个可重复执行的 runner（本地/CI 都能跑）。</li>
              <li>定义 2 个指标：通过率、P95 延迟；设置门禁阈值。</li>
              <li>每次改 prompt/模型/检索，都必须跑回归并记录结果。</li>
            </ol>
          </div>
        </section>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/testing" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：测试与质量
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/deployment" className="flex items-center gap-2">
            下一章：部署与运维
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  );
}

