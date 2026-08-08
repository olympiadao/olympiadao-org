import { Suspense } from "react";
import { NavHeader } from "@/components/sections/NavHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { TreasurySection } from "@/components/sections/TreasurySection";
import { BalanceChart } from "@/components/sections/BalanceChart";
import { GovernanceLinkSection } from "@/components/sections/GovernanceLinkSection";
import { ContractsSection } from "@/components/sections/ContractsSection";
import { FooterSection } from "@/components/sections/FooterSection";
import {
  NavHeaderFallback,
  TreasurySectionFallback,
  BalanceChartFallback,
  ContractsSectionFallback,
} from "@/components/ui/SsrFallbacks";

export default function Home() {
  return (
    <>
      <Suspense fallback={<NavHeaderFallback />}>
        <NavHeader />
      </Suspense>
      <main>
        <HeroSection />
        <Suspense
          fallback={
            <>
              <TreasurySectionFallback />
              <BalanceChartFallback />
            </>
          }
        >
          <TreasurySection />
          <BalanceChart />
        </Suspense>
        <GovernanceLinkSection />
        <Suspense fallback={<ContractsSectionFallback />}>
          <ContractsSection />
        </Suspense>
      </main>
      <FooterSection />
    </>
  );
}
