import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LiveTicker from "@/components/LiveTicker";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/footer";

const Index = () => (
  <div className="min-h-screen bg-background relative">
    <AnimatedBackground />
    {/* Padded content wrapper — footer excluded so it spans full width */}
    <div className="px-6 md:px-12 lg:px-20">
      <Navbar />
      <HeroSection />
      <LiveTicker />
      <HowItWorks />
      <FeaturesGrid />
      <PricingSection />
      <FAQSection />
    </div>
    {/* Footer sits outside the padded wrapper and handles its own spacing */}
    <Footer />
  </div>
);

export default Index;