import Topbar from "@/app/components/Topbar";
import {Hero} from "@/app/components/Hero";
import {Solutions} from "@/app/components/Solutions";
import {About} from "@/app/components/About";
import Partners from "@/app/components/Partners";
import {Footer} from "@/app/components/Footer";

export default function Home() {
    return (
        <div className={'relative overflow-x-hidden'}>
            <Topbar/>
            <Hero/>
            <Solutions/>
            <About/>
            <Partners/>
            <Footer/>
        </div>
    )
}
