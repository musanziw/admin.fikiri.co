"use client";

import { MdOutlineCancel, MdDashboardCustomize } from "react-icons/md";
import Image from "next/image";
import avatar from "@/public/noavatar.png";
import { useAuthContext } from "../context/authContext";
import { useRouter, usePathname } from "next/navigation";

const UserProfile = () => {
  const { handleClicked } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();
  const { isLogged, setIsLogged, storeToken, setIsClicked, isClicked } =
    useAuthContext();

  const logOut = () => {
    router.push("/");
    setTimeout(() => {
      setIsClicked(!isClicked);
      setIsLogged(false);
      storeToken(null);
    }, 1000);
  };

  return (
    <div className="nav-item absolute right-1 top-20 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Profile Utilisateur
        </p>
        <button
          type="button"
          onClick={handleClicked}
          className={`text-2xl p-3  hover:drop-shadow-xl hover:bg-light-gray`}
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className="flex gap-5 items-center mt-6 border-black border-b-1 pb-6">
        <Image
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            Moses Kalunga
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            Utilisateur
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            mosesziongo@gmail.com
          </p>
        </div>
      </div>
      <div>
        <div
          className="flex gap-5 border-b-1 border-black p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
        >
          <button
            type="button"
            className="text-xl rounded-lg p-3 hover:bg-light-gray text-[#03C9D7] bg-[#E5FAFB]"
          >
            <MdDashboardCustomize />
          </button>

          <div>
            <p className="font-semibold dark:text-gray-200 ">Tableau de bord</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {"Votre tableau de bord"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={logOut}
          className="p-3 w-full hover:drop-shadow-xl bg-indigo-600 text-white rounded"
        >
          Se Deconnecter
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
