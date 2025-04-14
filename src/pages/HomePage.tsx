
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedDesigns } from "@/components/home/FeaturedDesigns";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-16">
        <div className="container py-16">
          <HeroSection />
        </div>
        <FeaturedDesigns />
        <HowItWorksSection />
      </div>
    </Layout>
  );
}
