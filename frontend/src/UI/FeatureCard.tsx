import React from "react";
import MagazineIcon from "../assets/Magazine.png";
import styles from "../styles/FeatureCard.module.css";

const FeatureCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <div className={styles["feature-card"]}>
      <img
        className={styles["feature-icon"]}
        src={MagazineIcon}
        alt="Filter icon"
      />
      <h3 className={styles["feature-title"]}>{title}</h3>
      <p className={styles['feature-description"']}>{description}</p>
    </div>
  );
};

export default FeatureCard;
