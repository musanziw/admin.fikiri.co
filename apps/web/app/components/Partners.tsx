import Image from "next/image";
import logo from '@/public/logo.png'

export default function Partners() {

    const partners = new Array(6).fill(0)

    return (
        <div className={'ml-4 p-4 text-gray-600 border-l border-dashed lg:mx-auto lg:max-w-screen-lg py-20'}>
            <h3 className={'text-2xl font-bold mb-5'}>
                Nos partenaires
            </h3>
            <p className={'mb-10 md:w-2/3'}>
                Nous travaillons avec des partenaires locaux et internationaux pour cartographier les solutions locales
                en République Démocratique du Congo.
            </p>
            <div className={'flex flex-wrap gap-5'}>
                {
                    partners.map((_, index) => (
                            <Image src={logo} alt={'Partenaire 1'} className={'grayscale ml-2 w-24'} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}