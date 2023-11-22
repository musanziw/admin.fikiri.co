import Image from "next/image";
import styles from "./transactions.module.css";

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Projets récents</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Utilisateur</td>
            <td>titre</td>
            <td>Status</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/avatar11.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>Titre du projet</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                En Attente
              </span>
            </td>
            <td>14.02.2024</td>
            
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/avatar19.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>Titre du projet</td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Validé</span>
            </td>
            <td>14.02.2024</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/avatar17.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>Titre du projet</td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Rejeté
              </span>
            </td>
            <td>14.02.2024</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/avatar20.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>Titre du projet</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                En Attente
              </span>
            </td>
            <td>14.02.2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;