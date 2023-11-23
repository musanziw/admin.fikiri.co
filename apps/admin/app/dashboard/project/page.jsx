import Pagination from "@/app/ui/dashboard/pagination/pagination";
import styles from "@/app/ui/dashboard/project/project.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    id: 1,
    title: "John Doe",
    description: "John Doe",
    color: "Orange",
    status: "Validé",
  },
  {
    id: 2,
    title: "John Doe",
    description: "John Doe",
    color: "Bleu",
    status: "En Attente",
  },
  {
    id: 3,
    title: "John Doe",
    description: "John Doe",
    color: "Rouge",
    status: "Rejeté",
  },
  {
    id: 4,
    title: "John Doe",
    description: "John Doe",
    color: "Rouge",
    status: "Validé",
  },
];

const Project = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/project">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>titre</td>
            <td>description</td>
            <td>Color</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {PROJECTS.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.color}</td>
              <td>{project.status}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href="/dashboard/project">
                    <button className={`${styles.button} ${styles.view}`}>
                      Voire
                    </button>
                  </Link>
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
export default Project