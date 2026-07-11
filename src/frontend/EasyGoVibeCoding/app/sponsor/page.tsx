import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, ShieldCheck } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { SponsorInquiryForm } from "@/components/sponsor/sponsor-inquiry-form"
import { SPONSOR_OFFERS, SPONSOR_PILOT_INVENTORY } from "@/lib/sponsor-offers"

export const metadata: Metadata = {
  title: "赞助合作试运行 | EasyGoVibeCoding",
  description:
    "EasyGoVibeCoding 面向相关开发者产品开放的有限赞助试运行信息、规则与合作咨询入口。",
}

const SLOT_NAMES = {
  "super-individual-home": "超级个体篇首页",
  "super-individual-monetization": "产品化与商业化页面",
} as const

export default function SponsorPage() {
  return (
    <div lang="zh-CN" className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <main>
        <section className="border-b border-slate-800 bg-slate-950 px-4 pb-20 pt-28 text-white sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-violet-300/50 bg-violet-300/10 px-3 py-1 text-sm font-semibold text-violet-100">
                有限赞助试运行
              </p>
              <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                把商业合作放在
                <span className="block">读者能看清的位置</span>
              </h1>
              <p className="mt-6 max-w-[72ch] text-pretty text-base leading-8 text-slate-300 sm:text-lg">
                EasyGoVibeCoding 只为与 AI 编程、开发者工具和独立开发相关的产品开放少量赞助位置。所有付费内容明确标注“广告”，并与课程判断、工具排名和编辑结论保持独立。
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#inquiry"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-violet-500 px-5 text-sm font-bold text-white hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
                >
                  提交合作需求
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="#policy"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-slate-500 px-5 text-sm font-semibold text-slate-100 hover:border-slate-300 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-200"
                >
                  先看合作规则
                </Link>
              </div>
            </div>

            <aside aria-labelledby="pilot-boundary-heading" className="border-y border-slate-700 py-6">
              <h2 id="pilot-boundary-heading" className="text-lg font-bold">
                当前试运行边界
              </h2>
              <dl className="mt-5 space-y-5 text-sm">
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="text-slate-400">开放广告位</dt>
                  <dd className="font-semibold text-slate-100">2 个指定页面</dd>
                </div>
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="text-slate-400">页面上限</dt>
                  <dd className="font-semibold text-slate-100">每页最多 1 个有效赞助卡</dd>
                </div>
                <div className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="text-slate-400">计费方式</dt>
                  <dd className="font-semibold text-slate-100">固定费用，不承诺 CPC 或 CPA</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section
          id="inventory"
          aria-labelledby="inventory-heading"
          className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
              <div>
                <h2 id="inventory-heading" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  只有两个试运行位置
                </h2>
                <p className="mt-4 max-w-[68ch] text-pretty leading-7 text-slate-700">
                  当前库存严格限定在超级个体模块。未列出的页面不在本轮销售范围，任何页面同一时间最多展示一个有效赞助卡。
                </p>
              </div>

              <div className="border-y border-slate-300">
                {SPONSOR_PILOT_INVENTORY.map((item) => (
                  <article
                    key={item.slot}
                    className="grid gap-3 border-b border-slate-200 py-6 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_12rem] sm:items-center"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">
                        {SLOT_NAMES[item.slot]}
                      </h3>
                      <code className="mt-2 block break-all text-sm text-violet-800">
                        {item.slot}
                      </code>
                      <p className="mt-2 text-sm text-slate-600">{item.path}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 sm:text-right">
                      每页最多 {item.maximumActiveCards} 个有效赞助卡
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="offers"
          aria-labelledby="offers-heading"
          className="scroll-mt-28 border-y border-violet-200 bg-violet-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <h2 id="offers-heading" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              试运行合作方案
            </h2>
            <p className="mt-4 max-w-[72ch] text-pretty leading-7 text-slate-700">
              以下为首批 Campaign 的验证价格。报价、排期、退款条件和最终交付均以双方书面订单为准。
            </p>

            <div className="mt-10 border-y border-violet-300">
              {SPONSOR_OFFERS.map((offer) => (
                <article
                  key={offer.id}
                  className="grid gap-4 border-b border-violet-200 py-7 last:border-b-0 lg:grid-cols-[minmax(13rem,0.8fr)_minmax(12rem,0.7fr)_minmax(0,1.5fr)] lg:items-start lg:gap-8"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">{offer.name}</h3>
                    <code className="mt-2 block text-sm text-violet-800">{offer.id}</code>
                  </div>
                  <p className="font-bold text-violet-900">{offer.price}</p>
                  <p className="max-w-[68ch] leading-7 text-slate-700">{offer.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[72ch] text-sm leading-6 text-slate-700">
                首次合作确认排期后支付 50% 订金，余款在上线前付清；报价包含一次素材修改。
              </p>
              <Link
                href="#inquiry"
                className="inline-flex shrink-0 items-center gap-2 font-bold text-violet-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-700"
              >
                说明你的合作目标
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="policy"
          aria-labelledby="policy-heading"
          className="scroll-mt-28 bg-slate-900 px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <div>
                <ShieldCheck aria-hidden="true" className="h-8 w-8 text-violet-300" />
                <h2 id="policy-heading" className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  广告与赞助政策
                </h2>
                <p className="mt-5 max-w-[68ch] text-pretty leading-8 text-slate-300">
                  付费展示始终标注“广告”，不构成产品背书。广告主可以纠正自身产品事实，但不能要求改变课程结论、提高工具排名、删除真实缺点或伪装成用户评价。
                </p>
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold">上线前审核</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                    {[
                      "核验广告主身份、产品名称、功能表述和量化信息出处。",
                      "目标地址必须为 HTTPS，品牌素材必须已获授权并以本地资产交付。",
                      "不接受任意 HTML、脚本、追踪像素或第三方 Cookie。",
                      "发现虚假、失效、劫持或安全风险时可立即暂停展示。",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-violet-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold">商务与交付</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                    {[
                      "固定费用不承诺 CPC、CPA、销售转化或收益结果。",
                      "首次合作支付 50% 订金，余款在上线前付清。",
                      "报价包含一次素材修改，额外制作需书面确认。",
                      "所有价格、排期、素材和退款条件以双方书面订单为准。",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-violet-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-12 border-t border-slate-700 pt-6 text-sm leading-6 text-slate-300">
              聚合报告只包含日期、广告位、页面、有效曝光、点击和点击率。有效曝光指广告至少 50% 可见并持续 1 秒；本站不为广告目的存储原始 IP、邮箱、跨站身份、User-Agent 或第三方 Cookie。
            </p>
          </div>
        </section>

        <section
          id="privacy"
          aria-labelledby="privacy-heading"
          className="scroll-mt-28 border-b border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
            <div>
              <h2 id="privacy-heading" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                咨询隐私说明
              </h2>
              <p className="mt-4 max-w-[68ch] leading-7 text-slate-700">
                这份说明只针对下方商务咨询表单，不改变站内隐私友好的广告统计规则。
              </p>
            </div>

            <div className="max-w-[72ch] space-y-5 text-pretty leading-7 text-slate-700">
              <p>
                提交的数据经同源接口调用 Resend，以邮件形式发送至运行环境配置的赞助收件箱，仅用于合作匹配评估、合规审核和后续联系。咨询数据不会与隐私友好的广告统计或公开反馈混合，也不会出售。
              </p>
              <p>
                本站应用不另行把咨询内容写入广告分析数据。邮件传输、收件留存以及法律义务所需的处理仍受服务配置和适用法律约束。
              </p>
              <p>
                <strong className="text-slate-950">暂定保留规则（待法律审查）：</strong>
                未转化的咨询计划在最后一次实质联系后 180 天内删除；如法律、财税或争议保全义务要求更长时间，则按相应义务处理。
              </p>
              <p>
                需要更正或删除咨询信息时，可在收到回复后直接通过后续往来邮件提出，我们会在核验请求人身份后于合理期限内处理。
              </p>
            </div>
          </div>
        </section>

        <section
          id="inquiry"
          aria-labelledby="inquiry-heading"
          className="scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <div>
              <h2 id="inquiry-heading" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                提交合作需求
              </h2>
              <p className="mt-5 max-w-[68ch] text-pretty leading-7 text-slate-700">
                请提供产品、目标、预算与素材状态。收到后会先判断受众匹配、合规风险和排期可用性，再决定是否提供正式报价。
              </p>
              <ul className="mt-7 space-y-3 text-sm leading-6 text-slate-700">
                <li className="flex items-start gap-3">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-violet-700" />
                  <span>提交咨询不代表接受投放、锁定排期或形成订单。</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-violet-700" />
                  <span>失败时表单保留已填内容；成功后清空本次咨询字段。</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-violet-700" />
                  <span>
                    提交前请阅读
                    <a href="#policy" className="font-semibold text-violet-800 underline underline-offset-4">
                      合作政策
                    </a>
                    与
                    <a href="#privacy" className="font-semibold text-violet-800 underline underline-offset-4">
                      隐私说明
                    </a>
                    。
                  </span>
                </li>
              </ul>
            </div>

            <SponsorInquiryForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
