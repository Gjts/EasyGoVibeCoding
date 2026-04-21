import { CourseLayout } from "@/components/course/course-layout";
import { superIndividualChapters } from "@/components/course/chapters";
import {
  BookOpen,
  ClipboardCheck,
  CheckCircle2,
  Package,
  Repeat,
  Trophy,
  FileText,
} from "lucide-react";

const retroWeekly = [
  "本周做了什么？哪些是可复用的？",
  "哪些动作带来了结果？哪些只是忙？",
  "一个「最小改动」是什么？下周只改这一件。",
  "把成果沉淀为：模板 / 清单 / 脚本 / 页面 / 代码片段。",
];

const retroMonthly = [
  "本月最大的一次「结果」是什么？复盘完整决策链。",
  "哪些客户 / 项目真正赚钱？哪些是赔本赚吆喝？",
  "内容 / 产品 / 服务，哪一条线在增长？原因是什么？",
  "下个月只做 3 件事，删掉其余。",
];

const assetTypes = [
  {
    title: "交付模板库",
    desc: "PRD / 提案 / 报告 / 合同 / 验收文档 的可复用骨架。",
    gradient: "from-violet-400 to-fuchsia-400",
  },
  {
    title: "代码与脚本仓",
    desc: "常用自动化脚本、工具函数、Skill 配置、Agent 流程。",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    title: "内容与作品集",
    desc: "博文、视频、Demo、案例研究 — 让下一批客户主动找到你。",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    title: "SOP 与清单",
    desc: "冷启动 / 项目交付 / 售后跟进 / 复盘 的标准操作流程。",
    gradient: "from-blue-400 to-indigo-400",
  },
];

const caseArchetypes = [
  {
    title: "Indie Hacker 型",
    tagline: "一个人 · 一组小产品 · 广告 / 订阅",
    desc: "同时维护多个窄垂类小产品（Nomad List / PhotoAI 等风格），用共享基础设施和模板降低维护成本。核心能力是产品化速度 + SEO 复利。",
    outcomes: ["月度被动收入 > 运营成本", "3-5 个产品共用同一套技术栈", "高度自动化，人只处理边缘问题"],
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "独立顾问 / 陪跑型",
    tagline: "单客高客单 · 专业可验证 · 季度交付",
    desc: "服务少数高价值客户，按月 / 季收费。前期用 1-2 个公开案例建立信任，通过精准内容吸引同类客户。核心能力是可量化的专业结果。",
    outcomes: ["客单价 5-50 万级", "客户主要来自推荐 / 内容", "可持续 3-5 年不换赛道"],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "内容 + 产品组合型",
    tagline: "写作 / 视频 → 信任 → 课程 / 工具 / 社群",
    desc: "以内容为流量入口，建立细分领域话语权，再把经验打包成课程、工具或私域社群。核心能力是持续产出 + 把经验产品化。",
    outcomes: ["内容阅读量 / 订阅稳定增长", "多个收入曲线互相导流", "核心资产是读者信任"],
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function SuperIndividualCasesPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="把个人能力产品化与规模化"
      chapters={superIndividualChapters}
      currentChapter="案例与复盘"
    >
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
          <BookOpen className="h-4 w-4" />
          案例与复盘
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            把经验沉淀成资产
          </span>
        </h1>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          复盘不是总结，而是把经验变成"下次可以直接复用的资产"。
          同时看懂别人走过的路，比自己摸索快 10 倍。
        </p>
      </div>

      {/* 3 个典型 archetype */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-violet-500" />
          三类超级个体原型
        </h2>
        <div className="space-y-4">
          {caseArchetypes.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] p-6"
            >
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <div
                  className={`bg-gradient-to-r ${c.gradient} bg-clip-text text-lg font-extrabold text-transparent`}
                >
                  {c.title}
                </div>
                <span className="text-xs font-semibold text-gray-600">
                  {c.tagline}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{c.desc}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {c.outcomes.map((o) => (
                  <div
                    key={o}
                    className="flex items-start gap-2 p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 text-xs text-gray-700"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" />
                    {o}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 资产化清单 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Package className="h-5 w-5 text-violet-500" />
          成果资产化 · 四个仓库
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          把每个项目的产出归位到这四个仓库，3-6 个月后你会有一套"可复制的系统"。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assetTypes.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] p-5 hover:-translate-y-0.5 hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.12)] transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`h-10 w-10 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shadow-md`}
                >
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">{a.title}</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 每周复盘 */}
      <section className="mb-8 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-7">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-violet-500" />
          每周复盘清单（建议 30 分钟）
        </h2>
        <div className="space-y-2">
          {retroWeekly.map((r) => (
            <div
              key={r}
              className="flex items-start gap-2 text-sm text-gray-700 p-3 rounded-xl bg-gradient-to-br from-violet-50/60 to-fuchsia-50/60"
            >
              <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
              <span>{r}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 每月复盘 */}
      <section className="mb-8 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-7">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Repeat className="h-5 w-5 text-violet-500" />
          每月复盘清单（建议 90 分钟）
        </h2>
        <div className="space-y-2">
          {retroMonthly.map((r) => (
            <div
              key={r}
              className="flex items-start gap-2 text-sm text-gray-700 p-3 rounded-xl bg-gradient-to-br from-amber-50/60 to-orange-50/60"
            >
              <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
              <span>{r}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 行动卡 */}
      <section className="rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 p-7 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
        <h2 className="text-xl font-bold mb-2">今天就做：30 分钟行动</h2>
        <ul className="text-sm leading-7 opacity-95 list-disc list-inside space-y-1">
          <li>在笔记里新建"资产库"，分出上方四个文件夹；</li>
          <li>把最近 2 个月做过的最好一个产出，归位到对应文件夹；</li>
          <li>写一句话"这个产出下次可以如何复用"；</li>
          <li>下周起每周五固定 30 分钟做周度复盘。</li>
        </ul>
      </section>
    </CourseLayout>
  );
}
