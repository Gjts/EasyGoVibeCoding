import { ArrowRight, CheckCircle2, Mail, MapPinned, ShieldCheck, UsersRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmailFeedbackTicker } from "./email-feedback-ticker"

const progressItems = [
  "课程地图、基础篇、工具篇、架构篇、实践篇、团队篇已上线",
  "本地学习档案与真实浏览进度已接入，只保存在当前浏览器",
  "最新模型面板、GitHub 热门项目、资源入口持续补充",
]

const audienceItems = [
  "想系统理解 AI 编程工具的开发者、产品经理、设计师和运营",
  "正在把 AI 工具引入团队流程的技术负责人或团队管理者",
  "希望用 AI 独立完成项目、沉淀作品和方法论的个人学习者",
]

const feedbackItems = [
  "告诉我你现在的角色、基础和最想解决的问题",
  "指出课程中看不懂、过时、缺案例或需要补充的地方",
  "授权后，我会把真实反馈整理成改版依据，而不是虚构口碑",
]

export function ProjectTrustSection() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-blue-200 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              真实进展 · 适用边界 · 早期反馈
            </span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              这个项目还在持续维护中
            </span>
          </h2>
          <p className="mt-4 text-base font-medium leading-7 text-gray-700 sm:text-lg">
            我不展示虚构的学员数量和评价。这里先公开项目当前状态、适合谁使用，以及你可以通过邮箱给我的反馈。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border-2 border-white/70 bg-white/75 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md">
                <MapPinned className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-950">项目真实进度</h3>
                <p className="text-sm font-medium text-gray-600">已做什么，正在维护什么</p>
              </div>
            </div>
            <ul className="space-y-3">
              {progressItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-gray-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border-2 border-white/70 bg-white/75 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md">
                <UsersRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-950">适用人群</h3>
                <p className="text-sm font-medium text-gray-600">适合认真学习和实践的人</p>
              </div>
            </div>
            <ul className="space-y-3">
              {audienceItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-gray-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-purple-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border-2 border-purple-100 bg-white/85 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 text-white shadow-md">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-950">早期反馈征集</h3>
                <p className="text-sm font-medium text-gray-600">通过邮箱直接反馈给我</p>
              </div>
            </div>
            <ul className="mb-6 space-y-3">
              {feedbackItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-gray-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700"
              >
                <a href="#contact">
                  去填写反馈
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <a
                href="mailto:1301385382gjts@gmail.com?subject=EasyGoVibeCoding%20%E6%97%A9%E6%9C%9F%E5%8F%8D%E9%A6%88"
                className="text-center text-sm font-bold text-blue-700 underline underline-offset-4 hover:text-purple-700"
              >
                或直接发邮件到 1301385382gjts@gmail.com
              </a>
            </div>
          </div>
        </div>

        <EmailFeedbackTicker />
      </div>
    </section>
  )
}
