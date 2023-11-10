import Image from "next/image";
import hero from '../public/sdg-img.png';
import Link from "next/link";

export default function Home() {
    return (
        <div className={'overflow-x-hidden flex flex-col items-center justify-center'}>
            <div className="relative h-[10vh] w-screen text-gray-950">
                <div className="px-16 py-10 flex justify-between items-center bg-blue-100">
                    <h1 className="text-xl font-extrabold">
                        Fikiri
                    </h1>
                    <ul className="hidden lg:flex flex-col items-center gap-5 lg:flex-row font-medium">
                        <li><Link href="">Solutions</Link></li>
                        <li><Link href="">Contact</Link></li>
                        <li><Link href="">About</Link></li>
                        <li><Link href="login" className={'px-6 py-2 rounded-md border-2'}>Se connecter</Link></li>
                        <li><Link href="register"
                                  className="bg-blue-600 rounded-md px-6 py-2 text-white">S'inscrire</Link></li>
                    </ul>
                    <div className="flex flex-col gap-2 lg:hidden">
                        <div className="h-[1px] w-6 bg-black"></div>
                        <div className="h-[1px] w-6 bg-black"></div>
                    </div>
                </div>

            </div>

            {/*    hero */}
            <div className="w-screen bg-blue-100 -mt-3 pt-16 lg:pt-0">
                <div
                    className="mx-auto max-w-screen-lg p-8 h-screen flex flex-col gap-10 pt-10 lg:pt-0 items-center lg:justify-between lg:flex-row">
                    <div className="lg:w-2/4 flex items-center justify-center flex-col">
                        <h2 className="font-bold text-lg text-gray-800 lg:text-3xl text-center lg:leading-10">
                            Cartographie des solutions locales pour accélérer l'atteinte des ODD en RDC.
                        </h2>
                        <button className="bg-blue-700 rounded-md px-6 py-3 text-white font-semibold mt-6">
                            Candidater
                        </button>
                    </div>
                    <div className="overflow-hidden">
                        <Image src={hero} alt="hero cover" className={'h-[250px] lg:h-[350px] w-full'}/>
                    </div>
                </div>
            </div>


            {/* projects */}

            <div className="mx-auto max-w-screen-lg">
                <h2>
                    Les solutions compatibles aux objectifs de Développement durables en RDC.
                </h2>
            </div>

            {/*    contact */}

            <div className="w-screen bg-blue-700/90">
                <div className="container mt-24 mx-auto max-w-screen-lg">
                    <section className="p-8 rounded-md text-white">
                        <div className="flex flex-wrap items-center">
                            <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
                                <h2 className="mb-6 text-3xl font-bold">Nous contacter</h2>
                                <p className="mb-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Laudantium, modi accusantium ipsum corporis quia asperiores
                                    dolorem nisi corrupti eveniet dolores ad maiores repellendus enim
                                    autem omnis fugiat perspiciatis? Ad, veritatis.
                                </p>
                                <p className="mb-2">
                                    New York, 94126, United States
                                </p>
                                <p className="mb-2">
                                    + 01 234 567 89
                                </p>
                                <p className="mb-2">
                                    info@gmail.com
                                </p>
                                <p className="mb-2">
                                    &copy; 2023 PNUD. All Rights Reserved.
                                </p>
                            </div>

                            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
                                <form className="bg-blue-100/20 shadow-xl  p-6 rounded-md flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-medium" htmlFor="exampleInput90">Noms</label>
                                        <input type="text"
                                               className="block outline-none w-full p-2 focus:ring-4 ring-blue-600/60 rounded-md bg-blue-50/20 shadow-2xl text-sm placeholder:text-sm placeholder:text-gray-100"
                                               id="exampleInput90" placeholder="Saisir le nom"/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-medium" htmlFor="exampleInput90">E-mail</label>
                                        <input type="text"
                                               className="block outline-none w-full p-2 focus:ring-4 ring-blue-600/60 rounded-md bg-blue-50/20 shadow-2xl text-sm placeholder:text-sm placeholder:text-gray-100"
                                               id="exampleInput80" placeholder="Saisir l'email"/>

                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="font-medium" htmlFor="exampleInput90">Message</label>
                                        <textarea
                                            className="block min-h-[auto] w-full rounded border-0 bg-blue-50/20 outline-none p-2 focus:ring-4 ring-blue-600/60 h-[150px] ptext-sm placeholder:text-sm placeholder:text-gray-100"
                                            id="exampleFormControlTextarea1" placeholder="Your message"></textarea>
                                    </div>

                                    <button type="button"
                                            className="bg-blue-800 text-white font-medium text-sm rounded-md px-6 py-2">
                                        Envoyez
                                    </button>
                                </form>
                            </div>

                        </div>
                    </section>
                </div>

            </div>


        </div>
    )
}
