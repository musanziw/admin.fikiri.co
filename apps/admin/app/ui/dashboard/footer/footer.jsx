import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Fikiri Tableau de bord</div>
      <div className={styles.text}>© PNUD 2023. Tous droits réservés</div>
    </div>
  );
};

export default Footer;