import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, Building2, Podcast, FileText, Mail, Users, ExternalLink } from "lucide-react"
import Link from "next/link"

const resourceCategories = [
  {
    title: "知名公司技术博客",
    icon: Building2,
    description: "顶级科技公司的技术博客，了解前沿实践",
    items: [
      { name: "OpenAI Blog", url: "https://openai.com/blog", desc: "OpenAI 研究和产品更新" },
      { name: "Anthropic Research", url: "https://anthropic.com/research", desc: "Claude 背后的研究" },
      { name: "Google AI Blog", url: "https://ai.googleblog.com", desc: "Google AI 研究进展" },
      { name: "Meta AI Blog", url: "https://ai.meta.com/blog", desc: "Llama 等开源项目更新" },
      { name: "Vercel Blog", url: "https://vercel.com/blog", desc: "v0、Next.js 等产品更新" },
    ],
  },
  {
    title: "优质播客",
    icon: Podcast,
    description: "AI 和技术领域的优质播客",
    items: [
      { name: "Latent Space", url: "https://latent.space", desc: "AI 工程师必听播客" },
      { name: "Practical AI", url: "https://changelog.com/practicalai", desc: "实用 AI 开发讨论" },
      { name: "Lex Fridman Podcast", url: "https://lexfridman.com/podcast", desc: "深度技术访谈" },
      { name: "AI Engineering", url: "#", desc: "AI 工程实践" },
    ],
  },
  {
    title: "研究报告",
    icon: FileText,
    description: "AI 领域重要研究报告和白皮书",
    items: [
      { name: "State of AI Report", url: "https://www.stateof.ai", desc: "年度 AI 行业报告" },
      { name: "AI Index Report", url: "https://aiindex.stanford.edu", desc: "斯坦福 AI 指数" },
      { name: "McKinsey AI Reports", url: "#", desc: "麦肯锡 AI 研究报告" },
      { name: "Gartner AI Trends", url: "#", desc: "Gartner AI 趋势分析" },
    ],
  },
  {
    title: "优质 Newsletter",
    icon: Mail,
    description: "订阅这些 Newsletter，保持技术敏锐",
    items: [
      { name: "The Batch", url: "https://www.deeplearning.ai/the-batch", desc: "Andrew Ng 的 AI Newsletter" },
      { name: "AI Weekly", url: "#", desc: "每周 AI 新闻汇总" },
      { name: "Import AI", url: "https://importai.substack.com", desc: "AI 政策和研究" },
      { name: "AI Snake Oil", url: "https://aisnakeoil.substack.com", desc: "AI 批判性思考" },
    ],
  },
  {
    title: "开发者社区",
    icon: Users,
    description: "加入这些社区，与同行交流",
    items: [
      { name: "Hacker News", url: "https://news.ycombinator.com", desc: "技术新闻和讨论" },
      { name: "Reddit r/MachineLearning", url: "https://reddit.com/r/MachineLearning", desc: "ML 研究讨论" },
      { name: "Discord - AI Communities", url: "#", desc: "各种 AI 工具的 Discord" },
      { name: "GitHub Discussions", url: "#", desc: "开源项目讨论" },
    ],
  },
  {
    title: "学习资源",
    icon: BookOpen,
    description: "系统学习 AI 编程的优质资源",
    items: [
      { name: "fast.ai", url: "https://fast.ai", desc: "实用深度学习课程" },
      { name: "Coursera AI Courses", url: "https://coursera.org", desc: "Coursera AI 课程" },
      { name: "Andrej Karpathy", url: "https://karpathy.ai", desc: "Karpathy 的教程" },
      { name: "3Blue1Brown", url: "https://3blue1brown.com", desc: "数学可视化" },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
              <BookOpen className="h-4 w-4" />
              优质资源
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              优质资源合集
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              精选技术博客、播客、研究报告、Newsletter 和社区资源
            </p>
          </div>

          {/* Resource Categories */}
          <div className="space-y-12">
            {resourceCategories.map((category) => {
              const Icon = category.icon
              return (
                <section key={category.title}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors ${item.url === "#" ? "pointer-events-none opacity-70" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          {item.url !== "#" && (
                            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </a>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl border border-border bg-card text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">发现更多资源？</h2>
            <p className="text-muted-foreground mb-6">
              如果你有优质资源推荐，欢迎贡献
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
