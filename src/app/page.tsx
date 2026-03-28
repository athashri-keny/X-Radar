import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
// import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { GradientOrbs } from "@/components/gradient-orbs"
import { TweetsCarousel } from "@/components/tweet-carosel"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <AnimatedBackground />
      <GradientOrbs />

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <TweetsCarousel/>
          <HowItWorks />
          <Features />
          {/* <Pricing /> */}
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  )
}
