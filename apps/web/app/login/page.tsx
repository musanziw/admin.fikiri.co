import Link from "next/link";

export default function Login() {
    return (
        <div className={'bg-gray-100'}>
            <div className="relative py-16">
                <div className="container relative m-auto px-6 md:px-12 xl:px-40">
                    <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12">
                        <Link href={'/'}>
                            <div className="flex items-center justify-center">
                                <img src="/sdg-img.png" loading="lazy" className="w-24" alt="tailus logo"/>
                            </div>
                        </Link>
                        <div
                            className="rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 backdrop-blur-2xl">
                            <div className="p-8 py-12 sm:p-16">
                                <h2 className="mb-8 text-2xl font-bold">Connectez-vous</h2>
                                <form action="" className="space-y-8 flex flex-col justify-center">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-gray-800">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            className="focus:outline-none block w-full rounded-md border border-gray-200 bg-transparent px-4 py-2 transition duration-300 invalid:ring-2 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="pwd" className="text-gray-800">Mot de passe</label>
                                            <Link href={'forgot-password'} className="-mr-2 p-2" type="reset">
                                                <span className="text-sm text-gray-600">Mot de passe oublié ?</span>
                                            </Link>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            className="focus:outline-none block w-full rounded-md border border-gray-200 bg-transparent px-4 py-2 transition duration-300 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <button type="submit" className={'py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-500 transition-colors duration-300'}>
                                        Se connecter
                                    </button>

                                    <p className="border-t border-gray-300 pt-6 text-sm text-gray-500 dark:text-gray-400">
                                        Vous n'avez pas de compte ? <Link href={'register'} className="text-gray-950">
                                            Inscrivez-vous
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}