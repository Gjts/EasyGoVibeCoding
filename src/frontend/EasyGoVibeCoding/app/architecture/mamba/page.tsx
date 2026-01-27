import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Zap, TrendingUp, AlertTriangle, Briefcase, Zap as ZapIcon } from "lucide-react"
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

export default function MambaPage() {
  return (
    <CourseLayout
      title="架构篇"
      description="AI 大模型架构深度解析"
      chapters={chapters}
      currentChapter="Mamba / State Space Models"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 4 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Mamba / State Space Models
        </h1>
        <p className="text-lg text-muted-foreground">
          状态空间模型（SSM）通过线性复杂度解决了Transformer的O(n²)问题，Mamba是SSM的最新突破，实现了长序列的高效处理。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: Mamba 是什么 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Mamba：状态空间模型的突破
          </h2>
          <p className="text-muted-foreground mb-6">
            Mamba是2023年提出的状态空间模型，通过选择性状态空间实现了线性复杂度的序列建模。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">状态空间模型（SSM）基础</h3>
            <p className="text-sm text-muted-foreground mb-4">
              状态空间模型将序列建模问题转化为状态空间中的动态系统：
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">状态更新</strong>：每个时间步更新内部状态
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">线性复杂度</strong>：状态更新是线性的，复杂度O(n)
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">递归结构</strong>：当前状态依赖前一个状态
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">并行化</strong>：通过并行扫描算法实现并行计算
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">Mamba 的核心创新</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>选择性状态空间</strong>：根据输入动态选择重要信息，而非固定处理</li>
              <li>• <strong>硬件感知算法</strong>：针对GPU优化的并行扫描算法</li>
              <li>• <strong>线性复杂度</strong>：O(n) vs Transformer的O(n²)</li>
              <li>• <strong>长序列能力</strong>：可以处理百万级tokens的序列</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Mamba 的优势 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Mamba 的优势
          </h2>
          <p className="text-muted-foreground mb-6">
            Mamba通过线性复杂度实现了Transformer难以达到的长序列处理能力。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">长序列处理</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>序列长度</strong>：可以处理100万+ tokens的序列</li>
                <li>• <strong>内存效率</strong>：内存使用与序列长度线性相关</li>
                <li>• <strong>实际应用</strong>：长文档分析、代码库理解、基因组分析</li>
                <li>• <strong>对比</strong>：Transformer处理32K tokens就需要大量内存</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">推理速度快</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>线性复杂度</strong>：推理时间与序列长度线性增长</li>
                <li>• <strong>实际速度</strong>：处理长序列时比Transformer快5-10倍</li>
                <li>• <strong>实时应用</strong>：适合需要快速响应的场景</li>
                <li>• <strong>成本效益</strong>：推理成本显著降低</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">内存效率</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>状态压缩</strong>：只维护紧凑的内部状态</li>
                <li>• <strong>内存占用</strong>：内存使用远低于Transformer</li>
                <li>• <strong>资源受限</strong>：适合资源受限的环境</li>
                <li>• <strong>边缘设备</strong>：可以在边缘设备上运行</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">选择性机制</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>动态选择</strong>：根据输入内容选择重要信息</li>
                <li>• <strong>表达能力</strong>：选择性机制增强了模型的表达能力</li>
                <li>• <strong>灵活性</strong>：比固定处理更灵活</li>
                <li>• <strong>性能</strong>：在长序列任务上性能接近Transformer</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Mamba 的局限性 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Mamba 的局限性
          </h2>
          <p className="text-muted-foreground mb-6">
            尽管Mamba在长序列处理上有优势，但它也存在一些局限性。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">表达能力</h3>
              <p className="text-sm text-muted-foreground mb-3">
                在某些任务上，Mamba的表达能力可能不如Transformer：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>复杂推理</strong>：需要复杂推理的任务可能不如Transformer</li>
                <li>• <strong>短序列</strong>：在短序列任务上，Transformer可能更优</li>
                <li>• <strong>多模态</strong>：多模态能力不如Transformer成熟</li>
                <li>• <strong>预训练数据</strong>：预训练数据规模相对较小</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">训练难度</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>状态空间参数</strong>：状态空间参数需要精心设计</li>
                <li>• <strong>稳定性</strong>：训练过程可能不如Transformer稳定</li>
                <li>• <strong>超参数</strong>：需要调整更多超参数</li>
                <li>• <strong>经验积累</strong>：相比Transformer，实践经验较少</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">生态不成熟</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>工具支持</strong>：工具和框架支持不如Transformer完善</li>
                <li>• <strong>预训练模型</strong>：可用的预训练模型较少</li>
                <li>• <strong>社区资源</strong>：社区资源和文档相对较少</li>
                <li>• <strong>最佳实践</strong>：最佳实践仍在探索中</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 应用场景与案例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            应用场景与案例
          </h2>
          <p className="text-muted-foreground mb-6">
            Mamba特别适合需要处理长序列的场景。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">长文档分析</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 法律文档分析</li>
                <li>• 学术论文理解</li>
                <li>• 长篇小说分析</li>
                <li>• 技术文档处理</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">实时应用</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 实时对话系统</li>
                <li>• 流式数据处理</li>
                <li>• 实时翻译</li>
                <li>• 在线代码补全</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">资源受限环境</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 边缘设备部署</li>
                <li>• 移动端应用</li>
                <li>• 嵌入式系统</li>
                <li>• 成本敏感场景</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">实际案例</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">代码库分析</h4>
                <p className="text-sm text-muted-foreground">
                  Mamba可以一次性处理整个代码库（百万行代码），理解代码结构和依赖关系，而Transformer受限于上下文窗口。
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">基因组分析</h4>
                <p className="text-sm text-muted-foreground">
                  基因组序列通常很长，Mamba的线性复杂度使其能够高效处理完整的基因组序列。
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">长对话系统</h4>
                <p className="text-sm text-muted-foreground">
                  需要维护长对话历史的系统，Mamba可以高效处理整个对话上下文，而Transformer可能需要分块处理。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Mamba vs Transformer */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Mamba vs Transformer：何时选择？
          </h2>
          <p className="text-muted-foreground mb-6">
            理解Mamba和Transformer的适用场景，做出正确的架构选择。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">选择Mamba的场景</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>超长序列</strong>：序列长度超过100K tokens</li>
              <li>• <strong>实时性要求</strong>：需要快速响应的应用</li>
              <li>• <strong>资源受限</strong>：内存或计算资源有限</li>
              <li>• <strong>成本敏感</strong>：需要降低推理成本</li>
              <li>• <strong>流式处理</strong>：需要处理流式数据</li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">选择Transformer的场景</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>短到中等序列</strong>：序列长度在32K tokens以内</li>
              <li>• <strong>复杂推理</strong>：需要复杂推理能力的任务</li>
              <li>• <strong>多模态</strong>：需要处理多种模态</li>
              <li>• <strong>生态成熟</strong>：需要丰富的预训练模型和工具</li>
              <li>• <strong>通用能力</strong>：需要强大的通用能力</li>
            </ul>
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
                理解状态空间模型（SSM）的基本原理和Mamba的核心创新
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握Mamba如何实现线性复杂度（O(n)），以及相比Transformer的优势
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                了解Mamba的适用场景（长文档分析、实时应用、资源受限环境）和局限性
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                能够评估Mamba vs Transformer的选择，根据场景做出正确的架构决策
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/architecture/transformer-limits" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：Transformer 的强项与局限
          </Link>
        </Button>
        <Button asChild>
          <Link href="/architecture/moe" className="flex items-center gap-2">
            下一章：Mixture of Experts (MoE)
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
