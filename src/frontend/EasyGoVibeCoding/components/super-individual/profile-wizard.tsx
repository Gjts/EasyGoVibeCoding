"use client"

import { useState } from "react"
import { Compass, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type {
  EntityType,
  ProductType,
  SuperIndividualProfile,
} from "@/lib/super-individual/types"

const entityOptions: Array<{ value: EntityType; label: string }> = [
  { value: "none", label: "暂无经营主体" },
  { value: "cn-individual", label: "中国大陆个人 / 个体经营者" },
  { value: "cn-company", label: "中国大陆企业" },
  { value: "hk-company", label: "香港公司" },
  { value: "sg-company", label: "新加坡公司" },
  { value: "us-company", label: "美国公司" },
  { value: "other-company", label: "其他地区公司" },
]

const productOptions: Array<{ value: ProductType; label: string }> = [
  { value: "saas", label: "SaaS" },
  { value: "ai-app", label: "AI 应用" },
  { value: "developer-tool", label: "开发者工具" },
  { value: "digital-product", label: "数字下载产品" },
  { value: "course", label: "课程 / 内容产品" },
  { value: "consulting", label: "咨询 / 服务" },
]

function initialDraft(profile?: SuperIndividualProfile | null): SuperIndividualProfile {
  return (
    profile ?? {
      version: 1,
      locale: "zh-CN",
      region: "CN",
      entityType: "none",
      productType: "saas",
      billingModel: "unknown",
      skillLevel: "intermediate",
      monthlyBudget: "under-25",
      targetMarkets: ["US"],
      needs: ["database", "auth", "payments"],
      dataSensitivity: "normal",
      updatedAt: 0,
    }
  )
}

export function ProfileWizard({
  initialProfile,
  onSave,
}: {
  initialProfile?: SuperIndividualProfile | null
  onSave: (profile: SuperIndividualProfile) => void
}) {
  const [draft, setDraft] = useState(() => initialDraft(initialProfile))
  const [markets, setMarkets] = useState(draft.targetMarkets.join(", "))
  const [error, setError] = useState("")

  const setField = <K extends keyof SuperIndividualProfile>(
    key: K,
    value: SuperIndividualProfile[K],
  ) => setDraft((current) => ({ ...current, [key]: value }))

  return (
    <form
      className="rounded-3xl border border-violet-200 bg-white p-6 shadow-sm sm:p-8"
      onSubmit={(event) => {
        event.preventDefault()
        const targetMarkets = markets
          .split(/[,，]/)
          .map((item) => item.trim().toUpperCase())
          .filter(Boolean)
        if (!draft.region.trim() || targetMarkets.length === 0) {
          setError("请填写常住地区和至少一个目标市场。")
          return
        }
        setError("")
        onSave({ ...draft, targetMarkets, updatedAt: Date.now() })
      }}
    >
      <div className="mb-6 flex items-start gap-3">
        <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
          <Compass className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-950">先建立你的产品约束</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            系统根据主体、地区、产品和预算推荐工具。这里不收集身份证、银行卡或第三方密钥。
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="si-region">常住地区代码</Label>
          <Input
            id="si-region"
            value={draft.region}
            onChange={(event) => setField("region", event.target.value.toUpperCase())}
            placeholder="例如 CN、HK、SG、US"
            aria-describedby="si-region-help"
          />
          <p id="si-region-help" className="text-xs text-gray-500">用于提示地区可用性，不用于身份验证。</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="si-entity">经营主体</Label>
          <select
            id="si-entity"
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900"
            value={draft.entityType}
            onChange={(event) => setField("entityType", event.target.value as EntityType)}
          >
            {entityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="si-product">产品类型</Label>
          <select
            id="si-product"
            className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900"
            value={draft.productType}
            onChange={(event) => setField("productType", event.target.value as ProductType)}
          >
            {productOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="si-billing">收费方式</Label>
          <select id="si-billing" className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900" value={draft.billingModel} onChange={(event) => setField("billingModel", event.target.value as SuperIndividualProfile["billingModel"])}>
            <option value="unknown">尚未确定</option>
            <option value="one-time">一次性付款</option>
            <option value="subscription">订阅</option>
            <option value="usage">按量计费</option>
            <option value="quote">人工报价</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="si-skill">技术水平</Label>
          <select id="si-skill" className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900" value={draft.skillLevel} onChange={(event) => setField("skillLevel", event.target.value as SuperIndividualProfile["skillLevel"])}>
            <option value="beginner">入门</option>
            <option value="intermediate">中级</option>
            <option value="advanced">高级</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="si-budget">月度工具预算</Label>
          <select id="si-budget" className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900" value={draft.monthlyBudget} onChange={(event) => setField("monthlyBudget", event.target.value as SuperIndividualProfile["monthlyBudget"])}>
            <option value="zero">暂时零预算</option>
            <option value="under-25">25 美元以内</option>
            <option value="under-100">100 美元以内</option>
            <option value="over-100">100 美元以上</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="si-markets">目标市场</Label>
          <Input id="si-markets" value={markets} onChange={(event) => setMarkets(event.target.value)} placeholder="例如 US, JP, DE" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="si-sensitivity">数据敏感等级</Label>
          <select id="si-sensitivity" className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900" value={draft.dataSensitivity} onChange={(event) => setField("dataSensitivity", event.target.value as SuperIndividualProfile["dataSensitivity"])}>
            <option value="normal">普通产品数据</option>
            <option value="sensitive">包含敏感业务或个人数据</option>
            <option value="regulated">可能属于受监管数据</option>
          </select>
        </div>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-700" role="alert">{error}</p>}

      <div className="mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-gray-500"><ShieldCheck className="h-4 w-4" />所有答案先保存在当前浏览器。</p>
        <Button type="submit">生成我的工具路线</Button>
      </div>
    </form>
  )
}
