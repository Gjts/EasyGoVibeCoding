import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Database, TrendingUp, AlertTriangle, Briefcase, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const chapters = [
  { title: "架构篇概述", href: "/architecture" },
  { title: "Transformer 是什么？", href: "/architecture/transformer" },
  { title: "Transformer 的核心机制", href: "/architecture/transformer-core" },
  { title: "Transformer 的强项与局限", href: "/architecture/transformer-limits" },
  { title: "Mamba / State Space Models", href: "/architecture/mamba" },
  { title: "Mixture of Experts (MoE)", href: "/architecture/moe" },
  { title: "RAG 检索增强生成", href: "/architecture/rag" },
  { title: "其他新兴架构", href: "/architecture/emerging" },
  { title: "架构对比与选型决策", href: "/architecture/comparison" },
  { title: "未来趋势与展望", href: "/architecture/future" },
]

export default function RAGPage() {
  return (
    <CourseLayout
      title="架构篇"
      description="AI 大模型架构深度解析"
      chapters={chapters}
      currentChapter="RAG 检索增强生成"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 6 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          RAG 检索增强生成
        </h1>
        <p className="text-lg text-muted-foreground">
          检索增强生成（RAG）通过外部知识库和上下文注入，解决了大模型的知识更新、可解释性和成本问题，是企业应用的主流架构。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: RAG 工作原理 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            RAG 工作原理
          </h2>
          <p className="text-muted-foreground mb-6">
            RAG通过检索外部知识库，将相关信息注入到生成过程中，实现了知识增强的生成。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">完整工作流程</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">查询理解</strong>：理解用户查询的意图和需求
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">向量化</strong>：将查询转换为向量表示（Embedding）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">检索</strong>：在向量数据库中检索相似文档
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">上下文注入</strong>：将检索到的文档作为上下文注入到Prompt中
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">5</span>
                <div>
                  <strong className="text-foreground">生成</strong>：基于增强的上下文生成回答
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">核心组件</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>向量数据库</strong>：存储文档的向量表示（如Pinecone、Weaviate、Milvus）</li>
              <li>• <strong>嵌入模型</strong>：将文本转换为向量（如OpenAI Embeddings、BGE）</li>
              <li>• <strong>检索器</strong>：执行相似度搜索（向量检索、关键词检索、混合检索）</li>
              <li>• <strong>生成模型</strong>：基于检索结果生成回答（如GPT-4、Claude）</li>
            </ul>
          </div>
        </section>

        {/* Section 2: RAG 的优势 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            RAG 的优势
          </h2>
          <p className="text-muted-foreground mb-6">
            RAG解决了大模型的关键问题，使其更适合企业应用。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">知识更新</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>实时更新</strong>：可以随时更新知识库，无需重新训练模型</li>
                <li>• <strong>领域知识</strong>：可以注入特定领域的专业知识</li>
                <li>• <strong>时效性</strong>：可以访问最新的信息</li>
                <li>• <strong>灵活性</strong>：不同查询可以使用不同的知识库</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">可解释性</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>来源追溯</strong>：可以追溯到答案的来源文档</li>
                <li>• <strong>透明度</strong>：用户可以查看检索到的文档</li>
                <li>• <strong>可信度</strong>：可以评估信息来源的可信度</li>
                <li>• <strong>审计</strong>：便于审计和合规</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">成本效益</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>无需微调</strong>：不需要针对每个领域微调模型</li>
                <li>• <strong>知识库复用</strong>：同一个知识库可以服务多个应用</li>
                <li>• <strong>成本控制</strong>：相比微调，成本更低</li>
                <li>• <strong>快速部署</strong>：可以快速部署新应用</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">减少幻觉</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>事实基础</strong>：基于检索到的文档生成，减少编造</li>
                <li>• <strong>准确性</strong>：提高答案的准确性</li>
                <li>• <strong>可靠性</strong>：更适合需要准确信息的场景</li>
                <li>• <strong>质量控制</strong>：可以通过知识库质量控制答案质量</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: RAG 的挑战 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            RAG 的挑战
          </h2>
          <p className="text-muted-foreground mb-6">
            RAG虽然强大，但也面临一些挑战需要解决。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">检索质量依赖</h3>
              <p className="text-sm text-muted-foreground mb-3">
                RAG的效果高度依赖检索质量：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>检索准确性</strong>：检索不到相关文档会导致错误答案</li>
                <li>• <strong>检索相关性</strong>：检索到不相关文档会影响生成质量</li>
                <li>• <strong>文档质量</strong>：知识库的质量直接影响RAG效果</li>
                <li>• <strong>优化方向</strong>：改进检索算法、优化文档分块、使用混合检索</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">延迟问题</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>检索延迟</strong>：向量检索需要时间</li>
                <li>• <strong>生成延迟</strong>：生成模型需要处理更长的上下文</li>
                <li>• <strong>总体延迟</strong>：RAG的总体延迟高于直接生成</li>
                <li>• <strong>优化</strong>：缓存、异步检索、优化检索算法</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">上下文限制</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>上下文窗口</strong>：模型有上下文长度限制</li>
                <li>• <strong>文档选择</strong>：需要从大量检索结果中选择最相关的</li>
                <li>• <strong>信息压缩</strong>：可能需要压缩或摘要检索到的文档</li>
                <li>• <strong>解决方案</strong>：重排序、文档摘要、分层检索</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: RAG 最佳实践 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            RAG 最佳实践
          </h2>
          <p className="text-muted-foreground mb-6">
            构建高质量RAG系统的关键实践。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">向量数据库选择</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">Pinecone</h4>
                  <p className="text-xs text-muted-foreground">托管服务，易于使用，适合快速原型</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">Weaviate</h4>
                  <p className="text-xs text-muted-foreground">开源，功能丰富，支持混合检索</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">Milvus</h4>
                  <p className="text-xs text-muted-foreground">高性能，适合大规模部署</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">Chroma</h4>
                  <p className="text-xs text-muted-foreground">轻量级，易于集成</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">检索策略</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>向量检索</strong>：基于语义相似度，适合语义查询</li>
                <li>• <strong>关键词检索</strong>：基于关键词匹配，适合精确匹配</li>
                <li>• <strong>混合检索</strong>：结合向量检索和关键词检索，效果更好</li>
                <li>• <strong>重排序</strong>：使用重排序模型优化检索结果</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">文档处理</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>分块策略</strong>：合理分块，保持语义完整性</li>
                <li>• <strong>元数据</strong>：添加元数据（来源、时间、类型等）</li>
                <li>• <strong>预处理</strong>：清理、标准化、去重</li>
                <li>• <strong>更新机制</strong>：建立文档更新和版本管理机制</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">Prompt 工程</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>上下文组织</strong>：合理组织检索到的文档</li>
                <li>• <strong>指令清晰</strong>：明确指示模型如何使用检索到的信息</li>
                <li>• <strong>引用要求</strong>：要求模型引用来源</li>
                <li>• <strong>质量控制</strong>：添加质量控制指令（如"如果信息不足，请说明"）</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: RAG vs 微调 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            RAG vs 微调：如何选择？
          </h2>
          <p className="text-muted-foreground mb-6">
            理解RAG和微调的适用场景，做出正确的选择。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">选择 RAG 的场景</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>知识更新频繁</strong>：需要频繁更新知识</li>
                <li>• <strong>多领域应用</strong>：需要处理多个领域</li>
                <li>• <strong>可解释性要求</strong>：需要追溯答案来源</li>
                <li>• <strong>快速部署</strong>：需要快速部署新应用</li>
                <li>• <strong>成本控制</strong>：需要控制成本</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">选择微调的场景</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>任务特定</strong>：需要学习特定的任务模式</li>
                <li>• <strong>风格适应</strong>：需要适应特定的输出风格</li>
                <li>• <strong>性能优化</strong>：需要在特定任务上优化性能</li>
                <li>• <strong>知识固化</strong>：知识相对稳定，不需要频繁更新</li>
                <li>• <strong>延迟敏感</strong>：对延迟要求极高</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">混合方案</h3>
            <p className="text-sm text-muted-foreground">
              实际应用中，RAG和微调可以结合使用：使用微调优化基础能力，使用RAG注入领域知识。
            </p>
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
                理解RAG的完整工作流程（检索→增强→生成）和核心组件
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握RAG的优势（知识更新、可解释性、成本效益）和挑战（检索质量、延迟、上下文限制）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                了解RAG的最佳实践（向量数据库选择、检索策略、文档处理、Prompt工程）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                能够评估RAG vs 微调的选择，根据场景做出正确的架构决策
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/architecture/moe" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：Mixture of Experts (MoE)
          </Link>
        </Button>
        <Button asChild>
          <Link href="/architecture/emerging" className="flex items-center gap-2">
            下一章：其他新兴架构
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
