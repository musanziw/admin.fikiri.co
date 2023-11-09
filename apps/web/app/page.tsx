export default function Home() {
    return (
        <>
            <div className="relative h-[10vh] w-screen text-gray-950">
                <div className="px-16 py-10 flex justify-between items-center bg-blue-100">
                    <h1 className="text-xl font-extrabold">
                        Fikiri
                    </h1>
                    <ul className="hidden lg:flex flex-col items-center gap-5 lg:flex-row capitalize font-medium">
                        <li><a href="">Solutions</a></li>
                        <li><a href="">Contact</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Connection</a></li>
                        <li><a href="" className="bg-blue-600 rounded-md px-6 py-2 text-white">S'inscrire</a></li>
                    </ul>
                    <div class="flex flex-col gap-2 lg:hidden">
                        <div class="h-[1px] w-6 bg-black"></div>
                        <div class="h-[1px] w-6 bg-black"></div>
                    </div>
                </div>

            </div>

            <div className="w-screen bg-blue-100 -mt-3 pt-16 lg:pt-0">
                <div
                    className="mx-auto max-w-screen-lg p-8 h-screen flex flex-col gap-10 pt-10 lg:pt-0 items-center lg:justify-between lg:flex-row">
                    <div className="text-center lg:w-2/4">
                        <h2 className="font-bold text-lg text-center text-gray-800 lg:text-3xl lg:leading-10">
                            Cartographie des solutions compatibles aux objectifs de Développement durables en RDC.
                        </h2>
                        <button className="bg-blue-700 rounded-md px-6 py-3 text-white font-semibold mt-6">
                            Candidater
                        </button>
                    </div>
                    <img src="/assets/imgs/sdg-img.png" alt="hero cover" class="h-[250px] lg:h-[350px]">
                </div>

            </div>

            <div className="p-8 mb-10">
                <div className="mx-auto max-w-screen-lg">
                    <h2 className="text-2xl font-semibold mb-3">
                        Les solutions innovantes
                    </h2>
                    <p className="text-gray-500 mb-10 w-full md:w-2/3">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ad adipisci
                        alias aliquid
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium ad adipisci
                        alias aliquid
                    </p>

                    <div className="flex flex-col items-start gap-10 lg:flex-row">

                        <div className="flex items-center flex-wrap gap-5 lg:flex-col lg:items-start lg:w-3/4">
                            <div
                                className="flex items-center justify-between border-2 rounded-md px-4 py-2 gap-5 w-full">
                                <p className="font-medium">
                                    Thématique
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="bi bi-chevron-right h-4 w-4 stroke-blue-800"
                                     viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>

                            <div
                                className="flex items-center justify-between border-2 rounded-md px-4 py-2 gap-5 w-full">
                                <p className="font-medium">
                                    Ville
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="bi bi-chevron-right h-4 w-4 stroke-blue-800"
                                     viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>

                            <h1 className="font-medium">
                                Totoal : <span className="text-blue-600">3 solutions</span>
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                            <div className="flex flex-col h-[340px] rounded-md shadow-xl">
                                <img src="assets/imgs/contact.jpg" alt="Img project" className="h-[140px] rounded-t-md">
                                    <div className="p-4">
                                        <h2 className="font-medium text-gray-950 mb-3">
                                            Titre de la solution
                                        </h2>
                                        <p className="text-sm mb-5">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                                            accusantium ad adipisci alias aliquid
                                        </p>
                                        <p className="text-gray-900 font-medium text-sm mb-3">
                                            Lubumbashi: Santé
                                        </p>
                                    </div>
                            </div>

                            <div className="flex flex-col h-[340px] rounded-md shadow-xl">
                                <img src="assets/imgs/contact.jpg" alt="Img project" className="h-[140px] rounded-t-md">
                                    <div class="p-4">
                                        <h2 class="font-medium text-gray-950 mb-3">
                                            Titre de la solution
                                        </h2>
                                        <p class="text-sm mb-5">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                                            accusantium ad adipisci alias aliquid
                                        </p>
                                        <p class="text-gray-900 font-medium text-sm mb-3">
                                            Lubumbashi: Santé
                                        </p>
                                    </div>
                            </div>

                            <div class="flex flex-col h-[340px] rounded-md shadow-xl">
                                <img src="assets/imgs/contact.jpg" alt="Img project" class="h-[140px] rounded-t-md">
                                    <div class="p-4">
                                        <h2 class="font-medium text-gray-950 mb-3">
                                            Titre de la solution
                                        </h2>
                                        <p class="text-sm mb-5">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                                            accusantium ad adipisci alias aliquid
                                        </p>
                                        <p class="text-gray-900 font-medium text-sm mb-3">
                                            Lubumbashi: Santé
                                        </p>
                                    </div>
                            </div>


                        </div>


                    </div>
                </div>
            </div>


        </>
)
}
