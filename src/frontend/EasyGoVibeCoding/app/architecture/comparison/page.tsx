import { CourseLayout } from "@/components/course/course-layout"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Briefcase, Zap } from "lucide-react"
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

export default function ComparisonPage() {
  return (
    <CourseLayout
      title="架构篇"
      description="AI 大模型架构深度解析"
      chapters={chapters}
      currentChapter="架构对比与选型决策"
    >
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
          第 8 章
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          架构对比与选型决策
        </h1>
        <p className="text-lg text-muted-foreground">
          通过多维度对比分析，掌握架构选型的决策框架，根据任务类型、资源约束和应用场景做出正确的架构选择。
        </p>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Section 1: 架构对比表 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            架构对比表
          </h2>
          <p className="text-muted-foreground mb-6">
            从多个维度对比不同架构的特点和适用场景。
          </p>

          <div className="overflow-x-auto mb-6">
            <div className="min-w-full">
              <div className="grid grid-cols-1 gap-4">
                {/* Transformer */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-4">Transformer</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">计算复杂度</span>
                      <span className="text-foreground">O(n²)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">长序列能力</span>
                      <span className="text-foreground">中等（受上下文窗口限制）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">训练效率</span>
                      <span className="text-foreground">高（并行训练）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">推理效率</span>
                      <span className="text-foreground">中等（自回归生成）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">内存消耗</span>
                      <span className="text-foreground">高（注意力矩阵）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">适用场景</span>
                      <span className="text-foreground">通用任务、短到中等序列、多模态</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">生态成熟度</span>
                      <span className="text-foreground">非常高</span>
                    </div>
                  </div>
                </div>

                {/* Mamba */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-4">Mamba (SSM)</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">计算复杂度</span>
                      <span className="text-foreground">O(n)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">长序列能力</span>
                      <span className="text-foreground">强（可处理100万+ tokens）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">训练效率</span>
                      <span className="text-foreground">高（并行扫描）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">推理效率</span>
                      <span className="text-foreground">高（线性复杂度）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">内存消耗</span>
                      <span className="text-foreground">低（状态压缩）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">适用场景</span>
                      <span className="text-foreground">超长序列、实时应用、资源受限</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">生态成熟度</span>
                      <span className="text-foreground">中等（快速发展中）</span>
                    </div>
                  </div>
                </div>

                {/* MoE */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-4">MoE</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">计算复杂度</span>
                      <span className="text-foreground">O(n²)（但稀疏激活）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">长序列能力</span>
                      <span className="text-foreground">中等（受基础架构限制）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">训练效率</span>
                      <span className="text-foreground">高（稀疏激活）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">推理效率</span>
                      <span className="text-foreground">高（只激活部分专家）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">内存消耗</span>
                      <span className="text-foreground">中等（激活参数少）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">适用场景</span>
                      <span className="text-foreground">超大规模模型、多领域应用、成本优化</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">生态成熟度</span>
                      <span className="text-foreground">高（GPT-4、Mixtral等）</span>
                    </div>
                  </div>
                </div>

                {/* RAG */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-4">RAG</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">计算复杂度</span>
                      <span className="text-foreground">检索+生成（检索O(log n)）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">长序列能力</span>
                      <span className="text-foreground">强（通过检索扩展）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">训练效率</span>
                      <span className="text-foreground">高（无需微调）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">推理效率</span>
                      <span className="text-foreground">中等（检索+生成延迟）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">内存消耗</span>
                      <span className="text-foreground">中等（向量数据库）</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">适用场景</span>
                      <span className="text-foreground">知识问答、企业应用、专业领域</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground min-w-[120px]">生态成熟度</span>
                      <span className="text-foreground">高（企业应用主流）</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 选型决策框架 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            选型决策框架
          </h2>
          <p className="text-muted-foreground mb-6">
            根据任务类型、资源约束和应用需求做出架构选择。
          </p>

          <div className="space-y-6 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">按任务类型选择</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">文本生成（短到中等长度）</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>推荐</strong>：Transformer（GPT系列）
                  </p>
                  <p className="text-xs text-muted-foreground">
                    理由：生态成熟、性能优秀、工具丰富
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">长文档分析（100K+ tokens）</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>推荐</strong>：Mamba 或 RAG
                  </p>
                  <p className="text-xs text-muted-foreground">
                    理由：Mamba线性复杂度，RAG通过检索扩展上下文
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">知识问答</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>推荐</strong>：RAG
                  </p>
                  <p className="text-xs text-muted-foreground">
                    理由：可解释性、知识更新、减少幻觉
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">多模态任务</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>推荐</strong>：Transformer（GPT-4V、Gemini）
                  </p>
                  <p className="text-xs text-muted-foreground">
                    理由：多模态能力成熟、统一架构
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-4">按资源约束选择</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">资源充足（GPU、内存充足）</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>推荐</strong>：Transformer 或 MoE
                  </p>
                  <p className="text-xs text-muted-foreground">
                    理由：可以充分利用资源，获得最佳性能
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">资源受限（边缘设备、移动端）</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>推荐</strong>：Mamba 或 小规模Transformer
                  </p>
                  <p className="text-xs text-muted-foreground">
                    理由：内存和计算效率高
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-medium text-foreground mb-2">成本敏感（需要控制推理成本）</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>推荐</strong>：MoE 或 RAG
                  </p>
                  <p className="text-xs text-muted-foreground">
                    理由：MoE稀疏激活，RAG无需微调
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 混合架构策略 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            混合架构策略
          </h2>
          <p className="text-muted-foreground mb-6">
            实际应用中，可以组合使用多种架构，发挥各自优势。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">Transformer + RAG</h3>
              <p className="text-sm text-muted-foreground mb-3">
                最常见的混合架构：
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>架构</strong>：使用Transformer作为生成模型，RAG提供知识增强</li>
                <li>• <strong>优势</strong>：结合Transformer的强大能力和RAG的知识更新能力</li>
                <li>• <strong>应用</strong>：企业知识库、专业领域问答</li>
                <li>• <strong>案例</strong>：ChatGPT + 插件、Claude + 文档检索</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">MoE + RAG</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>架构</strong>：使用MoE模型作为生成模型，RAG提供知识增强</li>
                <li>• <strong>优势</strong>：超大规模模型 + 知识增强，性能和成本平衡</li>
                <li>• <strong>应用</strong>：大规模企业应用、多领域知识系统</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-3">Mamba + RAG</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>架构</strong>：使用Mamba处理长序列，RAG提供知识增强</li>
                <li>• <strong>优势</strong>：长序列处理 + 知识增强，适合长文档分析</li>
                <li>• <strong>应用</strong>：长文档问答、代码库分析</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: 实战案例 */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            实战案例
          </h2>
          <p className="text-muted-foreground mb-6">
            通过真实案例理解架构选型的实际应用。
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">案例1：企业知识库问答</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">需求</strong>：企业内部知识库问答系统，需要回答员工关于公司政策、流程等问题
                </div>
                <div>
                  <strong className="text-foreground">选择</strong>：RAG + Transformer（GPT-4）
                </div>
                <div>
                  <strong className="text-foreground">理由</strong>：
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 知识需要频繁更新（RAG优势）</li>
                    <li>• 需要可解释性（RAG优势）</li>
                    <li>• 需要减少幻觉（RAG优势）</li>
                    <li>• 生成质量要求高（Transformer优势）</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground">效果</strong>：准确率高、可追溯、知识更新方便
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">案例2：长代码库分析</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">需求</strong>：分析大型代码库（百万行代码），理解代码结构和依赖关系
                </div>
                <div>
                  <strong className="text-foreground">选择</strong>：Mamba
                </div>
                <div>
                  <strong className="text-foreground">理由</strong>：
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 序列长度超长（100万+ tokens）</li>
                    <li>• 需要线性复杂度（Mamba优势）</li>
                    <li>• 内存受限（Mamba优势）</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground">效果</strong>：可以一次性处理整个代码库，理解全局结构
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-3">案例3：多语言翻译系统</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">需求</strong>：支持100+语言的实时翻译，需要高质量和低延迟
                </div>
                <div>
                  <strong className="text-foreground">选择</strong>：MoE + Transformer
                </div>
                <div>
                  <strong className="text-foreground">理由</strong>：
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>• 需要多语言能力（MoE专家分工）</li>
                    <li>• 需要高质量翻译（Transformer优势）</li>
                    <li>• 需要控制成本（MoE稀疏激活）</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-foreground">效果</strong>：高质量翻译，成本可控，延迟低
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
                掌握架构选型的决策框架，能够从多个维度对比不同架构
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">2</span>
                能够根据任务类型、资源约束和应用需求选择合适的架构
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">3</span>
                理解混合架构的设计思路，能够组合使用多种架构
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">4</span>
                通过实际案例理解架构选型的应用，能够分析场景并做出决策
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
        <Button variant="ghost" asChild>
          <Link href="/architecture/emerging" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            上一章：其他新兴架构
          </Link>
        </Button>
        <Button asChild>
          <Link href="/architecture/future" className="flex items-center gap-2">
            下一章：未来趋势与展望
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CourseLayout>
  )
}
