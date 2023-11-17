import logo from '@/public/logo.png'
import about from '@/public/about.webp'
import Image from "next/image";

export function About() {
    const partners = new Array(6).fill(0)
    return (
        <div className={'p-8 bg-indigo-50'} id={'about'}>
            <div className={'lg:mx-auto lg:max-w-screen-lg grid grid-cols-1 items-center md:grid-cols-2 gap-8 py-20'}>

                <div className={'flex flex-col gap-5 lg:text-lg'}>
                    <h1 className={'text-xl font-bold'}>
                       C'est quoi Fikiri ?
                    </h1>
                    <p>
                        Fikiri est une plateforme web qui vise à cartographier les solutions locales en République
                        Démocratique du Congo pour accélérer l&apos;atteinte des Objectifs de Développement Durable
                        (ODD).

                        L&apos;objectif de Fikiri est de mettre en lumière les solutions locales qui contribuent à
                        l&apos;atteinte
                        des ODD en RDC. Cela permettra de faciliter la recherche des solutions locales par les
                        organisations internationales et les bailleurs de fonds.
                    </p>


                    <div className={'overflow-hidden mt-5'}>
                        <div className="w-full marquee-10 sm:marquee-15 lg:marquee-20">
                            <div className={'flex items-center justify-center gap-10'}>
                                {
                                    partners.map((_, index) => (
                                        <Image src={logo} alt={'Partenaire 1'} className={'ml-2 w-24'} key={index}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Image src={about} alt={'About'} className={'rounded-xl grayscale hover:grayscale-0 transition-all duration-500'} />
            </div>
        </div>
    )
}