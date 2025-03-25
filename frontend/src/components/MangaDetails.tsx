import React from "react";
import { Link, useSubmit } from "react-router-dom";
import { MangaItemProps } from "../types/manga-types";
import NotFoundImage from "../assets/NotFound.jpg";
import styles from "../styles/MangaDetails.module.css";

const MangaDetail: React.FC<MangaItemProps> = ({ manga }) => {
  const submit = useSubmit();

  const handleDeleteManga = () => {
    const procced = window.confirm(
      "Are you sure you want to delete this manga?"
    );

    if (!procced) {
      return;
    }

    submit(null, { method: "delete" });
  };

  return (
    <div className={styles.mangaDetail}>
      <img
        src={manga.image_url || NotFoundImage}
        alt={manga.title}
        className={styles.cover}
      />
      <div className={styles.info}>
        <h2>{manga.title}</h2>
        <p>
          <strong>Author:</strong> {manga.author}
        </p>
        <p>
          <strong>Volume:</strong> {manga.volume}
        </p>
        <p>
          <strong>Language:</strong> {manga.language}
        </p>
        <p>
          <strong>Publication Year:</strong> {manga.publication_year}
        </p>
        <p>
          <strong>Price:</strong> ${manga.price}
        </p>
        <p>
          <strong>Genres:</strong> {manga.genres.join(", ")}
        </p>
        <div className={styles.actions}>
          <Link to={"edit"} className={styles.editButton}>
            Edit
          </Link>
          <button className={styles.deleteButton} onClick={handleDeleteManga}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MangaDetail;
