import Link from "next/link";
import {AuthCard} from "@/app/(auth)/components/AuthCard";
import {Input} from "@/app/(auth)/components/Input";
import {Button} from "@/app/(auth)/components/Button";

export default function ForgotPassowrd() {
    return (
        <AuthCard title={'Mot de passe oublié ?'}>
            <form action="" className="space-y-8 flex flex-col justify-center">
                <Input name={'email'} label={'Email'} placeholder={'Entrez votre email'} type={'email'}/>
                <Button label={'Envoyez'}/>
                <p className="border-t border-gray-300 pt-6 text-sm text-gray-500 dark:text-gray-400">
                    Vous avez un compte ? <Link href={'login'} className="text-gray-950">
                    Connectez-vous
                </Link>
                </p>
            </form>
        </AuthCard>
    )
}