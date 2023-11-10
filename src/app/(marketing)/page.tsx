import HeroSection from "@/components/header/hero-section"
import SubmissionForm from "@/components/submission/submission-form"
import { GptCollection } from "@/components/gpt/gpt-collection"
import FAQ from "@/components/footer/faq"

export default function Home() {
  return (
    <main className="my-6 mx-2 lg:mx-0">
      <HeroSection />
      <SubmissionForm />
      <GptCollection />
      <FAQ />
    </main>
  )
}
