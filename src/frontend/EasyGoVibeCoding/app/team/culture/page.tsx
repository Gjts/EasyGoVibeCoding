import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Heart, Users, Award, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "团队篇概述", href: "/team" },
  { title: "为什么需要 AI 团队？", href: "/team/why" },
  { title: "团队组建与角色定义", href: "/team/roles" },
  { title: "工具选型与统一配置", href: "/team/tools" },
  { title: "工作流程与协作机制", href: "/team/workflow" },
  { title: "知识管理与沉淀", href: "/team/knowledge" },
  { title: "文化建设与学习型组织", href: "/team/culture" },
  { title: "成本管理与优化", href: "/team/cost" },
  { title: "安全与合规", href: "/team/security" },
  { title: "团队成长与职业发展", href: "/team/growth" },
  { title: "实战案例与最佳实践", href: "/team/cases" },
]

export default function CulturePage() {
  return (
    <CourseLayout
      title="团队篇"
      description="从零打造 AI 团队"
      chapters={chapters}
      currentChapter="文化建设与学习型组织"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 6 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          文化建设与学习型组织
        </h1>
        <p className="text-lg text-muted-foreground">
          建立 AI 工具学习文化，设计激励机制和学习路径，打造持续学习和改进的学习型组织。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: AI 工具学习文化 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            AI 工具学习文化
          </h2>
          <p className="text-muted-foreground mb-6">
            建立持续学习、实验精神和知识共享的文化氛围。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                持续学习
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 每周技术分享会（新工具、新技巧）</li>
                <li>• 工具使用竞赛（鼓励创新使用）</li>
                <li>• 学习资源分享（文章、视频、案例）</li>
                <li>• 定期培训（新人培训、进阶培训）</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                实验精神
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 鼓励尝试新工具、新方法</li>
                <li>• 失败是学习的机会（记录失败案例）</li>
                <li>• 快速迭代、快速验证</li>
                <li>• 建立实验项目机制</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                知识共享
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 内部 Wiki：工具使用经验</li>
                <li>• 代码 Review：互相学习</li>
                <li>• 结对编程：AI 辅助结对编程</li>
                <li>• 经验分享会：定期分享会</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 激励机制 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            激励机制
          </h2>
          <p className="text-muted-foreground mb-6">
            通过奖励机制鼓励团队成员贡献知识、提升效率、创新使用。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">Skill/Pattern 贡献奖励</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">贡献优秀 Skill → 奖励</div>
                  <ul className="space-y-1">
                    <li>• 被团队广泛使用的 Skill</li>
                    <li>• 解决实际问题的 Skill</li>
                    <li>• 创新性的 Skill 设计</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">贡献优秀 Pattern → 奖励</div>
                  <ul className="space-y-1">
                    <li>• 标准化工作流的 Pattern</li>
                    <li>• 提升效率的 Pattern</li>
                    <li>• 可复用的 Pattern 设计</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">最佳实践分享 → 奖励</div>
                  <ul className="space-y-1">
                    <li>• 成功案例分享</li>
                    <li>• 工具使用技巧分享</li>
                    <li>• 问题解决方案分享</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">工具使用效率奖励</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">使用 AI 工具提升效率 → 奖励</div>
                  <ul className="space-y-1">
                    <li>• 开发效率显著提升</li>
                    <li>• 代码质量显著提升</li>
                    <li>• 项目交付速度提升</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">创新使用场景 → 奖励</div>
                  <ul className="space-y-1">
                    <li>• 发现新的工具使用场景</li>
                    <li>• 创新性的工作流设计</li>
                    <li>• 跨部门应用创新</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">问题解决 → 奖励</div>
                  <ul className="space-y-1">
                    <li>• 解决团队共性问题</li>
                    <li>• 优化工具使用流程</li>
                    <li>• 改进知识库内容</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 学习路径设计 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            学习路径设计
          </h2>
          <p className="text-muted-foreground mb-6">
            为不同阶段的团队成员设计清晰的学习路径。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">新人路径（4 周）</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">Week 1</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">工具安装配置、基础使用</div>
                    <ul className="space-y-1 mt-1">
                      <li>• Cursor 安装和配置</li>
                      <li>• Fabric 安装和配置</li>
                      <li>• 基础 Prompt 工程</li>
                      <li>• 代码补全使用</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">Week 2</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">Skill 创建、Patterns 使用</div>
                    <ul className="space-y-1 mt-1">
                      <li>• 创建第一个 Skill</li>
                      <li>• 使用团队 Patterns</li>
                      <li>• Skill 库使用</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">Week 3</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">Agent 模式、MCP 配置</div>
                    <ul className="space-y-1 mt-1">
                      <li>• Cursor Agent 使用</li>
                      <li>• MCP Server 配置</li>
                      <li>• 多文件编辑</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">Week 4</span>
                  <div>
                    <div className="font-medium text-foreground mb-1">实战项目、知识沉淀</div>
                    <ul className="space-y-1 mt-1">
                      <li>• 完成第一个实战项目</li>
                      <li>• 贡献 Skill/Pattern</li>
                      <li>• 知识沉淀总结</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">进阶路径</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">工具深度使用</div>
                  <ul className="space-y-1">
                    <li>• 高级特性掌握</li>
                    <li>• 复杂场景应用</li>
                    <li>• 性能优化技巧</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">自定义 Skill/Pattern 开发</div>
                  <ul className="space-y-1">
                    <li>• 复杂 Skill 设计</li>
                    <li>• Pattern 优化</li>
                    <li>• 元技能开发</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">工具选型与架构设计</div>
                  <ul className="space-y-1">
                    <li>• 工具评估方法</li>
                    <li>• 架构权衡思维</li>
                    <li>• 技术路线规划</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-medium text-foreground mb-2">团队知识管理</div>
                  <ul className="space-y-1">
                    <li>• 知识库建设</li>
                    <li>• 文档体系设计</li>
                    <li>• 培训体系设计</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 实战练习 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            实战练习
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">建议练习：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                设计团队学习计划（新人路径、进阶路径、培训计划）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                建立激励机制（贡献奖励、效率奖励、创新奖励）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                创建学习资源库（文章、视频、案例、工具推荐）
              </li>
            </ul>
          </div>
        </section>

        {/* 学习成果 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            学习成果
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-foreground font-medium mb-4">完成本章后，你将：</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">1</span>
                掌握文化建设方法（持续学习、实验精神、知识共享）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够建立学习型组织（激励机制、学习路径、资源库）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解激励机制的重要性（贡献奖励、效率奖励、创新奖励）
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/team/knowledge" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：知识管理与沉淀
          </Link>
        </Button>
        <Button asChild>
          <Link href="/team/cost" className="flex items-center gap-2">
            下一章：成本管理与优化
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
