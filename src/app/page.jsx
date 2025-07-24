import Header from "@/components/Header";
import Hero from "@/components/ui/home/Hero";
import FeaturedProducts from "@/components/ui/home/FeaturedProducts";
import WhyChooseUs from "@/components/ui/home/WhyChooseUs";
import Testimonials from "@/components/ui/home/Testimonials";
import HowItWorks from "@/components/ui/home/HowItWorks";
import FAQSection from "@/components/ui/home/FAQSection";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <HowItWorks />
      <FAQSection />

      <Footer />
    </>
  );
}
