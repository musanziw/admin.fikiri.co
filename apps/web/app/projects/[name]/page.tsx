import Topbar from "@/app/components/Topbar";
import Image from "next/image";
import projectImg from '@/public/project.webp'
import {Footer} from "@/app/components/Footer";

export default function Page({params}: { params: { name: string } }) {
    return (
        <div className={'overflow-x-hidden'}>
            <div className={`relative mb-16 h-screen bg-[url('/project.webp')] bg-no-repeat bg-cover bg-center`}>
                <Topbar/>
                <div
                    className="absolute p-10 h-full flex flex-col justify-center w-full bg-gradient-to-b from-indigo-950/70 to-indigo-950">
                    <h2 className={'text-white text-5xl font-semibold mb-8 uppercase'}>
                        {params.name}
                    </h2>
                    <p className={'text-gray-50 text-xl font-thin'}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum.
                    </p>
                </div>
            </div>

            <div className={'p-8 grid grid-cols-1 gap-10 md:grid-cols-2 mx-auto container md:max-w-screen-lg '}>

                <div className="grid grid-rows-2 grid-cols-3 gap-4">

                    <div className="col-span-2">
                        <Image src={projectImg} alt={'Img p'} className={'rounded-xl'}/>
                    </div>
                    <div className="col-span-2">
                        <Image src={projectImg} alt={'Img p'} className={'rounded-xl'}/>
                    </div>
                    <div className="">
                        <Image src={projectImg} alt={'Img p'} className={'rounded-xl'}/>
                    </div>
                </div>

                <p className={'text-gray-800'}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum.
                </p>
            </div>
            <Footer />
        </div>
    )
}