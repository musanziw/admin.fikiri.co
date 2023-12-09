'use client'

import {Input} from "@/app/utils/Input";
import {useEffect, useState} from "react";
import {AuthCard} from "@/app/utils/AuthCard";
import Topbar from "@/app/components/Topbar";
import axios from "@/app/config/axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {FilePond} from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import {API_URL} from "@/app/config/api";

export default function Solution({params}: { params: { id: string } }) {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [targetedProblem, setTargetedProblem] = useState<string>('')
    const [pending, setPending] = useState<boolean>(false)
    const [status, setStatus] = useState<number>()
    const [solution, setSolution] = useState<any>()
    const router = useRouter()
    const [files, setFiles] = useState<any>([])

    useEffect(() => {
        axios.get(`solutions/${params.id}`)
            .then(({data: apiResponse}) => {
                const data = apiResponse.data
                setTargetedProblem(data.targetedProblem)
                setName(data.name)
                setDescription(data.description)
                setStatus(data.status.id)
                setSolution(data)
            })
    }, [params.id]);

    async function updateSolution(e: any) {
        e.preventDefault()
        setPending(true)
        const updatedSolution = {
            name,
            description,
            targetedProblem,
            status
        }
        try {
            await axios.patch(`solutions/${params.id}`, JSON.stringify(updatedSolution))
            toast.success('La solution a été mis à jour')
            setTimeout(() => {
                router.push('/me')
            }, 1000)
        } catch {
            toast.error('Echec de mis à jour')
            setTimeout(() => {
                router.refresh()
            }, 1000)
        }
        setPending(false)
    }

    return (
        <>
            <Topbar background={'bg-white'}/>
            <AuthCard title={'Modifier la solution'}>
                <form action="" className={'flex flex-col gap-5'}>

                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={false}
                        server={{
                            url: `${API_URL}solutions/${solution?.id}/image`
                        }}
                        name="thumb"
                        labelIdle='Selectionnez une image'
                    />

                    <Input name={'name'} label={'Nom de la solution'}
                           placeholder={''} type={'text'} value={name}
                           onChange={(e) => setName(e.target.value)}
                    />

                    <div className="flex flex-col gap-5">
                        <label className="text-gray-800">
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