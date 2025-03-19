import React from "react";
import HeaderLogo from "../UI/HeaderLogo";
import NavBar from "../UI/NavBar";
import MobileMenu from "../UI/MobileMenu";

import styles from "../styles/Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles["header-container"]} ${styles.container}`}>
        <HeaderLogo />
        <MobileMenu />
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
