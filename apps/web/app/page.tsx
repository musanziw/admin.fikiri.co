import {Hero} from "@/app/components/Hero";
import {Solutions} from "@/app/components/Solutions";
import {About} from "@/app/components/About";
import {Footer} from "@/app/components/Footer";

export default function Home() {
    return (
        <div className={'relative overflow-x-hidden'}>
            <Hero/>
            <Solutions/>
            <About/>
            <Footer/>
        </div>
    )
}
