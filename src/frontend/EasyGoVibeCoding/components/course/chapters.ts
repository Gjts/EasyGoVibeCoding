export const practiceChapters = [
  { title: "实践篇概述", href: "/practice" },
  { title: "文科生 / 商科生项目", href: "/practice/humanities" },
  { title: "理工科学生项目", href: "/practice/engineering" },
  { title: "职场人士项目", href: "/practice/professional" },
  {
    title: "高级实战场景",
    href: "/practice/advanced",
    sections: [
      { title: "场景1：从零开始创建新项目", href: "/practice/advanced/new-project" },
      { title: "场景2：快速熟悉新公司项目", href: "/practice/advanced/onboarding" },
      { title: "场景3：业务线切换实战", href: "/practice/advanced/transition" },
    ],
  },
  { title: "核心技能：AI Agent 开发", href: "/practice/agent" },
  { title: "核心技能：全栈项目实战", href: "/practice/fullstack" },
  { title: "核心技能：工具与效率", href: "/practice/efficiency" },
] as const;

export const advancedChapters = [
  { title: "序：从工具到架构的 100 小时", href: "/advanced" },
  { title: "环境搭建与代码运行基础", href: "/advanced/environment" },
  { title: "AI 使用说明书", href: "/advanced/ai-guide" },
  { title: "Prompt Engineering", href: "/advanced/prompt-engineering" },
  { title: "PRD 与文档驱动", href: "/advanced/prd" },
  { title: "AI 原生开发模式", href: "/advanced/ai-native-patterns" },
  { title: "AI 适配架构范式", href: "/advanced/ai-architecture-patterns" },
  { title: "开发常识", href: "/advanced/dev-basics" },
  { title: "界面交互", href: "/advanced/ui" },
  { title: "数据持久化", href: "/advanced/data" },
  { title: "Context Engineering", href: "/advanced/context-engineering" },
  { title: "测试与质量", href: "/advanced/testing" },
  { title: "Harness Engineering", href: "/advanced/harness-engineering" },
  { title: "部署与运维", href: "/advanced/deployment" },
] as const;

/**
 * 超级个体导航（你后续创建页面时，直接在 CourseLayout 里传入即可）
 * 这里先给出结构占位，标题/路由你可以按实际规划调整。
 */
export const superIndividualChapters = [
  { title: "超级个体概述", href: "/super-individual" },
  { title: "定位与策略", href: "/super-individual/strategy" },
  { title: "产品化与商业化", href: "/super-individual/monetization" },
  { title: "系统与自动化", href: "/super-individual/systems" },
  { title: "增长与渠道", href: "/super-individual/growth" },
  { title: "案例与复盘", href: "/super-individual/cases" },
] as const;

