import React from "react";
import { Link } from "react-router-dom";
import { MangaItemProps } from "../types/manga-types";
import NotFoundImage from "../assets/NotFound.jpg";
import styles from "../styles/MangaItem.module.css";

const MangaItem: React.FC<MangaItemProps> = ({ manga }) => {
  return (
    <article className={styles["manga-card"]}>
      <img
        className={styles["manga-cover"]}
        src={manga.image_url || NotFoundImage}
        alt="Manga Cover"
        width="220"
        height="292"
      />
      <div className={styles["manga-details"]}>
        <Link to={`/manga/${manga.id}`} className={styles.title}>
          <h3 className={styles["manga-title"]}>{manga.title}</h3>
        </Link>

        <dl className={styles["manga-info"]}>
          <dt>Author:</dt>
          <dd>{manga.author}</dd>
          <dt>Genres:</dt>
          <dd>{manga.genres.join(", ") || "N/A"}</dd>
          <dt>Price:</dt>
          <dd>${manga.price}</dd>
          <dt>Stock:</dt>
          <dd>{manga.stock}</dd>
          <dt>Publication Year:</dt>
          <dd>{manga["publication_year"]}</dd>
          <dt>Language:</dt>
          <dd>{manga.language}</dd>
          <dt>Volumes:</dt>
          <dd>{manga.volume}</dd>
        </dl>
      </div>
    </article>
  );
};

export default MangaItem;
