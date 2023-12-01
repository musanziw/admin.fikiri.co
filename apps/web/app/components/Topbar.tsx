"use client";

import { MdOutlineQuestionMark, MdOutlineManageAccounts } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../context/authContext";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { HiListBullet } from "react-icons/hi2";

interface TopbarProps {
  background?: string;
}

export default function Topbar({ background }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLogged,
    setIsLogged,
    storeToken,
    storeAccount,
    account,
  } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  const logOut = (e: any) => {
    e.preventDefault()
    router.push("/");
    setTimeout(() => {
      setIsLogged(false);
      storeToken(null);
      storeAccount(null);
    }, 1000);
  };

  const LINKS = [
    {
      icon: <HiListBullet />,
      name: "Solutions",
      path: "/solutions",
      isShown: true,
    },
    {
      icon: <MdOutlineQuestionMark />,
      name: "À propos",
      path: "/#about",
      isShown: true,
    },
    {
      icon: <BiLogInCircle />,
      name: "Se connecter",
      path: "/login",
      isShown: !isLogged,
    },
    {
      icon: <span className={'-ml-2 mr-1 text-gray-600'}>•</span>,
      name: "S'inscrire",
      path: "/register",
      isShown: !isLogged,
    },
    {
      icon: <MdOutlineManageAccounts />,
      name: `${account?.name?.slice(0, 10).trimStart().padEnd(13, '...')}`,
      path: "/me",
      isShown: isLogged,
    }
  ];



  return (
    <header className={`fixed w-full ${background} text-gray-800 shadow-lg px-10 py-4 z-10 flex items-center justify-between`}>
      <Link href={"/"} className={"inline-block"} aria-label="logo">
        <Image src={logo} alt={"Logo"} className={"cursor-pointer w-24"} />
      </Link>

      <div className={`flex flex-col gap-2 lg:hidden ${isOpen && "active"}`} onClick={() => { setIsOpen(!isOpen) }}>
        <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
        <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
      </div>

      <div className={`absolute top-14 z-30 w-screen h-screen ${background} transition-transform shadow-xl duration-500 right-0 text-lg py-20 px-16 flex flex-col items-start gap-6 justify-start lg:hidden ${!isOpen && "-translate-y-[200%]"}`}>
        {LINKS.map((link, index) => (
          link.isShown && (
            <Link href={link.path} key={index} className={'flex items-center gap-2'} aria-label={link.name}>
              {link.icon}
              {link.name}
            </Link>
          )
        ))}
        {
          isLogged && (
            <button onClick={logOut} className={`transition-colors text-lg duration-300 flex items-center gap-1`}>
              <BiLogOutCircle />
              Déconnexion
            </button>
          )
        }
      </div>

      {/* Desktop navbar */}
      <div className={"hidden lg:flex items-center gap-4"}>
        {LINKS.map((link, index) =>
          link.isShown && (
            <Link href={link.path} key={index}
              className={`transition-colors text-lg duration-300 flex items-center gap-1 ${pathname === link.path && "text-blue-800 font-medium"}`}>
              {link.icon}
              {link.name}
            </Link>
          )
        )}
        {
          isLogged && (
            <button onClick={logOut} className={`transition-colors text-lg duration-300 flex items-center gap-1`}>
              <BiLogOutCircle />
              Déconnexion
            </button>
          )
        }
      </div>

    </header>
  );
}
