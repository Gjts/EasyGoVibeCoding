import { CourseLayout } from "@/components/course/course-layout";
import { superIndividualChapters } from "@/components/course/chapters";
import {
  Target,
  Compass,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  UserCheck,
  Lightbulb,
} from "lucide-react";

const checklist = [
  "你要服务的具体人群是谁（越具体越好）",
  "你提供的核心结果是什么（可验证 / 可交付）",
  "你和同类相比的差异化是什么（速度 / 质量 / 成本 / 风格 / 渠道）",
  "你选择的切入场景是什么（高频痛点 / 付费意愿 / 可复制）",
  "你的「10 分钟可展示成果」是什么（作品 / 案例 / Demo）",
  "你愿意持续投入 12 个月以上吗（复利前提）",
];

const traps = [
  {
    title: "太宽泛：'我帮所有人变得更好'",
    why: "没有具体人群就没有精准渠道，获客成本永远居高不下。",
  },
  {
    title: "太炫技：只展示能力，不展示结果",
    why: "买家买的是结果，不是工具链的复杂度。让他「省了多少时间 / 多赚了多少钱」。",
  },
  {
    title: "同质化：用和别人一样的关键词",
    why: "同质化的结果就是价格战。找一个更窄、更贵、更难的小池塘。",
  },
  {
    title: "短视：只做一次性项目",
    why: "每个项目都从零开始，能力无法沉淀成资产。至少要让 30% 工作可复用。",
  },
  {
    title: "无边界：来什么做什么",
    why: "没有「不做清单」就没有差异化，品牌认知也无法累积。",
  },
];

const canvas = [
  {
    title: "目标人群",
    prompt: "他们是谁？在哪里出没？付费意愿如何？决策链多长？",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "价值主张",
    prompt: "用一句话说明你解决什么问题、带来什么可量化的结果。",
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "差异化",
    prompt: "同类里你独有的：速度 / 质量 / 成本 / 风格 / 渠道 / 组合。",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "证据",
    prompt: "作品集 / 案例 / 数据 / 推荐人 / 社会证明。",
    accent: "from-blue-500 to-indigo-500",
  },
];

const validationSteps = [
  {
    phase: "Week 1-2 · 谈",
    desc: "找 5 个目标人群做深度访谈，记录他们的原话（痛点、付费意愿、替代方案）。",
  },
  {
    phase: "Week 3-4 · 造",
    desc: "用最小可交付件（MVD）做 1-2 个付费项目，价格放到「略贵于市场」水平。",
  },
  {
    phase: "Month 2-3 · 放",
    desc: "把过程记录为内容（文章 / 视频 / Demo），让下一批客户从内容找到你。",
  },
];

export default function SuperIndividualStrategyPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="把个人能力产品化与规模化"
      chapters={superIndividualChapters}
      currentChapter="定位与策略"
    >
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
          <Target className="h-4 w-4" />
          定位与策略
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            先把你是谁讲清楚
          </span>
        </h1>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          先把"你要解决谁的什么问题"说清楚，再谈工具、渠道和增长。
          定位清晰，后续所有动作才会累积；定位模糊，再多努力也只是原地打转。
        </p>
      </div>

      {/* 三句定位模板 */}
      <section className="mb-10 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-7">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Compass className="h-5 w-5 text-violet-500" />
          三句定位模板
        </h2>
        <div className="space-y-4 text-sm leading-relaxed text-gray-700">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100">
            <strong className="text-violet-700">我帮助</strong>
            （目标人群）在（场景）里实现（核心结果），通过（方法 / 系统）。
            <p className="mt-2 text-xs text-gray-600">
              例：我帮<strong>独立 SaaS 创始人</strong>在<strong>产品冷启动阶段</strong>
              实现<strong>首批 100 个付费用户</strong>，通过<strong>可复用的 SEO + 社区合作系统</strong>。
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
            <strong className="text-orange-700">我不做</strong>
            ：列出 2-3 个明确的边界，减少干扰与机会成本。
            <p className="mt-2 text-xs text-gray-600">
              例：不接大型企业长周期项目、不做纯咨询不落地、不碰加密货币。
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
            <strong className="text-emerald-700">我的优势</strong>
            ：写下你"可被验证"的优势证据（作品、案例、数据、资历）。
            <p className="mt-2 text-xs text-gray-600">
              例：过去 12 个月独立交付 8 个 MVP、产品 GitHub 累计 3k+ star、
              在某细分领域有 2 篇高引博客。
            </p>
          </div>
        </div>
      </section>

      {/* 定位画布 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Layers className="h-5 w-5 text-violet-500" />
          定位画布（四格填空）
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {canvas.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] p-5 hover:-translate-y-0.5 hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.12)] transition-all"
            >
              <div
                className={`inline-flex bg-gradient-to-r ${c.accent} bg-clip-text text-sm font-extrabold text-transparent mb-2`}
              >
                {c.title}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{c.prompt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 快速检查清单 */}
      <section className="mb-10 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-7">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-violet-500" />
          快速检查清单
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checklist.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 text-sm text-gray-700 p-3 rounded-xl bg-gradient-to-br from-violet-50/50 to-fuchsia-50/50"
            >
              <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5 个常见陷阱 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          5 个最常见的定位陷阱
        </h2>
        <div className="space-y-3">
          {traps.map((t, idx) => (
            <div
              key={t.title}
              className="flex gap-4 p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-rose-400 text-white text-sm font-bold shadow-md">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{t.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{t.why}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 定位验证 3 步法 */}
      <section className="mb-4 rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 p-7 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          定位验证 3 步法（从 0 到 1 的 3 个月）
        </h2>
        <p className="text-sm opacity-95 mb-5">
          不要在书桌前"想"出完美定位，要走出去<strong>验证</strong>出来。
        </p>
        <div className="space-y-3">
          {validationSteps.map((s) => (
            <div
              key={s.phase}
              className="flex gap-4 p-4 rounded-2xl bg-white/15 backdrop-blur border border-white/20"
            >
              <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-sm">{s.phase}</div>
                <div className="text-sm opacity-95 mt-1">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </CourseLayout>
  );
}
