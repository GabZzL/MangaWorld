import React from "react";
import styles from "../styles/Fallback.module.css";

const Fallback: React.FC = () => {
  return (
    <div className={styles.fallbackContainer}>
      <div className={styles.loader}></div>
      <p>Loading data, please wait...</p>
    </div>
  );
};

export default Fallback;
