'use client'
import Link from "next/link";
import slide1 from '@/public/hero.webp'
import Image from "next/image";
import Topbar from "@/app/components/Topbar";
import {Typewriter} from "react-simple-typewriter";

export function Hero() {
    return (
        <div className={'relative py-20 pt-32 bg-indigo-50'}>
            <Topbar background={'bg-indigo-50'}/>

            <div className={'p-8 h-full grid grid-cols-1 items-center md:grid-cols-2 md:mx-auto md:max-w-screen-lg'}>
                <div className={'flex flex-col justify-center items-start'}>
                    <h1 className={`text-4xl font-bold text-gray-800`}>
                            <Typewriter words={['Thématique 1', 'Thématique 2', 'Thématique 3', 'Fikiri']}
                                        cursor={true}
                                        loop={false}
                            />
                        <span className={'text-5xl font-bold text-indigo-500'}>.</span>
                    </h1>
                    <h2 className={`text-2xl text-gray-700 mb-6 font-semibold mt-6`}>
                        Cartographie des solutions locales pour accélérer l&apos;atteinte des ODD en RDC.
                    </h2>
                    <p className={'mb-10'}>
                        Fikiri est une plateforme web qui vise à cartographier les solutions locales en République
                        Démocratique du Congo pour accélérer l&apos;atteinte des Objectifs de Développement Durable
                        (ODD).
                    </p>
                    <Link href={'/'}
                          className={'px-6 py-2 inline-block mb-10 rounded-md bg-indigo-500 text-white font-semibold'}>
                        Postulez maintenant
                    </Link>
                </div>



                <div className={'md:justify-self-end md:w-3/4 relative overflow-hidden'}>
                    {/*<div className="absolute -inset-x-1  -top-[25.5%] scale-x-125 scale-y-75 2xl:scale-95 bg-indigo-50 z-10 h-1/2 rounded-[100%]"></div>*/}
                    {/*<div className="absolute -inset-x-1  -bottom-[25.5%] scale-x-125 scale-y-75 2xl:scale-95 bg-indigo-50 z-10 h-1/2 rounded-[100%]"></div>*/}
                    <div className="w-full marquee-10 sm:marquee-15 lg:marquee-20">
                        <div className="grid grid-cols-7 gap-1 h-[25rem] w-[45rem]">
                            <Image src={slide1} alt={'Slide 1'} className={'w-full h-full object-cover'}/>
                            <Image src={slide1} alt={'Slide 1'} className={'w-full h-full object-cover col-span-3'}/>
                            <Image src={slide1} alt={'Slide 1'} className={'w-full h-full object-cover'}/>
                            <Image src={slide1} alt={'Slide 1'} className={'w-full h-full object-cover col-span-2'}/>
                            <Image src={slide1} alt={'Slide 1'} className={'w-full h-full object-cover'}/>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}