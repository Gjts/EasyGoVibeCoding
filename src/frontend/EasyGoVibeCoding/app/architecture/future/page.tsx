import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TrendingUp, Sparkles, Zap } from "lucide-react"
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

export default function FuturePage() {
  return (
    <CourseLayout
      title="架构篇"
      description="AI 大模型架构深度解析"
      chapters={chapters}
      currentChapter="未来趋势与展望"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 9 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          未来趋势与展望
        </h1>
        <p className="text-lg text-muted-foreground">
          分析AI架构的演进方向、技术融合趋势和应用场景扩展，展望未来可能的架构创新和发展方向。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 架构演进方向 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            架构演进方向
          </h2>
          <p className="text-muted-foreground mb-6">
            AI架构正在朝着效率优化、能力提升和专业化的方向演进。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">效率优化</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>线性复杂度</strong>：从O(n²)到O(n)的持续探索</li>
                <li>• <strong>稀疏化</strong>：稀疏注意力、稀疏激活</li>
                <li>• <strong>量化压缩</strong>：模型量化、知识蒸馏</li>
                <li>• <strong>硬件协同</strong>：针对特定硬件的架构优化</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">能力提升</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>长序列</strong>：处理更长序列的能力</li>
                <li>• <strong>多模态</strong>：统一的多模态架构</li>
                <li>• <strong>推理能力</strong>：更强的逻辑推理能力</li>
                <li>• <strong>专业化</strong>：针对特定领域的优化</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">专业化</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>领域特定</strong>：针对特定领域的架构设计</li>
                <li>• <strong>任务优化</strong>：针对特定任务的架构优化</li>
                <li>• <strong>效率平衡</strong>：在通用性和效率之间找到平衡</li>
                <li>• <strong>定制化</strong>：可定制的架构组件</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 技术融合趋势 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            技术融合趋势
          </h2>
          <p className="text-muted-foreground mb-6">
            多种技术的融合将推动架构的创新和发展。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">多模态架构</h3>
              <p className="text-sm text-muted-foreground mb-3">
                统一处理文本、图像、音频、视频等多种模态：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>统一表示</strong>：将不同模态映射到统一表示空间</li>
                <li>• <strong>跨模态理解</strong>：理解不同模态之间的关系</li>
                <li>• <strong>生成能力</strong>：生成多种模态的内容</li>
                <li>• <strong>实际案例</strong>：GPT-4V、Gemini、Claude 3等多模态模型</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">神经符号结合</h3>
              <p className="text-sm text-muted-foreground mb-3">
                结合神经网络和符号推理的优势：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>符号推理</strong>：结合符号逻辑推理能力</li>
                <li>• <strong>可解释性</strong>：提供可解释的推理过程</li>
                <li>• <strong>准确性</strong>：在需要精确推理的任务上更准确</li>
                <li>• <strong>研究方向</strong>：Neuro-Symbolic AI、可解释AI</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">可解释性增强</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>注意力可视化</strong>：可视化模型的注意力机制</li>
                <li>• <strong>决策解释</strong>：解释模型的决策过程</li>
                <li>• <strong>知识提取</strong>：从模型中提取可解释的知识</li>
                <li>• <strong>应用价值</strong>：提高模型的可信度和可接受性</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: 应用场景扩展 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            应用场景扩展
          </h2>
          <p className="text-muted-foreground mb-6">
            AI架构的应用场景正在不断扩展，从云端到边缘，从通用到专业。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">边缘计算</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>设备部署</strong>：在边缘设备上部署AI模型</li>
                <li>• <strong>实时响应</strong>：低延迟的实时响应</li>
                <li>• <strong>隐私保护</strong>：数据本地处理，保护隐私</li>
                <li>• <strong>架构需求</strong>：需要高效的架构（如Mamba）</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">实时应用</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>实时对话</strong>：实时对话系统</li>
                <li>• <strong>流式处理</strong>：流式数据处理</li>
                <li>• <strong>交互式应用</strong>：交互式AI应用</li>
                <li>• <strong>架构需求</strong>：需要低延迟的架构</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">个性化</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>用户定制</strong>：针对用户的个性化模型</li>
                <li>• <strong>领域适应</strong>：快速适应新领域</li>
                <li>• <strong>持续学习</strong>：持续学习和适应</li>
                <li>• <strong>架构需求</strong>：需要灵活的架构设计</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 前瞻性思考 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            前瞻性思考
          </h2>
          <p className="text-muted-foreground mb-6">
            展望未来可能的架构创新和发展方向。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">可能的架构创新</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>自适应架构</strong>：根据任务自动调整架构</li>
                <li>• <strong>动态路由</strong>：更智能的路由机制</li>
                <li>• <strong>混合计算</strong>：结合不同计算范式</li>
                <li>• <strong>量子启发</strong>：受量子计算启发的架构</li>
                <li>• <strong>生物启发</strong>：受生物神经网络启发的架构</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">技术突破方向</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>超长序列</strong>：处理无限长序列的能力</li>
                <li>• <strong>零样本学习</strong>：更强的零样本和少样本学习能力</li>
                <li>• <strong>持续学习</strong>：持续学习而不遗忘</li>
                <li>• <strong>因果推理</strong>：更强的因果推理能力</li>
                <li>• <strong>规划能力</strong>：长期规划和执行能力</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">发展趋势预测</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">短期（1-2年）</strong>：
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 线性复杂度架构的成熟和广泛应用</li>
                    <li>• MoE架构的进一步优化和普及</li>
                    <li>• RAG系统的标准化和工具化</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground">中期（3-5年）</strong>：
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 多模态架构的统一和成熟</li>
                    <li>• 神经符号结合的实用化</li>
                    <li>• 边缘AI的普及</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground">长期（5-10年）</strong>：
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 自适应和自进化架构</li>
                    <li>• 量子计算和AI的结合</li>
                    <li>• 通用人工智能（AGI）的架构基础</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: 对开发者的启示 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            对开发者的启示
          </h2>
          <p className="text-muted-foreground mb-6">
            理解架构发展趋势，为未来的技术选择做好准备。
          </p>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">关键启示</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">1</span>
                <div>
                  <strong className="text-foreground">保持学习</strong>：架构领域快速发展，需要持续学习新技术
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">2</span>
                <div>
                  <strong className="text-foreground">理解原理</strong>：深入理解架构原理，而非仅仅使用工具
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">3</span>
                <div>
                  <strong className="text-foreground">灵活选型</strong>：根据场景选择合适的架构，而非盲目跟风
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">4</span>
                <div>
                  <strong className="text-foreground">关注趋势</strong>：关注架构发展趋势，为未来技术选择做好准备
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">5</span>
                <div>
                  <strong className="text-foreground">实践验证</strong>：通过实际项目验证架构选择，积累经验
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
                了解架构领域的发展趋势（效率优化、能力提升、专业化）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                理解技术融合的可能性和影响（多模态、神经符号结合、可解释性）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                掌握应用场景的扩展方向（边缘计算、实时应用、个性化）
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                具备前瞻性的架构思维，能够为未来的技术选择做好准备
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/architecture/comparison" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：架构对比与选型决策
          </Link>
        </Button>
        <Button asChild>
          <Link href="/architecture" className="flex items-center gap-2">
            返回：架构篇概述
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
