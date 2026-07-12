# 超级个体篇：决策式产品工具链设计

## 1. 背景

现有“超级个体篇”使用以下五个模块组织内容：

1. 定位与策略
2. 产品化与商业化
3. 系统与自动化
4. 增长与渠道
5. 案例与复盘

这套结构方向正确，但目前主要是静态知识摘要。用户可以阅读并标记完成，却不能根据自己的地区、主体、产品类型、预算和技术能力得到一条可执行的工具路线，也不会在课程结束时获得完整的上线方案。

本次改造把“超级个体篇”升级为决策式自动教学课程，帮助独立开发者从发现需求开始，完成验证、开发、Supabase 后端、部署、海外支付、数据分析和自动化运营，最终形成一份可执行的个人产品上线手册。

## 2. 产品目标

### 2.1 核心目标

用户完成课程后，应当获得一个具备以下属性的产品方案：

- 需求经过基础验证；
- MVP 范围明确；
- 技术栈与用户约束匹配；
- 后端、部署和域名方案明确；
- 支付路径符合用户主体和地区条件；
- Analytics、错误监控和用户反馈方案完整；
- 自动运营任务有清晰边界；
- 能够根据数据决定继续、转向或停止。

最终生成《个人产品上线手册》，而不是只显示课程完成百分比。

### 2.2 成功标准

MVP 满足以下条件即视为完成：

1. 用户完成诊断后获得与主体、地区和产品类型匹配的工具推荐；
2. 中国大陆个人与海外公司得到不同的支付建议和风险提示；
3. 用户可以完成全部十个阶段，并在刷新浏览器后恢复答案和进度；
4. AI 服务不可用时，确定性规则仍能生成基础推荐；
5. 用户可以查看并打印最终上线手册；
6. 任何 API 密钥都不会出现在客户端包、HTML 或静态导出目录中；
7. 现有中文源站和日语、英语、法语、德语静态版本继续构建并通过发布审计；
8. 桌面端和移动端均可完成核心流程。

## 3. 非目标

MVP 不执行以下操作：

- 不替用户注册 Stripe、Wise、Paddle、Lemon Squeezy、Supabase 或其他第三方账户；
- 不读取或保存用户第三方平台的账户凭据；
- 不替用户完成真实支付、转账、部署或公司注册；
- 不承诺某个支付平台一定接受用户的主体、产品或业务；
- 不提供税务、法律或公司注册结论；
- 不建设复杂课程管理后台；
- 不在平台自身接入 Supabase 登录和跨设备同步；
- 不把 `free-for-dev` 全量列表复制成站内工具百科。

Supabase 在 MVP 中是课程教授的默认后端候选。平台自身的 Supabase Auth/Postgres 同步属于后续阶段。

## 4. 目标用户与分支变量

### 4.1 主要用户

- 想从零上线产品的独立开发者；
- 想开展副业的软件工程师；
- 用 AI 编程工具交付小型 SaaS、数字产品或开发者工具的个人创业者；
- 希望把咨询或服务产品化的技术顾问。

### 4.2 诊断变量

课程开始时收集以下非敏感信息：

- 常住地区；
- 经营主体：无主体、中国大陆个人/个体工商户、中国大陆企业、香港公司、新加坡公司、美国公司、其他；
- 产品类型：SaaS、AI 应用、数字下载、课程/内容、咨询/服务、开发者工具；
- 收费方式：一次性、订阅、按量、人工报价、尚未确定；
- 技术水平：入门、中级、高级；
- 月度工具预算；
- 是否需要登录、数据库、文件存储、邮件和实时功能；
- 目标市场与主要结算币种；
- 数据敏感等级。

这些变量只用于生成课程推荐，不收集身份证、银行卡、税号或第三方密钥。

## 5. 课程地图

课程使用十个执行阶段：

| 阶段 | 学习目标 | 主要任务 | 阶段成果 |
| --- | --- | --- | --- |
| 1. 发现需求 | 从真实市场信号寻找问题 | 趋势、社区、竞品评论和关键词研究 | 需求机会清单 |
| 2. 验证问题 | 判断问题是否值得解决 | 访谈、问卷、等待名单和替代方案研究 | 需求验证记录 |
| 3. 定义 MVP | 限制首版范围 | 用户、核心场景、验收标准和不做清单 | 一页式 PRD |
| 4. AI 开发 | 建立可审查的开发流程 | 仓库、任务拆解、AI 编程、测试和版本控制 | 可运行 MVP |
| 5. 后端能力 | 选择数据库与用户能力 | Supabase Database、Auth、Storage 及安全边界 | 数据模型与后端方案 |
| 6. 部署上线 | 获得稳定生产地址 | Cloudflare/Vercel、域名、环境变量和监控 | 生产部署清单 |
| 7. 支付变现 | 选择合规可用的收费路径 | 主体资格、收单、MoR、结算和退款 | 支付路径方案 |
| 8. 数据分析 | 建立最小数据闭环 | 流量、激活、付费、留存、错误和反馈 | Analytics 事件计划 |
| 9. 自动运营 | 自动化重复而稳定的工作 | 邮件、客服、定时任务、通知和数据同步 | 自动化流程清单 |
| 10. 迭代决策 | 用证据决定下一步 | 指标复盘、用户反馈、成本和机会成本 | 继续/转向/停止决策 |

### 5.1 与现有路由的映射

为保留已有链接、SEO 和翻译发布流程，MVP 不增加十个顶层路由，而是在五个现有模块内组织十个子步骤：

| 现有路由 | 新内容 |
| --- | --- |
| `/super-individual/strategy` | 阶段 1 发现需求、阶段 2 验证问题 |
| `/super-individual/monetization` | 阶段 3 定义 MVP，并完成商业模式、定价与首版产品范围 |
| `/super-individual/systems` | 阶段 4 AI 开发、阶段 5 后端能力、阶段 6 部署上线、阶段 7 支付变现 |
| `/super-individual/growth` | 阶段 8 数据分析、阶段 9 自动运营，以及与渠道相关的指标使用 |
| `/super-individual/cases` | 阶段 10 迭代决策、案例和周期复盘 |

`/super-individual` 变为课程仪表盘，展示诊断入口、十步路线、当前阶段、工具栈摘要和上线手册入口。

## 6. 教学交互

每个阶段采用统一闭环：

1. **学习**：阅读该阶段必须理解的原则和常见错误；
2. **诊断**：填写与当前产品相关的约束；
3. **决策**：从候选方案中选择并说明原因；
4. **检查**：确定性规则检查缺失项、冲突和风险；
5. **AI 反馈**：AI 只基于课程规则和候选工具进行追问与解释；
6. **产出**：生成可编辑的阶段成果；
7. **验收**：满足必填条件后完成阶段，并加入最终上线手册。

AI 不替用户做资格判断，不生成“保证开通”“保证合规”等结论。

## 7. 推荐方案

### 7.1 三种候选形态

已评估以下形态：

1. **工具百科**：覆盖广，但用户难以决策，维护成本高；
2. **固定技术栈**：教学简单，但地区、主体和产品差异会导致错误推荐；
3. **决策式工具链**：先收集约束，再生成默认工具、备选工具、选择原因和风险提示。

采用第三种方案。

### 7.2 推荐输出

每个阶段展示：

- 默认推荐；
- 一至两个备选方案；
- 适用条件；
- 不适用条件；
- 免费额度摘要；
- 升级触发条件；
- 主要风险；
- 官方文档；
- 最后核验日期。

`free-for-dev` 只作为候选工具发现来源。最终进入课程目录的工具必须经过官方来源核验。

## 8. 支付决策设计

### 8.1 中国大陆个人或无海外公司

系统遵循以下顺序：

1. 确认产品是否属于软件、数字产品或服务；
2. 检查候选 Merchant of Record 平台的业务范围、禁止产品、KYC 和提现要求；
3. 展示 Paddle、Lemon Squeezy 等候选，但不保证审核结果；
4. Wise 只作为可能的跨境账户、收款链接或结算工具，不作为统一支付网关；
5. 如果资格无法确定，要求用户访问官方资格页面并记录人工核验结果；
6. 明确提醒用户确认本地税务、外汇和经营要求。

### 8.2 香港、新加坡、美国等海外公司

系统比较：

- Stripe 直接收单与订阅；
- Paddle 等 Merchant of Record 平台；
- Wise Business 多币种账户、换汇和资金接收。

选择因素包括税务责任、退款与争议处理、订阅能力、费率、结算币种、客户体验和主体资格。

### 8.3 官方证据要求

支付工具目录不得只引用第三方博客，至少包含平台官方支持地区、业务限制或产品说明链接。地区资格发生变化时，旧推荐必须显示“需要重新核验”。

## 9. 系统架构

### 9.1 组件

1. **课程界面**
   - 现有 Next.js App Router 页面；
   - 十步课程导航；
   - 诊断表单和阶段任务；
   - 工具推荐卡；
   - 上线手册预览和打印布局。

2. **学习状态模块**
   - localStorage 本地优先；
   - 版本化数据结构；
   - 自动保存、恢复、导出和重置；
   - 与现有学习进度模块保持兼容，但使用独立命名空间。

3. **确定性决策引擎**
   - 使用纯 TypeScript 函数；
   - 输入学员档案与工具目录；
   - 输出推荐、备选、警告和缺失信息；
   - 支付、地区和安全判断必须可测试、可解释。

4. **工具目录**
   - 保存在仓库内的版本化 TypeScript/JSON 数据；
   - 通过 schema 验证；
   - 每项记录官方来源和核验日期；
   - 构建时阻止缺失关键字段的数据发布。

5. **AI 教练 API**
   - 通过 Cloudflare Pages Function 或现有服务端函数调用 OpenAI 兼容中转 API；
   - API 密钥仅使用 Cloudflare secret 或本地 `.env.local`；
   - 客户端永不接收密钥；
   - 返回结构化 JSON；
   - 超时、限流和模型错误时自动降级为规则结果。

6. **未来同步层**
   - Supabase Auth 和 Postgres；
   - 不属于 MVP；
   - 后续接入时所有暴露表启用 RLS；
   - `service_role` 只存在于服务端；
   - 授权信息不得依赖用户可编辑的 `user_metadata`。

### 9.2 数据流

1. 用户填写诊断信息；
2. 浏览器立即保存本地草稿；
3. 决策引擎根据工具目录生成基础结果；
4. 用户主动请求 AI 反馈时，前端只发送当前阶段的非敏感上下文；
5. Cloudflare 服务端注入密钥并调用模型；
6. 服务端校验模型响应结构后返回；
7. 前端合并规则结果与 AI 解释；
8. 阶段成果写入本地上线手册；
9. 用户可以打印或保存为 PDF。

## 10. 数据模型

### 10.1 工具目录

```ts
type ToolCatalogItem = {
  id: string
  name: string
  stageIds: string[]
  categories: string[]
  officialUrl: string
  entityTypes: string[]
  regions: string[]
  productTypes: string[]
  skillLevels: string[]
  freeTierSummary: string
  limitations: string[]
  upgradeSignals: string[]
  alternatives: string[]
  sources: Array<{ label: string; url: string }>
  lastVerifiedAt: string
  status: "active" | "recheck" | "retired"
}
```

### 10.2 学员档案

```ts
type SuperIndividualProfile = {
  version: 1
  locale: string
  region: string
  entityType: string
  productType: string
  billingModel: string
  skillLevel: string
  monthlyBudget: string
  targetMarkets: string[]
  needs: string[]
  dataSensitivity: string
  updatedAt: number
}
```

### 10.3 学习工作区

```ts
type SuperIndividualWorkspace = {
  version: 1
  profile: SuperIndividualProfile | null
  stageAnswers: Record<string, Record<string, unknown>>
  stageStatus: Record<string, "not-started" | "in-progress" | "complete">
  recommendations: Record<string, ToolRecommendation[]>
  artifacts: Record<string, string>
  aiFeedback: Record<string, AIFeedback>
  updatedAt: number
}
```

本地存储键使用 `egvc:super-individual-workspace:v1`。未来结构升级必须提供迁移函数，不直接丢弃旧数据。

## 11. AI 教练接口

### 11.1 请求

客户端只发送：

- 当前语言；
- 当前阶段；
- 用户在当前阶段的非敏感答案；
- 决策引擎筛选出的候选工具；
- 需要模型执行的动作：追问、点评或总结。

禁止发送：

- API 密钥；
- 身份证件；
- 银行卡或支付账户信息；
- 用户第三方平台凭据；
- 与当前任务无关的完整浏览历史或个人文件。

### 11.2 响应

```ts
type CoachResponse = {
  feedback: string
  followUpQuestions: string[]
  missingConsiderations: string[]
  suggestedArtifact: string
  disclaimer?: string
}
```

服务端使用 Zod 校验响应。校验失败时不把原始模型内容直接渲染到页面，而是返回安全的降级反馈。

## 12. 错误处理与降级

| 故障 | 用户体验 |
| --- | --- |
| AI 超时、限流或失败 | 保留答案，显示基础规则结果，允许稍后重试 AI 解释 |
| 网络中断 | 本地保存继续工作，恢复后可再次请求 AI |
| 工具资格不确定 | 显示“需要官方核验”，提供官方链接，不输出确定性承诺 |
| 工具数据过期 | 显示核验日期和过期提示，降低推荐置信度 |
| localStorage 不可用 | 保持当前会话，提示用户导出结果，避免宣称已保存 |
| 数据结构版本不兼容 | 先尝试迁移；迁移失败时保留原始导出并提供重置选项 |
| 非法或缺失 API 响应 | 服务端返回统一错误结构，不泄露上游信息或密钥 |

## 13. 多语言与内容维护

- 中文为源内容；
- 日语、英语、法语、德语沿用现有静态翻译构建；
- 工具品牌名、官方 URL 和代码标识不翻译；
- 风险提示、适用条件和阶段任务进入翻译目录；
- 新增动态文案必须能被现有 i18n 提取器发现；
- 所有本地路径必须通过现有发布审计；
- 课程页面继续支持用户语言偏好记忆。

## 14. 可访问性与响应式布局

- 所有表单具备明确 label、错误文本和键盘焦点；
- 推荐不能只用颜色表达状态；
- 桌面端使用课程导航、主内容、成果摘要的三段布局；
- 移动端按“当前任务 → 推荐 → 成果”单列显示；
- 打印模式隐藏导航和交互控件，只保留上线手册；
- 支持系统减少动态效果偏好；
- AI 加载状态使用可读文本，不只使用动画。

## 15. 安全与隐私

- 不在源码、Git 历史、静态输出或客户端日志中保存 API 密钥；
- 服务端限制请求方法、请求体大小、超时和响应大小；
- 对用户输入进行长度限制和结构校验；
- AI 输出作为不可信文本处理，不渲染任意 HTML；
- 工具链接只允许 `https:` 官方来源；
- 不把课程推荐描述为法律、税务或金融建议；
- 未来启用 Supabase 时，所有公开 schema 表启用 RLS，并为每个操作建立最小权限策略；
- 前端只能使用 publishable key，绝不暴露 `service_role` 或 secret key。

## 16. 测试策略

### 16.1 单元测试

- 不同地区、主体、产品和预算的推荐矩阵；
- 中国大陆个人与海外公司的支付分支；
- 工具目录 schema、官方 URL、核验日期和状态；
- 本地工作区保存、恢复、迁移和重置；
- 阶段完成条件；
- 上线手册生成；
- AI 响应 schema 和降级行为。

### 16.2 集成测试

- 诊断 → 推荐 → 阶段产出 → 上线手册完整流程；
- AI API 成功、超时、限流、非法 JSON 和上游错误；
- 刷新页面后恢复进度；
- 打印视图包含全部阶段成果；
- 现有学习进度与新工作区互不覆盖。

### 16.3 发布验证

- ESLint；
- TypeScript 检查；
- 项目构建；
- i18n 测试；
- 五语静态部署构建；
- SEO 审计；
- 发布审计；
- 静态输出密钥扫描；
- 桌面与移动端浏览器冒烟测试；
- Cloudflare 部署后生产 URL 验证。

## 17. 工具目录治理

### 17.1 来源优先级

1. 工具官方文档；
2. 工具官方定价或资格页面；
3. 官方 GitHub 仓库或 changelog；
4. `free-for-dev` 等候选发现列表。

第三方列表不能作为支付资格、合规或价格的唯一证据。

### 17.2 更新规则

- 支付和主体资格信息至少每 30 天复核；
- 其他免费额度至少每 90 天复核；
- 超期条目在页面显示“需要重新核验”；
- 已停止服务的工具标记为 `retired`，不从历史方案中静默删除；
- 任何推荐规则修改必须有测试用例。

## 18. 实施顺序

1. 建立工具目录 schema 和首批核验数据；
2. 建立本地工作区与迁移机制；
3. 建立确定性决策引擎和测试矩阵；
4. 重构超级个体概述页为课程仪表盘；
5. 将五个现有模块改造成十步教学流程；
6. 生成上线手册和打印视图；
7. 接入 Cloudflare AI 教练 API 与降级；
8. 完成多语言提取、翻译和静态构建；
9. 完成安全、响应式和可访问性验证；
10. 部署并验证生产环境。

## 19. 已知风险

- 免费额度和支付资格变化频繁，需要持续维护；
- 大陆个人的海外收款路径高度依赖平台审核和本地要求，课程只能指导核验，不能承诺结果；
- AI 生成内容存在幻觉风险，因此规则引擎和官方来源必须优先；
- 新增大量可交互文本会增加五语翻译成本；
- localStorage 不能跨设备同步，用户应能导出上线手册；
- 一次覆盖十个阶段容易产生内容过宽风险，实施时每阶段只保留完成上线闭环所需的最小知识和任务。

## 20. 参考资料

- [free-for-dev](https://github.com/ripienaar/free-for-dev)
- [Supabase Pricing](https://supabase.com/pricing)
- [Supabase Changelog](https://supabase.com/changelog)
- [Stripe Global Availability](https://stripe.com/global)
- [Paddle: What is Paddle?](https://developer.paddle.com/get-started/how-paddle-works/)
- [Paddle Supported Countries](https://www.paddle.com/help/legal/sanctions/which-countries-are-supported-by-paddle)
- [Lemon Squeezy Supported Countries](https://docs.lemonsqueezy.com/help/getting-started/supported-countries)
- [Wise Business Eligibility](https://wise.com/help/articles/2977974/can-my-business-use-wise)
- [Wise Business Payment Links](https://wise.com/help/articles/4qr3kkvIQlHNiD8BegEB4u/getting-paid-to-your-wise-business-by-payment-link)
