"use client";

import { useRef, RefObject, useState, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import axios from "@/app/config/axios";
import { AuthCard } from "@/app/utils/AuthCard";
import { Button } from "@/app/utils/Button";
import Topbar from "@/app/components/Topbar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import googleLogo from "@/public/googleLogo.svg"
import { signIn } from "next-auth/react";

const REGISTER_URI = "/auth/register";

export default function Register() {
  const nomRef: RefObject<HTMLInputElement> = useRef(null);
  const emailRef: RefObject<HTMLInputElement> = useRef(null);
  const telephoneRef: RefObject<HTMLInputElement> = useRef(null);
  const adressRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);
  const confirmedPasswordRef: RefObject<HTMLInputElement> = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const payload = {
        name: nomRef.current?.value || "",
        email: emailRef.current?.value || "",
        phoneNumber: telephoneRef.current?.value || "",
        address: adressRef.current?.value || "",
        password: passwordRef.current?.value || "",
      };
      await axios.post(REGISTER_URI, JSON.stringify(payload));
      toast.success("Inscription reussie");
      setIsLoading(false);
      setTimeout(() => {
        router.push("/login");
      }, 2000)
    } catch (e: any) {
      toast.error(e.response.data.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  function loginWithGoogle(e: FormEvent) {
    e.preventDefault();
    signIn('google', {
      redirect: false,
      callbackUrl: '/me'
    })
  }

  return (
    <>
      <Topbar background={'bg-white'} />
      <AuthCard title={"Inscrivez-vous"}>
        <form onSubmit={onSubmit} className="space-y-8 flex flex-col justify-center">
          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-800">
              Nom
            </label>
            <input
              ref={nomRef}
              type="text"
              name="nom"
              placeholder="Entrez votre nom"
              className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-800">
              Adresse e-mail
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Entrez votre Email"
              className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="telephone" className="text-gray-800">
              Téléphone
            </label>
            <input
              ref={telephoneRef}
              type="text"
              name="telephone"
              placeholder="Entrez votre numéro Téléphone"
              className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="telephone" className="text-gray-800">
              Adresse
            </label>
            <input
              ref={adressRef}
              type="text"
              name="text"
              placeholder="Adresse"
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
              placeholder="Entrez le mot de passe"
              className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="passwordConfirmed" className="text-gray-800">
              Confirmation du mot de passe
            </label>
            <input
              ref={confirmedPasswordRef}
              type="password"
              name="passwordConfirmed"
              placeholder="Entrez  à nouveau le mot de passe"
              className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
            />
          </div>
          <Button
            label={isLoading ? "Inscription en cours ..." : "S'inscire"}
            onclick={() => { }}
          />
          <div className="flex flex-row gap-5 justify-center items-center">
            <div className="basis-1/2 h-5 border-t border-gray-300 pt-6 text-sm text-gray-500"></div>
            <div className="pb-5">OU</div>
            <div className="basis-1/2 h-5 border-t border-gray-300 pt-6 text-sm text-gray-500"></div>
          </div>
          <button className={'rounded-full px-3 py-2 border  flex items-center justify-center gap-8 hover:bg-gray-100 transition-colors duration-200'} onClick={loginWithGoogle}>
            S&apos;inscrire avec google
            <Image src={googleLogo} alt={'google logo'} className={'w-6 h-auto'} />
          </button>
          <p className="border-t border-gray-300 pt-6 text-sm text-gray-500 dark:text-gray-400">
            Vous avez un compte ?{" "}
            <Link href={"/api/auth/signin"} className="text-gray-950">
              Connectez-vous
            </Link>
          </p>
        </form>
      </AuthCard>
    </>
  );
}
