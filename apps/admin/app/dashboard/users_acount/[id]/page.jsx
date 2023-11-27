import styles from "@/app/ui/dashboard/users_acount/singleUser/singleUser.module.css";

import Image from "next/image";

const SingleUserPage = async ({ params }) => {

  const user = {
    id: 1,
    nom: "John Doe",
    email: "John Doe",
    phone: "+243 99 24 22 969",
    address: "127, chaussee de kasenga, Bel-air",
    create_at: "03/04/2022",
    role: "utilisateur",
    status: "actif",
    isAdmin : true,
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>Nom de l'utilisateur</label>
          <input type="text" placeholder={user.nom} />

          <label>Adresse Email</label>
          <input type="email" placeholder={user.email} />

          <label>Numero Téléphone</label>
          <input type="text" placeholder={user.phone} />

          <label>Adresse physique</label>
          <textarea type="text" placeholder={user.address} />
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;