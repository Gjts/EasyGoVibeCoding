import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Database, Table, Key, ArrowUpDown, Zap } from "lucide-react"
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

export default function DataPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={chapters}
      currentChapter="数据持久化"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 6 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          数据持久化
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握数据库选型、数据模型设计、ORM 使用和数据迁移，构建可靠的数据层。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 数据库选型 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            数据库选型
          </h2>
          <p className="text-muted-foreground mb-6">
            根据应用场景选择合适的数据库类型，是系统设计的关键决策。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">关系型数据库 (SQL)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                适合结构化数据，需要事务和复杂查询的场景。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>PostgreSQL</strong>：功能强大，支持 JSON、全文搜索</li>
                <li>• <strong>MySQL</strong>：成熟稳定，生态丰富</li>
                <li>• <strong>SQLite</strong>：轻量级，适合小型应用</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">文档数据库 (NoSQL)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                适合半结构化数据，需要灵活模式的场景。
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>MongoDB</strong>：灵活的文档模型</li>
                <li>• <strong>Firestore</strong>：实时同步，适合移动应用</li>
                <li>• <strong>CouchDB</strong>：多主复制，离线支持</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">选型建议</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>需要事务</strong>：选择关系型数据库</li>
              <li>• <strong>需要扩展性</strong>：考虑 NoSQL 或分布式数据库</li>
              <li>• <strong>数据结构固定</strong>：关系型数据库更合适</li>
              <li>• <strong>需要实时同步</strong>：考虑 Firestore、Supabase</li>
            </ul>
          </div>
        </section>

        {/* Section 2: 数据模型设计 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Table className="h-6 w-6 text-primary" />
            数据模型设计
          </h2>
          <p className="text-muted-foreground mb-6">
            良好的数据模型设计是系统稳定性和性能的基础。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">表结构设计</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>规范化</strong>：减少数据冗余，保证一致性</li>
                <li>• <strong>反规范化</strong>：适当冗余提升查询性能</li>
                <li>• <strong>字段类型</strong>：选择合适的数据类型，节省存储</li>
                <li>• <strong>默认值</strong>：设置合理的默认值</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">关系设计</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>一对一</strong>：用户和用户资料</li>
                <li>• <strong>一对多</strong>：用户和订单</li>
                <li>• <strong>多对多</strong>：用户和角色（通过中间表）</li>
                <li>• <strong>外键约束</strong>：保证数据完整性</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">索引优化</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>主键索引</strong>：自动创建，唯一且非空</li>
                <li>• <strong>唯一索引</strong>：保证字段唯一性</li>
                <li>• <strong>普通索引</strong>：加速查询，但增加写入成本</li>
                <li>• <strong>复合索引</strong>：多字段组合索引</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: ORM 框架 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Key className="h-6 w-6 text-primary" />
            ORM 框架
          </h2>
          <p className="text-muted-foreground mb-6">
            ORM（Object-Relational Mapping）简化数据库操作，提高开发效率。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Prisma</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Type-safe 查询</li>
                <li>• 迁移管理</li>
                <li>• 可视化工具</li>
                <li>• 多数据库支持</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">TypeORM</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 装饰器语法</li>
                <li>• 活跃记录模式</li>
                <li>• 查询构建器</li>
                <li>• 关系管理</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Drizzle</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 轻量级</li>
                <li>• SQL-like API</li>
                <li>• 类型安全</li>
                <li>• 性能优秀</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">ORM 最佳实践</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>避免 N+1 查询</strong>：使用预加载（eager loading）</li>
              <li>• <strong>批量操作</strong>：使用批量插入/更新提升性能</li>
              <li>• <strong>原生查询</strong>：复杂查询使用原生 SQL</li>
              <li>• <strong>连接池管理</strong>：合理配置连接池大小</li>
            </ul>
          </div>
        </section>

        {/* Section 4: 数据迁移 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ArrowUpDown className="h-6 w-6 text-primary" />
            数据迁移
          </h2>
          <p className="text-muted-foreground mb-6">
            数据迁移是数据库演进的重要环节，需要谨慎规划和执行。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">迁移策略</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">版本控制</strong>：迁移文件纳入版本控制，记录变更历史
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">可回滚</strong>：每个迁移都要有对应的回滚操作
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">测试环境验证</strong>：先在测试环境执行，验证无误后再上线
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">数据备份</strong>：迁移前备份数据，确保可恢复
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">常见迁移场景</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>添加字段</strong>：使用默认值或允许 NULL</li>
              <li>• <strong>删除字段</strong>：先标记为废弃，再删除</li>
              <li>• <strong>修改字段类型</strong>：可能需要数据转换</li>
              <li>• <strong>重命名表/字段</strong>：使用两步法（添加新→迁移数据→删除旧）</li>
            </ul>
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
                能够根据场景选择合适的数据库（SQL vs NoSQL）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握数据模型设计方法（表结构、关系、索引）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                熟练使用 ORM 框架（Prisma、TypeORM、Drizzle）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                理解数据迁移流程，掌握迁移最佳实践
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/advanced/ui" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：界面交互
          </Link>
        </Button>
        <Button asChild>
          <Link href="/advanced/testing" className="flex items-center gap-2">
            下一章：测试与质量
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
