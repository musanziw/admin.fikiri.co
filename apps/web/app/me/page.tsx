'use client'

import Topbar from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";
import axios from "@/app/config/axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";

export default function Solution() {
    const { account, token } = useAuthContext()
    const [solutions, setSolutions] = useState<any>()
    const [active, setActive] = useState<string>('profile')

    useEffect(() => {
        (() => {
            if (account.id) {
                axios.get(`solutions/user/${account.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(({ data: apiResponse }) => {
                    setSolutions(apiResponse.data)
                }).catch(() => { })
            }
        })()
    }, [account?.id, token])

    return (
        <>
            <div className={'relative'}>
                <Topbar background={'bg-white'} />
                <div className="flex flex-col mx-6 justify-center max-w-screen-md md:mx-auto border-x border-dashed">
                    <div className="p-8 pt-24 flex flex-col items-center md:items-start gap-5">
                        <div className="rounded-full h-20 w-20 md:h-32 md:w-32 bg-gray-100 flex items-center justify-center">
                            <h1 className={'text-center text-gray-800 font-bold text-xl'}>
                                {account?.name?.split(' ')[0][0]}{account?.name?.split(' ')[1][0]}
                            </h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2 className={'text-2xl text-gray-950'}>Mon compte</h2>
                            <div className="flex items-center gap-2">
                                <h3 className={'text-gray-500 rounded-md bg-gray-200 px-4 py-1'}>{account?.email}</h3>
                                <h3 className={'text-gray-500'}>{account?.name}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 flex gap-5 text-lg">
                        <button className={`pb-1 after:block after:h-[2px]  ${active === 'profile' && 'after:bg-indigo-400'}`} onClick={() => setActive('profile')}>
                            Mon profil
                        </button>
                        <button className={`pb-1 after:block after:h-[2px]  ${active === 'solutions' && 'after:bg-indigo-400'}`} onClick={() => setActive('solutions')}>
                            Mes solutions
                        </button>
                    </div>

                    <div className="px-8 mb-6">

                        {
                            active === 'profile' && (
                                <>
                                    <h1>
                                        Page en cours de construction...
                                    </h1>
                                </>
                            )
                        }

                        {
                            active === 'solutions' && (
                                <>
                                    {
                                        solutions?.length === 0 && (
                                            <h1>
                                                Vous n&apos;avez pas encore de solutions
                                            </h1>
                                        )
                                    }
                                    {
                                        !solutions && active === 'solutions' && (
                                            <h1>
                                                En cours de chargement...
                                            </h1>
                                        )
                                    }
                                    {
                                        solutions.map((solution: any) => (
                                            <>
                                                <div className="grid grid-cols-1 md:grid-cols-2">
                                                    <div className="px-6 py-8 rounded-md border">
                                                        <h2 className={'text-gray-800 text-lg font-semibold'}>
                                                            {solution.name} <span className={'bg-orange-400/30 text-sm px-6 py-1 rounded-sm text-dark inline-block ml-2 font-bold'}>{solution.status.name}</span>
                                                        </h2>
                                                        <p className={'mt-4'}>
                                                            {solution.description}
                                                        </p>
                                                        <p className={'mt-4'}>
                                                            {solution.targetedProblem}
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }

                                </>
                            )
                        }

                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}