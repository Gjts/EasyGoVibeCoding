import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react"
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

export default function EmergingPage() {
  return (
    <CourseLayout
      title="架构篇"
      description="AI 大模型架构深度解析"
      chapters={chapters}
      currentChapter="其他新兴架构"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 7 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          其他新兴架构
        </h1>
        <p className="text-lg text-muted-foreground">
          探索RWKV、RetNet、Griffin等新兴架构，了解它们如何尝试解决Transformer的局限性，推动AI架构的持续创新。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: RWKV */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            RWKV：线性注意力的RNN
          </h2>
          <p className="text-muted-foreground mb-6">
            RWKV（Receptance Weighted Key Value）结合了RNN和Transformer的优点，实现了线性复杂度的注意力机制。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">核心创新</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>线性注意力</strong>：通过数学变换将注意力计算复杂度从O(n²)降到O(n)</li>
                <li>• <strong>RNN形式</strong>：可以表示为RNN，支持高效的自回归生成</li>
                <li>• <strong>状态机制</strong>：维护内部状态，支持长序列建模</li>
                <li>• <strong>并行训练</strong>：训练时可以并行，推理时是RNN形式</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">优势</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>线性复杂度</strong>：O(n)复杂度，适合长序列</li>
                <li>• <strong>高效推理</strong>：推理速度快，内存占用低</li>
                <li>• <strong>长序列能力</strong>：可以处理超长序列</li>
                <li>• <strong>开源生态</strong>：完全开源，社区活跃</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">应用场景</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>长文本生成</strong>：小说、剧本等长文本生成</li>
                <li>• <strong>代码生成</strong>：长代码文件的生成和理解</li>
                <li>• <strong>对话系统</strong>：需要维护长对话历史的系统</li>
                <li>• <strong>资源受限环境</strong>：边缘设备、移动端应用</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: RetNet */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            RetNet：保留机制的突破
          </h2>
          <p className="text-muted-foreground mb-6">
            RetNet（Retention Network）通过保留机制实现了并行训练和高效推理的统一。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">核心创新</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>保留机制</strong>：通过数学设计实现并行训练和序列推理的统一</li>
                <li>• <strong>并行训练</strong>：训练时可以并行计算，充分利用GPU</li>
                <li>• <strong>高效推理</strong>：推理时是递归形式，内存和计算效率高</li>
                <li>• <strong>线性复杂度</strong>：O(n)复杂度，适合长序列</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">优势</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>训练效率</strong>：并行训练，训练速度快</li>
                <li>• <strong>推理效率</strong>：递归推理，推理速度快</li>
                <li>• <strong>性能</strong>：在多个任务上性能接近Transformer</li>
                <li>• <strong>可扩展性</strong>：可以扩展到大规模模型</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">技术特点</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>数学优雅</strong>：通过数学变换实现并行和递归的统一</li>
                <li>• <strong>硬件友好</strong>：对硬件友好，易于优化</li>
                <li>• <strong>向后兼容</strong>：可以替代Transformer，保持接口兼容</li>
                <li>• <strong>研究活跃</strong>：微软等机构持续研究</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Griffin */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Griffin：混合架构的探索
          </h2>
          <p className="text-muted-foreground mb-6">
            Griffin结合了局部注意力和全局注意力，试图在效率和性能之间找到平衡。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">核心创新</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>混合注意力</strong>：结合局部注意力和全局注意力</li>
                <li>• <strong>局部窗口</strong>：局部窗口注意力处理局部依赖</li>
                <li>• <strong>全局机制</strong>：全局机制处理长距离依赖</li>
                <li>• <strong>灵活设计</strong>：可以根据任务调整局部和全局的比例</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">优势</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>效率提升</strong>：局部注意力降低计算复杂度</li>
                <li>• <strong>性能保持</strong>：全局机制保持长距离依赖能力</li>
                <li>• <strong>灵活性</strong>：可以根据任务需求调整架构</li>
                <li>• <strong>实用性</strong>：在多个任务上表现良好</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">设计思路</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Griffin的设计思路是：大多数依赖是局部的，只有少数需要全局注意力。通过混合架构，在保持性能的同时提升效率。
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: 架构对比 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            新兴架构的共同特点
          </h2>
          <p className="text-muted-foreground mb-6">
            这些新兴架构都试图解决Transformer的局限性，具有一些共同特点。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">共同目标</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>降低复杂度</strong>：从O(n²)降到O(n)或接近O(n)</li>
              <li>• <strong>提升效率</strong>：提升训练和推理效率</li>
              <li>• <strong>保持性能</strong>：在提升效率的同时保持性能</li>
              <li>• <strong>长序列能力</strong>：增强长序列处理能力</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">技术路径</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">线性化</h4>
                <p className="text-xs text-muted-foreground">通过数学变换实现线性复杂度</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">混合架构</h4>
                <p className="text-xs text-muted-foreground">结合不同机制的优点</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">状态机制</h4>
                <p className="text-xs text-muted-foreground">通过状态维护长距离依赖</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: 发展现状与前景 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            发展现状与前景
          </h2>
          <p className="text-muted-foreground mb-6">
            了解这些新兴架构的当前状态和未来发展。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">当前状态</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>研究阶段</strong>：大多数架构仍在研究阶段</li>
                <li>• <strong>性能验证</strong>：在小规模任务上验证了有效性</li>
                <li>• <strong>大规模验证</strong>：大规模验证仍在进行中</li>
                <li>• <strong>生态建设</strong>：工具和生态仍在建设中</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">挑战</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>性能差距</strong>：在某些任务上性能仍不如Transformer</li>
                <li>• <strong>训练难度</strong>：训练可能更复杂或不稳定</li>
                <li>• <strong>生态不成熟</strong>：工具和预训练模型较少</li>
                <li>• <strong>理论理解</strong>：理论理解仍在深入中</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">未来前景</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>持续优化</strong>：架构将持续优化和改进</li>
                <li>• <strong>应用扩展</strong>：应用场景将不断扩展</li>
                <li>• <strong>生态成熟</strong>：工具和生态将逐步成熟</li>
                <li>• <strong>可能突破</strong>：可能在特定场景下超越Transformer</li>
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
                了解RWKV、RetNet、Griffin等新兴架构的核心创新和特点
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解这些架构如何尝试解决Transformer的局限性
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握不同架构的适用场景和优势
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                能够跟踪架构领域的最新发展，理解架构演进的趋势
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/architecture/rag" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：RAG 检索增强生成
          </Link>
        </Button>
        <Button asChild>
          <Link href="/architecture/comparison" className="flex items-center gap-2">
            下一章：架构对比与选型决策
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
