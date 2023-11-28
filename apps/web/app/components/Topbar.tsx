"use client"

import { useState } from "react";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axios from "../config/axios";
import { useAuthContext } from "../context/store";

interface TopbarProps {
  background?: string;
}

export default function Topbar({ background }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged, setIsLogged } = useAuthContext()
  const pathname = usePathname()

  const LINKS = [
    {
      name: "Accueil",
      path: "/",
      isShown: true,
    },
    {
      name: "Solutions",
      path: "/solutions",
      isShown: true,
    },
    {
      name: "À propos",
      path: "/#about",
      isShown: true,
    },
    {
      name: "Se connecter",
      path: "/login",
      isShown: !isLogged,
    },
    {
      name: "S'inscrire",
      path: "/register",
      isShown: !isLogged,
    }
  ];

  const logOut = () => {
    axios.get("/auth/logout");
    setIsLogged(false)
  };

  return (
    <header className={`relative ${background} text-gray-800 shadow-lg px-10 py-4 z-10 flex items-center justify-between`}>
      <Link href={"/"} className={"inline-block"} aria-label="logo">
        <Image src={logo} alt={"Logo"} className={"cursor-pointer w-24"} />
      </Link>

      <div className={`flex flex-col gap-2 lg:hidden ${isOpen && "active"}`} onClick={() => { setIsOpen(!isOpen) }}>
        <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
        <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
      </div>

      <div className={`absolute top-14 z-30 w-screen h-screen ${background} transition-transform shadow-xl duration-500 right-0 text-lg py-20 px-16 flex flex-col items-start gap-4 justify-start lg:hidden ${!isOpen && "-translate-y-[200%]"}`}>
        {
          LINKS.map((link, index) => (
            <Link href={link.path} key={index} className={`${pathname === link.path && 'text-blue-800 font-medium'}`} aria-label={link.name}>
              {link.isShown && link.name}
            </Link>
          ))
        }

        {isLogged && (
          <button onClick={logOut} className={"transition-colors duration-300 text-red-600"}>
            Se déconnecter
          </button>
        )}
      </div>

      <div className={"hidden lg:flex items-center"}>
        {LINKS.map((link, index) => (
          <Link href={link.path} className={`transition-colors duration-300 mr-3 inline-block ${pathname === link.path && 'text-blue-800 font-medium'}}`} key={index}>
            {link.isShown && link.name}
          </Link>
        ))}

        {isLogged && (
          <button onClick={logOut} className={"transition-colors duration-300 text-red-600"}>
            Se déconnecter
          </button>
        )}
      </div>

    </header>
  );
}
