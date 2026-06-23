import "react-loadly/styles.css";
import { Navbar } from "@/components/organism/NavbarOrganism";
import { HeroSection } from "@/components/organism/HeroSectionOrganism";
import { InstallationSection } from "@/components/organism/InstallationSectionOrganism";
import { ProductionSkeletonPatterns } from "@/components/organism/ProductionSkeletonPatternsOrganism";
import { SkeletonLibraryExamples } from "@/components/organism/SkeletonLibraryExamplesOrganism";
import { AutoSkeletonLoaderExamples } from "@/components/organism/AutoSkeletonLoaderExamplesOrganism";
import { FeaturesSection } from "@/components/organism/FeaturesSectionOrganism";
import { TypeGuardsSection } from "@/components/organism/TypeGuardsSectionOrganism";
import { LoadersShowcaseSection } from "@/components/organism/LoadersShowcaseSectionOrganism";
import { PerformanceBestPracticesSection } from "@/components/organism/PerformanceBestPracticesSectionOrganism";
import { WhyUseLibrarySection } from "@/components/organism/WhyUseLibrarySectionOrganism";
import { FooterSection } from "@/components/organism/FooterSectionOrganism";
import { AutoSkeletonRoadmapSection } from "./components/organism/AutoSkeletonRoadmapSectionOrganism";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <InstallationSection />
        <SkeletonLibraryExamples />
        <ProductionSkeletonPatterns />
        <LoadersShowcaseSection />
        <FeaturesSection />
        <TypeGuardsSection />
        <AutoSkeletonLoaderExamples />
        <AutoSkeletonRoadmapSection />
        <PerformanceBestPracticesSection />
        <WhyUseLibrarySection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
