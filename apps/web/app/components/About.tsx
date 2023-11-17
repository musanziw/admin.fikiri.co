import logo from '@/public/logo.png'
import Image from "next/image";

export function About() {
    const partners = new Array(6).fill(0)
    return (
        <div className={'p-8 bg-indigo-50'}>
            <div className={'lg:mx-auto lg:max-w-screen-lg flex flex-col gap-4 lg:flex-row py-20'}>
                <h1 className={'text-2xl font-bold mb-4 basis-10/12'}>
                    A propos de Fikiri
                </h1>
                <div className={'flex flex-col gap-5 lg:text-lg'}>
                    <p>
                        Fikiri est une plateforme web qui vise à cartographier les solutions locales en République
                        Démocratique du Congo pour accélérer l&apos;atteinte des Objectifs de Développement Durable
                        (ODD).
                    </p>
                    <p>
                        L&apos;objectif de Fikiri est de mettre en lumière les solutions locales qui contribuent à
                        l&apos;atteinte
                        des ODD en RDC. Cela permettra de faciliter la recherche des solutions locales par les
                        organisations internationales et les bailleurs de fonds.
                    </p>

                    <p className={'text-sm uppercase font-semibold mb-4'}>
                       Nous travaillons avec des partenaires
                    </p>

                    <div className={'overflow-hidden'}>
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
            </div>
        </div>
    )
}