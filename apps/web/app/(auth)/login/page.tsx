import Link from "next/link";
import {AuthCard} from "@/app/(auth)/components/AuthCard";
import {Input} from "@/app/(auth)/components/Input";
import {Button} from "@/app/(auth)/components/Button";

export default function Login() {
    return (
        <AuthCard title={'Connectez-vous'}>
            <form action="" className="space-y-8 flex flex-col justify-center">
                <Input name={'email'} label={'Email'} placeholder={'Entrez votre email'} type={'email'}/>
                <Input name={'password'} label={'Mot de passe'} placeholder={'Entrez votre mot de passe'}
                       type={'password'}/>
                <p className="text-sm text-gray-900">
                    <Link href={'forgot-password'}>
                        Mot de passe oublié ?
                    </Link>
                </p>
                <Button label={'Se connecter'}/>
                <p className="border-t border-gray-300 pt-6 text-sm text-gray-500">
                    Vous n&lsquo;avez pas de compte ? <Link href={'register'} className="text-gray-950">
                    Inscrivez-vous
                </Link>
                </p>
            </form>
        </AuthCard>

    )
}