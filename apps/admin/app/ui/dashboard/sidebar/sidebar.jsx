import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdOutlineSettings,
  MdPlaylistAddCheck,
  MdCategory,
  MdFindInPage,
  MdDescription,
  MdSupervisorAccount,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Tableau de bord",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Compte Utilisateur",
        path: "/dashboard/users_acount",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Compte Admin",
        path: "/dashboard/admins",
        icon: <MdSupervisorAccount />,
      },
      {
        title: "Projet",
        path: "/dashboard/project",
        icon: <MdPlaylistAddCheck />,
      },
      {
        title: "Thematiques",
        path: "/dashboard/thematique",
        icon: <MdCategory />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Analyse des projet",
        path: "/dashboard/projetAnalysis",
        icon: <MdFindInPage />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdDescription />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Paramètre",
        path: "/dashboard/parametre",
        icon: <MdOutlineSettings />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dashboardDesc}>
        <div>
          <Image
            className={styles.logoImage}
            src="/logo.png"
            alt=""
            width="170"
            height="50"
          />
        </div>
        <div className={styles.containerDashText}>
          <span className={styles.dashText}>Dashboard</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
