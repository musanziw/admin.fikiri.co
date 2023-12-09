"use client";

import {useState, FormEvent} from "react";
import Link from "next/link";
import {AuthCard} from "@/app/utils/AuthCard";
import {Button} from "@/app/utils/Button";
import {signIn} from "next-auth/react";
import {Input} from "@/app/utils/Input";
import googleLogo from "@/public/googleLogo.svg"
import Image from "next/image";
import Topbar from "@/app/components/Topbar";
import axios from "@/app/config/axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {postData} from "@/requests/_postData";


export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [pending, setPending] = useState<boolean>(false)

    async function loginWithCredentials(e: FormEvent) {
        e.preventDefault();
        setPending(true)
        if (!password && !email) {
            setPending(false)
            return toast.error('Veuillez remplir les champs')
        }
        const payload = {
            email,
            password
        }
        const {data, error} = await postData('auth/login', payload)
        if (data) {
            await signIn("credentials", {
                email: email,
                password: password,
                callbackUrl: '/me'
            })
            setPending(false)
            toast.success(`Bienvenue ${data.name} !`);
        }
        if (error) {
            setPending(false)
            toast.error(error);
        }
    }

    async function loginWithGoogle(e: FormEvent) {
        e.preventDefault();
        await signIn('google', {
            callbackUrl: '/me'
        })
    }

    return (
        <>
            <Topbar background={'bg-white'}/>
            <AuthCard title={"Se connecter"}>
                <form action="" className="space-y-8 flex flex-col justify-center">
                    <Input name={'email'} label={'Email'} placeholder={'Entrez votre email'} type={'email'}
                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input name={'password'} label={'Mot de passe'} placeholder={'Entrez votre mot de passe'}
                           type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button isLoading={pending} label={pending ? "Connexion en cours..." : "Se connecter"}
                            onclick={loginWithCredentials}/>
                    <button
                        className={'rounded-full text-sm md:text-base px-3 py-2 border gap-8 hover:bg-gray-100 transition-colors duration-200 relative'}
                        onClick={loginWithGoogle}>
                        Se connecter avec google
                        <Image src={googleLogo} alt={'google logo'} className={'w-6 h-auto absolute top-2 right-2'}/>
                    </button>
                    <p className="border-t border-gray-300 pt-6 text-sm text-gray-500">
                        Vous n&lsquo;avez pas de compte ?
                        <Link href={"/api/auth/signup"} className="text-gray-950 inline-block ml-1">
                            Inscrivez-vous
                        </Link>
                    </p>
                </form>
            </AuthCard>
            <ToastContainer/>
        </>
    );
}