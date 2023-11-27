"use client";

import styles from "@/app/ui/dashboard/admins/singleAdmin/singleAdmin.module.css";
import Image from "next/image";

const SingleUserPage =  ({ params }) => {

  const user = {
    id: 1,
    nom: "John Doe",
    email: "John Doe",
    phone: "+243 99 24 22 969",
    address: "127, chaussee de kasenga, Bel-air",
    create_at: "03/04/2022",
    role: "utilisateur",
    status: "actif",
    isAdmin : true
  };

  const fetchThematique = () =>{
    
  }

  console.log(params);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label>Thématique</label>
          <input type="text" name="username" placeholder={user.nom} />
          <label>ODD</label>
          <input type="email" name="email" placeholder={`ODD ${params.id}`} />
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
