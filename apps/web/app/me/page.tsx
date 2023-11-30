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
        axios.get(`solutions/user/${account.email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(({ data: apiResponse }) => {
            setSolutions(apiResponse.data)
        })
    }, [account, token])


    return (
        <>
            <div className={'relative'}>
                <Topbar background={'bg-white'} />
                <div className="flex flex-col mx-6 justify-center max-w-screen-md md:mx-auto border-x border-dashed">
                    <div className="p-4 pt-24">
                        <h2>Votre tableau de bord avec votre(vos) solution.s</h2>
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