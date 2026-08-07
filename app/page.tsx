import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DomainPricingStrip } from "@/components/DomainPricingStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { TrustSignals } from "@/components/TrustSignals";
import { FounderNote } from "@/components/FounderNote";
import { HostingWaitlist } from "@/components/HostingWaitlist";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DomainPricingStrip />
        <HowItWorks />
        <Pricing />
        <TrustSignals />
        <FounderNote />
        <HostingWaitlist />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
