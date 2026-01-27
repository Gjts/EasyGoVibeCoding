import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, Building2, Podcast, FileText, Mail, Users, ExternalLink } from "lucide-react"
import Link from "next/link"

const resourceCategories = [
  {
    title: "知名公司技术博客",
    icon: Building2,
    description: "顶级科技公司的技术博客，了解前沿实践",
    gradient: "from-blue-400 to-cyan-400",
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
    gradient: "from-purple-400 to-pink-400",
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
    gradient: "from-orange-400 to-amber-400",
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
    gradient: "from-green-400 to-emerald-400",
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
    gradient: "from-red-400 to-rose-400",
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
    gradient: "from-indigo-400 to-purple-400",
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 text-sm font-semibold mb-4 shadow-lg">
              <BookOpen className="h-4 w-4" />
              优质资源
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                优质资源合集
              </span>
            </h1>
            <p className="text-lg text-gray-700 font-medium max-w-2xl mx-auto">
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
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                      <p className="text-sm text-gray-700 font-medium">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group p-5 rounded-2xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200 ${item.url === "#" ? "pointer-events-none opacity-70" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {item.name}
                          </h3>
                          {item.url !== "#" && (
                            <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                      </a>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">发现更多资源？</h2>
            <p className="text-gray-700 mb-6 font-medium">
              如果你有优质资源推荐，欢迎贡献
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 text-sm font-bold text-white hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
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
