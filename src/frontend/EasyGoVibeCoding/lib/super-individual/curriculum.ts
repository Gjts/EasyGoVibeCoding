import type { SuperIndividualStageId } from "./types.ts"

export interface CurriculumQuestion {
  id: string
  label: string
  help: string
  kind: "text" | "textarea" | "single" | "multi"
  required: boolean
  options?: Array<{ value: string; label: string }>
}

export interface CurriculumStage {
  id: SuperIndividualStageId
  order: number
  title: string
  summary: string
  route: string
  principles: string[]
  mistakes: string[]
  questions: CurriculumQuestion[]
  artifactTitle: string
  artifactTemplate: string
}

const q = (
  id: string,
  label: string,
  help: string,
  kind: CurriculumQuestion["kind"] = "textarea",
  options?: CurriculumQuestion["options"],
): CurriculumQuestion => ({ id, label, help, kind, required: true, options })

export const SUPER_INDIVIDUAL_STAGES: CurriculumStage[] = [
  {
    id: "discover",
    order: 1,
    title: "发现需求",
    summary: "从真实市场信号中找到值得验证的问题。",
    route: "/super-individual/strategy",
    principles: [
      "先找重复发生、已经付出成本的问题，再讨论解决方案。",
      "趋势、社区和竞品评论只能提供线索，不能代替用户证据。",
    ],
    mistakes: ["从自己想做的功能反推需求。", "用点赞和浏览量代替付费意愿。"],
    questions: [
      q("audience", "你准备服务哪一类具体用户？", "写到职业、场景或业务阶段，避免只写“所有人”。"),
      q("problem", "他们反复遇到什么问题？", "描述现状、触发场景和负面结果。"),
      q("evidence", "你在哪里观察到这个问题？", "记录搜索趋势、社区讨论、评论、工单或亲身经历。"),
      q("currentAlternative", "用户现在如何解决？", "列出现有工具、人工流程、外包或放弃处理。"),
    ],
    artifactTitle: "需求机会清单",
    artifactTemplate: "目标用户：{{audience}}\n核心问题：{{problem}}\n观察证据：{{evidence}}\n现有替代方案：{{currentAlternative}}",
  },
  {
    id: "validate",
    order: 2,
    title: "验证问题",
    summary: "用访谈、表单和最小承诺确认问题强度。",
    route: "/super-individual/strategy",
    principles: ["询问过去发生的事实，不询问未来是否会购买。", "付款、订金、预约和投入时间比口头赞美更可靠。"],
    mistakes: ["只采访朋友。", "展示完整方案后诱导用户同意。"],
    questions: [
      q("interviewCount", "完成了多少次目标用户访谈？", "建议先完成 5–10 次，并记录原话。", "text"),
      q("repeatedPain", "重复出现最多的高成本问题是什么？", "至少记录出现次数和造成的时间、金钱或风险。"),
      q("pastSpend", "用户过去为解决它付出过什么？", "包括采购、人工、外包、返工和机会成本。"),
      q("commitment", "你获得了什么真实承诺？", "例如预约试用、加入等待名单、订金或付费试点。"),
    ],
    artifactTitle: "需求验证记录",
    artifactTemplate: "访谈数量：{{interviewCount}}\n重复痛点：{{repeatedPain}}\n过去投入：{{pastSpend}}\n真实承诺：{{commitment}}",
  },
  {
    id: "mvp",
    order: 3,
    title: "定义 MVP",
    summary: "把验证过的问题压缩成一条可交付路径。",
    route: "/super-individual/monetization",
    principles: ["MVP 只证明一个关键假设。", "完成定义必须同时包含不做清单和验收标准。"],
    mistakes: ["把完整愿景当成首版范围。", "以页面数量而不是用户结果定义完成。"],
    questions: [
      q("coreOutcome", "首版必须帮助用户完成什么结果？", "用“用户可以……”描述。"),
      q("coreFlow", "完成结果所需的最短流程是什么？", "控制在 3–5 个关键步骤。"),
      q("acceptance", "如何判断首版真的可用？", "写出可观察、可测试的验收条件。"),
      q("excluded", "首版明确不做什么？", "列出至少三项会拖慢上线的能力。"),
      q("pricingHypothesis", "首个价格或收费假设是什么？", "说明收费方式、金额区间和验证方式。"),
    ],
    artifactTitle: "一页式 MVP PRD",
    artifactTemplate: "核心结果：{{coreOutcome}}\n最短流程：{{coreFlow}}\n验收标准：{{acceptance}}\n不做清单：{{excluded}}\n价格假设：{{pricingHypothesis}}",
  },
  {
    id: "build",
    order: 4,
    title: "AI 开发",
    summary: "用仓库、任务、测试和 AI 编程完成可审查的实现。",
    route: "/super-individual/systems",
    principles: ["先写验收和测试，再让 AI 修改代码。", "把任务拆成可回滚的小提交。"],
    mistakes: ["把整个项目一次性交给模型。", "只看页面能打开，不运行测试和代码审查。"],
    questions: [
      q("stack", "首版使用什么前端和运行时？", "选择熟悉且部署路径清晰的最小技术栈。"),
      q("repository", "代码仓库和分支策略是什么？", "说明主分支保护、提交粒度和回滚方式。"),
      q("aiWorkflow", "AI 编程任务如何描述和审查？", "包含上下文、范围、禁止修改项和验收命令。"),
      q("testCommand", "每次修改必须通过什么命令？", "记录测试、类型检查、lint 和构建命令。"),
    ],
    artifactTitle: "AI 开发执行清单",
    artifactTemplate: "技术栈：{{stack}}\n仓库策略：{{repository}}\nAI 工作流：{{aiWorkflow}}\n验证命令：{{testCommand}}",
  },
  {
    id: "backend",
    order: 5,
    title: "后端能力",
    summary: "设计最小数据模型、认证、存储和访问控制。",
    route: "/super-individual/systems",
    principles: ["数据表从用户所有权和访问边界开始设计。", "Supabase 公开 schema 的表必须启用 RLS。"],
    mistakes: ["在浏览器暴露 service_role。", "只创建表，不设计删除、备份和权限策略。"],
    questions: [
      q("entities", "首版有哪些核心数据实体？", "只列支撑核心流程的表和关系。"),
      q("ownership", "每类数据由谁读取和修改？", "区分匿名、登录用户、管理员和后台任务。"),
      q("rls", "RLS 与服务端密钥边界是什么？", "写出所有权判断和绝不进入前端的密钥。"),
      q("backup", "备份、导出和删除策略是什么？", "说明免费方案限制和升级触发条件。"),
    ],
    artifactTitle: "数据模型与安全边界",
    artifactTemplate: "核心实体：{{entities}}\n数据所有权：{{ownership}}\nRLS 与密钥：{{rls}}\n备份与删除：{{backup}}",
  },
  {
    id: "deploy",
    order: 6,
    title: "部署上线",
    summary: "把可运行代码变成可回滚、可观测的生产版本。",
    route: "/super-individual/systems",
    principles: ["生产环境变量只能保存在部署平台。", "上线必须同时准备回滚、域名和健康检查。"],
    mistakes: ["把本地 .env 提交到仓库。", "只验证首页，不验证支付回调和关键路径。"],
    questions: [
      q("platform", "选择哪个部署平台，为什么？", "比较运行时、免费限制、地域和现有技术栈。"),
      q("domain", "域名、DNS 和 HTTPS 如何配置？", "记录域名所有权、DNS 平台和证书策略。"),
      q("secrets", "生产环境需要哪些变量？", "只写变量名和用途，不填写真实值。"),
      q("rollback", "失败时如何回滚和验证？", "记录上一个稳定版本、回滚命令和健康检查。"),
    ],
    artifactTitle: "生产部署清单",
    artifactTemplate: "部署平台：{{platform}}\n域名与 HTTPS：{{domain}}\n环境变量名称：{{secrets}}\n回滚与健康检查：{{rollback}}",
  },
  {
    id: "payments",
    order: 7,
    title: "支付变现",
    summary: "根据主体、地区和产品选择收单、MoR 与结算路径。",
    route: "/super-individual/systems",
    principles: ["先确认经营主体和产品资格，再集成支付 API。", "Wise 是多币种账户/结算候选，不是通用订阅网关。"],
    mistakes: ["假设平台一定通过 KYC 和产品审核。", "忽略退款、争议、税务和 webhook 幂等。"],
    questions: [
      q("entityCheck", "你已人工核验哪些主体与地区资格？", "记录官方页面、核验日期和仍不确定的条件。"),
      q("checkout", "选择直接收单还是 Merchant of Record？", "比较税务责任、费率、审核和客户体验。"),
      q("settlement", "资金结算到哪里？", "区分结账平台、银行账户、多币种账户和换汇。"),
      q("webhooks", "支付成功、退款和订阅变化如何处理？", "定义 webhook、幂等、重试和人工对账。"),
    ],
    artifactTitle: "支付与结算路径",
    artifactTemplate: "资格核验：{{entityCheck}}\n收单模式：{{checkout}}\n结算路径：{{settlement}}\nWebhook 与对账：{{webhooks}}",
  },
  {
    id: "analytics",
    order: 8,
    title: "数据分析",
    summary: "用最少事件看清获取、激活、付费、留存和错误。",
    route: "/super-individual/growth",
    principles: ["先定义决策，再定义事件。", "流量分析、产品分析和错误监控解决不同问题。"],
    mistakes: ["埋点所有点击却没有决策问题。", "采集敏感数据或无法解释的用户标识。"],
    questions: [
      q("northStar", "当前唯一核心指标是什么？", "指标必须与用户获得价值相关。"),
      q("activation", "什么事件代表用户首次获得价值？", "描述事件名、触发条件和必要属性。"),
      q("funnel", "从访问到付费的关键漏斗是什么？", "控制在 3–6 个事件。"),
      q("errors", "哪些错误必须立即告警？", "覆盖登录、数据、支付和核心任务失败。"),
    ],
    artifactTitle: "Analytics 事件计划",
    artifactTemplate: "核心指标：{{northStar}}\n激活事件：{{activation}}\n转化漏斗：{{funnel}}\n错误告警：{{errors}}",
  },
  {
    id: "automation",
    order: 9,
    title: "自动运营",
    summary: "只自动化重复、稳定、可观察且可恢复的工作。",
    route: "/super-individual/growth",
    principles: ["先手工跑通三次，再自动化。", "每条自动化必须有所有者、日志、失败通知和人工接管。"],
    mistakes: ["自动化尚未稳定的业务流程。", "没有失败队列和幂等，导致重复发信或重复扣费。"],
    questions: [
      q("workflow", "首个值得自动化的高频流程是什么？", "说明当前频率、耗时和错误成本。"),
      q("triggerAction", "触发、条件和动作分别是什么？", "明确输入、输出和外部系统。"),
      q("failure", "失败如何告警、重试和人工接管？", "包含重试上限和重复执行保护。"),
      q("owner", "谁负责每周检查结果？", "超级个体也要明确检查时间和退出条件。"),
    ],
    artifactTitle: "自动化运行手册",
    artifactTemplate: "目标流程：{{workflow}}\n触发与动作：{{triggerAction}}\n失败处理：{{failure}}\n负责人和检查节奏：{{owner}}",
  },
  {
    id: "iterate",
    order: 10,
    title: "迭代决策",
    summary: "用真实结果决定继续、转向或停止。",
    route: "/super-individual/cases",
    principles: ["预先定义继续与停止阈值，避免沉没成本。", "复盘决策链并把重复成果沉淀成资产。"],
    mistakes: ["用忙碌程度代替用户结果。", "指标不达标时只增加功能，不重新检查需求。"],
    questions: [
      q("results", "本周期获得了哪些真实结果？", "记录访谈、激活、付费、留存、成本和时间。"),
      q("thresholds", "继续、转向和停止阈值是什么？", "写出下一周期前可验证的数字条件。"),
      q("decision", "当前决定是什么，依据是什么？", "选择继续、转向或停止，并引用证据。"),
      q("assets", "哪些成果可以复用？", "沉淀模板、代码、内容、SOP、数据或案例。"),
    ],
    artifactTitle: "周期复盘与决策记录",
    artifactTemplate: "真实结果：{{results}}\n决策阈值：{{thresholds}}\n当前决定：{{decision}}\n可复用资产：{{assets}}",
  },
]

export function getStagesForRoute(path: string): CurriculumStage[] {
  const normalized = path === "/" ? path : path.replace(/\/+$/, "")
  return SUPER_INDIVIDUAL_STAGES.filter((stage) => stage.route === normalized)
}

export function getStage(stageId: SuperIndividualStageId): CurriculumStage {
  const stage = SUPER_INDIVIDUAL_STAGES.find((item) => item.id === stageId)
  if (!stage) throw new Error(`Unknown super-individual stage: ${stageId}`)
  return stage
}

export function renderArtifact(
  stage: CurriculumStage,
  answers: Record<string, string>,
): string {
  return stage.artifactTemplate.replace(/\{\{([a-zA-Z0-9]+)\}\}/g, (_, id: string) =>
    answers[id]?.trim() || "待填写",
  )
}
