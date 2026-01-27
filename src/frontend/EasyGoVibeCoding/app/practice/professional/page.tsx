import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Briefcase, Wrench, RefreshCw, CheckCircle2, AlertTriangle, Zap, FileText, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "实践篇概述", href: "/practice" },
  { title: "文科生 / 商科生项目", href: "/practice/humanities" },
  { title: "理工科学生项目", href: "/practice/engineering" },
  { title: "职场人士项目", href: "/practice/professional" },
  { title: "核心技能：AI Agent 开发", href: "/practice/agent" },
  { title: "核心技能：全栈项目实战", href: "/practice/fullstack" },
  { title: "核心技能：工具与效率", href: "/practice/efficiency" },
]

export default function ProfessionalPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
      currentChapter="职场人士项目"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 3 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          职场人士项目
        </h1>
        <p className="text-lg text-muted-foreground">
          适合需要提升工作效率的职场人士，通过企业级开发流程和遗留系统重构，掌握AI工具在企业环境中的实际应用，理解团队协作和知识管理的重要性。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Project 1: 内部工具开发 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            项目1：内部工具开发
          </h2>
          
          {/* 项目概述 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">项目概述</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">项目目标</strong>：开发一个内部数据看板工具，帮助团队快速查看和分析业务数据，提升决策效率
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">工具栈</strong>：Spec驱动 + Cursor（开发）+ Skill（知识复用）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">时间估算</strong>：20-30小时（包含需求澄清、设计、开发、测试）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">难度等级</strong>：中高级（需要企业级开发经验）
                </div>
              </div>
            </div>
          </div>

          {/* 技术选型分析 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <h3 className="font-semibold text-foreground mb-4">技术选型分析：为什么选择Spec驱动 + Cursor + Skill？</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Spec驱动：需求到代码的桥梁</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>需求澄清</strong>：通过Reverse Interview和用户故事，确保理解真实需求</li>
                  <li>• <strong>PRD编写</strong>：明确目标用户、功能需求、非功能需求</li>
                  <li>• <strong>API Spec</strong>：使用OpenAPI规范，AI可以直接生成代码</li>
                  <li>• <strong>UI Spec</strong>：详细描述界面和交互，减少返工</li>
                  <li>• <strong>WBS分解</strong>：将大任务拆分为可执行的小任务</li>
                  <li>• <strong>DoD定义</strong>：明确完成标准，确保质量</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Cursor：AI辅助开发</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>Spec到代码</strong>：根据Spec自动生成代码结构</li>
                  <li>• <strong>功能实现</strong>：使用Agent模式实现复杂功能</li>
                  <li>• <strong>代码优化</strong>：应用最佳实践和设计模式</li>
                  <li>• <strong>错误修复</strong>：快速定位和修复问题</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Skill：知识复用和团队协作</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>知识沉淀</strong>：将最佳实践封装为Skill，团队共享</li>
                  <li>• <strong>快速复用</strong>：使用Skill快速实现常见功能</li>
                  <li>• <strong>一致性保证</strong>：使用Skill确保代码风格和模式一致</li>
                  <li>• <strong>团队协作</strong>：Skill库成为团队的知识资产</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">工具协同效应</strong>：Spec驱动确保需求清晰、开发方向正确，Cursor负责高效实现，Skill负责知识复用和团队协作。这个组合实现了从需求到交付的完整企业级开发流程，既保证了开发效率，又确保了代码质量和团队协作。
                </p>
              </div>
            </div>
          </div>

          {/* 完整流程 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">完整开发流程</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Phase 1: 需求澄清（3-4小时）
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-7">
                  <p><strong>Reverse Interview技巧</strong>：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 问"为什么"而不是"是什么"：了解真实需求背后的原因</li>
                    <li>• 问"什么时候"：了解使用场景和频率</li>
                    <li>• 问"谁"：了解目标用户和使用者</li>
                    <li>• 问"如果...会怎样"：探索边界情况和异常处理</li>
                  </ul>
                  <p className="mt-2"><strong>用户故事编写</strong>：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs ml-4">
                    "作为产品经理，<br/>
                    我希望能够快速查看销售数据，<br/>
                    以便及时了解业务状况并做出决策。<br/>
                    <br/>
                    验收标准：<br/>
                    - 能够查看今日/本周/本月的销售额<br/>
                    - 能够按产品类别筛选数据<br/>
                    - 数据更新延迟不超过5分钟"
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Phase 2: Spec编写（4-6小时）
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-7">
                  <p><strong>PRD编写</strong>：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 目标用户：产品经理、业务分析师</li>
                    <li>• 功能需求：数据展示、筛选、导出</li>
                    <li>• 非功能需求：性能（加载时间&lt;2秒）、可用性（99.9%）、安全性</li>
                  </ul>
                  <p className="mt-2"><strong>API Spec（OpenAPI）</strong>：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs ml-4">
                    {`GET /api/dashboard/sales
Query Parameters:
- startDate: string (ISO date)
- endDate: string (ISO date)
- category: string (optional)

Response:
{
  totalSales: number,
  salesByCategory: Array,
  trend: Array
}`}
                  </div>
                  <p className="mt-2"><strong>UI Spec</strong>：详细描述界面布局、交互流程、状态变化</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Phase 3: WBS分解（2-3小时）
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-7">
                  <p><strong>任务拆分原则</strong>：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• <strong>粒度控制</strong>：每个任务2-4小时完成</li>
                    <li>• <strong>依赖关系</strong>：明确任务之间的依赖</li>
                    <li>• <strong>可测试性</strong>：每个任务都有明确的验收标准</li>
                  </ul>
                  <p className="mt-2"><strong>WBS示例</strong>：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 text-xs ml-4">
                    <div>1. 数据库设计（2小时）</div>
                    <div className="ml-4">1.1 设计数据模型</div>
                    <div className="ml-4">1.2 创建数据库表</div>
                    <div>2. 后端API开发（8小时）</div>
                    <div className="ml-4">2.1 实现数据查询API（依赖1）</div>
                    <div className="ml-4">2.2 实现数据筛选API</div>
                    <div>3. 前端UI开发（6小时）</div>
                    <div className="ml-4">3.1 创建仪表板组件（依赖2.1）</div>
                    <div className="ml-4">3.2 实现筛选功能</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Phase 4: DoD定义（1小时）
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-7">
                  <p><strong>质量标准</strong>：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 代码质量：通过ESLint检查，无严重警告</li>
                    <li>• 测试覆盖：单元测试覆盖率&gt;80%</li>
                    <li>• 文档完整：API文档、用户手册完整</li>
                  </ul>
                  <p className="mt-2"><strong>验收标准</strong>：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 功能验收：所有功能按Spec实现，测试通过</li>
                    <li>• 性能验收：页面加载时间&lt;2秒，API响应时间&lt;500ms</li>
                    <li>• 安全验收：通过安全扫描，无高危漏洞</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" />
                  Phase 5: 开发实施（8-12小时）
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-7">
                  <p>1. 使用Cursor Agent根据Spec生成项目结构</p>
                  <p>2. 使用Skill快速实现常见功能：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 使用"数据查询Skill"实现API查询逻辑</li>
                    <li>• 使用"图表组件Skill"创建可视化组件</li>
                    <li>• 使用"错误处理Skill"统一错误处理</li>
                  </ul>
                  <p>3. 使用Cursor Agent实现复杂业务逻辑</p>
                  <p>4. 代码审查和优化</p>
                  <p>5. 编写测试用例</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Phase 6: 测试与交付（2-3小时）
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-7">
                  <p>1. 执行测试用例，修复bug</p>
                  <p>2. 用户验收测试（UAT）</p>
                  <p>3. 部署到生产环境</p>
                  <p>4. 编写用户手册和操作指南</p>
                  <p>5. 团队培训和知识分享</p>
                </div>
              </div>
            </div>
          </div>

          {/* 团队协作 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              团队协作与知识管理
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Skill库建设</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>创建Skill</strong>：将常用功能封装为Skill，如"数据查询Skill"、"图表组件Skill"</li>
                  <li>• <strong>Skill文档</strong>：为每个Skill编写使用说明和示例</li>
                  <li>• <strong>Skill版本管理</strong>：使用Git管理Skill版本，支持版本回退</li>
                  <li>• <strong>Skill分享</strong>：团队共享Skill库，提高复用率</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">知识沉淀</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>最佳实践文档</strong>：记录开发过程中的最佳实践</li>
                  <li>• <strong>问题解决方案</strong>：记录常见问题和解决方案</li>
                  <li>• <strong>代码审查记录</strong>：记录代码审查中发现的问题和改进建议</li>
                  <li>• <strong>项目复盘</strong>：项目结束后进行复盘，总结经验教训</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 项目检查清单 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              项目检查清单
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>需求澄清完成，用户故事和验收标准明确</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>PRD、API Spec、UI Spec完整，团队评审通过</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>WBS分解完成，任务粒度合理，依赖关系清晰</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>DoD定义完成，质量标准和验收标准明确</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>开发完成，代码符合Spec要求，通过代码审查</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>测试通过，覆盖率达标，UAT通过</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>Skill库更新，新增的Skill已文档化</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>项目文档完整，用户手册和操作指南已编写</span>
              </div>
            </div>
          </div>
        </section>

        {/* Project 2: 遗留系统重构 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-primary" />
            项目2：遗留系统重构
          </h2>
          
          {/* 项目概述 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">项目概述</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">项目目标</strong>：重构老旧PHP系统为现代Node.js系统，提升性能、可维护性和扩展性
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">工具栈</strong>：Windsurf（代码库分析）+ Cursor Agent（架构设计）+ Fabric（代码优化）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">时间估算</strong>：40-60小时（包含分析、设计、重构、测试）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">难度等级</strong>：高级（需要系统架构和重构经验）
                </div>
              </div>
            </div>
          </div>

          {/* 技术选型分析 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <h3 className="font-semibold text-foreground mb-4">技术选型分析：为什么选择Windsurf + Cursor Agent + Fabric？</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Windsurf：大型代码库分析</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>Fast Context技术</strong>：快速理解大型代码库的结构和逻辑</li>
                  <li>• <strong>代码库问答</strong>：通过问答方式理解代码功能和依赖关系</li>
                  <li>• <strong>架构分析</strong>：识别系统架构模式和设计问题</li>
                  <li>• <strong>依赖分析</strong>：分析模块之间的依赖关系</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Cursor Agent：架构设计和重构</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>架构设计</strong>：根据分析结果设计新架构</li>
                  <li>• <strong>代码迁移</strong>：将旧代码迁移到新架构</li>
                  <li>• <strong>功能实现</strong>：实现新功能或改进现有功能</li>
                  <li>• <strong>测试生成</strong>：生成测试用例确保功能正确</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Fabric：代码质量优化</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>代码审查</strong>：审查重构后的代码质量</li>
                  <li>• <strong>性能优化</strong>：优化代码性能，提升系统效率</li>
                  <li>• <strong>最佳实践</strong>：应用现代开发最佳实践</li>
                  <li>• <strong>安全审计</strong>：检查安全漏洞和风险</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 mt-4">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">工具协同效应</strong>：Windsurf负责理解旧系统，Cursor Agent负责设计和实现新系统，Fabric负责优化代码质量。这个组合实现了从分析到重构再到优化的完整重构流程，既保证了重构的正确性，又确保了新系统的质量。
                </p>
              </div>
            </div>
          </div>

          {/* 重构策略 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">重构策略</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">策略1: 代码库分析（使用Windsurf Fast Context）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 使用Windsurf分析旧代码库：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 理解系统整体架构和模块划分</li>
                    <li>• 识别核心业务逻辑和数据流</li>
                    <li>• 分析数据库结构和数据模型</li>
                    <li>• 识别技术债务和设计问题</li>
                  </ul>
                  <p>2. 生成系统分析报告：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 架构图：系统模块和依赖关系</li>
                    <li>• 功能清单：所有功能模块列表</li>
                    <li>• 数据模型：数据库表结构和关系</li>
                    <li>• 问题清单：技术债务和风险点</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">策略2: 架构设计（使用Cursor Agent）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 使用Cursor Agent设计新架构：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    "基于旧PHP系统的分析结果，设计新的Node.js架构：<br/>
                    - 采用微服务架构，按业务模块拆分<br/>
                    - 使用Express.js作为Web框架<br/>
                    - 使用Prisma作为ORM<br/>
                    - 使用PostgreSQL作为数据库<br/>
                    - 实现RESTful API设计<br/>
                    - 添加API文档（Swagger）<br/>
                    - 实现认证和授权（JWT）"
                  </div>
                  <p>2. 设计数据迁移方案：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 数据模型映射：PHP模型到Node.js模型</li>
                    <li>• 数据迁移脚本：迁移历史数据</li>
                    <li>• 数据验证：确保数据完整性</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">策略3: 渐进式重构（使用Fabric Patterns）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 采用Strangler Fig模式：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 逐步替换旧功能，而不是一次性重写</li>
                    <li>• 新旧系统并行运行，逐步切换流量</li>
                    <li>• 降低重构风险，保证业务连续性</li>
                  </ul>
                  <p>2. 使用Fabric Patterns优化代码：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 应用设计模式Pattern</li>
                    <li>• 应用性能优化Pattern</li>
                    <li>• 应用安全最佳实践Pattern</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-3">策略4: 测试覆盖（TDD方法）</h4>
                <div className="space-y-2 text-sm text-muted-foreground ml-4">
                  <p>1. 先写测试，再写实现：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 为每个功能编写测试用例</li>
                    <li>• 确保新功能与旧功能行为一致</li>
                    <li>• 使用测试驱动开发（TDD）</li>
                  </ul>
                  <p>2. 测试类型：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 单元测试：测试单个函数和模块</li>
                    <li>• 集成测试：测试模块之间的集成</li>
                    <li>• 端到端测试：测试完整业务流程</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 风险分析 */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              风险分析与应对策略
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">风险1：业务中断</h4>
                <p className="ml-4"><strong>应对策略</strong>：采用渐进式重构，新旧系统并行运行，逐步切换流量。建立回滚机制，出现问题立即回滚。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">风险2：数据迁移失败</h4>
                <p className="ml-4"><strong>应对策略</strong>：编写详细的数据迁移脚本，进行充分测试。建立数据验证机制，确保数据完整性。保留旧数据备份。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">风险3：性能下降</h4>
                <p className="ml-4"><strong>应对策略</strong>：进行性能测试，识别性能瓶颈。使用Fabric优化代码性能。建立性能监控，及时发现问题。</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">风险4：功能缺失</h4>
                <p className="ml-4"><strong>应对策略</strong>：详细分析旧系统功能，建立功能清单。使用Windsurf确保不遗漏功能。进行充分的功能测试。</p>
              </div>
            </div>
          </div>

          {/* 项目检查清单 */}
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              项目检查清单
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>旧系统分析完成，架构图和功能清单完整</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>新架构设计完成，技术选型合理，团队评审通过</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>数据迁移方案完成，脚本测试通过</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>重构计划制定完成，采用渐进式重构策略</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>测试覆盖完成，所有功能测试通过</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>性能测试通过，性能指标达标</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>回滚方案准备完成，可以快速回滚</span>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>新系统已部署，运行稳定，业务正常</span>
              </div>
            </div>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握企业级开发的完整流程（需求澄清→Spec编写→WBS分解→DoD定义→开发→测试→交付）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解Spec驱动开发的方法论，知道如何编写清晰的PRD、API Spec和UI Spec
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握团队协作和知识管理方法，能够建设Skill库和沉淀最佳实践
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                理解遗留系统重构的策略和风险，能够制定合理的重构方案
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                具备企业级项目管理和质量控制能力，能够确保项目成功交付
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/practice/engineering" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：理工科学生项目
          </Link>
        </Button>
        <Button asChild>
          <Link href="/practice/agent" className="flex items-center gap-2">
            下一章：核心技能：AI Agent 开发
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
