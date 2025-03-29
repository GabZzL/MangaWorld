import styles from "../styles/Fallback.module.css";

const Fallback = () => {
  return (
    <div className={styles.fallbackContainer}>
      <div className={styles.loader}></div>
      <p>Loading data, please wait...</p>
    </div>
  );
};

export default Fallback;
