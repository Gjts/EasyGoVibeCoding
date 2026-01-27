import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Lightbulb, Network, Zap, CheckCircle2, AlertTriangle, Zap as ZapIcon, GitBranch, Settings } from "lucide-react"
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

export default function AgentPage() {
  return (
    <CourseLayout
      title="实践篇"
      description="项目实战"
      chapters={chapters}
      currentChapter="核心技能：AI Agent 开发"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 4 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          核心技能：AI Agent 开发
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握AI Agent的设计原则、多Agent编排模式和事件驱动架构，构建能够自主协作、高效执行的AI Agent系统。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: Agent设计原则 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            Agent 设计原则
          </h2>
          <p className="text-muted-foreground mb-6">
            Agent设计遵循核心原则，确保Agent系统的高效性、可维护性和可扩展性。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">单一职责原则</h3>
              <p className="text-sm text-muted-foreground mb-3">
                每个Agent专注一个特定任务，职责清晰明确：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>职责边界</strong>：明确Agent的输入、输出和处理逻辑</li>
                <li>• <strong>避免耦合</strong>：Agent之间不直接依赖，通过接口通信</li>
                <li>• <strong>易于测试</strong>：单一职责便于编写单元测试</li>
                <li>• <strong>易于维护</strong>：修改一个Agent不影响其他Agent</li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">示例</strong>：代码审查Agent只负责代码审查，不负责代码生成或部署。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">可组合性原则</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Agent可以组合使用，形成更强大的能力：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>标准接口</strong>：定义统一的输入输出格式</li>
                <li>• <strong>松耦合</strong>：Agent之间通过消息通信，不直接调用</li>
                <li>• <strong>可替换</strong>：相同接口的Agent可以互相替换</li>
                <li>• <strong>可扩展</strong>：易于添加新的Agent到系统中</li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">示例</strong>：架构师Agent + 编码Agent + 测试Agent可以组合完成完整开发流程。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">可观测性原则</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Agent的行为可追踪和监控：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>日志记录</strong>：记录Agent的决策过程和执行结果</li>
                <li>• <strong>状态监控</strong>：实时监控Agent的运行状态</li>
                <li>• <strong>性能指标</strong>：追踪Agent的执行时间和资源使用</li>
                <li>• <strong>错误追踪</strong>：记录和追踪Agent的错误</li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">示例</strong>：使用结构化日志记录Agent的每个决策步骤，便于调试和优化。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">失败处理原则</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Agent需要优雅地处理失败情况：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>错误恢复</strong>：自动重试或降级处理</li>
                <li>• <strong>优雅降级</strong>：失败时提供备用方案</li>
                <li>• <strong>错误传播</strong>：向上层Agent或用户报告错误</li>
                <li>• <strong>状态回滚</strong>：失败时回滚到安全状态</li>
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">示例</strong>：API调用失败时，Agent自动重试3次，仍失败则使用缓存数据或返回错误。
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">设计原则的深层思考</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">为什么需要单一职责？</strong>：单一职责让Agent更容易理解、测试和维护。当需求变化时，只需要修改相关的Agent，不会影响其他Agent。这符合软件工程的SOLID原则。
              </p>
              <p>
                <strong className="text-foreground">为什么需要可组合性？</strong>：可组合性让Agent系统具有灵活性。通过组合不同的Agent，可以构建各种复杂的系统。这类似于Unix哲学："做一件事，做好它"。
              </p>
              <p>
                <strong className="text-foreground">为什么需要可观测性？</strong>：AI Agent的决策过程是"黑盒"，可观测性帮助我们理解Agent的行为，发现问题和优化空间。这对于调试、监控和优化至关重要。
              </p>
              <p>
                <strong className="text-foreground">为什么需要失败处理？</strong>：AI Agent运行在不确定的环境中，失败是不可避免的。优雅的失败处理确保系统的稳定性和可靠性，避免单点故障导致整个系统崩溃。
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 多Agent编排 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Network className="h-6 w-6 text-primary" />
            多Agent编排
          </h2>
          <p className="text-muted-foreground mb-6">
            多个Agent协作完成复杂任务，需要合理的编排模式和通信机制。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">架构模式</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">Sequential（顺序）</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Agent按顺序执行，前一个Agent的输出作为下一个Agent的输入
                  </p>
                  <div className="text-xs font-mono text-muted-foreground">
                    A → B → C
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>适用场景</strong>：有明确顺序的任务，如：需求分析 → 设计 → 编码 → 测试
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">Parallel（并行）</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    多个Agent并行执行，最后汇总结果
                  </p>
                  <div className="text-xs font-mono text-muted-foreground">
                    A ─┐<br/>
                    B ─┼→ 汇总<br/>
                    C ─┘
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>适用场景</strong>：独立的任务，如：同时审查多个文件的代码
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">Hierarchical（层次）</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    主Agent协调子Agent，形成层次结构
                  </p>
                  <div className="text-xs font-mono text-muted-foreground">
                    主Agent<br/>
                    ├─ Agent A<br/>
                    ├─ Agent B<br/>
                    └─ Agent C
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>适用场景</strong>：复杂任务分解，如：项目经理Agent协调多个开发Agent
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">通信机制</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">事件总线（Event Bus）</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li>• <strong>发布订阅</strong>：Agent发布事件，其他Agent订阅感兴趣的事件</li>
                    <li>• <strong>解耦</strong>：Agent之间不直接依赖，通过事件通信</li>
                    <li>• <strong>扩展性</strong>：易于添加新的Agent和事件类型</li>
                    <li>• <strong>适用场景</strong>：需要实时响应的系统，如：代码变更通知、任务完成通知</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">消息队列（Message Queue）</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li>• <strong>异步处理</strong>：Agent异步处理消息，不阻塞</li>
                    <li>• <strong>可靠性</strong>：消息持久化，确保不丢失</li>
                    <li>• <strong>负载均衡</strong>：多个Agent可以消费同一队列</li>
                    <li>• <strong>适用场景</strong>：需要可靠处理的任务，如：批量数据处理、长时间运行的任务</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">共享状态（Shared State）</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li>• <strong>状态共享</strong>：Agent通过共享状态交换信息</li>
                    <li>• <strong>一致性</strong>：需要处理并发访问和状态同步</li>
                    <li>• <strong>适用场景</strong>：需要共享数据的场景，如：共享知识库、共享配置</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4">协调策略</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Orchestration（编排）</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 中央协调器控制整个流程</li>
                    <li>• 协调器知道所有Agent的状态</li>
                    <li>• 流程集中管理，易于监控</li>
                    <li>• 适合：复杂流程、需要严格控制的场景</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Choreography（编排）</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Agent自主协作，无中央协调器</li>
                    <li>• Agent通过事件自主响应</li>
                    <li>• 系统更灵活，但监控较难</li>
                    <li>• 适合：简单流程、需要灵活性的场景</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 实战案例 */}
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">实战案例：代码审查Agent系统</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">系统架构</h4>
                <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                  主协调Agent（Orchestrator）<br/>
                  ├─ 代码分析Agent（分析代码结构）<br/>
                  ├─ 安全检查Agent（检查安全漏洞）<br/>
                  ├─ 性能分析Agent（分析性能问题）<br/>
                  └─ 报告生成Agent（生成审查报告）
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">工作流程</h4>
                <ol className="space-y-1 ml-4">
                  <li>1. 主协调Agent接收代码审查请求</li>
                  <li>2. 并行启动三个分析Agent（代码分析、安全检查、性能分析）</li>
                  <li>3. 各Agent完成分析，将结果发送到事件总线</li>
                  <li>4. 报告生成Agent订阅事件，汇总结果生成报告</li>
                  <li>5. 主协调Agent返回审查报告</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">技术实现</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 使用事件总线（Redis Pub/Sub）进行Agent通信</li>
                  <li>• 使用消息队列（RabbitMQ）处理长时间运行的分析任务</li>
                  <li>• 使用共享状态（Redis）存储分析结果</li>
                  <li>• 实现重试机制和错误处理</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 事件驱动架构 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            事件驱动架构
          </h2>
          <p className="text-muted-foreground mb-6">
            事件驱动架构让Agent系统更加灵活和响应式，适合构建复杂的分布式系统。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">事件设计</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">事件类型</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li>• <strong>命令事件</strong>：触发Agent执行某个操作，如：<code className="bg-secondary/50 px-1 rounded">code-review-requested</code></li>
                    <li>• <strong>状态事件</strong>：通知Agent状态变化，如：<code className="bg-secondary/50 px-1 rounded">task-completed</code></li>
                    <li>• <strong>数据事件</strong>：传递数据，如：<code className="bg-secondary/50 px-1 rounded">code-changed</code></li>
                    <li>• <strong>错误事件</strong>：通知错误，如：<code className="bg-secondary/50 px-1 rounded">agent-failed</code></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">事件数据</h4>
                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-xs">
                    {`{
  "type": "code-review-requested",
  "timestamp": "2025-01-27T10:00:00Z",
  "source": "git-webhook",
  "data": {
    "repository": "my-repo",
    "pullRequest": 123,
    "files": ["src/app.ts", "src/utils.ts"],
    "author": "developer"
  },
  "metadata": {
    "priority": "high",
    "deadline": "2025-01-28T10:00:00Z"
  }
}`}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">事件流</h4>
                  <p className="text-sm text-muted-foreground ml-4">
                    事件在系统中流动，触发多个Agent的响应。设计事件流时需要考虑：事件顺序、事件去重、事件重放等。
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">事件处理</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">同步 vs 异步</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <h5 className="font-medium text-foreground mb-2 text-sm">同步处理</h5>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 立即响应，等待结果</li>
                        <li>• 适合：快速操作、需要立即反馈</li>
                        <li>• 缺点：阻塞，影响性能</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <h5 className="font-medium text-foreground mb-2 text-sm">异步处理</h5>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 立即返回，后台处理</li>
                        <li>• 适合：长时间操作、不需要立即反馈</li>
                        <li>• 优点：不阻塞，性能好</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">重试机制</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                    <li>• <strong>指数退避</strong>：重试间隔逐渐增加，避免系统过载</li>
                    <li>• <strong>最大重试次数</strong>：避免无限重试</li>
                    <li>• <strong>死信队列</strong>：失败的消息放入死信队列，人工处理</li>
                    <li>• <strong>幂等性</strong>：确保重复处理不会产生副作用</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 实战案例 */}
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-4">实战案例：自动化部署Agent系统</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium text-foreground mb-2">事件流设计</h4>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs">
                    git-push → code-changed → build-requested →<br/>
                    build-completed → test-requested → test-completed →<br/>
                    deploy-requested → deploy-completed → notify-completed
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Agent设计</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• <strong>构建Agent</strong>：监听build-requested事件，执行构建</li>
                    <li>• <strong>测试Agent</strong>：监听test-requested事件，执行测试</li>
                    <li>• <strong>部署Agent</strong>：监听deploy-requested事件，执行部署</li>
                    <li>• <strong>通知Agent</strong>：监听deploy-completed事件，发送通知</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">错误处理</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• 构建失败：自动重试3次，仍失败则通知开发者</li>
                    <li>• 测试失败：阻止部署，通知开发者</li>
                    <li>• 部署失败：自动回滚，通知运维团队</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ZapIcon className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                理解Agent设计的核心原则（单一职责、可组合性、可观测性、失败处理），知道如何设计高质量的Agent
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握多Agent协作的架构模式（Sequential、Parallel、Hierarchical），能够选择合适的编排模式
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解事件驱动架构的设计原理，能够设计事件类型、事件流和事件处理机制
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                能够设计和实现多Agent系统，包括通信机制、协调策略和错误处理
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                具备分析和优化Agent系统的能力，能够识别性能瓶颈和改进空间
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/practice/professional" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：职场人士项目
          </Link>
        </Button>
        <Button asChild>
          <Link href="/practice/fullstack" className="flex items-center gap-2">
            下一章：核心技能：全栈项目实战
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
