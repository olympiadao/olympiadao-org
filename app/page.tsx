import { Suspense } from "react";
import { NavHeader } from "@/components/sections/NavHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { TreasurySection } from "@/components/sections/TreasurySection";
import { BalanceChart } from "@/components/sections/BalanceChart";
import { GovernanceLinkSection } from "@/components/sections/GovernanceLinkSection";
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
        <GovernanceLinkSection />
        <Suspense>
          <ContractsSection />
        </Suspense>
      </main>
      <FooterSection />
    </>
  );
}
