import Image from "next/image";

export function Solutions() {

    const solutions = new Array(8).fill(0);
    return (
        <div className={'ml-4 p-4 py-16 text-gray-600 border-l border-dashed lg:mx-auto lg:max-w-screen-lg'}>
            <h3 className={'text-2xl font-bold mb-5'}>
                Les solutions innovantes de la communauté
            </h3>
            <p className={'mb-10'}>
                Les solutions innovantes de la communauté sont des projets qui ont été mis en place par des
                organisations locales ou des individus pour résoudre les problèmes de la communauté.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {
                    solutions.map((_solution, index) => {
                        return (
                            <div className="flex flex-col gap-5" key={index}>
                                <div className="relative">
                                    <Image src={'/bg.jpg'} alt={'Project img'} width={200} height={200}
                                           className={'h-auto w-full rounded-xl'}/>
                                    <div
                                        className="h-full w-full absolute top-0 left-0 bg-indigo-400 bg-opacity-50 rounded-xl"></div>
                                </div>
                                <div className="pl-2">
                                    <h5 className={'text-gray-950 font-semibold text-lg mb-2'}>
                                        Projet titre {index + 1}
                                    </h5>
                                    <p className={'text-sm mb-3'}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, voluptatum?
                                    </p>
                                    <ul className="flex flex-wrap">
                                        <li className="mr-1.5">
                                            <div
                                                className="flex items-center rounded-full bg-indigo-500/25 px-3 py-1 text-xs font-medium leading-5 text-indigo-900">Lubumbashi
                                            </div>
                                        </li>
                                        <li className="mr-1.5">
                                            <div
                                                className="flex items-center rounded-full bg-indigo-500/25 px-3 py-1 text-xs font-medium leading-5 text-indigo-900">Sanitation
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}