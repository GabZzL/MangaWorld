import HeroImage from "../assets/Hero.jpg";
import styles from "../styles/Hero.module.css";

const Hero = () => {
  return (
    <section className={styles["hero-section"]}>
      <h1 className={styles["hero-title"]}>
        Discover Your Next Favorite Manga Today
      </h1>
      <p className={styles["hero-subtitle"]}>
        Welcome to MangaWorld, your ultimate destination for manga discovery and
        management. Explore a vast collection of titles, filter by genre, and
        organize your favorites effortlessly.
      </p>
      <img
        className={styles["hero-image"]}
        src={HeroImage}
        alt="Manga collection"
      />
    </section>
  );
};

export default Hero;
