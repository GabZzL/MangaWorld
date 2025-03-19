// src/components/MangaItem.tsx
import React from "react";
import styles from "../styles/MangaItem.module.css";
import { MangaItemProps } from "../types/manga-types";

const MangaItem: React.FC<MangaItemProps> = ({ manga }) => {
  return (
    <div className={styles.mangaItem}>
      <img
        src={manga.image_url || "/placeholder.jpg"}
        alt={manga.title}
        className={styles.mangaImage}
      />

      <div className={styles.mangaDetails}>
        <h3>
          {manga.title} (Vol. {manga.volume})
        </h3>
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
