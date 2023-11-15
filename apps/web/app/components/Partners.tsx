import Image from "next/image";

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
                        <div className={''} key={index}>
                            <Image src={'/logo.png'} alt={'Partenaire 1'} width={100} height={100} className={'grayscale ml-2'}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}