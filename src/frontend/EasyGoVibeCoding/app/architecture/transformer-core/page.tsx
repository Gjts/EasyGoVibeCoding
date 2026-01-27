import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Layers, Network, Zap, Zap as ZapIcon } from "lucide-react"
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

export default function TransformerCorePage() {
  return (
    <CourseLayout
      title="架构篇"
      description="AI 大模型架构深度解析"
      chapters={chapters}
      currentChapter="Transformer 的核心机制"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 2 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Transformer 的核心机制
        </h1>
        <p className="text-lg text-muted-foreground">
          深入理解 Attention 机制、Encoder-Decoder 架构、前馈网络与残差连接，掌握 Transformer 的工作原理。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: Attention 机制深度解析 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Attention 机制：Transformer 的灵魂
          </h2>
          <p className="text-muted-foreground mb-6">
            Attention机制是Transformer的核心，它让模型能够"关注"输入序列的不同部分，理解它们之间的关系。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Self-Attention：自注意力</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Self-Attention让序列中的每个位置都能直接关注到其他所有位置：
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                  <div>
                    <strong className="text-foreground">Query (Q)</strong>：当前位置想要查询什么信息
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                  <div>
                    <strong className="text-foreground">Key (K)</strong>：其他位置提供什么信息
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                  <div>
                    <strong className="text-foreground">Value (V)</strong>：实际的信息内容
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                  <div>
                    <strong className="text-foreground">计算过程</strong>：Attention(Q, K, V) = softmax(QK^T / √d_k) V
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Multi-Head Attention：多头注意力</h3>
              <p className="text-sm text-muted-foreground mb-3">
                多个Attention头并行工作，从不同角度理解信息：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>并行计算</strong>：多个头同时计算，互不干扰</li>
                <li>• <strong>不同视角</strong>：每个头关注不同的关系（语法、语义、位置等）</li>
                <li>• <strong>信息融合</strong>：多个头的输出拼接后经过线性变换</li>
                <li>• <strong>表达能力</strong>：多头机制大大增强了模型的表达能力</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">位置编码（Positional Encoding）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Attention机制本身不包含位置信息，需要通过位置编码注入：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>正弦位置编码</strong>：使用sin/cos函数生成位置编码</li>
                <li>• <strong>可学习位置编码</strong>：BERT等模型使用可学习的嵌入</li>
                <li>• <strong>相对位置编码</strong>：关注相对位置而非绝对位置</li>
                <li>• <strong>局限性</strong>：固定位置编码难以处理超长序列（如1M+ tokens）</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 荧光笔理论 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            荧光笔理论：理解 Attention 的直观方式
          </h2>
          <p className="text-muted-foreground mb-6">
            用荧光笔标记重点的比喻，帮助理解Attention机制的工作原理。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-3">比喻解释</h3>
            <p className="text-sm text-muted-foreground mb-4">
              想象你在阅读一篇文章，用荧光笔标记重点：
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">阅读过程</strong>：你逐字阅读，理解每个词的含义
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">标记重点</strong>：遇到重要信息时，用荧光笔标记
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">关联理解</strong>：标记的词帮助你理解上下文关系
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">Attention的作用</strong>：Attention就是模型的"荧光笔"，自动标记和关联重要信息
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">实际例子</h3>
            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm text-muted-foreground">
              <div className="mb-2">句子："The cat sat on the mat"</div>
              <div className="text-xs text-muted-foreground/70 mt-2">
                当模型处理"sat"时，Attention机制会：
              </div>
              <div className="mt-2 space-y-1">
                <div>• 高注意力权重 → "cat"（主语）</div>
                <div>• 中注意力权重 → "on", "mat"（位置信息）</div>
                <div>• 低注意力权重 → "The"（冠词）</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Encoder-Decoder 架构 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            Encoder-Decoder 架构
          </h2>
          <p className="text-muted-foreground mb-6">
            Transformer的原始架构包含Encoder和Decoder，但实际应用中出现了多种变体。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Encoder（编码器）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                理解输入序列，生成中间表示：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Self-Attention</strong>：理解输入序列内部关系</li>
                <li>• <strong>Feed-Forward</strong>：非线性变换</li>
                <li>• <strong>输出</strong>：每个位置的编码表示</li>
                <li>• <strong>应用</strong>：BERT、RoBERTa等理解任务</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Decoder（解码器）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                基于Encoder输出生成目标序列：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Masked Self-Attention</strong>：只能看到已生成的部分</li>
                <li>• <strong>Cross-Attention</strong>：关注Encoder的输出</li>
                <li>• <strong>生成</strong>：逐个生成目标序列的token</li>
                <li>• <strong>应用</strong>：GPT、T5等生成任务</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">实际应用变体</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">GPT（Decoder Only）</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>架构</strong>：只有Decoder，移除Cross-Attention层
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>特点</strong>：自回归生成，从左到右生成文本
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>应用</strong>：文本生成、对话、代码生成
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">BERT（Encoder Only）</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>架构</strong>：只有Encoder，双向理解
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>特点</strong>：同时看到整个输入序列，双向上下文
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>应用</strong>：文本分类、问答、命名实体识别
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">T5（Encoder-Decoder）</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>架构</strong>：完整的Encoder-Decoder结构
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>特点</strong>：统一框架，所有NLP任务都转换为文本到文本
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>应用</strong>：翻译、摘要、问答等多种任务
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: 前馈网络与残差连接 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Network className="h-6 w-6 text-primary" />
            前馈网络与残差连接
          </h2>
          <p className="text-muted-foreground mb-6">
            Feed-Forward Network、Residual Connection和Layer Normalization是Transformer稳定训练的关键组件。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Feed-Forward Network (FFN)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                前馈网络对每个位置独立进行非线性变换：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>结构</strong>：两层全连接网络，中间有激活函数（通常是ReLU或GELU）</li>
                <li>• <strong>作用</strong>：增强模型的非线性表达能力</li>
                <li>• <strong>特点</strong>：每个位置独立处理，可以并行计算</li>
                <li>• <strong>参数</strong>：FFN通常占用模型大部分参数（如GPT-3中占66%）</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Residual Connection（残差连接）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                将输入直接加到输出上，解决深度网络的梯度消失问题：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>公式</strong>：output = input + sublayer(input)</li>
                <li>• <strong>作用</strong>：提供梯度传播的"高速公路"</li>
                <li>• <strong>效果</strong>：让模型可以训练更深的网络（如GPT-3有96层）</li>
                <li>• <strong>来源</strong>：借鉴自ResNet的成功经验</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">Layer Normalization（层归一化）</h3>
              <p className="text-sm text-muted-foreground mb-3">
                对每层的输出进行归一化，稳定训练过程：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>位置</strong>：在Attention和FFN之后，残差连接之前</li>
                <li>• <strong>作用</strong>：稳定激活值的分布，加速训练收敛</li>
                <li>• <strong>效果</strong>：允许使用更大的学习率，训练更稳定</li>
                <li>• <strong>变体</strong>：Pre-LN（归一化在子层前）vs Post-LN（归一化在子层后）</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">Transformer Block 完整结构</h3>
            <div className="space-y-3 text-sm text-muted-foreground font-mono">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div>Transformer Block:</div>
                <div className="ml-4 mt-2 space-y-1">
                  <div>1. Multi-Head Self-Attention</div>
                  <div>2. Add & Norm (残差连接 + 层归一化)</div>
                  <div>3. Feed-Forward Network</div>
                  <div>4. Add & Norm (残差连接 + 层归一化)</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-2">
                多个Transformer Block堆叠形成深度网络，每个Block都包含上述结构
              </p>
            </div>
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
                深入理解Attention机制的数学原理（Query、Key、Value）和计算过程
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握Multi-Head Attention如何从多个角度理解信息，以及位置编码的作用
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解GPT（Decoder only）和BERT（Encoder only）的架构差异和应用场景
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                了解Feed-Forward Network、Residual Connection和Layer Normalization的作用
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/architecture/transformer" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：Transformer 是什么？
          </Link>
        </Button>
        <Button asChild>
          <Link href="/architecture/transformer-limits" className="flex items-center gap-2">
            下一章：Transformer 的强项与局限
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
