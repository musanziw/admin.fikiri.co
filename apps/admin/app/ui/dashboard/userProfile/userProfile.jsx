"use client";

import { MdOutlineCancel } from "react-icons/md";
import styles from "./userProfile.module.css";

// import Button from "../button/button";

import { userProfileData } from "../../../data/data";
import { useStateContext } from "@/app/context/store";
import Image from "next/image";

const UserProfile = () => {
  
  const { currentColor, setIsClicked, initialState } = useStateContext();

  console.log("Hello world!");

  return (
    <div className={styles.container}>
      <div className={styles.containerBtn}>
        <p className={styles.userProfileText}>User Profile</p>
        <button
          type="button"
          onClick={() => setIsClicked(initialState)}
          className={styles.userProfileBtn}
        >
          <MdOutlineCancel size={25} />
        </button>
      </div>
      <div className={styles.containerDescribeUSer}>
        <Image
          src={"/avatar27.png"}
          alt="user-profile"
          width={100}
          height={100}
          className={styles.imgDescribeUser}
        />
        <div>
          <p className={styles.nameUser}>
            Michael Roberts{" "}
          </p>
          <p className={styles.roleUser}>
            Administrator
          </p>
          <p className={styles.emailUser}>
            info@shop.com
          </p>
        </div>
      </div>
      <div>

      </div>

      {/*
  
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>
            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div> */}
    </div>
  );
};

export default UserProfile;
