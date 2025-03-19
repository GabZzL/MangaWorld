import React, { Suspense } from "react";
import { useLoaderData } from "react-router";
import { Await } from "react-router";
import { MangaResponse } from "../types/manga-types";
import MangaItem from "../components/MangaItem";
import Fallback from "../UI/Fallback";
import styles from "../styles/MangaList.module.css";

const MangaList: React.FC = () => {
  const mangas: MangaResponse[] = useLoaderData();

  return (
    <Suspense fallback={<Fallback />}>
      <Await resolve={mangas}>
        {() => (
          <div className={styles.mangaList}>
            {mangas.length > 0 ? (
              mangas.map((manga) => <MangaItem key={manga.id} manga={manga} />)
            ) : (
              <p className={styles.noResults}>No mangas found.</p>
            )}
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default MangaList;
