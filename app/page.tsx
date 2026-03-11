import { NavHeader } from "@/components/sections/NavHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { EcipSuiteSection } from "@/components/sections/EcipSuiteSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ClientStatusSection } from "@/components/sections/ClientStatusSection";
import { KeyDatesSection } from "@/components/sections/KeyDatesSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <NavHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <EcipSuiteSection />
        <TimelineSection />
        <HowItWorksSection />
        <ClientStatusSection />
        <KeyDatesSection />
        <PrinciplesSection />
        <ResourcesSection />
      </main>
      <FooterSection />
    </>
  );
}
