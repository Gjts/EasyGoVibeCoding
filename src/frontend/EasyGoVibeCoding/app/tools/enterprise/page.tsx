import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Building2, Users, DollarSign, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "工具篇概述", href: "/tools" },
  { title: "IDE 类工具详解", href: "/tools/ide" },
  { title: "网页编辑类工具详解", href: "/tools/web" },
  { title: "命令行类工具详解", href: "/tools/cli" },
  { title: "核心技术深度解析", href: "/tools/core" },
  { title: "Fabric AI 增强框架", href: "/tools/fabric" },
  { title: "工具选型决策", href: "/tools/selection" },
  { title: "企业级实践", href: "/tools/enterprise" },
]

export default function EnterprisePage() {
  return (
    <CourseLayout
      title="工具篇"
      description="AI 编程工具深度解析"
      chapters={chapters}
      currentChapter="企业级实践"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 7 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          企业级实践
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握企业级环境配置、团队协作、成本优化和安全合规的最佳实践，确保 AI 工具在企业环境中安全高效地运行。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 企业环境配置 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            企业环境配置
          </h2>
          <p className="text-muted-foreground mb-6">
            企业环境通常有特殊的网络、代理和安全要求，需要特别配置。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">网络配置</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>代理设置</strong>：配置 HTTP/HTTPS 代理</li>
                <li>• <strong>防火墙规则</strong>：开放必要的端口和域名</li>
                <li>• <strong>VPN 支持</strong>：支持企业 VPN 环境</li>
                <li>• <strong>内网访问</strong>：配置内网服务访问</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">权限管理</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>用户权限</strong>：基于角色的访问控制</li>
                <li>• <strong>API 权限</strong>：限制 API 调用范围</li>
                <li>• <strong>文件访问</strong>：控制文件系统访问权限</li>
                <li>• <strong>审计日志</strong>：记录所有操作日志</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">安全配置</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>密钥管理</strong>：使用密钥管理服务</li>
                <li>• <strong>加密传输</strong>：确保所有通信加密</li>
                <li>• <strong>访问控制</strong>：IP 白名单、设备管理</li>
                <li>• <strong>安全扫描</strong>：定期安全扫描和更新</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">代理配置示例</h3>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm text-muted-foreground">
                <div>export HTTP_PROXY=http://proxy.company.com:8080</div>
                <div>export HTTPS_PROXY=http://proxy.company.com:8080</div>
                <div>export NO_PROXY=localhost,127.0.0.1,*.internal</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 团队协作 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            团队协作
          </h2>
          <p className="text-muted-foreground mb-6">
            建立高效的团队协作机制，共享配置和知识，提升整体效率。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">共享配置</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>统一配置</strong>：团队使用统一的工具配置</li>
                <li>• <strong>配置模板</strong>：提供标准配置模板</li>
                <li>• <strong>版本控制</strong>：配置纳入版本控制</li>
                <li>• <strong>自动同步</strong>：配置变更自动同步到团队成员</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">团队库</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Skill 库</strong>：团队共享 Skill 库，统一标准</li>
                <li>• <strong>Patterns 库</strong>：Fabric Patterns 团队库</li>
                <li>• <strong>最佳实践库</strong>：收集和分享最佳实践</li>
                <li>• <strong>知识库</strong>：工具使用文档和 FAQ</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">版本控制</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>配置版本化</strong>：Skill、Patterns、配置文件版本管理</li>
                <li>• <strong>变更追踪</strong>：记录配置变更历史和原因</li>
                <li>• <strong>回滚机制</strong>：快速回滚到之前的配置版本</li>
                <li>• <strong>分支管理</strong>：使用分支管理不同环境的配置</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: 成本优化 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            成本优化
          </h2>
          <p className="text-muted-foreground mb-6">
            合理控制 AI 工具使用成本，在保证质量的前提下最大化 ROI。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">模型选择</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>任务分级</strong>：根据任务复杂度选择模型</li>
                <li>• <strong>混合策略</strong>：简单任务用轻量模型</li>
                <li>• <strong>本地优先</strong>：优先使用本地模型（Ollama）</li>
                <li>• <strong>批量处理</strong>：批量处理减少 API 调用次数</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Token 优化</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>上下文精简</strong>：只包含必要的上下文</li>
                <li>• <strong>Prompt 优化</strong>：精简 Prompt，减少 Token</li>
                <li>• <strong>缓存机制</strong>：缓存常见请求结果</li>
                <li>• <strong>压缩技术</strong>：使用 Token 压缩技术</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">使用监控</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>使用统计</strong>：监控 API 调用和 Token 使用</li>
                <li>• <strong>成本分析</strong>：分析成本分布和趋势</li>
                <li>• <strong>异常检测</strong>：检测异常使用和浪费</li>
                <li>• <strong>预算控制</strong>：设置使用预算和告警</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">成本优化策略</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>80/20 原则</strong>：80% 简单任务用轻量模型，20% 复杂任务用强大模型</li>
                <li>• <strong>定期审查</strong>：定期审查使用情况，优化策略</li>
                <li>• <strong>团队培训</strong>：培训团队高效使用工具</li>
                <li>• <strong>工具整合</strong>：整合多个工具，避免重复订阅</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 安全与合规 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            安全与合规
          </h2>
          <p className="text-muted-foreground mb-6">
            确保 AI 工具使用符合企业安全政策和合规要求。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">代码上传策略</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>数据分类</strong>：将代码和数据分为不同安全级别</li>
                <li>• <strong>上传控制</strong>：敏感代码禁止上传到云端</li>
                <li>• <strong>本地优先</strong>：优先使用本地模型处理敏感代码</li>
                <li>• <strong>审查机制</strong>：代码上传前需要安全审查</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">模型厂商选择</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>数据政策</strong>：选择数据不用于训练模型的厂商</li>
                <li>• <strong>合规认证</strong>：选择通过合规认证的厂商（SOC 2、ISO 27001）</li>
                <li>• <strong>数据位置</strong>：选择数据存储在合规地区的厂商</li>
                <li>• <strong>合同条款</strong>：审查服务合同中的数据使用条款</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">本地化部署</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>私有部署</strong>：敏感项目使用私有部署方案</li>
                <li>• <strong>本地模型</strong>：使用 Ollama 等本地模型方案</li>
                <li>• <strong>数据隔离</strong>：确保数据不出企业网络</li>
                <li>• <strong>访问控制</strong>：严格的访问控制和审计</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">合规要求</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>GDPR</strong>：符合欧盟 GDPR 数据保护要求</li>
                <li>• <strong>个人信息保护法</strong>：符合中国个人信息保护法</li>
                <li>• <strong>行业标准</strong>：符合行业特定合规要求（金融、医疗等）</li>
                <li>• <strong>审计准备</strong>：准备合规审计所需文档和证据</li>
              </ul>
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
                掌握企业级环境配置方法（网络、代理、权限、安全）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解团队协作机制（共享配置、团队库、版本控制）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                能够优化成本（模型选择、Token优化、使用监控）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                确保安全合规（代码上传策略、本地化部署、合规要求）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/tools/selection" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：工具选型决策
          </Link>
        </Button>
        <Button variant="outline" disabled>
          已完成所有章节
        </Button>
      </div>
    </CourseLayout>
  )
}
