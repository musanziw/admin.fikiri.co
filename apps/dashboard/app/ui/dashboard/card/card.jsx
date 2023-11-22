import { MdCheck, MdAccessTime, MdClose } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({titre, detail, pourcentage, typeProjet}) => {
  return (
    <div className={styles.container}>
      {(typeProjet === "projetValidated")? <MdCheck size={24}/> : (typeProjet === "projetAttent") ? <MdAccessTime size={24}/> : <MdClose size={24}/> }
      <div className={styles.texts}>
        <span className={styles.title}>{titre}</span>
        <span className={styles.detail}>{detail}</span>
        <span>
          <span className={styles.positive}>{pourcentage}</span>
        </span>
      </div>
    </div>
  );
};

export default Card;