import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Footer } from "@/app/components/Footer";
import Sdg from "@/app/components/Sdg";
import Topbar from "@/app/components/Topbar";

export default function Home() {
    return (
        <>
            <Topbar background={"bg-white"} />
            <Hero />
            <Sdg />
            <About />
            <Footer />
        </>
    )
}
