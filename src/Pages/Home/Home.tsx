import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <Link
        className={styles.link}
        children={"Começar a jogar!"}
        to={"/game"}
      />
    </div>
  );
};

export default Home;
