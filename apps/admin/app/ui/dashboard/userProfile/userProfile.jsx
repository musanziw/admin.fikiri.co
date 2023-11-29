"use client";

import { MdOutlineCancel } from "react-icons/md";
import styles from "./userProfile.module.css";
import { BsCurrencyDollar, BsShield } from "react-icons/bs";

import { userProfileData } from "../../../data/data";
import { useStateContext } from "@/app/context/store";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


const UserProfile = () => {
  const { currentColor, setIsClicked, initialState } = useStateContext();

  const { status, data: session } = useSession();

  const router = useRouter();

  const handleLogOut = () => {
    return signOut();
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerBtn}>
        <p className={styles.userProfileText}>Profile Utilisateur</p>
        <button
          type="button"
          onClick={() => setIsClicked(initialState)}
          className={styles.userProfileBtn}
        >
          <MdOutlineCancel size={25} />
        </button>
      </div>
      <div className={styles.containerDescribeUSer}>
        {status === "authenticated" ? (
          <Image
            src={session?.user?.image}
            alt="user-profile"
            width={100}
            height={100}
            className={styles.imgDescribeUser}
          />
        ) : (
          <Image
            src={"/avatar27.png"}
            alt="user-profile"
            width={100}
            height={100}
            className={styles.imgDescribeUser}
          />
        )}

        <div>
          <p className={styles.nameUser}>
            {status === "authenticated" ? session?.user?.name : ""}
          </p>
          <p className={styles.roleUser}>Administrator</p>
          <p className={styles.emailUser}>
            {status === "authenticated" ? session?.user?.email : ""}
          </p>
        </div>
      </div>
      <div className="containerBtnActions">
        <div className="containerActions">
          <button type="button" className={styles.btnAction}>
            <BsCurrencyDollar />
          </button>

          <div>
            <p className={styles.titleAction}>Editer le profil</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              cliquer pour editer le profil
            </p>
          </div>
        </div>
        <div className="containerActions">
          <button type="button" className={styles.btnAction}>
            <BsCurrencyDollar />
          </button>

          <div>
            <p className={styles.titleAction}>Editer le profil</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              cliquer pour editer le profil
            </p>
          </div>
        </div>
      </div>
      <div className={styles.containerButton}>
        <button
          type="button"
          onClick={handleLogOut}
          className={styles.logOutBtn}
        >
          Se Deconnecter
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
