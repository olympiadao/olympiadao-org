import { Suspense } from "react";
import { NavHeader } from "@/components/sections/NavHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { TreasurySection } from "@/components/sections/TreasurySection";
import { BalanceChart } from "@/components/sections/BalanceChart";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { GovernanceSection } from "@/components/sections/GovernanceSection";
import { ContractsSection } from "@/components/sections/ContractsSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <Suspense>
        <NavHeader />
      </Suspense>
      <main>
        <HeroSection />
        <Suspense>
          <TreasurySection />
          <BalanceChart />
        </Suspense>
        <HowItWorksSection />
        <GovernanceSection />
        <Suspense>
          <ContractsSection />
        </Suspense>
      </main>
      <FooterSection />
    </>
  );
}
