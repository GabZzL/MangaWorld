import React from "react";
import { useSubmit, useNavigate } from "react-router-dom";
import { MangaItemProps } from "../types/manga-types";
import NotFoundImage from "../assets/NotFound.jpg";
import styles from "../styles/MangaDetails.module.css";

const MangaDetail: React.FC<MangaItemProps> = ({ manga }) => {
  const submit = useSubmit();
  const navigate = useNavigate();

  const handleDeleteManga = () => {
    const procced = window.confirm(
      "Are you sure you want to delete this manga?"
    );

    if (!procced) {
      return;
    }

    submit(null, { method: "delete" });
  };

  const handleEditManga = () => {
    navigate("edit");
  };

  return (
    <article className={styles["manga-card"]}>
      <img
        className={styles["manga-cover"]}
        src={manga.image_url || NotFoundImage}
        alt="Vinland Saga manga cover"
        width="189"
        height="285"
      />

      <div className={styles["manga-details"]}>
        <h2 className={styles["manga-title"]}>Vinland Saga</h2>

        <dl className={styles["manga-info"]}>
          <dt>Author:</dt>
          <dd>{manga.author}</dd>

          <dt>Genres:</dt>
          <dd>{manga.genres.join(", ")}</dd>

          <dt>Price:</dt>
          <dd>${manga.price}</dd>

          <dt>Stock:</dt>
          <dd>{manga.stock}</dd>

          <dt>Publication Year:</dt>
          <dd>{manga.publication_year}</dd>

          <dt>Language:</dt>
          <dd>{manga.language}</dd>

          <dt>Volume:</dt>
          <dd>{manga.volume}</dd>
        </dl>

        <div className={styles["manga-actions"]}>
          <button
            className={`${styles["action-button"]} ${styles["edit"]}`}
            aria-label="Edit manga details"
            onClick={handleEditManga}
          >
            Edit
          </button>
          <button
            className={`${styles["action-button"]} ${styles["delete"]}`}
            aria-label="Delete manga entry"
            onClick={handleDeleteManga}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
    // <article className={styles.mangaDetail}>
    //   <img
    //     src={manga.image_url || NotFoundImage}
    //     alt={manga.title}
    //     className={styles.cover}
    //   />
    //   <div className={styles.info}>
    //     <h2>{manga.title}</h2>
    //     <p>
    //       <strong>Author:</strong> {manga.author}
    //     </p>
    //     <p>
    //       <strong>Volume:</strong> {manga.volume}
    //     </p>
    //     <p>
    //       <strong>Language:</strong> {manga.language}
    //     </p>
    //     <p>
    //       <strong>Publication Year:</strong> {manga.publication_year}
    //     </p>
    //     <p>
    //       <strong>Price:</strong> ${manga.price}
    //     </p>
    //     <p>
    //       <strong>Genres:</strong> {manga.genres.join(", ")}
    //     </p>
    //     <div className={styles.actions}>
    //       <Link to={"edit"} className={styles.editButton}>
    //         Edit
    //       </Link>
    //       <button className={styles.deleteButton} onClick={handleDeleteManga}>
    //         Delete
    //       </button>
    //     </div>
    //   </div>
    // </article>
  );
};

export default MangaDetail;
