"use client";

import { useRef, RefObject, useState, FormEvent } from "react";

import Link from "next/link";
import { AuthCard } from "@/app/(auth)/components/AuthCard";
// import { Input } from "@/app/(auth)/components/Input";
import { Button } from "@/app/(auth)/components/Button";

export default function Login() {
  const emailRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: RefObject<HTMLInputElement> = useRef(null);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    console.log(payload);
  };

  return (
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
        <p className="border-t border-gray-300 pt-6 text-sm text-gray-500">
          Vous n&lsquo;avez pas de compte ?{" "}
          <Link href={"register"} className="text-gray-950">
            Inscrivez-vous
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
