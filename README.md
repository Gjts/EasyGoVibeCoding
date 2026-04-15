# EasyGoVibeCoding

<div align="center">

**AI 编程工具综合培训网站**

*AI 编程工具不是魔法，是工程。理解机制才能驾驭工具。*

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📖 项目简介

EasyGoVibeCoding 是一个面向企业级 AI 编程工具与架构培训的综合平台。本项目旨在帮助开发者、团队和企业系统掌握 AI 编程工具，提升开发效率，构建 AI 驱动的开发团队。

### ✨ 核心特色

- 🎯 **系统化课程体系** - 涵盖基础篇、进阶篇、工具篇、架构篇、实践篇、团队篇
- 🔧 **工具深度解析** - Cursor、Windsurf、GitHub Copilot、Claude Code 等主流工具
- 🏗️ **架构原理讲解** - Transformer、Mamba、MoE、RAG 等 AI 架构深度解析
- 👥 **团队建设指南** - 从零打造 AI 团队的完整方法论
- 🌐 **生态导航** - AI 编程工具生态全景，快速找到所需资源

---

## 🚀 快速开始

### 环境要求

- **Node.js**: 18.0+
- **pnpm**: 8.0+ (推荐) 或 npm / yarn

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/HardieBao/EasyGoVibeCoding.git
cd EasyGoVibeCoding

# 进入前端项目目录
cd src/frontend/EasyGoVibeCoding

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建与部署到 Cloudflare Pages

```bash
pnpm build
pnpm pages:deploy
```

说明：
- `pnpm build` 会静态导出站点到 `out/`
- `postbuild` 会自动复制 `functions/` 到 `out/functions`
- `pnpm pages:deploy` 会将 `out/` 部署到 Cloudflare Pages

---

## 📁 项目结构

```
EasyGoVibeCoding/
├── docs/                           # 项目文档
│   ├── bussiness/                  # 业务文档
│   │   ├── PRD.md                  # 产品需求文档
│   │   └── Task_Details.md         # 任务详情文档
│   ├── develop/                    # 开发文档
│   │   └── Architecture_Design.md  # 架构设计文档
│   └── DECOMPOSITION_LOG.md        # 大纲分解日志
├── src/
│   └── frontend/
│       └── EasyGoVibeCoding/       # Next.js 前端项目
│           ├── app/                # App Router 路由
│           ├── components/         # React 组件
│           │   └── ui/             # shadcn/ui 组件
│           ├── hooks/              # React Hooks
│           ├── lib/                # 工具函数
│           ├── public/             # 静态资源
│           └── styles/             # 样式文件
├── deploy/                         # 部署配置
├── AI编程工具综合培训网站大纲.md     # 原始大纲文档
├── LICENSE                         # 开源协议
└── README.md                       # 项目说明
```

---

## 🛠️ 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| **框架** | Next.js | 16.0 |
| **UI 库** | React | 19.0 |
| **语言** | TypeScript | 5.0+ |
| **样式** | Tailwind CSS | 4.0 |
| **组件库** | shadcn/ui + Radix UI | 最新版 |
| **图标** | Lucide React | 0.454 |
| **图表** | Recharts | 2.15 |
| **表单** | React Hook Form + Zod | 最新版 |

---

## 📚 内容模块

| 模块 | 描述 | 目标用户 |
|------|------|---------|
| **基础篇** | 零基础入门，从觉醒到实战 | 小白、文科生、设计师、产品经理 |
| **进阶篇** | 从工具到架构的 100 小时修炼 | 有编程基础的开发者 |
| **工具篇** | AI 编程工具深度解析 | 开发者、架构师 |
| **架构篇** | AI 大模型架构深度解析 | 产品经理、技术管理者、架构师 |
| **实践篇** | 6 个真实项目实战 | 所有想动手实践的用户 |
| **团队篇** | 从零打造 AI 团队 | 技术负责人、团队 Leader、HR、CTO |
| **生态导航** | AI 编程工具生态全景 | 所有用户 |
| **优质资源** | 精选博客、播客、Newsletter | 所有用户 |

---

## 📋 项目文档

| 文档 | 描述 | 路径 |
|------|------|------|
| **PRD** | 产品需求文档，定义 WHAT 和 WHO | [docs/bussiness/PRD.md](docs/bussiness/PRD.md) |
| **Task Details** | 任务详情文档，定义 HOW（可执行任务） | [docs/bussiness/Task_Details.md](docs/bussiness/Task_Details.md) |
| **Architecture** | 架构设计文档，定义 HOW（技术结构） | [docs/develop/Architecture_Design.md](docs/develop/Architecture_Design.md) |
| **分解日志** | 大纲分解过程记录 | [docs/DECOMPOSITION_LOG.md](docs/DECOMPOSITION_LOG.md) |

---

## 🎯 开发计划

### 第一阶段（MVP - 持续迭代）
- [x] 项目初始化与基础配置
- [x] 基础布局与导航
- [x] 多模块内容页面框架
- [x] 站内搜索入口（搜索对话框）
- [ ] 内容持续完善

### 第二阶段（完整功能）
- [ ] 学习进度追踪
- [ ] 社区功能（评论、问答）
- [ ] 工具对比矩阵
- [ ] 选型决策助手
- [ ] 搜索能力升级（如生成式索引或更完整的数据源）
- [ ] 内容持续完善

### 第三阶段（优化扩展 - 12 个月）
- [ ] 在线 IDE（预告）
- [ ] 移动端 App（可选）
- [ ] 企业版功能（可选）

---

## 🤝 参与贡献

欢迎参与项目贡献！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 提交规范

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 📞 联系我们

- **GitHub**: [HardieBao/EasyGoVibeCoding](https://github.com/HardieBao/EasyGoVibeCoding)
- **Issues**: [提交问题](https://github.com/HardieBao/EasyGoVibeCoding/issues)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个 Star！**

*Made with ❤️ by EasyGoVibeCoding Team*

</div>
