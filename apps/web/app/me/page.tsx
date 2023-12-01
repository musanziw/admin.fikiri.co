'use client'

import Topbar from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";
import axios from "@/app/config/axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";

export default function Solution() {
    const { account, token } = useAuthContext()
    const [solutions, setSolutions] = useState<any>()

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
                    <div className="p-4 pt-24 flex flex-col items-center gap-3">
                        <div className="rounded-full h-20 w-20 bg-gray-200 flex items-center justify-center">
                            <h1 className={'text-center text-gray-800 font-bold'}>
                                {account?.name?.split(' ')[0][0]}{account?.name?.split(' ')[1][0]}
                            </h1>
                        </div>
                        <p className={'text-lg'}>Mon compte</p>
                    </div>

                    <div className="p-8">
                        {
                            solutions && solutions.map((solution: any) => (
                                <>
                                    <div className="grid grid-cols-1">
                                        <div className="p-6 rounded-md border">
                                            <h2 className={'text-gray-800 text-lg font-semibold'}>
                                                {solution.name}, <span className={'text-orange-400'}>{solution.status.name}</span>
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

                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}