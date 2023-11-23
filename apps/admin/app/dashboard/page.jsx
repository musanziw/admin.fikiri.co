import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card titre="Projets validés" detail={50} pourcentage="50%" typeProjet="projetValidated"/>
          <Card titre="Projets en Attente" detail={20} pourcentage="20%" typeProjet="projetAttent" />
          <Card titre="Projets non validés" detail={30} pourcentage="30%" typeProjet="protNoValidated"/>
        </div>
        <Transactions />
        <Chart/>
      </div>
      <div className={styles.side}>
        <Rightbar/>
      </div>
    </div>
  );
};

export default Dashboard;
