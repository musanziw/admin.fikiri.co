'use client'

import Topbar from "@/app/components/Topbar";
import axios from "@/app/config/axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from 'next/image'
import { Input } from "../utils/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import moment from 'moment';
import Link from "next/link";

export default function Solution() {
    const { data: account, status } = useSession()
    const [solutions, setSolutions] = useState<any>()
    const [user, setUser] = useState<any>()
    const [active, setActive] = useState<string>('profile')
    const [name, setName] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [pending, setPending] = useState(false)
    const router = useRouter()

    const STATUS = [
        'Reçue',
        'En attente',
        'Cartographiée',
        'Explorée',
        'Experimentée'
    ]

    useEffect(() => {
        if (status === 'authenticated') {
            const payload = {
                name: account?.user?.name,
                email: account?.user?.email,
                profile: account?.user?.image
            }
            axios.post(`users/create`, JSON.stringify(payload)).then(() => { })
            axios.get(`auth/profile/${account?.user?.email}`).then(({ data: apiResponse }) => {
                setName(apiResponse.data.name)
                setAddress(apiResponse.data.address)
                setPhoneNumber(apiResponse.data.phoneNumber)
                setUser(apiResponse.data)
            })
        }
        axios.get(`solutions/user/${account?.user?.email}`).then(({ data: apiResponse }) => {
            setSolutions(apiResponse.data)
        }).catch(() => { })
    }, [account?.user?.email, status, account?.user?.name])

    async function updateProfile(e: any) {
        e.preventDefault()
        setPending(true)
        const updatedUser = {
            name,
            address,
            phoneNumber
        }
        try {
            await axios.patch(`users/${user?.id}`, JSON.stringify(updatedUser))
            toast.success('Votre profil a été mis à jour')
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
            <div className={'relative'}>
                <Topbar background={'bg-white'} />
                <div className="p-8 flex flex-col mx-6 justify-center max-w-screen-md md:mx-auto border-x border-dashed">
                    {
                        account?.user?.image ? (
                            <>
                                <div className="rounded-full mb-5 h-20 w-20 mt-20 md:h-32 md:w-32 bg-gray-100 flex items-center justify-center">
                                    <Image src={account?.user?.image} alt={account?.user?.name || 'User image'} width={100} height={100} className={'rounded-full object-cover'} />
                                </div>
                            </>
                        ) : <>
                            <div className="rounded-full mt-20 mb-4 h-20 w-20 md:h-32 md:w-32 bg-gray-100 flex items-center justify-center">
                                <h1 className={'text-center text-gray-800 font-bold text-xl'}>
                                    {account?.user?.name?.split(' ')[0][0]}
                                </h1>
                            </div>
                        </>
                    }

                    <div className="flex flex-col items-start gap-3 mb-5">
                        <h1 className={'text-4xl font-bold text-gray-950'}>Mon compte</h1>
                        <h2 className={'text-gray-500'}>
                            Gérez vos solutions et vos informations personnelles, inscrit
                            <span className="font-semibold ml-2">
                                {moment(user?.createdAt).locale('fr').fromNow(false)}
                            </span>
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={'text-gray-500 rounded-md bg-gray-200 px-2 font-bold py-1'}>{account?.user?.email}</h3>
                                <h3 className={'text-gray-500'}>{account?.user?.name}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-5 mb-6">
                        <button className={`pb-1 after:block after:h-[2px]  ${active === 'profile' && 'after:bg-indigo-400'}`} onClick={() => setActive('profile')}>
                            Mon profil
                        </button>
                        <button className={`pb-1 after:block after:h-[2px]  ${active === 'solutions' && 'after:bg-indigo-400'}`} onClick={() => setActive('solutions')}>
                            Mes solutions
                        </button>
                    </div>

                    <div className="mb-6">
                        {
                            active === 'profile' && (
                                <>
                                    <form action="" className={'flex flex-col gap-5 w-full md:w-2/3'} onSubmit={updateProfile}>
                                        <Input name={'name'} label={'Nom'} placeholder={''} type={'name'} value={name} onChange={(e) => setName(e.target.value)} />
                                        <Input name={'address'} label={'Adresse'} placeholder={''} type={'text'} value={address} onChange={(e) => setAddress(e.target.value)} />
                                        <Input name={'phoneNumber'} label={'Téléphone'} placeholder={''} type={'text'} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                        <button type="submit" className={`px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-indigo-500 text-white font-semibold ${pending}`} disabled={pending}>
                                            {pending ? "Mise à jour..." : "Enregistrez les informations"}
                                        </button>
                                    </form>
                                </>
                            )
                        }
                        {
                            active === 'solutions' && (
                                <>
                                    {
                                        solutions?.length === 0 && (
                                            <div className={'flex flex-col gap-4'}>
                                                <h1>
                                                    Vous n&apos;avez pas encore de solutions
                                                </h1>
                                                <h2 className={'text-2xl font-semibold'}>Comment postulez ?</h2>
                                                <h3 className={'text-lg font-medium'}>1. Allez sur l&apos;acceuil, cliquez sur le boutton postulez</h3>
                                                <h3 className={'text-lg font-medium'}>2. Remplissez attentivement le formulaire</h3>
                                                <h3 className={'text-lg font-medium'}>3. Suivez l&apos;évolution de ce dernier dans votre compte, Merci !</h3>
                                            </div>
                                        )
                                    }

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {
                                            solutions && solutions.map((solution: any, i: number) => (
                                                <>
                                                    <div className="overflow-hidden">
                                                        <h2 className={'text-gray-800 text-lg font-semibold mb-4'}>
                                                            {solution.name}, soumis
                                                            <span className={'font-medium ml-2'}>
                                                                {moment(solution.status.createdAt).locale('fr').fromNow(false)}
                                                            </span>
                                                            <Link className={'text-indigo-400 inline-block ml-2'} href={`/me/solutions/${solution.id}`}  aria-label={`${solution.name}`}>
                                                                Modifier la solution
                                                            </Link>
                                                        </h2>

                                                        <>
                                                            {
                                                                STATUS.map((status: string, i: number) => {

                                                                    return (
                                                                        <>
                                                                            <div className="flex items-center gap-3 mb-4">
                                                                                <span className={`inline-block rounded-full p-3 ${solution.status.id >= i ? 'bg-green-300' : 'bg-gray-300'}`}>
                                                                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                                                                                        <path fillRule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
                                                                                    </svg>
                                                                                </span>

                                                                                <h5>{status}</h5>
                                                                            </div>
                                                                        </>
                                                                    )

                                                                })
                                                            }
                                                        </>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}