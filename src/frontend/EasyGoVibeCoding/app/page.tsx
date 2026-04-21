import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JaMarketBanner } from "@/components/ja/ja-market-banner"
import { PlayfulHeroSection } from "@/components/home/playful-hero-section"
import { ClaymorphismCatalog } from "@/components/home/claymorphism-catalog"
import { AIFrameworksSpotlight } from "@/components/home/ai-frameworks-spotlight"
import { LatestModelsPanel } from "@/components/home/latest-models-panel"
import { EcosystemTeaser } from "@/components/home/ecosystem-teaser"
import { GithubHotTeaser } from "@/components/home/github-hot-teaser"
import { ResourcesTeaser } from "@/components/home/resources-teaser"
import { LearningDashboard } from "@/components/home/learning-dashboard"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { EnrollmentCTA } from "@/components/home/enrollment-cta"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <JaMarketBanner />
      <Header />
      <main>
        {/* Screen 1: Slim hero + live summary strip (课程数 · 工具数 · GitHub 精选 · 模型动态时间) */}
        <PlayfulHeroSection />

        {/* Screen 2: 7 篇课程目录，按入门/工程/规模化三线分组，带已访问徽章 */}
        <ClaymorphismCatalog />

        {/* Screen 3 upper: 五大 AI 框架详解专题 */}
        <AIFrameworksSpotlight />

        {/* Screen 3 lower: 实时模型动态 */}
        <LatestModelsPanel />

        {/* 价值密度区：三个平级大页的精选 teaser */}
        <EcosystemTeaser />
        <GithubHotTeaser />
        <ResourcesTeaser />

        {/* 个性化：基于 localStorage 的真实学习仪表盘 */}
        <LearningDashboard />

        {/* 营销区：口碑 + CTA + 联系表单 */}
        <TestimonialsSection />
        <EnrollmentCTA />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
