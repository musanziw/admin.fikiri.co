import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Footer } from "@/app/components/Footer";
import Sdg from "@/app/components/Sdg";

export default function Home() {
  return (
    <>
      <Hero />
      <Sdg />
      <About />
      <Footer />
    </>
  );
}
