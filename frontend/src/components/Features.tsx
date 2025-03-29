import styles from "../styles/Features.module.css";
import FeatureCard from "../UI/FeatureCard";

const Features = () => {
  return (
    <section className={styles["features-section"]}>
      <h2 className={styles["section-title"]}>
        Discover Your Favorite Manga with Our Powerful Search Features
      </h2>

      <div className={styles["features-grid"]}>
        <FeatureCard
          title="Filter by Genre & Year"
          description="Easily find manga by genre, language, and publication year"
        />
        <FeatureCard
          title="Organize Collection"
          description="Use custom tags and ratings to manage your collection"
        />
      </div>
    </section>
  );
};

export default Features;
