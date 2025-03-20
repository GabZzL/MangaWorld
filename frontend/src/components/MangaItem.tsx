// src/components/MangaItem.tsx
import React from "react";
import { Link } from "react-router-dom";
import { MangaItemProps } from "../types/manga-types";
import NotFoundImage from "../assets/NotFound.jpg";
import styles from "../styles/MangaItem.module.css";

const MangaItem: React.FC<MangaItemProps> = ({ manga }) => {
  return (
    <div className={styles.mangaItem}>
      <img
        src={manga.image_url || NotFoundImage}
        alt={manga.title}
        className={styles.mangaImage}
      />

      <div className={styles.mangaDetails}>
        <Link to={`/manga/${manga.id}`} className={styles.title}>
          <h3>
            {manga.title} (Vol. {manga.volume})
          </h3>
        </Link>

        <p>
          <strong>Author:</strong> {manga.author}
        </p>
        <p>
          <strong>Language:</strong> {manga.language}
        </p>
        <p>
          <strong>Publication Year:</strong> {manga.publication_year}
        </p>
        <p>
          <strong>Genres:</strong> {manga.genres.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Price:</strong> ${manga.price}
        </p>
        <p>
          <strong>Stock:</strong> {manga.stock} available
        </p>
      </div>
    </div>
  );
};

export default MangaItem;
