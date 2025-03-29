import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../assets/Logo.svg";
import styles from "../styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles["nav-bar"]} ${styles.container}`}>
        <div className={styles["logo-wrapper"]}>
          <img
            className={styles["logo-icon"]}
            src={LogoIcon}
            alt="Manga icon"
          />
        </div>
        <div className={styles["nav-links"]}>
          <Link to="/" className={styles["nav-link"]}>
            Home
          </Link>
          <Link to="/new-manga" className={styles["nav-link"]}>
            New Manga
          </Link>
          <Link to="/storage" className={styles["nav-link"]}>
            Inventory
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
