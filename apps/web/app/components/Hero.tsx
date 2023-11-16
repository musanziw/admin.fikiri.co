'use client'
import Link from "next/link";
import slide1 from '@/public/hero.webp'
import Image from "next/image";
import Topbar from "@/app/components/Topbar";

export function Hero() {
    return (
        <div className={'relative py-20 mb-10 bg-indigo-50'}>
            <Topbar background={'bg-indigo-50'}/>

            <div className={'p-8 h-full grid grid-cols-1 items-center md:grid-cols-2 md:mx-auto md:max-w-screen-lg'}>
                <div className={'flex flex-col justify-center items-start'}>
                    <h1 className={`text-6xl font-bold text-black mb-6`}>
                        Fikiri<span className={'text-6xl font-bold text-indigo-500'}>.</span>
                    </h1>
                    <h2 className={`text-2xl text-gray-700 mb-6 font-semibold`}>
                        Cartographie des solutions locales pour accélérer l&apos;atteinte des ODD en RDC.
                    </h2>
                    <p className={'mb-10'}>
                        Fikiri est une plateforme web qui vise à cartographier les solutions locales en République
                        Démocratique du Congo pour accélérer l&apos;atteinte des Objectifs de Développement Durable (ODD).
                    </p>
                    <Link href={'/'}
                          className={'px-6 py-2 inline-block mb-10 rounded-md bg-indigo-500 text-white font-semibold'}>
                        Postulez maintenant
                    </Link>
                </div>

                <div className={'w-3/4 justify-self-center md:justify-self-end'}>
                    <Image src={slide1} alt={'Slide 1'} className={'rounded-xl'}/>
                </div>

            </div>

        </div>
    )
}