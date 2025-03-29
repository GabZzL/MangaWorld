import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import MangaForm from "../components/MangaForm";
import { MangaResponse } from "../types/manga-types";

const EditManga: React.FC = () => {
  const manga: MangaResponse = useRouteLoaderData("manga-details");

  return <MangaForm method="patch" initialData={manga} />;
};

export default EditManga;
   