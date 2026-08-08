import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DomainSearch } from "@/components/DomainSearch";
import { WhatWeOffer } from "@/components/WhatWeOffer";
import { HowItWorks } from "@/components/HowItWorks";
import { HostingPlans } from "@/components/HostingPlans";
import { TrustSignals } from "@/components/TrustSignals";
import { Faq } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const priceGbp = Number(process.env.DOMAIN_RETAIL_PRICE_GBP ?? "12.99");

  return (
    <>
      <Header />
      <main>
        <Hero />
        <DomainSearch priceGbp={priceGbp} />
        <WhatWeOffer />
        <HowItWorks />
        <HostingPlans />
        <TrustSignals />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
