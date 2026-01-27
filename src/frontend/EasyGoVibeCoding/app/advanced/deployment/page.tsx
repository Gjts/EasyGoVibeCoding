import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Rocket, Settings, Activity, AlertCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "序：从工具到架构的 100 小时", href: "/advanced" },
  { title: "环境搭建与代码运行基础", href: "/advanced/environment" },
  { title: "AI 使用说明书", href: "/advanced/ai-guide" },
  { title: "PRD 与文档驱动", href: "/advanced/prd" },
  { title: "开发常识", href: "/advanced/dev-basics" },
  { title: "界面交互", href: "/advanced/ui" },
  { title: "数据持久化", href: "/advanced/data" },
  { title: "测试与质量", href: "/advanced/testing" },
  { title: "部署与运维", href: "/advanced/deployment" },
]

export default function DeploymentPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="部署与运维"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 8 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          部署与运维
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握部署策略、环境配置、监控日志和运维最佳实践，让应用稳定运行在生产环境。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 部署策略 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            部署策略
          </h2>
          <p className="text-muted-foreground mb-6">
            根据应用特点选择合适的部署方式，平衡成本、性能和复杂度。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">静态部署</h3>
              <p className="text-sm text-muted-foreground mb-3">
                适合静态网站、SPA 应用。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Vercel、Netlify</li>
                <li>• GitHub Pages</li>
                <li>• CDN 加速</li>
                <li>• 零配置部署</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">容器化部署</h3>
              <p className="text-sm text-muted-foreground mb-3">
                使用 Docker 打包应用，灵活部署。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Docker + Docker Compose</li>
                <li>• Kubernetes</li>
                <li>• 环境一致性</li>
                <li>• 易于扩展</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Serverless 部署</h3>
              <p className="text-sm text-muted-foreground mb-3">
                按需运行，自动扩缩容。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Vercel Functions</li>
                <li>• AWS Lambda</li>
                <li>• 按使用付费</li>
                <li>• 零运维</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">部署策略选择</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>小型项目</strong>：静态部署或 Serverless</li>
              <li>• <strong>中型项目</strong>：容器化部署（Docker）</li>
              <li>• <strong>大型项目</strong>：Kubernetes 集群</li>
              <li>• <strong>混合方案</strong>：静态资源 CDN + API Serverless</li>
            </ul>
          </div>
        </section>

        {/* Section 2: 环境配置 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            环境配置
          </h2>
          <p className="text-muted-foreground mb-6">
            合理管理环境变量和配置，确保不同环境的一致性。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">环境变量管理</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>.env 文件</strong>：本地开发环境配置</li>
                <li>• <strong>环境变量注入</strong>：生产环境通过平台配置</li>
                <li>• <strong>密钥管理</strong>：使用密钥管理服务（AWS Secrets Manager、Vercel Env）</li>
                <li>• <strong>版本控制</strong>：敏感信息不提交到 Git</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">配置文件</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>环境分离</strong>：development、staging、production</li>
                <li>• <strong>配置验证</strong>：启动时验证必需配置</li>
                <li>• <strong>默认值</strong>：提供合理的默认配置</li>
                <li>• <strong>配置文档</strong>：记录所有配置项和用途</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">最佳实践</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 使用环境变量而非硬编码</li>
                <li>• 敏感信息加密存储</li>
                <li>• 配置变更需要评审</li>
                <li>• 定期轮换密钥和证书</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: 监控与日志 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            监控与日志
          </h2>
          <p className="text-muted-foreground mb-6">
            完善的监控和日志系统是运维的基础，帮助快速定位和解决问题。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">应用监控</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>性能指标</strong>：响应时间、吞吐量、错误率</li>
                <li>• <strong>资源使用</strong>：CPU、内存、磁盘、网络</li>
                <li>• <strong>业务指标</strong>：用户数、订单数、转化率</li>
                <li>• <strong>工具</strong>：Vercel Analytics、Sentry、Datadog</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">错误追踪</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>错误收集</strong>：自动捕获异常和错误</li>
                <li>• <strong>堆栈追踪</strong>：定位错误发生位置</li>
                <li>• <strong>用户上下文</strong>：记录用户操作路径</li>
                <li>• <strong>告警通知</strong>：错误发生时及时通知</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">日志管理</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>日志级别</strong>：DEBUG、INFO、WARN、ERROR</li>
                <li>• <strong>结构化日志</strong>：JSON 格式便于分析</li>
                <li>• <strong>日志聚合</strong>：集中收集和存储</li>
                <li>• <strong>日志检索</strong>：快速查找和分析</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">性能监控</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>APM</strong>：应用性能监控</li>
                <li>• <strong>慢查询</strong>：数据库查询性能</li>
                <li>• <strong>前端性能</strong>：Core Web Vitals</li>
                <li>• <strong>实时监控</strong>：实时查看系统状态</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 运维实践 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-primary" />
            运维最佳实践
          </h2>
          <p className="text-muted-foreground mb-6">
            建立完善的运维流程，确保系统稳定运行。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">自动化部署</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>CI/CD  pipeline</strong>：自动化构建、测试、部署</li>
                <li>• <strong>蓝绿部署</strong>：零停机时间部署</li>
                <li>• <strong>金丝雀发布</strong>：逐步发布，降低风险</li>
                <li>• <strong>回滚机制</strong>：快速回滚到上一版本</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">灾备方案</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>数据备份</strong>：定期备份，多地域存储</li>
                <li>• <strong>故障转移</strong>：主备切换机制</li>
                <li>• <strong>灾难恢复</strong>：RTO（恢复时间目标）和 RPO（恢复点目标）</li>
                <li>• <strong>演练</strong>：定期进行灾难恢复演练</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">运维检查清单</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>监控告警已配置</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>日志收集正常</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>备份策略已实施</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>回滚方案已测试</span>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1" />
                  <span>文档已更新</span>
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
                掌握多种部署方式（静态部署、容器化、Serverless），能够根据场景选择
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解环境配置管理，掌握环境变量和密钥管理方法
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                能够设置监控和日志系统，快速定位和解决问题
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                了解运维最佳实践（自动化部署、灾备方案、运维检查清单）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/testing" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：测试与质量
          </Link>
        </Button>
        <Button variant="outline" disabled>
          已完成所有章节
        </Button>
      </div>
    </CourseLayout>
  )
}
