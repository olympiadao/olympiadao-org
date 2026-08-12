import { Suspense } from "react";
import { NavHeader } from "@/components/sections/NavHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { FundingPathSection } from "@/components/sections/FundingPathSection";
import { GovernanceLinkSection } from "@/components/sections/GovernanceLinkSection";
import { ContractsSection } from "@/components/sections/ContractsSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { NavHeaderFallback } from "@/components/ui/SsrFallbacks";

export default function Home() {
  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}>
        <NavHeader />
      </Suspense>
      <main>
        <HeroSection />
        <FundingPathSection />
        <GovernanceLinkSection />
        <ContractsSection />
      </main>
      <FooterSection />
    </>
  );
}
