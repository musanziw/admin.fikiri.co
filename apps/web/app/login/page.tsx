"use client";

import { useRef, RefObject, useState, FormEvent, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "@/app/config/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/app/utils/AuthCard";
import { Button } from "@/app/utils/Button";
import Topbar from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";
import googleLogo from "@/public/googleLogo.svg"
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Login() {
  const emailRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const LOGIN_URI = "auth/login-with-credentials";

  function loginWithGoogle(e: FormEvent) {
    e.preventDefault();
    signIn('google')
  }

  async function loginWithCredentials(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    try {
      setIsLoading(true);
      const payload = {
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || "",
      };
      const { data: apiReponse } = await axios.post(LOGIN_URI, JSON.stringify(payload));
      if (apiReponse.data.accessToken) {
        toast.success("Connexion réussie ");
        setTimeout(() => {
          router.push("/");
        }, 2000)
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Topbar background="bg-white" />
      <AuthCard title={"Connectez-vous"}>
        <form action="" className="space-y-8 flex flex-col justify-center">
          {/* <Input name={'email'} label={'Email'} placeholder={'Entrez votre email'} type={'email'}/> */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-800">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Entrez votre email"
              className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-gray-800">
              Mot de passe
            </label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="Entrez votre mot de pass"
              className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
            />
          </div>

          <Button isLoading={isLoading} label={isLoading ? "Connexion en cours..." : "Se connecter"} onclick={() => { }} />
          <button className={'rounded-full px-3 py-2 border  flex items-center justify-center gap-8 hover:bg-gray-100 transition-colors duration-200'} onClick={loginWithGoogle}>
            Se connecter avec google
            <Image src={googleLogo} alt={'google logo'} className={'w-6 h-auto'} />
          </button>
          <p className="border-t border-gray-300 pt-6 text-sm text-gray-500">
            Vous n&lsquo;avez pas de compte ?
            <Link href={"register"} className="text-gray-950">
              Inscrivez-vous
            </Link>
          </p>
        </form>
      </AuthCard>
      <Footer />
      <ToastContainer />
    </>
  );
}