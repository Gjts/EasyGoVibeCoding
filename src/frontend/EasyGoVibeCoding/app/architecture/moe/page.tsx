import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, GitBranch, TrendingUp, AlertTriangle, Briefcase, Zap } from "lucide-react"
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

export default function MoEPage() {
  return (
    <CourseLayout
      title="架构篇"
      description="AI 大模型架构深度解析"
      chapters={chapters}
      currentChapter="Mixture of Experts (MoE)"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 5 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Mixture of Experts (MoE)
        </h1>
        <p className="text-lg text-muted-foreground">
          专家混合模型通过路由机制和稀疏激活，实现了超大规模模型的训练和推理，GPT-4、Mixtral等模型都采用了MoE架构。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: MoE 架构原理 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            MoE 架构原理
          </h2>
          <p className="text-muted-foreground mb-6">
            MoE通过将模型分解为多个专家网络，每个输入只激活部分专家，实现了模型规模的扩展。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">核心概念</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                  <div>
                    <strong className="text-foreground">专家网络（Experts）</strong>：多个独立的神经网络，每个专家专注于不同的模式
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                  <div>
                    <strong className="text-foreground">路由器（Router）</strong>：决定每个输入应该激活哪些专家
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                  <div>
                    <strong className="text-foreground">稀疏激活</strong>：每次只激活部分专家（如2-4个），而非全部
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                  <div>
                    <strong className="text-foreground">加权组合</strong>：将激活专家的输出加权组合得到最终结果
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">工作流程</h3>
              <div className="space-y-2 text-sm text-muted-foreground font-mono">
                <div>1. 输入 → Router</div>
                <div>2. Router 计算每个专家的权重</div>
                <div>3. 选择Top-K专家（如Top-2）</div>
                <div>4. 激活选中的专家</div>
                <div>5. 加权组合专家输出</div>
                <div>6. 输出结果</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: MoE 的优势 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            MoE 的优势
          </h2>
          <p className="text-muted-foreground mb-6">
            MoE让训练超大规模模型成为可能，同时保持了推理效率。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">超大规模模型</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>参数规模</strong>：可以训练万亿级参数的模型</li>
                <li>• <strong>模型容量</strong>：总参数量大，但激活参数少</li>
                <li>• <strong>实际案例</strong>：GPT-4（推测1.76T参数）、Mixtral 8x7B</li>
                <li>• <strong>能力提升</strong>：更大的模型容量带来更强的能力</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">训练效率</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>稀疏激活</strong>：每次只训练部分专家</li>
                <li>• <strong>计算节省</strong>：训练计算量远小于密集模型</li>
                <li>• <strong>并行训练</strong>：不同专家可以并行训练</li>
                <li>• <strong>成本控制</strong>：训练成本相对可控</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">专业化</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>专家分工</strong>：不同专家学习不同的模式</li>
                <li>• <strong>领域专精</strong>：专家可以专注于特定领域</li>
                <li>• <strong>知识分离</strong>：不同知识存储在不同专家中</li>
                <li>• <strong>可解释性</strong>：可以分析哪些专家被激活</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">推理效率</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>激活参数少</strong>：推理时只使用部分参数</li>
                <li>• <strong>速度提升</strong>：推理速度接近小模型</li>
                <li>• <strong>成本降低</strong>：推理成本远低于密集模型</li>
                <li>• <strong>实际例子</strong>：Mixtral 8x7B推理速度接近7B模型</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: MoE 的挑战 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            MoE 的挑战
          </h2>
          <p className="text-muted-foreground mb-6">
            MoE虽然强大，但也带来了新的挑战和复杂性。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">路由复杂性</h3>
              <p className="text-sm text-muted-foreground mb-3">
                路由器需要学习如何正确分配输入到专家：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>路由学习</strong>：路由器需要与专家网络共同训练</li>
                <li>• <strong>负载均衡</strong>：需要确保所有专家都被充分利用</li>
                <li>• <strong>专家崩溃</strong>：某些专家可能不被使用（专家崩溃问题）</li>
                <li>• <strong>训练不稳定</strong>：路由训练可能不稳定</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">负载均衡</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>均匀分配</strong>：需要确保输入均匀分配到各专家</li>
                <li>• <strong>负载均衡损失</strong>：通过损失函数鼓励负载均衡</li>
                <li>• <strong>实际挑战</strong>：某些输入可能总是路由到相同专家</li>
                <li>• <strong>解决方案</strong>：负载均衡正则化、辅助损失函数</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">通信成本</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>分布式训练</strong>：专家可能分布在不同的GPU上</li>
                <li>• <strong>通信开销</strong>：需要在GPU之间传输数据</li>
                <li>• <strong>带宽限制</strong>：通信带宽可能成为瓶颈</li>
                <li>• <strong>优化</strong>：需要优化通信模式和数据传输</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 实际应用案例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            实际应用案例
          </h2>
          <p className="text-muted-foreground mb-6">
            多个知名模型采用了MoE架构，证明了其有效性。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">GPT-4（推测）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                虽然OpenAI未公开详细架构，但推测GPT-4使用了MoE：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>参数规模</strong>：推测约1.76万亿参数</li>
                <li>• <strong>专家数量</strong>：可能使用16个专家</li>
                <li>• <strong>激活策略</strong>：每次激活2-4个专家</li>
                <li>• <strong>效果</strong>：强大的能力，推理成本可控</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Mixtral 8x7B</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Mistral AI的开源MoE模型，展示了MoE的实际效果：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>架构</strong>：8个专家，每个7B参数</li>
                <li>• <strong>激活</strong>：每次激活2个专家（Top-2）</li>
                <li>• <strong>总参数</strong>：47B参数，但激活参数约13B</li>
                <li>• <strong>性能</strong>：性能接近70B密集模型，推理速度接近7B模型</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Switch Transformer</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Google的MoE模型，展示了MoE的扩展性：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>规模</strong>：从1.6T到1.6T参数</li>
                <li>• <strong>创新</strong>：简化路由机制，使用Top-1路由</li>
                <li>• <strong>效果</strong>：证明了MoE的可扩展性</li>
                <li>• <strong>影响</strong>：启发了后续MoE模型的发展</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">MoE 的优势总结</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>规模扩展</strong>：可以训练万亿级参数的模型</li>
              <li>• <strong>成本控制</strong>：训练和推理成本相对可控</li>
              <li>• <strong>性能提升</strong>：更大的模型容量带来更强的能力</li>
              <li>• <strong>实用价值</strong>：在保持推理效率的同时提升模型能力</li>
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
                理解MoE的架构原理（专家网络、路由器、稀疏激活、加权组合）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握稀疏激活如何提升效率，理解MoE在超大规模模型中的应用
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                了解MoE的挑战（路由复杂性、负载均衡、通信成本）和解决方案
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                通过GPT-4、Mixtral等实际案例理解MoE的实际效果和应用价值
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/architecture/mamba" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：Mamba / State Space Models
          </Link>
        </Button>
        <Button asChild>
          <Link href="/architecture/rag" className="flex items-center gap-2">
            下一章：RAG 检索增强生成
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
