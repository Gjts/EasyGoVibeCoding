import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { LearningPathSection } from "@/components/home/learning-path-section"
import { FeaturesSection } from "@/components/home/features-section"
import { AudienceSection } from "@/components/home/audience-section"
import { ToolsPreviewSection } from "@/components/home/tools-preview-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LearningPathSection />
        <FeaturesSection />
        <AudienceSection />
        <ToolsPreviewSection />
      </main>
      <Footer />
    </div>
  )
}
