import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { TrustSignals } from "@/components/TrustSignals";
import { HostingWaitlist } from "@/components/HostingWaitlist";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Pricing />
        <TrustSignals />
        <HostingWaitlist />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
