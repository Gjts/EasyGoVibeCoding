import { CourseLayout } from "@/components/course/course-layout";
import { superIndividualChapters } from "@/components/course/chapters";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Workflow, TrendingUp, BookOpen, Award } from "lucide-react";

const modules = [
  {
    title: "定位与策略",
    description: "确定你是谁、为谁创造价值、如何差异化竞争。",
    href: "/super-individual/strategy",
    icon: Target,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "产品化与商业化",
    description: "把能力打包成产品，设计价格、交付与增长飞轮。",
    href: "/super-individual/monetization",
    icon: TrendingUp,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "系统与自动化",
    description: "用系统替代意志力，用自动化替代重复劳动。",
    href: "/super-individual/systems",
    icon: Workflow,
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    title: "增长与渠道",
    description: "内容、SEO、社媒、合作与分销，建立可复利的流量来源。",
    href: "/super-individual/growth",
    icon: Sparkles,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "案例与复盘",
    description: "用复盘沉淀可复用的方法论，把成功变成可复制。",
    href: "/super-individual/cases",
    icon: BookOpen,
    gradient: "from-pink-500 to-rose-500",
  },
];

export default function SuperIndividualPage() {
  return (
    <CourseLayout
      title="超级个体篇"
      description="把个人能力产品化与规模化"
      chapters={superIndividualChapters}
    >
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
          <Sparkles className="h-4 w-4" />
          超级个体篇 · 系统化成长
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            超级个体
          </span>
        </h1>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          目标是把你的能力变成可交付、可复制、可复利的系统：定位 → 产品化 → 自动化 → 增长 → 复盘。
        </p>
      </div>

      {/* Audience */}
      <div className="mb-12 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">适合人群</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["独立开发者 / 自由职业者", "想做副业的工程师", "独立咨询与顾问", "内容创作者 / 独立创业者"].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200/50">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">学习目标</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            "定位差异化的个人价值",
            "把能力打包成可交付产品",
            "建立自动化与复利系统",
          ].map((goal, index) => {
            const gradients = [
              "from-violet-400 to-fuchsia-400",
              "from-amber-400 to-orange-400",
              "from-emerald-400 to-cyan-400",
            ];
            return (
              <div
                key={goal}
                className={`p-5 rounded-2xl bg-gradient-to-br ${gradients[index]} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3`}
              >
                <Award className="h-6 w-6" />
                <span className="font-bold text-lg">{goal}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modules */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">模块导航</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{m.title}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{m.description}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-purple-700">
                  进入模块
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Chapter list */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">章节目录</h2>
        <div className="space-y-3">
          {superIndividualChapters.slice(1).map((chapter, index) => (
            <Link
              key={chapter.href}
              href={chapter.href}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 group"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-sm font-bold shadow-lg">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-semibold text-gray-900">{chapter.title}</span>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          ))}
        </div>
      </div>
    </CourseLayout>
  );
}

