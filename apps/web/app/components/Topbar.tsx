"use client";

import { MdOutlineCancel, MdDashboardCustomize } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import logo from "@/public/logo.png";
import avatar from "@/public/noavatar.png";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../context/authContext";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserProfile from "./UserProfile";

interface TopbarProps {
  background?: string;
}

export default function Topbar({ background }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLogged,
    setIsLogged,
    storeToken,
    isClicked,
    handleClicked,
    account,
    storeAccount,
  } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

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
    },
  ];

  const logOut = () => {
    router.push("/");
    setTimeout(() => {
      setIsLogged(false);
      storeToken(null);
      storeAccount(null);
    }, 1000);
  };

  return (
    <header
      className={`fixed w-full ${background} text-gray-800 shadow-lg px-10 py-4 z-10 flex items-center justify-between`}
    >
      <Link href={"/"} className={"inline-block"} aria-label="logo">
        <Image src={logo} alt={"Logo"} className={"cursor-pointer w-24"} />
      </Link>

      <div
        className={`flex flex-col gap-2 lg:hidden ${isOpen && "active"}`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
        <div className="h-[1px] w-6 bg-black transition-transform duration-300"></div>
      </div>

      <div
        className={`absolute top-14 z-30 w-screen h-screen ${background} transition-transform shadow-xl duration-500 right-0 text-lg py-20 px-16 flex flex-col items-start gap-4 justify-start lg:hidden ${!isOpen && "-translate-y-[200%]"
          }`}
      >
        {isLogged && (
          <div className="w-full flex static border border-dashed items-start flex-col">
            <div className="flex mt-5 gap-5">
              <div className=" ms-4 flex basis-1/3">
                <Image
                  className="rounded-full h-16 w-16"
                  src={avatar}
                  alt="user-profile"
                />
              </div>
              <div className="flex basis-2/3">
                <p>
                  <p className=" text-xl">{account?.name}</p>
                  <p className="text-gray-500 text-sm">Utilisateur</p>
                  <p className="text-gray-500 text-sm font-semibold">
                    {account?.email}
                  </p>
                </p>
              </div>
            </div>
            <Link href={'/me'} className="flex mt-5 gap-5">
              <div className="border-b-1 border-black p-4 hover:bg-light-gray cursor-pointer flex">
                <button
                  type="button"
                  className="text-xl rounded-lg p-3 hover:bg-light-gray text-[#03C9D7] bg-[#E5FAFB]"
                >
                  <MdDashboardCustomize />
                </button>

                <div className="ms-7">
                  <p className="">Tableau de bord</p>
                  <p className="text-gray-500 text-sm">
                    {"Votre tableau de bord"}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}

        {LINKS.map((link, index) => (
          <Link
            href={link.path}
            key={index}
            className={`${pathname === link.path && "text-blue-800 font-medium"
              }`}
            aria-label={link.name}
          >
            {link.isShown && link.name}
          </Link>
        ))}

        {isLogged && (
          <div className="">
            <Link
              href={""}
              onClick={logOut}
              className={
                "p-3 w-40 hover:drop-shadow-xl bg-red-600 hover:bg-red-500 transition-colors duration-300 text-white rounded"
              }
            >
              Se déconnecter
            </Link>
          </div>
        )}
      </div>

      <div className={"hidden lg:flex items-center"}>
        {LINKS.map(
          (link, index) =>
            link.isShown && (
              <Link
                href={link.path}
                className={`transition-colors duration-300 ${link.path === "/register" &&
                  "border rounded-md px-6 py-2 bg-indigo-500 text-white font-semibold"
                  } mr-3 inline-block ${pathname === link.path && "text-blue-800 font-medium"
                  }}`}
                key={index}
              >
                {link.name}
              </Link>
            )
        )}

        {isLogged && (
          <TooltipComponent position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg border ms-3"
              onClick={handleClicked}
            >
              <Image
                className="rounded-full w-8 h-8 border"
                src={avatar}
                alt="profile"
              />
              <p>
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {account?.name}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </TooltipComponent>
        )}
      </div>
      {isClicked && <UserProfile userInfo={account} />}
    </header>
  );
}
