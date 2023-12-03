import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Footer } from "@/app/components/Footer";
import Sdg from "@/app/components/Sdg";
import HowToCandidate from "./components/HowToCandidate";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <HowToCandidate /> */}
      <Sdg />
      <About />
      <Footer />
    </>
  );
}
