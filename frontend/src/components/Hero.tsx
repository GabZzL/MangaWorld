import styles from "../styles/Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1>Discover Your Next Manga Adventure</h1>
        <p>
          Explore our vast collection of manga series from classics to the
          latest releases. Free shipping on orders over $50!
        </p>
        <a href="#" className={`${styles.btn} ${styles["btn-secondary"]}`}>
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default Hero;
