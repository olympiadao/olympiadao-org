"use client";

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
    <Suspense>
      <NavHeader />
      <main>
        <HeroSection />
        <TreasurySection />
        <BalanceChart />
        <HowItWorksSection />
        <GovernanceSection />
        <ContractsSection />
      </main>
      <FooterSection />
    </Suspense>
  );
}
