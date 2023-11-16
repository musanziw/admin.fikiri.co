import Image from "next/image";
import logo from '@/public/logo.png'

export default function Partners() {

    const partners = new Array(6).fill(0)

    return (
        <div className={'ml-4 p-4 text-gray-800 border-x border-dashed lg:mx-auto lg:max-w-screen-lg py-20'}>
            <h3 className={'text-sm uppercase text-center font-bold mb-10'}>
                Nos partenaires
            </h3>

            <div className={'flex items-center justify-center flex-wrap gap-5'}>
                {
                    partners.map((_, index) => (
                            <Image src={logo} alt={'Partenaire 1'} className={'grayscale ml-2 w-24'} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}