import { JaHero } from "@/components/ja/ja-hero"
import { JaProblem } from "@/components/ja/ja-problem"
import { JaCurriculum } from "@/components/ja/ja-curriculum"
import { JaPricing } from "@/components/ja/ja-pricing"
import { JaTrustFaq } from "@/components/ja/ja-trust-faq"
import { JaWaitlistForm } from "@/components/ja/ja-waitlist-form"

export default function JaHomePage() {
  return (
    <>
      <JaHero />
      <JaProblem />
      <JaCurriculum />
      <JaPricing />
      <JaTrustFaq />
      <JaWaitlistForm />
    </>
  )
}
