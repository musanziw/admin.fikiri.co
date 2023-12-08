"use client";

import {MdLogout,} from "react-icons/md";
import {useState} from "react";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";

interface TopbarProps {
    background?: string;
}

export default function Topbar({background}: TopbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const {status, data: account} = useSession();
    const pathname = usePathname();
    const isLogged = status === "authenticated";

    const logOut = (e: any) => {
        e.preventDefault()
        setTimeout(() => {
            signOut({
                callbackUrl: '/'
            })
        }, 1000)
    };

    const LINKS = [
        {
            icon: <span>
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-clockwise fill-gray-800 h-4 w-5"
             viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
        </svg>
      </span>,
            name: "Acceuil",
            path: "/",
            isShown: true,
        },
        {
            icon: <span>
        <svg xmlns="http://www.w3.org/2000/svg" className={"bi bi-list-check fill-gray-800 h-4 w-5"}
             viewBox="0 0 16 16">
          <path fillRule="evenodd"
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
        </svg>
      </span>,
            name: "Solutions",
            path: "/solutions",
            isShown: true,
        },
        {
            icon: <span>
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-raised-hand fill-gray-800 h-4 w-5"
             viewBox="0 0 16 16">
          <path
              d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a.998.998 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207"/>
          <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
        </svg>
      </span>,
            name: "À propos de nous",
            path: "/#about",
            isShown: true,
        },
        {
            icon: <span>
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-box-arrow-in-right fill-gray-800 w-5 h-4"
             viewBox="0 0 16 16">
          <path fillRule="evenodd"
                d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
          <path fillRule="evenodd"
                d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
      </span>,
            name: "Se connecter",
            path: "/api/auth/signin",
            isShown: !isLogged,
        },
        {
            icon: <span>
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-fill-add fill-gray-800 w-5 h-4"
             viewBox="0 0 16 16">
          <path
              d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
          <path
              d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4"/>
        </svg>
      </span>,
            name: "S'inscrire",
            path: "/api/auth/signup",
            isShown: !isLogged,
        },
        {
            icon: <span>
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-fill fill-gray-600 w-4 h-5" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        </svg>
      </span>,
            name: `${account?.user?.name?.slice(0, 10).trimStart().padEnd(13, '...')}`,
            path: "/me",
            isShown: isLogged,
        }
    ];

    return (
        <header
            className={`fixed w-full ${background} text-gray-800 shadow-lg px-10 py-4 z-10 flex items-center justify-between`}>
            <Link href={"/"} className={"inline-block"} aria-label="logo">
                <Image src={logo} alt={"Logo"} className={"cursor-pointer w-24"} priority={true}/>
            </Link>
            <div className={`flex flex-col gap-2 lg:hidden ${isOpen && "active"}`} onClick={() => {
                setIsOpen(!isOpen)
            }}>
                <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
                <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
            </div>
            <div
                className={`absolute top-14 z-30 w-screen h-screen ${background} transition-transform shadow-xl duration-500 right-0 text-lg py-20 px-16 flex flex-col items-start gap-6 justify-start lg:hidden ${!isOpen && "-translate-y-[200%]"}`}>
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
                        <button onClick={logOut}
                                className={`transition-colors text-lg duration-300 flex items-center gap-1`}>
                            <MdLogout/>
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
                        <button onClick={logOut}
                                className={`transition-colors text-lg duration-300 flex items-center gap-1`}>
                            <MdLogout/>
                            Déconnexion
                        </button>
                    )
                }
            </div>
        </header>
    );
}
