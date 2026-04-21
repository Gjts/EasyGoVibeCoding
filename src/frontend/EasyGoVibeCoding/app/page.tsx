import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlayfulHeroSection } from "@/components/home/playful-hero-section"
import { ClaymorphismCatalog } from "@/components/home/claymorphism-catalog"
import { AIFrameworksSpotlight } from "@/components/home/ai-frameworks-spotlight"
import { ProgressDemo } from "@/components/home/progress-demo"
import { LatestModelsPanel } from "@/components/home/latest-models-panel"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { EnrollmentCTA } from "@/components/home/enrollment-cta"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      <main>
        <PlayfulHeroSection />
        <ClaymorphismCatalog />
        <AIFrameworksSpotlight />
        <ProgressDemo />
        <LatestModelsPanel />
        <TestimonialsSection />
        <EnrollmentCTA />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
