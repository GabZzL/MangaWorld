import { Suspense } from "react";
import { useLoaderData } from "react-router";
import { Await } from "react-router";
import { MangaResponse } from "../types/manga-types";
import MangaItem from "../components/MangaItem";
import Fallback from "../UI/Fallback";
import styles from "../styles/MangaList.module.css";

const MangaList = () => {
  const mangas: MangaResponse[] = useLoaderData();

  return (
    <Suspense fallback={<Fallback />}>
      <section className={styles["manga-list"]}>
        <h2 className={styles["section-title"]}>Featured Manga</h2>
        <div className={styles["manga-grid"]}>
          <Await resolve={mangas}>
            {() => (
              <>
                {mangas.length > 0 ? (
                  mangas.map((manga) => (
                    <MangaItem key={manga.id} manga={manga} />
                  ))
                ) : (
                  <p className={styles.noResults}>No mangas found.</p>
                )}
              </>
            )}
          </Await>
        </div>
      </section>
    </Suspense>
  );
};

export default MangaList;
