import {
  searchManga,
  filterMangaByGenre,
  filterMangaByLanguage,
  filterMangaByPublicationYear,
} from "../services/manga-crud";
import { MangaResponse } from "../types/manga-types";
import createError from "./create-error";

const apiHandlers: Record<
  string,
  (param: string) => Promise<MangaResponse[] | null>
> = {
  search: searchManga,
  "filter-genre": filterMangaByGenre,
  "filter-language": filterMangaByLanguage,
  "filter-year": filterMangaByPublicationYear,
};

export const handleApiRequest = async (
  operation: string,
  param: string | undefined
) => {
  if (!param?.trim()) {
    createError({
      status: 400,
      message: `${operation.replace("-", " ")} term is required`,
      statusText: "Bad Request",
    });
  }

  const apiCall = apiHandlers[operation];

  if (!apiCall) {
    createError({
      status: 400,
      message: "Invalid operation",
      statusText: "Bad Request",
    });
  }

  const response = await apiCall(param);

  if (!response) {
    throw createError({
      status: 404,
      message: "No results found",
      statusText: "Not Found",
    });
  }

  return response;
};
