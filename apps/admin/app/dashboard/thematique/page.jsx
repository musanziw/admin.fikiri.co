import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/thematique/thematique.module.css";
import Link from "next/link";
import { useStateContext } from "@/app/context/store";
import Image from "next/image";

const THEMATIQUE = [
  {
    id: 1,
    nomComplet: "John Doe",
    email: "john.doe@email.com",
    profil: "/avatar3.png",
    numTel: "123-456-7890",
    create_at: "2023-01-01T12:00:00Z",
    role: "Super Admin",
    status: "actif",
  },
];

const Thematique = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/thematique/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Thématique</td>
            <td>ODD</td>
            <td>Date de Création</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {THEMATIQUE.map((thematique) => (
            <tr key={thematique.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={`${thematique.profil}`}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {thematique.nomComplet}
                </div>
              </td>
              <td>{thematique.email}</td>
              <td>{thematique.create_at}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/thematique/${thematique.id}`}>
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

export default Thematique;
