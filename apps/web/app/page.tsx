import {Hero} from "@/app/components/Hero";
import {About} from "@/app/components/About";
import {Footer} from "@/app/components/Footer";
import Sdg from "@/app/components/Sdg";

export default function Home() {
    return (
        <div className={'relative overflow-x-hidden'}>
            <Hero/>
            <Sdg/>
            <About/>
            <Footer/>
        </div>
    )
}
