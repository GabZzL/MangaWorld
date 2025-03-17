import { useLoaderData } from "react-router";

const MangaList = () => {
  const mangas = useLoaderData();
  console.log(mangas);

  return (
    <>
      <h2>Manga List</h2>
      <ul>
        {mangas.map((manga) => (
          <p key={manga.id}>{manga.title}</p>
        ))}
      </ul>
    </>
  );
};

export default MangaList;
