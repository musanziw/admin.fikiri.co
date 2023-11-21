"use client";

import { useRef, RefObject, useState, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "@/app/api/axios";
import Link from "next/link";
import { AuthCard } from "@/app/(auth)/components/AuthCard";
import { Button } from "@/app/(auth)/components/Button";
import Topbar from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";
import { useAuthContext } from "@/app/context/store";
import Image from "next/image";
import googleLogo from "@/public/googleLogo.svg";

const LOGIN_URI = "/auth/login";

export default function Login() {
  const emailRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);
  const { user } = useAuthContext() || {};

  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addErrors = (newErrors: string) => {
    setErrors(newErrors);
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    try {
      setIsLoading(true);

      const payload = {
        email: emailRef.current?.value || "",
        password: passwordRef.current?.value || "",
      };

      const response = await axios.post(LOGIN_URI, JSON.stringify(payload), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      toast.success("Connexion réussie!");
      console.log(response);
    } catch (e) {
      console.log(e);
      if (e.response) {
        addErrors(e.response.data.message || "An error occurred");
      } else if (e.request) {
        addErrors("No response received from the server");
      } else {
        addErrors("Error setting up the request");
      }

      toast.error(errors || "Échec de la connexion");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <Topbar />

      <AuthCard title={"Connectez-vous"}>
        <form
          action=""
          className="space-y-8 flex flex-col justify-center"
          onSubmit={onSubmit}
        >
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
              Mot de pass
            </label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="Entrez votre mot de pass"
              className="focus:outline-none text-sm block w-full rounded-md border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
            />
          </div>
          <p className="text-sm text-gray-900">
            <Link href={"forgot-password"}>Mot de passe oublié ?</Link>
          </p>
          <Button label={"Se connecter"} />

          <div className="flex flex-row gap-5 justify-center items-center">
            <div className="basis-1/2 h-5 border-t border-gray-300 pt-6 text-sm text-gray-500"></div>
            <div className="pb-5">OU</div>
            <div className="basis-1/2 h-5 border-t border-gray-300 pt-6 text-sm text-gray-500"></div>
          </div>

          <button
            type="submit"
            className={
              "py-3 white text-slate-900 rounded-full transition-colors duration-300 border border-slate-500 hover:boder-4 hover:bg-slate-100 relative"
            }
          >
            Se connecter Avec Google
            <Image
              src={googleLogo}
              alt="logo"
              className="w-6 h-6 absolute right-3 bottom-3"
            />
          </button>
          <p className="border-t border-gray-300 pt-6 text-sm text-gray-500">
            Vous n&lsquo;avez pas de compte ?{" "}
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
