import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, Target, FileText, CheckCircle2, Zap, Users, BarChart3, Settings } from "lucide-react"
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

export default function FullstackPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
      currentChapter="核心技能：全栈项目实战"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 5 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          核心技能：全栈项目实战
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握从需求到交付的完整流程，理解Spec驱动开发的方法论，学会WBS分解和DoD定义，具备企业级项目管理和质量控制能力。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 需求澄清方法论 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            需求澄清方法论
          </h2>
          <p className="text-muted-foreground mb-6">
            需求澄清是项目成功的基础。通过系统化的方法，确保理解真实需求，避免返工和误解。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">Reverse Interview技巧</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Reverse Interview是一种主动提问的技巧，通过问"为什么"来挖掘真实需求：
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">问"为什么"而不是"是什么"</h4>
                  <div className="p-3 rounded-lg bg-secondary/50 ml-4">
                    <p className="mb-2"><strong>错误问法</strong>："你需要什么功能？"</p>
                    <p><strong>正确问法</strong>："你为什么需要这个功能？解决了什么问题？"</p>
                  </div>
                  <p className="ml-4 mt-2">通过问"为什么"，了解需求背后的真实动机和业务目标。</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">问"什么时候"和"谁"</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>使用场景</strong>："什么时候会使用这个功能？使用频率如何？"</li>
                    <li>• <strong>目标用户</strong>："谁会使用这个功能？他们的技术水平如何？"</li>
                    <li>• <strong>使用环境</strong>："在什么环境下使用？有什么限制？"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">问"如果...会怎样"</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>边界情况</strong>："如果没有这个功能会怎样？"</li>
                    <li>• <strong>异常处理</strong>："如果数据异常会怎样？"</li>
                    <li>• <strong>扩展性</strong>："如果需求变化会怎样？"</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">用户故事编写</h3>
              <p className="text-sm text-muted-foreground mb-4">
                用户故事是需求的最小单元，包含角色、目标、价值三个要素：
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 mb-4">
                <p className="text-sm font-medium text-foreground mb-2">用户故事模板：</p>
                <div className="font-mono text-xs text-muted-foreground">
                  作为 [角色]，<br/>
                  我希望 [目标]，<br/>
                  以便 [价值/原因]。
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">好的用户故事特征</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>独立性</strong>：可以独立开发和测试</li>
                    <li>• <strong>可协商</strong>：可以讨论和调整</li>
                    <li>• <strong>有价值</strong>：对用户有实际价值</li>
                    <li>• <strong>可估算</strong>：可以估算开发时间</li>
                    <li>• <strong>小</strong>：可以在一个迭代中完成</li>
                    <li>• <strong>可测试</strong>：有明确的验收标准</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">验收标准</h4>
                  <p className="ml-4">每个用户故事都应该有明确的验收标准，使用Given-When-Then格式：</p>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs ml-4 mt-2">
                    Given: 用户已登录<br/>
                    When: 用户点击"创建任务"按钮<br/>
                    Then: 显示任务创建表单<br/>
                    And: 用户可以输入任务标题和描述<br/>
                    And: 用户可以保存任务
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4">需求优先级排序</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">MoSCoW方法</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>Must have</strong>：必须有，项目成功的关键功能</li>
                    <li>• <strong>Should have</strong>：应该有，重要但不是关键</li>
                    <li>• <strong>Could have</strong>：可以有，如果时间允许就做</li>
                    <li>• <strong>Won't have</strong>：这次不做，可能以后做</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">价值-复杂度矩阵</h4>
                  <p className="ml-4">根据功能的价值和复杂度，优先开发高价值、低复杂度的功能。</p>
                </div>
              </div>
            </div>
          </div>

          {/* 实战案例 */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">实战案例：电商平台需求澄清</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">初始需求</h4>
                <p className="ml-4">"我们需要一个购物车功能"</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Reverse Interview过程</h4>
                <ul className="space-y-1 ml-4">
                  <li>Q: "为什么需要购物车？" A: "用户需要能够同时选择多个商品"</li>
                  <li>Q: "什么时候使用？" A: "浏览商品时，看到喜欢的就加入购物车"</li>
                  <li>Q: "谁会使用？" A: "所有注册用户"</li>
                  <li>Q: "如果用户未登录会怎样？" A: "可以加入购物车，但结账时需要登录"</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">澄清后的需求</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 用户可以添加商品到购物车（登录/未登录）</li>
                  <li>• 用户可以查看购物车中的商品</li>
                  <li>• 用户可以修改商品数量</li>
                  <li>• 用户可以删除商品</li>
                  <li>• 未登录用户的购物车保存在本地存储</li>
                  <li>• 登录后合并本地购物车和服务器购物车</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Spec驱动开发 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Spec驱动开发
          </h2>
          <p className="text-muted-foreground mb-6">
            Spec驱动开发将需求转化为可执行的规范，AI可以直接根据Spec生成代码，提高开发效率和代码质量。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">PRD编写</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">PRD结构</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>产品概述</strong>：产品定位、目标用户、核心价值</li>
                    <li>• <strong>功能需求</strong>：详细的功能描述和用户故事</li>
                    <li>• <strong>非功能需求</strong>：性能、可用性、安全性、可扩展性</li>
                    <li>• <strong>用户界面</strong>：界面设计和交互流程</li>
                    <li>• <strong>数据模型</strong>：数据结构和关系</li>
                    <li>• <strong>验收标准</strong>：功能验收、性能验收、安全验收</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">PRD编写原则</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>清晰明确</strong>：使用清晰的语言，避免歧义</li>
                    <li>• <strong>可执行</strong>：AI可以直接根据PRD生成代码</li>
                    <li>• <strong>可测试</strong>：每个需求都有明确的验收标准</li>
                    <li>• <strong>可追溯</strong>：需求可以追溯到业务目标</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">API Spec（OpenAPI规范）</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">OpenAPI规范的优势</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>标准化</strong>：行业标准，工具支持完善</li>
                    <li>• <strong>可执行</strong>：AI可以直接根据OpenAPI生成代码</li>
                    <li>• <strong>可测试</strong>：可以自动生成API测试用例</li>
                    <li>• <strong>可文档化</strong>：自动生成API文档</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">API Spec示例</h4>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre>{`openapi: 3.0.0
info:
  title: Task Management API
  version: 1.0.0
paths:
  /api/tasks:
    get:
      summary: 获取任务列表
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [pending, in-progress, completed]
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  tasks:
                    type: array
                    items:
                      $ref: '#/components/schemas/Task'
    post:
      summary: 创建任务
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateTaskRequest'
      responses:
        '201':
          description: 创建成功
components:
  schemas:
    Task:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        status:
          type: string
          enum: [pending, in-progress, completed]`}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4">UI Spec</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">UI Spec内容</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>页面布局</strong>：页面结构、组件位置</li>
                    <li>• <strong>组件设计</strong>：组件类型、样式、交互</li>
                    <li>• <strong>交互流程</strong>：用户操作流程、状态变化</li>
                    <li>• <strong>响应式设计</strong>：不同屏幕尺寸的适配</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">UI Spec编写技巧</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• 使用Figma或类似工具设计界面</li>
                    <li>• 详细描述每个组件的状态和交互</li>
                    <li>• 使用AI工具（如v0）根据描述生成代码</li>
                    <li>• 提供设计规范和组件库</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 实战案例 */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">实战案例：从PRD到代码的完整流程</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Step 1: 编写PRD</h4>
                <p className="ml-4">明确产品目标、功能需求、非功能需求</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Step 2: 编写API Spec</h4>
                <p className="ml-4">使用OpenAPI规范定义API接口，AI可以根据Spec生成API代码</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Step 3: 编写UI Spec</h4>
                <p className="ml-4">详细描述界面设计，使用v0等工具生成UI代码</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Step 4: 使用Cursor生成代码</h4>
                <p className="ml-4">将PRD、API Spec、UI Spec提供给Cursor Agent，生成完整代码</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Step 5: 测试和优化</h4>
                <p className="ml-4">根据Spec编写测试用例，验证功能是否符合Spec要求</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: WBS分解 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            WBS分解
          </h2>
          <p className="text-muted-foreground mb-6">
            WBS（Work Breakdown Structure）将大任务分解为可执行的小任务，明确任务之间的依赖关系，便于项目管理和进度跟踪。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">任务拆分原则</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">粒度控制</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>2-4小时原则</strong>：每个任务应该在2-4小时内完成</li>
                    <li>• <strong>可测试性</strong>：每个任务都有明确的验收标准</li>
                    <li>• <strong>独立性</strong>：任务之间尽量减少依赖</li>
                    <li>• <strong>可估算</strong>：可以准确估算完成时间</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">依赖关系</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>识别依赖</strong>：明确任务之间的依赖关系</li>
                    <li>• <strong>关键路径</strong>：识别项目的关键路径，优先完成</li>
                    <li>• <strong>并行任务</strong>：识别可以并行执行的任务</li>
                    <li>• <strong>依赖管理</strong>：使用工具（如GitHub Projects）管理依赖</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">时间估算</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">三点估算法</h4>
                  <div className="p-3 rounded-lg bg-secondary/50 ml-4">
                    <p className="mb-2">估算公式：<code className="bg-secondary px-1 rounded">(乐观时间 + 4×最可能时间 + 悲观时间) / 6</code></p>
                    <p className="text-xs">示例：乐观2小时，最可能4小时，悲观8小时 → 估算 = (2 + 4×4 + 8) / 6 = 4.3小时</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">类比估算</h4>
                  <p className="ml-4">参考类似任务的完成时间，结合当前任务的复杂度进行调整。</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">AI辅助估算</h4>
                  <p className="ml-4">使用AI工具分析任务复杂度，结合历史数据估算时间。</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4">资源分配</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">人员分配</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• 根据技能和经验分配任务</li>
                    <li>• 考虑人员的工作负载</li>
                    <li>• 确保关键任务有备份人员</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">工具分配</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• 确保有足够的开发工具和资源</li>
                    <li>• 考虑工具的许可证和成本</li>
                    <li>• 准备备用方案</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">时间分配</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• 考虑项目的截止日期</li>
                    <li>• 预留缓冲时间应对风险</li>
                    <li>• 平衡并行任务和串行任务</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 实战案例 */}
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">实战案例：WBS分解示例</h3>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                <div>1. 项目准备（4小时）</div>
                <div className="ml-4">1.1 环境搭建（2小时）</div>
                <div className="ml-4">1.2 项目初始化（2小时）</div>
                <div>2. 数据库设计（6小时）</div>
                <div className="ml-4">2.1 数据模型设计（3小时）</div>
                <div className="ml-4">2.2 数据库表创建（2小时）</div>
                <div className="ml-4">2.3 数据迁移脚本（1小时）</div>
                <div>3. 后端API开发（16小时）</div>
                <div className="ml-4">3.1 用户认证API（4小时，依赖2.1）</div>
                <div className="ml-4">3.2 任务CRUD API（8小时，依赖2.1）</div>
                <div className="ml-4">3.3 数据统计API（4小时，依赖2.1）</div>
                <div>4. 前端UI开发（12小时）</div>
                <div className="ml-4">4.1 登录页面（2小时）</div>
                <div className="ml-4">4.2 任务列表页面（4小时，依赖3.2）</div>
                <div className="ml-4">4.3 任务详情页面（3小时，依赖3.2）</div>
                <div className="ml-4">4.4 数据统计页面（3小时，依赖3.3）</div>
                <div>5. 测试与部署（8小时）</div>
                <div className="ml-4">5.1 单元测试（4小时）</div>
                <div className="ml-4">5.2 集成测试（2小时）</div>
                <div className="ml-4">5.3 部署（2小时）</div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                <strong className="text-foreground">关键路径</strong>：1 → 2.1 → 3.2 → 4.2 → 5（总时长约34小时）
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: DoD定义 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            DoD定义
          </h2>
          <p className="text-muted-foreground mb-6">
            DoD（Definition of Done）定义了任务完成的标准，确保交付质量，避免"看起来完成但实际未完成"的情况。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">质量标准</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">代码质量</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 通过ESLint检查，无严重警告</li>
                    <li>• 代码符合团队规范</li>
                    <li>• 代码已通过代码审查</li>
                    <li>• 无已知bug</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">测试覆盖</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 单元测试覆盖率&gt;80%</li>
                    <li>• 关键功能有集成测试</li>
                    <li>• 所有测试通过</li>
                    <li>• 测试代码质量达标</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">文档完整</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• API文档完整</li>
                    <li>• 代码注释充分</li>
                    <li>• 用户手册更新</li>
                    <li>• 变更日志更新</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2 text-sm">性能指标</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• 页面加载时间&lt;2秒</li>
                    <li>• API响应时间&lt;500ms</li>
                    <li>• 数据库查询优化</li>
                    <li>• 无内存泄漏</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">验收标准</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">功能验收</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• 所有功能按Spec实现</li>
                    <li>• 用户故事验收标准满足</li>
                    <li>• 边界情况处理正确</li>
                    <li>• 错误处理完善</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">性能验收</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• 性能指标达到要求</li>
                    <li>• 负载测试通过</li>
                    <li>• 压力测试通过</li>
                    <li>• 性能监控正常</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">安全验收</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• 通过安全扫描</li>
                    <li>• 无高危漏洞</li>
                    <li>• 数据加密正确</li>
                    <li>• 权限控制正确</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 实战案例 */}
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4">实战案例：DoD检查清单</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>代码已提交到Git，通过CI/CD检查</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>代码已通过ESLint检查，无严重警告</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>单元测试覆盖率&gt;80%，所有测试通过</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>代码已通过代码审查，审查意见已处理</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>功能已测试，符合验收标准</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>性能测试通过，指标达标</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>安全扫描通过，无高危漏洞</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>文档已更新，API文档和用户手册完整</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>已部署到测试环境，UAT通过</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>产品经理验收通过，可以发布</span>
                </div>
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
                掌握需求澄清的方法论（Reverse Interview、用户故事、优先级排序），能够挖掘真实需求
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解Spec驱动开发的工程实践，能够编写清晰的PRD、API Spec和UI Spec
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握WBS分解的方法，能够合理拆分任务、估算时间、分配资源
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                理解DoD的质量标准，能够定义验收标准，确保交付质量
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
          <Link href="/practice/agent" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：核心技能：AI Agent 开发
          </Link>
        </Button>
        <Button asChild>
          <Link href="/practice/efficiency" className="flex items-center gap-2">
            下一章：核心技能：工具与效率
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
