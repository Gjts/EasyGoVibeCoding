import { CourseLayout } from "@/components/course/course-layout"
import { advancedChapters } from "@/components/course/chapters"
import {
  FrameworkHero,
  FrameworkFooterNav,
  SectionTitle,
} from "@/components/course/framework-detail"
import { CaseStudyLinks } from "@/components/course/case-study-links"
import {
  BookOpen,
  Workflow,
  FolderTree,
  Database,
  Layers,
  Search,
  Brain,
  FileText,
  Code,
  Target,
  Sparkles,
  HardDrive,
  Radio,
  MessageSquare,
  Network,
  Rocket,
} from "lucide-react"

const caseStudies = [
  {
    name: "LlamaIndex Official Repo",
    description:
      "官方核心仓库（Python），含 Data Connectors、Indices、Retrievers、Query Engine 等模块全部源码。",
    href: "https://github.com/run-llama/llama_index",
    tag: "官方",
    kind: "github" as const,
  },
  {
    name: "LlamaIndex.TS",
    description:
      "官方 TypeScript 版，面向 Next.js / Vercel Edge / Cloudflare 的 RAG 引擎。",
    href: "https://github.com/run-llama/LlamaIndexTS",
    tag: "TypeScript",
    kind: "github" as const,
  },
  {
    name: "create-llama",
    description:
      "一行命令脚手架：Next.js + LlamaIndex 全栈 RAG 应用，官方最佳实践模板。",
    href: "https://github.com/run-llama/create-llama",
    tag: "脚手架",
    kind: "github" as const,
  },
  {
    name: "LlamaParse",
    description:
      "官方的复杂文档解析服务（PDF、表格、图片 OCR），可直接接入 LlamaIndex 管道。",
    href: "https://github.com/run-llama/llama_parse",
    tag: "文档解析",
    kind: "github" as const,
  },
  {
    name: "PrivateGPT",
    description:
      "100% 本地、离线的私有文档问答系统，典型的 LlamaIndex 企业私有化 RAG 案例。",
    href: "https://github.com/zylon-ai/private-gpt",
    tag: "本地私有",
    kind: "github" as const,
  },
  {
    name: "LlamaIndex 官方文档",
    description:
      "Concepts → Indexing → Querying → Evaluation 全链路文档，含大量可运行 Notebook。",
    href: "https://docs.llamaindex.ai/",
    tag: "Docs",
    kind: "docs" as const,
  },
] as const

const ragFlow = [
  { step: "1", label: "数据加载", en: "Load", icon: FileText },
  { step: "2", label: "文本切块", en: "Chunk", icon: Layers },
  { step: "3", label: "向量化", en: "Embed", icon: Sparkles },
  { step: "4", label: "索引构建", en: "Index", icon: Database },
  { step: "5", label: "检索", en: "Retrieve", icon: Search },
  { step: "6", label: "生成回答", en: "Generate", icon: Brain },
]

const coreModules = [
  {
    icon: FileText,
    name: "Readers 数据加载器",
    desc: "支持多种数据源（文件、网页、数据库等）",
  },
  {
    icon: Layers,
    name: "Nodes 节点（文本块）",
    desc: "将文档切分为语义相似的节点",
  },
  {
    icon: Database,
    name: "Indexes 索引结构",
    desc: "多种索引结构组织和存储节点",
  },
  {
    icon: Search,
    name: "Retrievers 检索器",
    desc: "根据查询从索引中检索相关文本",
  },
  {
    icon: MessageSquare,
    name: "Query Engine 查询引擎",
    desc: "整合检索与 LLM 生成最终答案",
  },
  {
    icon: Sparkles,
    name: "Embeddings 嵌入模型",
    desc: "将文本转换为向量表示",
  },
  {
    icon: HardDrive,
    name: "Storage 存储层",
    desc: "存储索引、文档、向量等数据",
  },
  {
    icon: Radio,
    name: "Callbacks 回调机制",
    desc: "日志、调试、事件处理等",
  },
]

const dataSources = [
  { label: "文件", items: ["PDF", "TXT", "DOCX", "PPTX", "CSV", "JSON"] },
  {
    label: "网页",
    items: ["网站", "API 接口", "RSS", "Notion", "GitHub", "YouTube"],
  },
  {
    label: "数据库",
    items: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Elasticsearch"],
  },
  {
    label: "其他",
    items: ["Slack", "云存储（S3, GCS）", "自定义数据源"],
  },
]

const indexes = [
  {
    name: "Vector Index",
    cn: "向量索引",
    desc: "基于向量相似度检索（最常用）",
    when: "一般问答、语义搜索",
  },
  {
    name: "Tree Index",
    cn: "树形索引",
    desc: "构建层次结构，适合摘要类查询",
    when: "需要层次化摘要",
  },
  {
    name: "List Index",
    cn: "列表索引",
    desc: "顺序列表，结构简单直观",
    when: "简单顺序访问",
  },
  {
    name: "Keyword Index",
    cn: "关键词索引",
    desc: "基于关键词匹配检索",
    when: "精确匹配关键词",
  },
  {
    name: "Graph Index",
    cn: "图谱索引",
    desc: "关系图谱，复杂知识检索",
    when: "需要图谱关系",
  },
]

const retrievalFeatures = [
  { label: "Top K 检索", desc: "返回最相关的 K 个节点" },
  { label: "相似度阈值检索", desc: "返回相似度高于阈值的节点" },
  { label: "混合检索（Hybrid）", desc: "向量检索 + 关键词检索" },
  { label: "重排序（Rerank）", desc: "使用重排模型优化结果" },
  {
    label: "上下文压缩（Compression）",
    desc: "压缩上下文，保留关键信息",
  },
]

const queryEngines = [
  { name: "RetrieverQA", desc: "基础问答生成" },
  { name: "SubQuestion", desc: "子问题分解" },
  { name: "Router", desc: "路由器多策略" },
  { name: "Chat", desc: "对话模式，支持多轮对话" },
  { name: "Custom", desc: "自定义引擎，灵活扩展" },
]

const features = [
  "统一接口：支持多种数据源和 LLM",
  "模块化设计：可组合的组件，易于扩展",
  "高效索引：多种索引结构，优化检索效果",
  "RAG 优化：检索增强生成，减少幻觉",
  "生产就绪：支持并发、批处理、缓存等",
  "生态丰富：集成主流向量数据库和工具",
]

export default function LlamaIndexDetailPage() {
  return (
    <CourseLayout
      title="进阶篇"
      description="从工具到架构"
      chapters={advancedChapters}
      currentChapter="LlamaIndex 详解"
    >
      <FrameworkHero
        chapter="AI 应用框架 · 02"
        title="LlamaIndex 详细解析"
        subtitle="数据连接与 RAG 引擎（喂知识给 AI）"
        tagline="让 LLM 拥有外部知识，问答更准确。"
        summary="LlamaIndex 就像一个超级图书管理员，帮你把各种各样的数据整理好，在你需要时快速找出最相关的内容，再交给 LLM 生成准确的答案。"
        imageSrc="/images/ai-frameworks/llamaindex.png"
        imageAlt="LlamaIndex 详细解析全景图"
        accentClass="text-sky-600"
      />

      <div className="space-y-12">
        <section>
          <SectionTitle icon={BookOpen}>1. LlamaIndex 是什么？</SectionTitle>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-muted-foreground leading-relaxed">
              LlamaIndex（原名 <strong className="text-foreground">GPT Index</strong>）是一个用于构建
              <strong className="text-foreground">数据驱动型 LLM 应用</strong>的框架。
              核心目标：连接各种数据源，构建索引，并提供强大的检索与生成能力。
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: "数据源", desc: "从各种来源加载数据" },
                { label: "索引构建", desc: "组织、切块、向量化" },
                { label: "检索增强", desc: "快速检索相关信息" },
                { label: "生成回答", desc: "结合上下文生成答案" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-center"
                >
                  <div className="text-sm font-semibold text-foreground">
                    {item.label}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <SectionTitle icon={Workflow}>2. 核心流程（RAG 流程）</SectionTitle>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-3">
              {ragFlow.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="flex flex-col items-center rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-center min-w-[120px]">
                      <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-sky-600">
                        <Icon className="h-3.5 w-3.5" />
                        Step {item.step}
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {item.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.en}
                      </div>
                    </div>
                    {i < ragFlow.length - 1 && (
                      <div className="h-px w-6 bg-sky-300" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section>
          <SectionTitle icon={FolderTree}>3. 核心模块（Code Map）</SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {coreModules.map((mod) => {
              const Icon = mod.icon
              return (
                <div
                  key={mod.name}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-sky-600" />
                    <div className="font-semibold text-foreground">
                      {mod.name}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{mod.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <SectionTitle icon={Database}>
            4. 数据加载（Readers 支持的数据源）
          </SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {dataSources.map((group) => (
              <div
                key={group.label}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="mb-2 font-semibold text-foreground">
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-secondary/60 px-2 py-0.5 text-xs text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Layers}>5. 索引结构（Indexes）</SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {indexes.map((idx) => (
              <div
                key={idx.name}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-sky-600" />
                  <div className="font-semibold text-foreground">
                    {idx.name}
                  </div>
                </div>
                <div className="mt-1 text-xs font-medium text-sky-600">
                  {idx.cn}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {idx.desc}
                </p>
                <div className="mt-3 rounded-md bg-sky-50 px-2 py-1 text-xs text-foreground">
                  适合：{idx.when}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Search}>6. 检索与查询（Retrieval）</SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {retrievalFeatures.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="font-semibold text-foreground">
                  {item.label}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={MessageSquare}>
            7. 查询引擎（Query Engine）
          </SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {queryEngines.map((q) => (
              <div
                key={q.name}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="font-mono text-sm font-semibold text-sky-600">
                  {q.name}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{q.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={Target}>8. 核心特性</SectionTitle>
          <div className="rounded-xl border border-border bg-card p-6">
            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-sky-600 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <SectionTitle icon={Code}>9. 代码示例（快速上手）</SectionTitle>
          <div className="overflow-hidden rounded-xl border border-border bg-[#1e1e2e]">
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-slate-100">
              <code>{`from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.core.query_engine import RetrieverQueryEngine

# 1. 加载数据
reader = SimpleDirectoryReader("./data")
documents = reader.load_data()

# 2. 构建索引
index = VectorStoreIndex.from_documents(documents)

# 3. 创建查询引擎
query_engine = index.as_query_engine(similarity_top_k=3)

# 4. 查询
response = query_engine.query("LlamaIndex 是什么？")
print(response)`}</code>
            </pre>
          </div>
        </section>

        <section>
          <SectionTitle icon={Rocket}>10. 真实案例 &amp; 开源项目</SectionTitle>
          <CaseStudyLinks
            items={caseStudies}
            accentBorder="border-sky-200"
            accentBg="bg-sky-50/60"
            accentText="text-sky-600"
            footnote="建议路径：先用 create-llama 跑通最小 RAG → 读 PrivateGPT 学习本地化落地 → 深入 LlamaParse 解决真实文档解析问题。"
          />
        </section>
      </div>

      <FrameworkFooterNav
        prev={{
          title: "LangChain 详解",
          href: "/advanced/ai-frameworks/langchain",
        }}
        next={{
          title: "LangGraph 详解",
          href: "/advanced/ai-frameworks/langgraph",
        }}
      />
    </CourseLayout>
  )
}
