"use client"

import { useState } from "react";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import { useAuthContext } from "../context/store";
import { usePathname } from "next/navigation";
import axios from "../config/axios";

interface TopbarProps {
  background?: string;
}

export default function Topbar({ background }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { account, setAccount } = useAuthContext();
  const pathname = usePathname();

  let LINKS = [];

  if (account) {
    LINKS = [
      {
        name: "Accueil",
        path: "/",
      },
      {
        name: "Solutions",
        path: "/solutions",
      },
      {
        name: "À propos",
        path: "/#about",
      },
    ];
  } else {
    LINKS = [
      {
        name: "Accueil",
        path: "/",
      },
      {
        name: "Solutions",
        path: "/solutions",
      },
      {
        name: "À propos",
        path: "/#about",
      },
      {
        name: "Se connecter",
        path: "/login",
      },
      {
        name: "S'inscrire",
        path: "/register",
      },
    ];
  }

  const logOut = () => {
    setAccount(null);
    axios.get("/auth/logout", {
      withCredentials: true,
    });
  };

  return (
    <header className={`${background} text-gray-800 px-10 py-4 z-10 flex items-center justify-between`}>
      <Link href={"/"} className={"inline-block"} aria-label="logo">
        <Image src={logo} alt={"Logo"} className={"cursor-pointer w-24"} />
      </Link>

      <div className={`flex flex-col gap-2 lg:hidden ${isOpen && "active"}`} onClick={() => {
        setIsOpen(!isOpen);
      }}>
        <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
        <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
      </div>

      <div className={`absolute top-14 z-30 w-screen ${background} transition-transform shadow-xl duration-500 right-0 lg:hidden ${!isOpen && "-translate-y-[200%]"}`}>
        <ul className={"text-lg p-10 flex flex-col gap-4 justify-start items-start"}>
          {LINKS.map((link, index) => (
            <li key={index}>
              <Link href={link.path} className={`hover:text-gray-950 transition-colors duration-300 capitalize ${pathname === link.path && 'text-blue-700'}}`}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={"hidden lg:flex items-center gap-6"}>
        {LINKS.map((link, index) => (
          <Link
            href={link.path}
            className={`hover:text-gray-950 transition-colors duration-300 ${pathname === link.path && 'text-blue-700'}}`}
            key={index}>
            {link.name}
          </Link>
        ))}
        {account && (
          <button className="" onClick={logOut}>
            Se Déconnecter
          </button>
        )}
      </div>
    </header>
  );
}
