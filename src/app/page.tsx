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
  <div className="min-h-screen bg-background relative px-6 md:px-12 lg:px-20">
    <AnimatedBackground />
    <Navbar />
    <HeroSection />
    <LiveTicker />
    <HowItWorks />
    <FeaturesGrid />
    {/* <PricingSection /> */}
    <FAQSection />
    <Footer />
  </div>
);

export default Index;
