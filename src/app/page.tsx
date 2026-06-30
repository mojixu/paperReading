import { ConclusionSection } from "@/components/ConclusionSection";
import { CriticalReflection } from "@/components/CriticalReflection";
import { ExperimentDashboard } from "@/components/ExperimentDashboard";
import { HeroSection } from "@/components/HeroSection";
import { LiteratureMap } from "@/components/LiteratureMap";
import { MethodTimeline } from "@/components/MethodTimeline";
import { Navbar } from "@/components/Navbar";
import { PaperOverview } from "@/components/PaperOverview";
import { ProblemComparison } from "@/components/ProblemComparison";
import { ResearchFit } from "@/components/ResearchFit";
import { SiteFooter } from "@/components/SiteFooter";
import { TrainingPipeline } from "@/components/TrainingPipeline";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PaperOverview />
        <ProblemComparison />
        <MethodTimeline />
        <TrainingPipeline />
        <ExperimentDashboard />
        <CriticalReflection />
        <LiteratureMap />
        <ResearchFit />
        <ConclusionSection />
      </main>
      <SiteFooter />
    </>
  );
}
