import Link from "next/link";
import {AuthCard} from "@/app/(auth)/components/AuthCard";
import {Input} from "@/app/(auth)/components/Input";
import {Button} from "@/app/(auth)/components/Button";

export default function ResetPassowrd() {
    return (
        <AuthCard title={'Réinitialiser le mot de passe'}>
            <form action="" className="space-y-8 flex flex-col justify-center">
                <Input label={'Code à 6 chiiffres'} type={'text'} name={'token'}
                       placeholder={"Saisissez le code à 6 chiiffres"}/>
                <Input label={'Mot de passe'} type={'password'} name={'password'}
                       placeholder={"Saisissez le mot de passe"}/>
                <Button label={'Réinitialiser le mot de passe'}/>
                <p className="border-t border-gray-300 pt-6 text-sm text-gray-500 dark:text-gray-400">
                    Vous avez un compte ? <Link href={'login'} className="text-gray-950">
                    Connectez-vous
                </Link>
                </p>
            </form>
        </AuthCard>
    )
}