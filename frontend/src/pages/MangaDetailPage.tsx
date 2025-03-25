import React, { Suspense } from "react";
import {
  Await,
  useRouteLoaderData,
  LoaderFunctionArgs,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import Fallback from "../UI/Fallback";
import MangaDetail from "../components/MangaDetails";
import { searchSingleManga, deleteManga } from "../services/manga-crud";
import createError from "../utils/create-error";
import { MangaResponse, LoaderSingleManga } from "../types/manga-types";

const MangaDetailPage: React.FC = () => {
  const manga: MangaResponse = useRouteLoaderData("manga-details");

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

export const Action = async ({
  params,
}: ActionFunctionArgs<LoaderSingleManga>) => {
  const { id } = params;

  const response = await deleteManga(id);

  if (!response) {
    createError({
      status: 500,
      message: "It was not possible delete the manga",
      statusText: "Server Error",
    });
  }

  return redirect("/");
};
