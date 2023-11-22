'use client'

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/admins/admin.module.css";
import Image from "next/image";
import Link from "next/link";
import { useStateContext } from "@/app/context/store";

const ADMIN = [
  {
    id: 1,
    nomComplet: "John Doe",
    email: "john.doe@email.com",
    profil : "/avatar3.png",
    numTel: "123-456-7890",
    create_at: "2023-01-01T12:00:00Z",
    role : "Super Admin",
    status: "actif",
  },
  {
    id: 2,
    nomComplet: "Jane Smith",
    email: "jane.smith@email.com",
    profil : "/avatar10.jpg",
    numTel: "987-654-3210",
    create_at: "2023-01-02T09:30:00Z",
    role : "Validateur Projet",
    status: "inactif",
  },
  {
    id: 3,
    nomComplet: "Alice Johnson",
    email: "alice.johnson@email.com",
    profil : "/avatar30.png",
    numTel: "555-123-4567",
    create_at: "2023-01-03T15:45:00Z",
    role : "Validateur Projet",
    status: "actif",
  },
  {
    id: 4,
    nomComplet: "Bob Williams",
    email: "bob.williams@email.com",
    profil : "/avatar31.jpg",
    numTel: "111-222-3333",
    create_at: "2023-01-04T08:00:00Z",
    role : "moderateur",
    status: "inactif",
  },
];

const UsersPage =  () => {

  const { currentColor, currentMode } = useStateContext();

  console.log(currentColor, currentMode);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/admins/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Admin</td>
            <td>Email</td>
            <td>Créé Le</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
        {ADMIN.map((admin) => (
            <tr key={admin.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={`${admin.profil}`}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {admin.nomComplet}
                </div>
              </td>
              <td>{admin.email}</td>
              <td>{admin.create_at}</td>
              <td>{admin.role}</td>
              <td>
                <span
                  className={
                    admin.status === "actif"
                      ? `${styles.status} ${styles.actif}`
                      : `${styles.status} ${styles.inactif}`
                  }
                >
                  {admin.status}
                </span>
              </td>
              <td>
              <div className={styles.buttons}>
                  <Link href={`/dashboard/admins/${admin.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Détail
                    </button>
                  </Link>
                  <form>
                    <input type="hidden" name="id" />
                    <button className={`${styles.button} ${styles.disabled}`}>
                      Désactiver
                    </button>
                  </form>
                  <form>
                    <input type="hidden" name="id" />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Supprimer
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={2} />
    </div>
  );
};

export default UsersPage;
