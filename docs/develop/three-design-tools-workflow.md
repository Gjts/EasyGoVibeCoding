# 三个设计工具协作使用手册

> 适用项目：EasyGoVibeCoding  
> 适用场景：Codex / AI coding agent 辅助前端设计、页面改版、UI 审核与交付前质检  
> 覆盖工具：`ui-ux-pro-max`、`design-taste-frontend`、`impeccable`

---

## 1. 一句话结论

这三个工具不要同时当“主设计师”使用。最佳方式是分层协作：

| 工具 | 最适合的位置 | 核心价值 | 不适合 |
| --- | --- | --- | --- |
| `ui-ux-pro-max` | 设计系统与 UX 决策库 | 根据产品类型、行业、风格、颜色、字体、栈给出系统化建议 | 直接替你做最终视觉收口 |
| `design-taste-frontend` | 营销页/官网/作品集的审美强化 | 防止 AI 模板感、俗套 hero、卡片堆叠、AI 紫蓝渐变 | 后台系统、复杂表格、密集 dashboard |
| `impeccable` | 项目级设计流程和质检中枢 | 初始化设计上下文、形态规划、审查、审美 polish、浏览器迭代和 detector 规则 | 替代所有产品/品牌判断 |

推荐顺序：

```text
impeccable init
  -> ui-ux-pro-max 生成/补充设计系统
  -> design-taste-frontend 强化关键营销页面
  -> impeccable critique/audit/polish/harden 收口
  -> pnpm lint/build 验证
```

---

## 2. 当前本机安装状态

已安装到 Codex 全局 skills 目录：

```text
C:\Users\13013\.codex\skills\taste-skill
C:\Users\13013\.codex\skills\ui-ux-pro-max
```

对应 skill 名称：

```text
design-taste-frontend
ui-ux-pro-max
```

`ui-ux-pro-max` 的检索脚本路径：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py --help
```

`impeccable` 建议用它自己的 CLI 安装器配置 Codex hooks 和命令，而不是只复制 `SKILL.md`：

```powershell
cd D:\GitHub_Download\GoWeb3\easy\EasyGoVibeCoding
npx impeccable install --providers=codex --scope=project
```

注意：`impeccable` 的 `package.json` 要求 Node.js `>=24`。安装前先确认：

```powershell
node -v
```

安装或更新后，Codex 用户通常需要打开 `/hooks` 并批准项目 hook，然后重启或刷新 Codex。

---

## 3. 三者的职责边界

### 3.1 `ui-ux-pro-max`：设计知识库和决策引擎

把它当成“设计系统搜索引擎”。它擅长回答：

- 这个产品类型应该使用什么 UI 风格？
- 面向什么用户时，颜色、字体、密度、动效应该怎么选？
- Landing page / dashboard / SaaS / mobile app 应该遵守哪些 UX 原则？
- Next.js、React、shadcn/ui、Tailwind 下有哪些实现注意点？
- 图表、表单、导航、按钮、卡片等组件有什么专业规则？

典型命令：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py "AI programming education platform Chinese SaaS learning site" --design-system --stack nextjs -p "EasyGoVibeCoding" -f markdown
```

生成并持久化设计系统：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py "AI programming education platform Chinese SaaS learning site" --design-system --stack nextjs -p "EasyGoVibeCoding" -f markdown --persist
```

查询某个领域：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py "accessibility animation loading responsive" --domain ux -n 5
```

查询技术栈规则：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py "navigation server components image performance" --stack nextjs -n 5
```

什么时候用：

- 新页面开工前，需要设计方向。
- 想统一字体、颜色、spacing、组件风格。
- 对 UI 专业度没有把握，需要规则化依据。
- 做 dashboard、表单、图表、响应式、移动端适配。

什么时候不用：

- 只是修一个后端 bug。
- 只是改文案错别字。
- 已经有明确 `DESIGN.md`，只需要执行局部改动。

---

### 3.2 `design-taste-frontend`：营销视觉审美强化

把它当成“反 AI 套路的前端视觉总监”。它擅长：

- Landing page、官网、作品集、活动页、品牌页。
- 识别和避免模板化视觉：
  - AI 紫蓝渐变。
  - 中心 hero + 三张功能卡。
  - 所有内容都包 card。
  - 泛用 glassmorphism。
  - 没有真实视觉资产。
  - 缺少品牌调性。
- 根据 brief 先做 Design Read，再决定视觉语言。
- 对 hero、section、CTA、图像、排版、动效做高级感收口。

典型 Codex 调用：

```text
$design-taste-frontend 请按 DESIGN.md 重做首页 hero 和首屏，先给 Design Read，再实现并做 pre-flight check
```

```text
$design-taste-frontend 审核 /ja 页面是否有模板感，指出问题并直接改到更像专业日本市场 landing page
```

什么时候用：

- 首页、日文站 `/ja`、课程销售页、品牌页、资源页。
- 用户说“这个页面不够高级”“太 AI 味”“像模板”“视觉没记忆点”。
- 需要 landing page 的最终审美把关。

什么时候慎用：

- Admin dashboard。
- 数据表格、密集操作台。
- 多步骤业务表单。
- 产品内复杂交互工作流。

这些场景更应该先用 `ui-ux-pro-max` 的 UX / product / stack 规则，再用 `impeccable audit/harden` 做质检。

---

### 3.3 `impeccable`：项目级流程、命令和质检中枢

把它当成“设计流程操作系统”。它不是只给建议，而是提供一套命令：

```text
/impeccable init
/impeccable shape
/impeccable critique
/impeccable audit
/impeccable polish
/impeccable harden
/impeccable animate
/impeccable layout
/impeccable typeset
/impeccable colorize
/impeccable live
```

核心价值：

- `/impeccable init` 生成或维护项目级设计上下文：
  - `PRODUCT.md`
  - `DESIGN.md`
- 后续所有设计命令读取同一份上下文，减少每次重新解释品牌和用户。
- 提供确定性 detector 规则，检查常见 AI 生成 UI 问题。
- 支持 live/browser iteration，用浏览器反馈做视觉迭代。

典型使用：

```text
/impeccable init
```

```text
/impeccable shape homepage
```

```text
/impeccable critique homepage
```

```text
/impeccable audit homepage
```

```text
/impeccable polish homepage
```

```text
/impeccable harden checkout
```

什么时候用：

- 项目第一次引入设计规范。
- 大页面动工前，需要先 shape 再 build。
- 页面完成后，需要客观审查和交付前 polish。
- 上线前检查无障碍、响应式、文本溢出、状态缺失、性能问题。

什么时候不用：

- 一次性问一个非常小的 CSS 问题。
- 没有安装 hook/命令环境时，不要假设 `/impeccable` 可用。

---

## 4. 推荐协作流程

### 4.1 新页面从 0 到 1

适合：新增首页模块、课程 landing、日文站 landing、新活动页。

流程：

```text
1. /impeccable init
2. ui-ux-pro-max 生成设计系统建议
3. /impeccable shape <page>
4. $design-taste-frontend 实现关键营销视觉
5. /impeccable critique <page>
6. /impeccable polish <page>
7. /impeccable audit <page>
8. pnpm lint
9. pnpm build
```

建议提示词：

```text
/impeccable shape homepage

目标：EasyGoVibeCoding 首页，面向想系统掌握 AI 编程工具的中文开发者和团队负责人。
请读取 PRODUCT.md、DESIGN.md，以及 docs/bussiness/PRD.md。
先规划页面层级、首屏信息、关键 CTA、模块顺序和响应式策略，不要直接写代码。
```

然后：

```text
$design-taste-frontend 根据刚才的 shape 方案实现首页视觉升级。
要求：
- 保持 Next.js App Router 和 Tailwind v4 现有模式。
- 不新增依赖。
- 不改变现有路由。
- 首屏必须明确传达“AI 编程工具不是魔法，而是工程”。
- 完成后运行 pre-flight check。
```

最后：

```text
/impeccable critique homepage
/impeccable polish homepage
/impeccable audit homepage
```

---

### 4.2 现有页面改版

适合：页面已经存在，但视觉、层级或体验不理想。

流程：

```text
1. /impeccable document 或读取现有 DESIGN.md
2. /impeccable critique <page>
3. ui-ux-pro-max 查询局部规则
4. $design-taste-frontend 做营销视觉修正
5. /impeccable polish <page>
6. /impeccable audit <page>
7. pnpm build
```

提示词模板：

```text
/impeccable critique /ja

请审查日文站 landing page 的信息层级、首屏说服力、CTA 清晰度、移动端可读性和品牌可信度。
输出问题优先级，不要先改代码。
```

再执行：

```text
$design-taste-frontend 根据 critique 结果改造 /ja 页面。
保留 URL、法律页面入口、waitlist 业务逻辑和既有文案含义。
可以调整布局、排版、视觉节奏、图像和 CTA 呈现。
```

---

### 4.3 Dashboard / 工具型产品 UI

适合：学习仪表盘、模型榜单、后台管理、数据表格、状态面板。

这里不要让 `design-taste-frontend` 主导，因为它的重点是 landing / portfolio / marketing。

推荐流程：

```text
1. ui-ux-pro-max 查询 product + ux + stack
2. /impeccable shape dashboard
3. 实现 UI
4. /impeccable audit dashboard
5. /impeccable harden dashboard
6. pnpm build
```

命令示例：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py "learning progress dashboard education analytics" --design-system --stack nextjs --density 8 --motion 3 -p "Learning Dashboard" -f markdown
```

```text
/impeccable harden learning dashboard

重点检查：
- 空状态。
- 加载状态。
- 数据缺失。
- 移动端断点。
- 文本溢出。
- 键盘导航。
- 深浅色对比。
```

---

### 4.4 上线前最终质检

适合：页面已经实现，准备部署前。

固定流程：

```text
1. /impeccable audit <target>
2. /impeccable polish <target>
3. /impeccable harden <target>
4. pnpm lint
5. pnpm build
```

在本项目中，开发命令必须进入前端目录：

```powershell
cd D:\GitHub_Download\GoWeb3\easy\EasyGoVibeCoding\src\frontend\EasyGoVibeCoding
pnpm lint
pnpm build
```

如果 `pnpm lint` 有历史存量问题，需要在最终报告里区分：

```text
- 本次修改是否引入新 lint 问题。
- 历史 lint 问题是否仍存在。
- build 是否通过。
```

---

## 5. 冲突处理规则

三个工具可能会给出不同建议。按下面优先级处理：

### 5.1 最高优先级

```text
用户明确需求
现有业务逻辑
路由和 SEO 稳定性
可访问性
性能
法律/合规文案
```

任何工具建议都不能静默破坏这些内容。

### 5.2 项目级真相源

如果已经存在：

```text
PRODUCT.md
DESIGN.md
design-system/MASTER.md
docs/bussiness/PRD.md
docs/develop/Architecture_Design.md
```

优先读取这些文件。工具建议必须服从项目上下文。

### 5.3 工具间优先级

| 冲突场景 | 采用谁 |
| --- | --- |
| 产品类型、色彩、字体、UX 规则冲突 | `ui-ux-pro-max` + `DESIGN.md` |
| Landing page 是否太模板 | `design-taste-frontend` |
| 上线前是否合格 | `impeccable audit/polish/harden` |
| 技术实现是否符合 Next.js/Tailwind 项目 | 现有代码模式 + 项目 AGENTS.md |
| 是否新增依赖 | 默认不新增，除非用户明确同意 |

### 5.4 典型冲突例子

如果 `design-taste-frontend` 建议使用强动效，但 `impeccable audit` 指出性能或 reduced-motion 风险：

```text
保留视觉层次，降低动效强度，增加 prefers-reduced-motion fallback。
```

如果 `ui-ux-pro-max` 推荐某个组件库，但项目已经使用 shadcn/ui：

```text
优先复用 shadcn/ui 和现有组件，不混用新的设计系统。
```

如果某工具建议更改路由、导航标签或法律文案：

```text
除非用户明确要求，否则不改。
```

---

## 6. EasyGoVibeCoding 项目推荐落地方式

### 6.1 项目定位

EasyGoVibeCoding 是 AI 编程工具与架构训练平台，不是普通 SaaS 官网。设计语言应体现：

- 工程可信度。
- 系统学习路径。
- 面向开发者和团队负责人。
- 信息密度适中，避免纯营销空话。
- 中文内容可读性优先。
- 首页可以更有品牌表达，课程页应更注重学习效率。

### 6.2 推荐页面策略

| 页面类型 | 主工具 | 辅助工具 |
| --- | --- | --- |
| 首页 `/` | `design-taste-frontend` | `ui-ux-pro-max` + `impeccable polish` |
| 日文站 `/ja` | `design-taste-frontend` | `impeccable critique/audit` |
| 课程模块页 | `ui-ux-pro-max` | `impeccable audit` |
| 学习仪表盘 | `ui-ux-pro-max` | `impeccable harden` |
| GitHub 热门项目页 | `ui-ux-pro-max` | `impeccable audit` |
| 资源页 | `ui-ux-pro-max` | `design-taste-frontend` 局部增强 |
| 法律页面 | `impeccable audit` | 不做强视觉改造 |

### 6.3 推荐项目级设计原则

建议写入 `DESIGN.md`：

```text
1. 视觉语言：工程化、清晰、可信，有轻量未来感，但不使用泛 AI 紫蓝渐变。
2. 排版：中文可读性优先，标题强层级，正文行距充足。
3. 色彩：一个主 accent，全站统一；不要每个模块一套颜色。
4. 组件：优先使用现有 shadcn/ui 和本项目组件。
5. 页面结构：教育平台优先清晰路径，不做纯炫技。
6. 动效：用于引导层级和状态反馈，不做装饰性过度动画。
7. 可访问性：按钮、链接、表单、对比度、键盘导航必须可用。
8. 性能：静态生成优先，图片和大型交互延迟加载。
```

---

## 7. 常用命令速查

### 7.1 `ui-ux-pro-max`

生成设计系统：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py "AI programming education platform" --design-system --stack nextjs -p "EasyGoVibeCoding" -f markdown
```

持久化设计系统：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py "AI programming education platform" --design-system --stack nextjs -p "EasyGoVibeCoding" -f markdown --persist
```

按领域查询：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py "forms accessibility validation" --domain ux -n 5
```

按技术栈查询：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py "server components responsive image performance" --stack nextjs -n 5
```

调节风格参数：

```powershell
python C:\Users\13013\.codex\skills\ui-ux-pro-max\scripts\search.py "developer education landing page" --design-system --variance 6 --motion 4 --density 5 -p "EasyGoVibeCoding" -f markdown
```

### 7.2 `design-taste-frontend`

首页视觉升级：

```text
$design-taste-frontend 请读取 DESIGN.md 和当前首页代码，给出 Design Read，然后直接改造首页首屏和核心模块。
要求保留现有路由、业务逻辑和中文内容方向，不新增依赖，完成后做 pre-flight check。
```

Landing page 审核：

```text
$design-taste-frontend 审核这个 landing page 是否有 AI 模板感。
请指出最影响专业度的 5 个问题，并直接修复其中高影响、低风险的问题。
```

日文站改版：

```text
$design-taste-frontend 请优化 /ja 页面，让它更像面向日本开发者市场的可信 landing page。
保持 waitlist 和 legal link，不改 URL，不改变核心文案含义。
```

### 7.3 `impeccable`

安装：

```powershell
npx impeccable install --providers=codex --scope=project
```

初始化：

```text
/impeccable init
```

规划：

```text
/impeccable shape homepage
```

审查：

```text
/impeccable critique homepage
```

技术质检：

```text
/impeccable audit homepage
```

最终 polish：

```text
/impeccable polish homepage
```

边界情况补强：

```text
/impeccable harden homepage
```

---

## 8. 推荐提示词模板

### 8.1 新页面设计模板

```text
请按三阶段处理这个页面：

第一阶段：读取 PRODUCT.md、DESIGN.md、AGENTS.md 和相关页面代码。
第二阶段：用 ui-ux-pro-max 的设计系统原则确定页面结构、视觉方向、色彩、字体、密度和动效。
第三阶段：如果这是 landing/marketing 页面，使用 design-taste-frontend 做审美强化。

约束：
- 不改 URL。
- 不新增依赖。
- 复用现有 shadcn/ui、Tailwind、组件和项目模式。
- 移动端必须无横向滚动。
- 完成后用 impeccable audit/polish 思路自检，并运行 pnpm build。
```

### 8.2 UI 审核模板

```text
请对这个页面做 UI/UX 审核。

按优先级输出并修复：
1. 可访问性问题。
2. 移动端布局问题。
3. 信息层级问题。
4. 视觉模板感。
5. 交互状态缺失。
6. 性能或 CLS 风险。

请不要做无关重构，不改变业务逻辑。
```

### 8.3 最终交付模板

```text
请做交付前检查：

- impeccable audit 思路：a11y、responsive、performance、loading/error/empty states。
- impeccable polish 思路：视觉一致性、设计系统一致性、CTA、文案清晰度。
- design-taste-frontend 思路：是否有 AI 模板感、重复 section、无意义卡片、泛紫蓝渐变。
- ui-ux-pro-max 思路：产品类型、UX 规则、Next.js/Tailwind 实现是否合适。

然后运行：
pnpm lint
pnpm build

最终报告列出改动文件、验证结果和剩余风险。
```

---

## 9. 常见错误

### 错误 1：三个工具一起叫来改同一个页面

问题：

```text
建议互相覆盖，页面风格混乱，修改范围失控。
```

正确做法：

```text
先 impeccable shape 定义目标，再 ui-ux-pro-max 补设计系统依据，最后让 design-taste-frontend 只处理营销视觉部分。
```

### 错误 2：每个页面重新生成一套设计系统

问题：

```text
全站颜色、字体、按钮、spacing 不一致。
```

正确做法：

```text
先生成全局 DESIGN.md 或 design-system/MASTER.md，页面只写 override。
```

### 错误 3：把 landing page 审美规则套到 dashboard

问题：

```text
后台页面变成大 hero、大图、低信息密度，影响效率。
```

正确做法：

```text
Dashboard 用 ui-ux-pro-max 的 product/ux/stack 规则和 impeccable harden。
```

### 错误 4：为了视觉效果新增依赖

问题：

```text
包体积变大，项目维护成本上升，和现有栈冲突。
```

正确做法：

```text
本项目默认不新增依赖。先用 Tailwind、shadcn/ui、lucide-react 和现有组件解决。
```

### 错误 5：只看桌面，不看移动端

问题：

```text
中文长标题、CTA、卡片、导航在手机上溢出或拥挤。
```

正确做法：

```text
必须检查 375px、小屏手机、常规桌面。避免固定宽度和 h-screen。
```

---

## 10. 推荐的长期维护方式

建议在仓库中形成这些文件：

```text
PRODUCT.md
DESIGN.md
design-system/MASTER.md
design-system/pages/homepage.md
design-system/pages/ja.md
docs/develop/three-design-tools-workflow.md
```

维护原则：

```text
PRODUCT.md：写产品定位、用户、核心承诺、差异化。
DESIGN.md：写全站视觉语言、组件规则、色彩、字体、禁用模式。
design-system/MASTER.md：写可执行设计系统和 token。
design-system/pages/*.md：只写页面级例外，不重复全局规则。
```

当页面发生大改版时，先更新 `DESIGN.md` 或页面 override，再改代码。

---

## 11. 最小可执行 SOP

如果只记一套流程，记这套：

```text
1. /impeccable init
2. 用 ui-ux-pro-max 生成或查询设计系统
3. /impeccable shape <页面>
4. 实现页面
5. landing/marketing 页面再用 $design-taste-frontend 强化
6. /impeccable critique <页面>
7. /impeccable audit <页面>
8. /impeccable polish <页面>
9. pnpm lint
10. pnpm build
```

本项目执行验证时：

```powershell
cd D:\GitHub_Download\GoWeb3\easy\EasyGoVibeCoding\src\frontend\EasyGoVibeCoding
pnpm lint
pnpm build
```

完成标准：

```text
- 页面目标明确。
- 信息层级清晰。
- 移动端可用。
- 无明显 AI 模板感。
- 可访问性没有明显倒退。
- 不破坏路由、业务逻辑、SEO 和 legal 入口。
- build 通过。
- lint 结果已记录。
```
