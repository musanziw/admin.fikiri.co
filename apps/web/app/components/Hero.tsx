import Link from "next/link";

export function Hero() {
    return (
        <div className={'relative bg-hero bg-no-repeat bg-cover bg-center'}>
            <div
                className={'relative bg-gradient-to-b from-indigo-950/60 to-indigo-950/25 p-8 h-screen flex flex-col justify-center items-start lg:p-40'}>
                <h1 className={`text-6xl font-bold text-white mb-6`}>
                    Fikiri<span className={'text-6xl font-bold text-indigo-500'}>.</span>
                </h1>
                <h2 className={`text-2xl text-white mb-6 font-medium`}>
                    Cartographie des solutions locales pour accélérer l&apos;atteinte des ODD en RDC.
                </h2>
                <Link href={'/'} className={'px-6 py-2 inline-block rounded-md bg-indigo-500 text-white font-semibold'}>
                    Postulez maintenant
                </Link>
            </div>
        </div>
    )
}