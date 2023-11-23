"use client";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "@/app/context/store";
import Image from "next/image";
import UserProfile from "../userProfile/userProfile";
import Notification from "../notification/notification";

import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import { MdNotifications,MdSearch } from "react-icons/md";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      style={{ color }}
      onClick={() => customFunc()}
      className={styles.btn}
    >
      <span style={{ background: dotColor }} className={styles.btnText} />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const pathname = usePathname();
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input
            type="text"
            dotColor="#03C9D7"
            placeholder="Recherche..."
            className={styles.input}
          />
        </div>
        <div className={styles.icons}>
          <NavButton
            title="Notifications"
            customFunc={() => handleClick("notification")}
            icon={<MdNotifications size={20} />}
          />
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className={styles.containerUserProfileImage}
              onClick={() => handleClick("userProfile")}
            >
              <Image
                className={styles.userProfileImage}
                src={"/avatar27.png"}
                alt="user-profile"
                width={40}
                height={40}
              />
            </div>
          </TooltipComponent>
          {isClicked.notification && (<Notification />)}
          {isClicked.userProfile && (<UserProfile />)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
