"use client";

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users_acount/users_acount.module.css";
import Image from "next/image";
import Link from "next/link";
import { useStateContext } from "@/app/context/store";
import { useEffect, useState } from "react";
import axios from "@/app/api/axios";

const USERS = [
  {
    id: 1,
    nomComplet: "John Doe",
    email: "john.doe@email.com",
    profil: "/avatar30.png",
    numTel: "123-456-7890",
    create_at: "2023-01-01T12:00:00Z",
    status: "actif",
  },
  {
    id: 2,
    nomComplet: "Jane Smith",
    email: "jane.smith@email.com",
    profil: "/avatar31.jpg",
    numTel: "987-654-3210",
    create_at: "2023-01-02T09:30:00Z",
    status: "actif",
  },
  {
    id: 3,
    nomComplet: "Alice Johnson",
    email: "alice.johnson@email.com",
    profil: "/avatar23.png",
    numTel: "555-123-4567",
    create_at: "2023-01-03T15:45:00Z",
    status: "inactif",
  },
  {
    id: 4,
    nomComplet: "Bob Williams",
    email: "bob.williams@email.com",
    profil: "/avatar27.png",
    numTel: "111-222-3333",
    create_at: "2023-01-04T08:00:00Z",
    status: "actif",
  },
];

const UsersPage = () => {
  const [uses, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users", {
          withCredentials: true,
        });
        const data = response.data.data;
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Utilisateur</td>
            <td>Email</td>
            <td>Num Tel</td>
            <td>Date Création</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {USERS.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={`${user.profil}`}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.nomComplet}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.numTel}</td>
              <td>{user.create_at}</td>
              <td>
                <span
                  className={
                    user.status === "actif"
                      ? `${styles.status} ${styles.actif}`
                      : `${styles.status} ${styles.inactif}`
                  }
                >
                  {user.status}
                </span>
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users_acount/${user.id}`}>
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
