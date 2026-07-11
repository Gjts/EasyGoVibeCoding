export const SPONSOR_OFFERS = [
  {
    id: "context-card",
    name: "上下文赞助卡",
    price: "¥1,500–3,000 / 30 天",
    description: "在一个约定的高相关页面获得独占赞助卡和聚合交付报告。",
  },
  {
    id: "module-exclusive",
    name: "超级个体模块独家赞助",
    price: "¥4,000–8,000 / 30 天",
    description: "覆盖最多两个约定页面，同类竞品不在同一排期展示。",
  },
  {
    id: "sponsored-challenge",
    name: "品牌实战挑战",
    price: "¥8,000–15,000 / 期",
    description: "共创一期明确标注广告的开发实践、模板或挑战，并提供结项报告。",
  },
] as const

export const SPONSOR_PILOT_INVENTORY = [
  {
    slot: "super-individual-home",
    path: "/super-individual",
    maximumActiveCards: 1,
  },
  {
    slot: "super-individual-monetization",
    path: "/super-individual/monetization",
    maximumActiveCards: 1,
  },
] as const
