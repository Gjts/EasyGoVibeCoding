import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, TrendingUp, Layers, Sparkles, Zap } from "lucide-react"
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

export default function TransformerPage() {
  return (
    <CourseLayout
      title="架构篇"
      description="AI 大模型架构深度解析"
      chapters={chapters}
      currentChapter="Transformer 是什么？"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 1 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Transformer 是什么？为什么它统治了 AI？
        </h1>
        <p className="text-lg text-muted-foreground">
          2017年，一篇名为"Attention is All You Need"的论文改变了AI领域。Transformer架构不仅解决了RNN/LSTM的序列处理问题，更成为了现代AI的基础，从GPT到BERT，从文本到图像，Transformer无处不在。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: Transformer 的诞生 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Transformer 的诞生
          </h2>
          <p className="text-muted-foreground mb-6">
            2017年6月，Google Brain团队发表了"Attention is All You Need"论文，提出了Transformer架构。这篇论文只有6位作者，却改变了整个AI领域的发展轨迹。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-3">论文核心信息</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">论文标题</strong>：Attention is All You Need
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">发表时间</strong>：2017年6月（NIPS 2017）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">作者团队</strong>：Google Brain（Vaswani等）
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">核心贡献</strong>：完全基于Attention机制，无需循环或卷积
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">历史背景</h3>
            <p className="text-sm text-muted-foreground mb-3">
              在Transformer之前，序列建模主要依赖RNN和LSTM：
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>RNN的困境</strong>：梯度消失问题，难以处理长序列</li>
              <li>• <strong>LSTM的改进</strong>：通过门控机制缓解梯度消失，但计算仍然串行</li>
              <li>• <strong>CNN的尝试</strong>：用于序列建模，但感受野受限</li>
              <li>• <strong>Transformer的突破</strong>：完全并行，全局注意力，彻底改变了序列建模</li>
            </ul>
          </div>
        </section>

        {/* Section 2: 为什么 Transformer 成为主流 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            为什么 Transformer 成为主流？
          </h2>
          <p className="text-muted-foreground mb-6">
            Transformer并非第一个使用Attention的架构，但它通过完全摒弃循环和卷积，实现了真正的并行计算和全局依赖，这是它成功的关键。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">vs RNN</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>并行性</strong>：RNN必须串行处理，Transformer可以并行</li>
                <li>• <strong>长距离依赖</strong>：RNN梯度消失，Transformer全局注意力</li>
                <li>• <strong>训练速度</strong>：Transformer训练快10-100倍</li>
                <li>• <strong>内存效率</strong>：Transformer内存使用更稳定</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">vs LSTM</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>复杂度</strong>：LSTM有复杂的门控机制，Transformer结构更简单</li>
                <li>• <strong>可扩展性</strong>：LSTM难以扩展到超大规模，Transformer可以</li>
                <li>• <strong>表达能力</strong>：Transformer的注意力机制更灵活</li>
                <li>• <strong>硬件友好</strong>：Transformer更适合GPU并行计算</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">vs CNN</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>感受野</strong>：CNN需要多层才能扩大感受野，Transformer一步到位</li>
                <li>• <strong>位置信息</strong>：CNN通过卷积核位置编码，Transformer用位置编码</li>
                <li>• <strong>长序列</strong>：CNN处理长序列需要大量层，Transformer更高效</li>
                <li>• <strong>通用性</strong>：Transformer统一架构，CNN需要针对不同任务设计</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
            <h3 className="font-semibold text-foreground mb-3">关键突破点</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">完全并行</strong>：所有位置同时计算，充分利用GPU并行能力
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">全局注意力</strong>：任意两个位置可以直接交互，无需多层传播
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">可扩展性</strong>：从1亿参数到1万亿参数，遵循Scaling Law
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">统一架构</strong>：文本、图像、音频都可以用Transformer处理
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 核心组件 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            核心组件：Encoder-Decoder 结构
          </h2>
          <p className="text-muted-foreground mb-6">
            Transformer的核心是Encoder-Decoder架构，但实际应用中出现了多种变体。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">标准 Transformer 架构</h3>
              <p className="text-sm text-muted-foreground mb-3">
                原始论文中的完整架构包含Encoder和Decoder两部分：
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="text-accent">Encoder</span>
                  <span>：理解输入序列，将输入编码为中间表示</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent">Decoder</span>
                  <span>：基于Encoder的输出和已生成的部分，生成目标序列</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent">应用场景</span>
                  <span>：机器翻译、文本摘要等序列到序列任务</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">架构变体</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">GPT（Decoder Only）</h4>
                  <p className="text-xs text-muted-foreground">
                    只有Decoder，自回归生成，适合文本生成任务
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">BERT（Encoder Only）</h4>
                  <p className="text-xs text-muted-foreground">
                    只有Encoder，双向理解，适合理解任务（分类、问答）
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">关键创新点</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Self-Attention</strong>：让模型关注输入序列的不同部分</li>
                <li>• <strong>Multi-Head Attention</strong>：从多个角度理解信息</li>
                <li>• <strong>Positional Encoding</strong>：注入位置信息，弥补Attention的序列顺序缺失</li>
                <li>• <strong>Feed-Forward Network</strong>：非线性变换，增强表达能力</li>
                <li>• <strong>Residual Connection</strong>：解决深度网络的梯度消失问题</li>
                <li>• <strong>Layer Normalization</strong>：稳定训练过程</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 历史意义 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            历史意义：AI 领域的范式转变
          </h2>
          <p className="text-muted-foreground mb-6">
            Transformer不仅是一个架构，更是AI领域的范式转变，它开启了大规模预训练模型的时代。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">影响范围</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">自然语言处理</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• GPT系列：GPT-1/2/3/4，ChatGPT，改变了文本生成</li>
                  <li>• BERT系列：BERT、RoBERTa、ALBERT，改变了文本理解</li>
                  <li>• T5、BART：统一了文本任务框架</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">计算机视觉</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Vision Transformer (ViT)：将Transformer应用到图像</li>
                  <li>• DETR：目标检测的Transformer方法</li>
                  <li>• CLIP：多模态Transformer模型</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">语音处理</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Whisper：OpenAI的语音识别模型</li>
                  <li>• AudioLM：音频生成的Transformer模型</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">多模态</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• GPT-4V：视觉理解能力</li>
                  <li>• Gemini：原生多模态架构</li>
                  <li>• 统一架构处理文本、图像、音频</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-3">范式转变</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">从任务特定到通用模型</strong>：Transformer开启了大规模预训练+微调的时代
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">从人工特征到端到端学习</strong>：Transformer实现了真正的端到端学习
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">从单一模态到多模态统一</strong>：Transformer统一了不同模态的处理方式
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">从模型设计到数据规模</strong>：Transformer证明了数据规模的重要性（Scaling Law）
                </div>
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
                理解Transformer诞生的历史背景和2017年论文的核心贡献
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                掌握Transformer相比RNN/LSTM/CNN的核心优势（并行性、全局注意力、可扩展性）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                了解Encoder-Decoder结构的基本原理和关键创新点
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                理解Transformer对AI领域的范式转变意义和影响范围
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/architecture" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：架构篇概述
          </Link>
        </Button>
        <Button asChild>
          <Link href="/architecture/transformer-core" className="flex items-center gap-2">
            下一章：Transformer 的核心机制
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
