import { NavHeader } from "@/components/sections/NavHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { EcipSuiteSection } from "@/components/sections/EcipSuiteSection";
import { ClientStatusSection } from "@/components/sections/ClientStatusSection";
import { KeyDatesSection } from "@/components/sections/KeyDatesSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <NavHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <TimelineSection />
        <EcipSuiteSection />
        <ClientStatusSection />
        <KeyDatesSection />
        <PrinciplesSection />
      </main>
      <FooterSection />
    </>
  );
}
