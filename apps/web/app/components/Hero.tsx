import Link from "next/link";

export function Hero() {
    return (
        <div className={'bg-gradient-to-b from-indigo-950/50 to bg-indigo-800/60'}>
            <div
                className={'relative p-8 mx-auto container h-screen flex flex-col justify-center items-start'}>
                <h1 className={'text-6xl font-bold text-white uppercase mb-6'}>
                    Fikiri<span className={'text-6xl font-bold text-indigo-500'}>.</span>
                </h1>
                <h2 className={'text-2xl text-white mb-6'}>
                    Cartographie des solutions locales pour accélérer l'atteinte des ODD en RDC.
                </h2>
                <Link href={'/'} className={'px-6 py-2 inline-block rounded-md bg-indigo-500 text-white font-semibold'}>
                    Postulez maintenant
                </Link>
            </div>
        </div>
    )
}