import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TrendingUp, AlertTriangle, BarChart3, Zap } from "lucide-react"
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

export default function TransformerLimitsPage() {
  return (
    <CourseLayout
      title="架构篇"
      description="AI 大模型架构深度解析"
      chapters={chapters}
      currentChapter="Transformer 的强项与局限"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 3 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Transformer 的强项与局限
        </h1>
        <p className="text-lg text-muted-foreground">
          深入分析 Transformer 的核心优势（并行计算、长距离依赖、可扩展性、通用性）和局限性（计算复杂度、内存消耗、推理效率），理解 Scaling Law 对模型发展的影响。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: Transformer 的强项 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Transformer 的强项
          </h2>
          <p className="text-muted-foreground mb-6">
            Transformer的成功源于其独特的优势，这些优势让它成为了现代AI的基础架构。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">并行计算优势</h3>
              <p className="text-sm text-muted-foreground mb-3">
                相比RNN必须串行处理，Transformer可以并行处理所有位置：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>训练速度</strong>：比RNN快10-100倍</li>
                <li>• <strong>GPU友好</strong>：充分利用GPU的并行计算能力</li>
                <li>• <strong>可扩展性</strong>：可以轻松扩展到更大的batch size</li>
                <li>• <strong>实际影响</strong>：这使得训练GPT-3这样的大模型成为可能</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">长距离依赖</h3>
              <p className="text-sm text-muted-foreground mb-3">
                全局注意力机制，任意两个位置可以直接交互：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>一步到位</strong>：无需多层传播，直接建立长距离连接</li>
                <li>• <strong>理解能力</strong>：能够理解文档级别的语义关系</li>
                <li>• <strong>应用场景</strong>：长文档理解、代码分析、对话系统</li>
                <li>• <strong>对比</strong>：RNN需要O(n)步，Transformer只需O(1)步</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">可扩展性（Scaling Law）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Transformer遵循Scaling Law，模型越大性能越好：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>参数规模</strong>：从1亿（BERT）到1万亿（GPT-4）参数</li>
                <li>• <strong>性能提升</strong>：参数增加10倍，性能提升约2倍</li>
                <li>• <strong>数据需求</strong>：需要与参数规模匹配的训练数据</li>
                <li>• <strong>成本</strong>：训练成本随参数规模指数增长</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">通用性</h3>
              <p className="text-sm text-muted-foreground mb-3">
                统一架构处理多种模态和任务：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>文本</strong>：GPT、BERT、T5等</li>
                <li>• <strong>图像</strong>：ViT、DETR、CLIP</li>
                <li>• <strong>音频</strong>：Whisper、AudioLM</li>
                <li>• <strong>多模态</strong>：GPT-4V、Gemini统一处理</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Scaling Law 深度解析 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Scaling Law：参数规模与性能的关系
          </h2>
          <p className="text-muted-foreground mb-6">
            Scaling Law揭示了模型规模、数据量和计算资源与性能之间的关系，是理解大模型发展的关键。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">核心规律</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">参数规模</h4>
                <p className="text-sm text-muted-foreground">
                  模型参数量增加，性能（通常）提升。但存在收益递减，需要与数据量匹配。
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">数据规模</h4>
                <p className="text-sm text-muted-foreground">
                  训练数据量需要与模型规模匹配。过小的数据集无法充分利用大模型的容量。
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">计算资源</h4>
                <p className="text-sm text-muted-foreground">
                  训练计算量（FLOPs）随模型规模增长。GPT-3训练需要约3.14×10²³ FLOPs。
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">实际数据</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">GPT-1</span>
                <span>1.17亿参数</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">GPT-2</span>
                <span>15亿参数</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">GPT-3</span>
                <span>1750亿参数</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">GPT-4</span>
                <span>约1万亿参数（推测）</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              注：参数规模的增长带来了性能的显著提升，但也带来了训练成本和推理成本的急剧增加
            </p>
          </div>
        </section>

        {/* Section 3: Transformer 的局限性 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Transformer 的局限性
          </h2>
          <p className="text-muted-foreground mb-6">
            尽管Transformer非常成功，但它也存在一些根本性的局限性，这些局限性推动了新架构的研究。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">计算复杂度 O(n²)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Attention机制需要计算所有位置对的关系，导致二次复杂度：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>来源</strong>：QK^T矩阵计算需要O(n²)的时间和空间</li>
                <li>• <strong>影响</strong>：序列长度增加2倍，计算量增加4倍</li>
                <li>• <strong>实际限制</strong>：难以处理超长序列（如100万tokens）</li>
                <li>• <strong>解决方案</strong>：稀疏Attention、线性Attention、分块处理</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">内存消耗</h3>
              <p className="text-sm text-muted-foreground mb-3">
                注意力矩阵需要存储所有位置对的关系：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>内存需求</strong>：序列长度n，注意力矩阵大小为n×n</li>
                <li>• <strong>实际例子</strong>：处理32K tokens需要约4GB内存（仅注意力矩阵）</li>
                <li>• <strong>限制</strong>：限制了可处理的序列长度</li>
                <li>• <strong>优化</strong>：Flash Attention、梯度检查点等技术</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">推理效率</h3>
              <p className="text-sm text-muted-foreground mb-3">
                自回归生成必须逐个生成token，无法并行：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>串行生成</strong>：每个token依赖前面的所有token</li>
                <li>• <strong>延迟问题</strong>：生成长文本需要多次前向传播</li>
                <li>• <strong>KV Cache</strong>：缓存已计算的KV，但仍需逐个生成</li>
                <li>• <strong>对比</strong>：训练可以并行，推理必须串行</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">位置编码局限</h3>
              <p className="text-sm text-muted-foreground mb-3">
                固定位置编码难以处理超长序列：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>固定编码</strong>：训练时看到的序列长度有限</li>
                <li>• <strong>外推问题</strong>：难以处理比训练时更长的序列</li>
                <li>• <strong>相对位置</strong>：相对位置编码有所改善，但仍有限制</li>
                <li>• <strong>解决方案</strong>：RoPE（旋转位置编码）、ALiBi等新技术</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">训练数据需求</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>数据规模</strong>：大模型需要海量训练数据（GPT-3用了570GB文本）</li>
              <li>• <strong>数据质量</strong>：数据质量同样重要，需要高质量、多样化的数据</li>
              <li>• <strong>成本</strong>：数据收集、清洗、标注成本高昂</li>
              <li>• <strong>瓶颈</strong>：高质量数据的获取可能成为模型发展的瓶颈</li>
            </ul>
          </div>
        </section>

        {/* Section 4: 实际影响分析 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            实际影响分析
          </h2>
          <p className="text-muted-foreground mb-6">
            这些特性对实际应用的影响和权衡。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">优势带来的机会</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>大规模预训练</strong>：可以训练超大规模模型</li>
                <li>• <strong>通用能力</strong>：一个模型处理多种任务</li>
                <li>• <strong>快速迭代</strong>：并行训练加速开发</li>
                <li>• <strong>统一架构</strong>：简化了模型设计和部署</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">局限带来的挑战</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>成本问题</strong>：训练和推理成本高昂</li>
                <li>• <strong>长序列限制</strong>：难以处理超长文档</li>
                <li>• <strong>实时性</strong>：推理延迟影响实时应用</li>
                <li>• <strong>资源需求</strong>：需要大量GPU和内存</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">权衡思考</h3>
            <p className="text-sm text-muted-foreground mb-3">
              在实际应用中，需要根据场景权衡Transformer的优势和局限：
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>短文本任务</strong>：Transformer优势明显，O(n²)复杂度可接受</li>
              <li>• <strong>长文档任务</strong>：需要考虑线性复杂度架构（如Mamba）</li>
              <li>• <strong>实时应用</strong>：需要优化推理效率或使用更快的架构</li>
              <li>• <strong>资源受限</strong>：可能需要使用更小的模型或混合架构</li>
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
                理解Transformer的核心优势（并行计算、长距离依赖、可扩展性、通用性）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握Scaling Law的核心规律，理解参数规模、数据量和性能的关系
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                深入理解Transformer的局限性（O(n²)复杂度、内存消耗、推理效率、位置编码）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                能够评估Transformer在不同场景下的适用性，做出合理的架构选择
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/architecture/transformer-core" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：Transformer 的核心机制
          </Link>
        </Button>
        <Button asChild>
          <Link href="/architecture/mamba" className="flex items-center gap-2">
            下一章：Mamba / State Space Models
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
