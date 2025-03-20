import React, { Suspense } from "react";
import { Await, useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import Fallback from "../UI/Fallback";
import MangaDetail from "../components/MangaDetails";
import { searchSingleManga } from "../services/manga-crud";
import createError from "../utils/create-error";
import { MangaResponse, LoaderSingleManga } from "../types/manga-types";

const MangaDetailPage: React.FC = () => {
  const manga: MangaResponse = useLoaderData();

  return (
    <Suspense fallback={<Fallback />}>
      <Await resolve={manga}>{(data) => <MangaDetail manga={data} />}</Await>
    </Suspense>
  );
};

export default MangaDetailPage;

export const Loader = async ({
  params,
}: LoaderFunctionArgs<LoaderSingleManga>) => {
  const { id } = params;

  if (!params) {
    createError({
      status: 400,
      message: `the ID is required`,
      statusText: "Bad Request",
    });
  }

  const response = await searchSingleManga(id);

  if (!response) {
    createError({
      status: 404,
      message: "No results found",
      statusText: "Not Found",
    });
  }

  return response;
};
