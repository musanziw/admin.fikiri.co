import Link from "next/link";
import {AuthCard} from "@/app/(auth)/components/AuthCard";
import {Input} from "@/app/(auth)/components/Input";
import {Button} from "@/app/(auth)/components/Button";

export default function Register() {
    return (
        <div className={'bg-gray-100'}>
            <AuthCard title={'Inscrivez-vous'}>
                <form action="" className="space-y-8 flex flex-col justify-center">
                    <Input label={'Nom'} name={'name'} type={'text'} placeholder={'Saisissez le nom complet'}/>
                    <Input label={'Email'} name={'email'} type={'email'} placeholder={"Saisissez l'email"}/>
                    <Input label={'Téléphone'} name={'phone'} type={'text'}
                           placeholder={'Saisissez le numéro de téléphone'}/>
                    <Input label={'Mot de passe'} name={'password'} type={'password'}
                           placeholder={'Saisissez le mot de passe'}/>
                    <Input label={'Confirmation mot de passe'} name={'password_confirmation'} type={'password'}
                           placeholder={'Confirmez le mot de passe'}/>
                    <Button label={"S'inscire"}/>
                    <p className="border-t border-gray-300 pt-6 text-sm text-gray-500 dark:text-gray-400">
                        Vous avez un compte ? <Link href={'login'} className="text-gray-950">
                        Connectez-vous
                    </Link>
                    </p>
                </form>
            </AuthCard>
        </div>
    )
}