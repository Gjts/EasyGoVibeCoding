import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Database, Table, ArrowUpDown, Zap, Sparkles, Brain, Network, Rocket, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const chapters = [
  { title: "序：从工具到架构的 100 小时", href: "/advanced" },
  { title: "环境搭建与代码运行基础", href: "/advanced/environment" },
  { title: "AI 使用说明书", href: "/advanced/ai-guide" },
  { title: "PRD 与文档驱动", href: "/advanced/prd" },
  { title: "AI 原生开发模式", href: "/advanced/ai-native-patterns" },
  { title: "AI 适配架构范式", href: "/advanced/ai-architecture-patterns" },
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
          第 8 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          数据持久化
        </h1>
        <p className="text-lg text-muted-foreground">
          掌握如何利用 AI 提升数据库开发和管理效率，学习 AI 辅助数据库设计、查询优化、数据迁移等最佳实践。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 0: 序言 - 结构化思考方法 */}
        <section>
          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5 mb-6">
            <p className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              使用 Sequential Thinking 学习 AI 驱动的数据持久化
            </p>
            <p className="text-muted-foreground mb-4">
              AI 在数据库中的应用涉及多个层面，使用<strong className="text-foreground">结构化思考方法</strong>可以帮助你系统掌握：
            </p>
            <div className="space-y-3">
              {[
                { step: "1", title: "数据库类型概览", desc: "关系型、非关系型、分布式数据库快速了解" },
                { step: "2", title: "AI 辅助数据库设计", desc: "数据模型生成、Schema 设计、命名规范" },
                { step: "3", title: "AI 辅助查询优化", desc: "慢查询分析、SQL 优化、索引推荐" },
                { step: "4", title: "AI 辅助数据管理", desc: "迁移脚本生成、数据验证、性能调优" },
                { step: "5", title: "AI 驱动的数据库运维", desc: "监控告警、自动调优、故障诊断" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {item.step}
                  </span>
                  <div>
                    <div className="font-medium text-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: 数据库类型概览 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            数据库类型概览
          </h2>
          <p className="text-muted-foreground mb-6">
            快速了解三种数据库类型，为 AI 实践提供背景知识。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">关系型数据库（SQL）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>代表</strong>：PostgreSQL、MySQL、SQLite
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>特点</strong>：ACID 事务、结构化数据、复杂查询
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>适用</strong>：需要事务、数据结构固定、复杂查询
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">非关系型数据库（NoSQL）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>代表</strong>：MongoDB（文档）、Redis（键值）、Cassandra（列式）、Neo4j（图）
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>特点</strong>：灵活模式、水平扩展、高性能读写
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>适用</strong>：半结构化数据、高并发读写、灵活模式
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Network className="h-5 w-5 text-primary" />
                分布式数据库
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>代表</strong>：SelectDB（Apache Doris）、SAP HANA、ClickHouse、TiDB、Snowflake
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>特点</strong>：分布式架构、大数据分析、向量检索支持
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>适用</strong>：大数据分析、实时 OLAP、AI/ML 场景、向量检索
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: AI 在数据库中的最佳实践 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            AI 在数据库中的最佳实践
          </h2>
          <p className="text-muted-foreground mb-6">
            利用 AI 提升数据库开发和管理效率，从设计到运维的全流程 AI 辅助实践。
          </p>

          <Tabs defaultValue="design" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-6">
              <TabsTrigger value="design">AI 辅助设计</TabsTrigger>
              <TabsTrigger value="optimization">查询优化</TabsTrigger>
              <TabsTrigger value="nl2sql">NL2SQL</TabsTrigger>
              <TabsTrigger value="vector">向量数据库</TabsTrigger>
              <TabsTrigger value="ops">AI 运维</TabsTrigger>
              <TabsTrigger value="migration">数据迁移</TabsTrigger>
            </TabsList>

            {/* AI 辅助数据库设计 */}
            <TabsContent value="design" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助数据库设计</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">使用 AI 生成数据模型</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      向 AI 描述业务需求，让它生成 Prisma Schema 或 TypeORM Entity：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要设计一个博客系统的数据库模型，包含以下需求：
1. 用户表：id、用户名、邮箱、密码哈希、创建时间
2. 文章表：id、标题、内容、作者ID（外键）、分类ID（外键）、创建时间、更新时间
3. 分类表：id、名称、描述
4. 标签表：id、名称
5. 文章和标签是多对多关系

请生成 Prisma Schema，包含：
- 所有字段的类型和约束
- 表之间的关系
- 必要的索引
- 遵循 Prisma 最佳实践`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的 Prisma Schema 示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  username  String   @unique
  email     String   @unique
  passwordHash String @map("password_hash")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  posts     Post[]
  
  @@map("users")
}

model Post {
  id          String   @id @default(cuid())
  title       String
  content     String   @db.Text
  authorId    String   @map("author_id")
  categoryId  String   @map("category_id")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  author      User     @relation(fields: [authorId], references: [id])
  category    Category @relation(fields: [categoryId], references: [id])
  tags        PostTag[]
  
  @@index([authorId])
  @@index([categoryId])
  @@map("posts")
}

model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  posts       Post[]
  
  @@map("categories")
}

model Tag {
  id    String    @id @default(cuid())
  name  String    @unique
  posts PostTag[]
  
  @@map("tags")
}

model PostTag {
  postId String @map("post_id")
  tagId  String @map("tag_id")
  
  post   Post   @relation(fields: [postId], references: [id])
  tag    Tag    @relation(fields: [tagId], references: [id])
  
  @@id([postId, tagId])
  @@map("post_tags")
}`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助命名规范</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 确保命名一致性：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

检查以下 Prisma Schema 的命名是否遵循最佳实践：
- 表名使用复数形式
- 字段名使用 camelCase
- 外键字段使用表名 + Id 格式
- 时间字段使用 createdAt/updatedAt

[粘贴 Schema 代码]

请指出不符合规范的地方并给出修改建议。`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助查询优化 */}
            <TabsContent value="optimization" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助查询优化</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 分析慢查询</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      将慢查询和 EXPLAIN 结果提供给 AI，让它分析性能瓶颈：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我有一个慢查询，执行时间约 2 秒：

SELECT u.*, p.*, c.name as category_name
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
LEFT JOIN categories c ON p.category_id = c.id
WHERE u.created_at > '2024-01-01'
ORDER BY u.created_at DESC
LIMIT 20;

EXPLAIN 结果：
[粘贴 EXPLAIN 输出]

请分析：
1. 性能瓶颈在哪里？
2. 缺少哪些索引？
3. 如何优化这个查询？
4. 提供优化后的 SQL 和索引创建语句。`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 优化建议示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`优化建议：

1. 性能瓶颈：
   - users.created_at 字段缺少索引
   - LEFT JOIN 可能导致大量数据扫描

2. 优化方案：

-- 添加索引
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_category_id ON posts(category_id);

-- 优化后的查询（使用子查询减少 JOIN）
SELECT 
  u.*,
  (SELECT COUNT(*) FROM posts WHERE author_id = u.id) as post_count,
  c.name as category_name
FROM users u
LEFT JOIN categories c ON c.id = (
  SELECT category_id FROM posts 
  WHERE author_id = u.id 
  ORDER BY created_at DESC 
  LIMIT 1
)
WHERE u.created_at > '2024-01-01'
ORDER BY u.created_at DESC
LIMIT 20;`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 辅助索引推荐</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt：

根据以下查询模式，推荐需要创建的索引：

常用查询：
1. SELECT * FROM users WHERE email = ?
2. SELECT * FROM posts WHERE author_id = ? AND status = 'published'
3. SELECT * FROM posts WHERE category_id = ? ORDER BY created_at DESC
4. SELECT * FROM comments WHERE post_id = ? AND parent_id IS NULL

请分析并推荐：
- 单列索引
- 复合索引
- 覆盖索引（如果适用）`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* NL2SQL */}
            <TabsContent value="nl2sql" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">自然语言查询（NL2SQL）</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">NL2SQL 实现原理</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 LLM + 数据库 Schema 将自然语言转换为 SQL：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// NL2SQL 实现示例
async function naturalLanguageToSQL(
  question: string,
  schema: DatabaseSchema
): Promise<string> {
  const prompt = \`你是一个 SQL 专家。根据以下数据库 Schema，将用户问题转换为 SQL 查询。

数据库 Schema:
\${JSON.stringify(schema, null, 2)}

用户问题: \${question}

要求：
1. 只返回 SQL 查询，不要其他解释
2. 使用参数化查询防止 SQL 注入
3. 考虑性能，使用合适的索引字段

SQL 查询:\`;

  const response = await callLLM(prompt);
  return extractSQL(response);
}

// 使用示例
const schema = {
  tables: {
    users: { columns: ['id', 'name', 'email', 'created_at'] },
    posts: { columns: ['id', 'title', 'author_id', 'created_at'] }
  }
};

const sql = await naturalLanguageToSQL(
  "查询最近一周创建的所有文章及其作者信息",
  schema
);
// 返回: SELECT p.*, u.name as author_name 
//       FROM posts p 
//       JOIN users u ON p.author_id = u.id 
//       WHERE p.created_at > NOW() - INTERVAL '7 days'`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">使用场景</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                      <li>业务人员直接查询数据库（无需 SQL 知识）</li>
                      <li>快速原型开发（自然语言描述需求）</li>
                      <li>数据分析工具集成</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">最佳实践</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                      <li>提供完整的 Schema 信息（表名、字段名、类型、关系）</li>
                      <li>限制查询权限（只读、特定表）</li>
                      <li>验证生成的 SQL（防止 SQL 注入）</li>
                      <li>添加查询结果限制（LIMIT）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 向量数据库与 AI 应用 */}
            <TabsContent value="vector" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">向量数据库与 AI 应用</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">向量数据库选型</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-secondary/50">
                        <div className="font-medium text-foreground mb-1">Pinecone</div>
                        <div className="text-xs text-muted-foreground">托管服务，易于使用，适合快速原型</div>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/50">
                        <div className="font-medium text-foreground mb-1">Milvus</div>
                        <div className="text-xs text-muted-foreground">高性能，适合大规模部署</div>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/50">
                        <div className="font-medium text-foreground mb-1">Weaviate</div>
                        <div className="text-xs text-muted-foreground">开源，功能丰富，支持混合检索</div>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/50">
                        <div className="font-medium text-foreground mb-1">Chroma</div>
                        <div className="text-xs text-muted-foreground">轻量级，易于集成</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">RAG 场景中的向量检索</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// 向量数据库集成示例（使用 Pinecone）
import { Pinecone } from '@pinecone-database/pinecone'

// 初始化
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY })
const index = pinecone.index('documents')

// 存储文档向量
async function storeDocument(text: string, embedding: number[]) {
  await index.upsert([{
    id: generateId(),
    values: embedding,
    metadata: { text, timestamp: Date.now() }
  }])
}

// 语义搜索
async function semanticSearch(queryEmbedding: number[], topK: number = 5) {
  const results = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true
  })
  
  return results.matches.map(match => ({
    text: match.metadata?.text,
    score: match.score
  }))
}

// RAG 流程
async function ragQuery(userQuestion: string) {
  // 1. 将问题转换为向量
  const questionEmbedding = await getEmbedding(userQuestion)
  
  // 2. 向量检索相关文档
  const relevantDocs = await semanticSearch(questionEmbedding)
  
  // 3. 构建上下文
  const context = relevantDocs.map(doc => doc.text).join('\\n\\n')
  
  // 4. 使用 LLM 生成答案
  const answer = await generateAnswer(userQuestion, context)
  
  return answer
}`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 应用场景</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                      <li><strong>RAG（检索增强生成）</strong>：结合向量检索和 LLM 生成准确答案</li>
                      <li><strong>语义搜索</strong>：基于含义而非关键词的搜索</li>
                      <li><strong>推荐系统</strong>：基于向量相似度的内容推荐</li>
                      <li><strong>相似内容检测</strong>：检测重复或相似内容</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 驱动的数据库运维 */}
            <TabsContent value="ops" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 驱动的数据库运维</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 监控告警和性能预测</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      使用 AI 分析数据库指标，预测性能问题：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

分析以下数据库性能指标，预测潜在问题：

指标数据：
- CPU 使用率：75%（过去 24 小时平均）
- 连接数：450/500（接近上限）
- 慢查询数量：120/小时（正常：<50）
- 磁盘 I/O：85%（高）
- 缓存命中率：65%（低，正常：>80%）

请分析：
1. 当前存在哪些问题？
2. 可能导致什么后果？
3. 建议的优化措施？
4. 是否需要立即告警？`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 自动调优</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

根据以下数据库配置和性能指标，推荐优化参数：

当前配置：
- max_connections: 100
- shared_buffers: 256MB
- work_mem: 4MB
- maintenance_work_mem: 64MB

服务器资源：
- 内存：8GB
- CPU：4 核

性能问题：
- 连接数经常达到上限
- 复杂查询内存不足
- 维护操作（VACUUM、索引重建）很慢

请推荐优化的配置参数值，并说明理由。`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 故障诊断</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

数据库出现以下错误日志，请分析根因：

错误日志：
[2024-01-15 10:23:45] ERROR: deadlock detected
[2024-01-15 10:23:45] DETAIL: Process 12345 waits for ShareLock on transaction 67890
[2024-01-15 10:23:45] STATEMENT: UPDATE users SET last_login = NOW() WHERE id = 'abc123'

相关查询：
1. SELECT * FROM users WHERE id = 'abc123' FOR UPDATE
2. UPDATE users SET last_login = NOW() WHERE id = 'abc123'

请分析：
1. 死锁的原因是什么？
2. 如何避免这个死锁？
3. 如何修复当前问题？`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI 辅助数据迁移 */}
            <TabsContent value="migration" className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">AI 辅助数据迁移</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成迁移脚本</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      描述 Schema 变更需求，让 AI 生成迁移脚本：
                    </p>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

我需要修改数据库 Schema，请生成 Prisma 迁移脚本：

变更需求：
1. 在 users 表中添加字段：bio（文本，可选）、avatar_url（字符串，可选）
2. 在 posts 表中添加字段：view_count（整数，默认 0）、is_featured（布尔值，默认 false）
3. 在 posts 表中添加索引：view_count（降序）、is_featured
4. 创建新表：post_views（post_id、user_id、viewed_at）

要求：
- 使用 Prisma Migrate 格式
- 包含 up 和 down 迁移
- 添加字段时使用默认值，避免数据迁移问题
- 考虑回滚场景`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 生成的迁移脚本示例</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`// migrations/20240115_add_user_bio_and_post_stats/migration.sql

-- Up Migration
ALTER TABLE "users" 
ADD COLUMN "bio" TEXT,
ADD COLUMN "avatar_url" VARCHAR(255);

ALTER TABLE "posts" 
ADD COLUMN "view_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "is_featured" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "idx_posts_view_count" ON "posts"("view_count" DESC);
CREATE INDEX "idx_posts_is_featured" ON "posts"("is_featured");

CREATE TABLE "post_views" (
  "id" TEXT NOT NULL,
  "post_id" TEXT NOT NULL,
  "user_id" TEXT,
  "viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT "post_views_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "idx_post_views_post_id" ON "post_views"("post_id");
CREATE INDEX "idx_post_views_user_id" ON "post_views"("user_id");

-- Down Migration
DROP TABLE IF EXISTS "post_views";
DROP INDEX IF EXISTS "idx_posts_is_featured";
DROP INDEX IF EXISTS "idx_posts_view_count";
ALTER TABLE "posts" DROP COLUMN IF EXISTS "is_featured";
ALTER TABLE "posts" DROP COLUMN IF EXISTS "view_count";
ALTER TABLE "users" DROP COLUMN IF EXISTS "avatar_url";
ALTER TABLE "users" DROP COLUMN IF EXISTS "bio";`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">AI 验证迁移结果</h4>
                    <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">{`Prompt 模板：

迁移执行后，请验证以下内容：

迁移前数据：
- users 表：1000 条记录
- posts 表：5000 条记录

迁移后检查：
1. 所有 users 记录的 bio 和 avatar_url 字段是否为 NULL（正常）
2. 所有 posts 记录的 view_count 是否为 0（正常）
3. 所有 posts 记录的 is_featured 是否为 false（正常）
4. post_views 表是否创建成功
5. 索引是否创建成功

请提供验证 SQL 查询语句。`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Section 3: 数据模型设计基础 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Table className="h-6 w-6 text-primary" />
            数据模型设计基础
          </h2>
          <p className="text-muted-foreground mb-6">
            保留核心概念，为 AI 实践提供基础。使用 AI 可以快速生成符合最佳实践的数据模型。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">表结构设计</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>规范化</strong>：减少数据冗余，保证一致性</li>
                <li>• <strong>字段类型</strong>：选择合适的数据类型</li>
                <li>• <strong>命名规范</strong>：表名、字段名遵循约定</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">关系设计</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>一对一</strong>：用户和用户资料</li>
                <li>• <strong>一对多</strong>：用户和订单</li>
                <li>• <strong>多对多</strong>：用户和角色（通过中间表）</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">索引基础</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>主键索引</strong>：自动创建，唯一且非空</li>
                <li>• <strong>普通索引</strong>：加速查询</li>
                <li>• <strong>复合索引</strong>：多字段组合索引</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">AI 辅助设计示例</h3>
            <p className="text-sm text-muted-foreground mb-2">
              向 AI 描述业务需求，它可以生成完整的数据模型，包括表结构、关系、索引和约束。参考上面的"AI 辅助数据库设计"章节查看详细示例。
            </p>
          </div>
        </section>

        {/* Section 4: 数据迁移基础 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ArrowUpDown className="h-6 w-6 text-primary" />
            数据迁移基础
          </h2>
          <p className="text-muted-foreground mb-6">
            保留核心迁移流程，重点展示 AI 如何辅助迁移。使用 AI 可以快速生成迁移脚本并验证结果。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">迁移工具</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Prisma Migrate</strong>：自动生成迁移脚本</li>
                <li>• <strong>TypeORM Migrations</strong>：手动编写 Migration 类</li>
                <li>• <strong>Flyway/Liquibase</strong>：Java 生态迁移工具</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">迁移策略</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>添加字段</strong>：使用默认值或允许 NULL</li>
                <li>• <strong>删除字段</strong>：先标记为废弃，再删除</li>
                <li>• <strong>修改字段类型</strong>：可能需要数据转换</li>
                <li>• <strong>重命名表/字段</strong>：使用两步法</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">AI 辅助迁移</h3>
            <p className="text-sm text-muted-foreground mb-2">
              AI 可以生成迁移脚本、验证迁移结果、优化迁移性能。参考上面的"AI 辅助数据迁移"章节查看详细示例和 Prompt 模板。
            </p>
          </div>
        </section>

        {/* Section 5: 实战示例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            实战示例
          </h2>
          <p className="text-muted-foreground mb-6">
            通过实际代码示例，学习如何使用 AI 提升数据库开发效率。
          </p>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">AI 生成数据模型</h3>
              <p className="text-sm text-muted-foreground mb-4">
                完整的 Prisma Schema 生成示例（Prompt + 结果）：
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                <pre className="text-muted-foreground whitespace-pre-wrap">{`// 1. 向 AI 提供需求
Prompt: "设计一个电商系统的数据库，包含用户、商品、订单、订单项表..."

// 2. AI 生成的 Prisma Schema
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  orders    Order[]
  createdAt DateTime @default(now())
}

model Product {
  id          String      @id @default(cuid())
  name        String
  price       Decimal     @db.Decimal(10, 2)
  description String?
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
}

model Order {
  id         String     @id @default(cuid())
  userId     String
  user       User       @relation(fields: [userId], references: [id])
  items      OrderItem[]
  total      Decimal    @db.Decimal(10, 2)
  status     String     @default("pending")
  createdAt  DateTime   @default(now())
  
  @@index([userId])
}

model OrderItem {
  id        String   @id @default(cuid())
  orderId   String
  productId String
  order     Order    @relation(fields: [orderId], references: [id])
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int
  price     Decimal  @db.Decimal(10, 2)
  
  @@index([orderId])
  @@index([productId])
}`}</pre>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">AI 优化查询</h3>
              <p className="text-sm text-muted-foreground mb-4">
                慢查询分析和优化示例（Prompt + 优化前后对比）：
              </p>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">优化前（2.3 秒）</div>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`SELECT u.*, p.*, c.name
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
LEFT JOIN categories c ON p.category_id = c.id
WHERE u.created_at > '2024-01-01'
ORDER BY u.created_at DESC
LIMIT 20;`}</pre>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">AI 优化后（0.15 秒）</div>
                  <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{`-- AI 建议：添加索引并优化 JOIN
CREATE INDEX idx_users_created_at ON users(created_at DESC);

SELECT u.*, 
       (SELECT json_agg(p) FROM posts p WHERE p.author_id = u.id) as posts,
       c.name as category_name
FROM users u
LEFT JOIN categories c ON c.id = (
  SELECT category_id FROM posts 
  WHERE author_id = u.id 
  ORDER BY created_at DESC 
  LIMIT 1
)
WHERE u.created_at > '2024-01-01'
ORDER BY u.created_at DESC
LIMIT 20;`}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">NL2SQL 实现</h3>
              <p className="text-sm text-muted-foreground mb-4">
                自然语言转 SQL 完整示例：
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                <pre className="text-muted-foreground whitespace-pre-wrap">{`// NL2SQL 函数实现
async function nl2sql(question: string, schema: DatabaseSchema): Promise<string> {
  const prompt = \`根据数据库 Schema，将问题转换为 SQL：

Schema: \${JSON.stringify(schema)}
问题: \${question}

只返回 SQL，使用参数化查询。\`;

  const sql = await callLLM(prompt);
  return validateAndSanitizeSQL(sql);
}

// 使用示例
const sql = await nl2sql(
  "查询最近一周创建的所有文章及其作者信息",
  { tables: { users: [...], posts: [...] } }
);
// 返回: SELECT p.*, u.name as author_name 
//       FROM posts p 
//       JOIN users u ON p.author_id = u.id 
//       WHERE p.created_at > NOW() - INTERVAL '7 days'`}</pre>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">向量数据库集成</h3>
              <p className="text-sm text-muted-foreground mb-4">
                RAG 场景中的向量检索示例：
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 font-mono text-xs overflow-x-auto">
                <pre className="text-muted-foreground whitespace-pre-wrap">{`// RAG 完整流程
async function ragQuery(question: string) {
  // 1. 问题向量化
  const questionEmbedding = await getEmbedding(question);
  
  // 2. 向量检索（Pinecone）
  const results = await pineconeIndex.query({
    vector: questionEmbedding,
    topK: 5,
    includeMetadata: true
  });
  
  // 3. 构建上下文
  const context = results.matches
    .map(m => m.metadata?.text)
    .join('\\n\\n');
  
  // 4. LLM 生成答案
  const answer = await generateAnswer(question, context);
  
  return answer;
}

// 使用
const answer = await ragQuery("什么是 Prisma？");
// AI 基于检索到的文档生成准确答案`}</pre>
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
                了解三种数据库类型（关系型、非关系型、分布式）及其适用场景
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握使用 AI 辅助数据库设计的方法（生成 Schema、命名规范、数据类型选择）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                能够使用 AI 分析和优化慢查询，生成索引推荐和 SQL 优化方案
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                理解 NL2SQL 实现原理，能够构建自然语言查询系统
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">5</span>
                掌握向量数据库在 RAG 场景中的应用，能够集成向量检索功能
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">6</span>
                能够使用 AI 辅助数据库运维（监控告警、性能预测、故障诊断）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">7</span>
                掌握 AI 辅助数据迁移的方法（生成迁移脚本、验证迁移结果）
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
