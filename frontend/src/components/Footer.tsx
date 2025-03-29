import Logo from "../assets/Logo.svg";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles["footer-content"]}`}>
        <img
          className={styles["footer-logo"]}
          src={Logo}
          alt="MangaWorld logo"
        />
        <div className={styles["social-links"]}>
          <a
            href="https://github.com/GabZzL"
            target="_blank"
            className={styles["social-link"]}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/armandogabrieljl/"
            target="_blank"
            className={styles["social-link"]}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
