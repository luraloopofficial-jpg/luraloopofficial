import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import SecurityArchitecture from "@/components/sections/SecurityArchitecture";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <SecurityArchitecture />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
}
