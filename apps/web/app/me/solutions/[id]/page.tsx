'use client'

import {Input} from "@/app/utils/Input";
import {useEffect, useState} from "react";
import {AuthCard} from "@/app/utils/AuthCard";
import Topbar from "@/app/components/Topbar";
import axios from "@/app/config/axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

export default async function Solution({params}: { params: { id: string } }) {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [targetedProblem, setTargetedProblem] = useState<string>('')
    const [pending, setPending] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const {data: apiResponse} = await axios.get(`solutions/${params.id}`)
            const solution = apiResponse.data
            setTargetedProblem(solution.targetedProblem)
            setName(solution.name)
            setDescription(solution.description)
        })()
    }, []);


    async function updateSolution(e: any) {
        e.preventDefault()
        setPending(true)
        const updatedSolution = {
            name,
            description,
            targetedProblem
        }
        try {
            await axios.patch(`solutions/${params.id}`, JSON.stringify(updatedSolution))
            toast.success('La solution a été mis à jour')
        } catch {
            toast.error('Echec de mis à jour')
        }
        setTimeout(() => {
            router.refresh()
        }, 1000)
        setPending(false)
    }


    return (
        <>
            <Topbar background={'bg-white'}/>
            <AuthCard title={'Modifier la solution'}>
                <form action="" className={'flex flex-col gap-5'}>
                    <Input name={'name'} label={'Nom de la solution'}
                           placeholder={''} type={'text'} value={name}
                           onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex flex-col gap-5">
                        <label htmlFor="illustration" className="text-gray-800">
                            La description de la solution
                        </label>
                        <textarea
                            name={'description'}
                            onChange={(e) => setDescription(e.target.value)}
                            className="focus:outline-none text-sm block w-full rounded-md h-[180px] border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
                            placeholder={"Decrire la solution ici..."}>
                    </textarea>
                    </div>

                    <div className="flex flex-col gap-5">
                        <label htmlFor="illustration" className="text-gray-800">
                            La description de la solution
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="focus:outline-none text-sm block w-full rounded-md h-[180px] border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
                            placeholder={"Decrire la solution ici..."}>
                    </textarea>
                    </div>

                    <div className="basis-1/2">
                        <label htmlFor="illustration" className="text-gray-800 inline-block mb-4">
                            Votre solution résoud quel problème ?
                        </label>
                        <textarea
                            value={targetedProblem}
                            onChange={(e) => setTargetedProblem(e.target.value)}
                            className=" lg:text-lg focus:outline-none text-sm block w-full rounded-md h-[180px] border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500"
                            placeholder={"Decrire le problème ici..."}
                        ></textarea>
                    </div>

                    <button type="submit"
                            className={`px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-indigo-500 text-white font-semibold`}
                            disabled={pending} onClick={updateSolution}>
                        {pending ? "Mise à jour..." : "Enregistrez les informations"}
                    </button>
                </form>
            </AuthCard>
        </>
    )
}