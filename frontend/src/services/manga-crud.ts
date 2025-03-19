import apiRequest from "../utils/api-request";
import { MangaResponse } from "../types/manga-types";

// search API call
export const searchManga = async (
  UserQuery: string | undefined
): Promise<MangaResponse[] | null> => {
  const response = await apiRequest<MangaResponse[]>(
    "GET",
    `/filter/search/?query=${UserQuery}`
  );

  return response;
};

// genre filter
export const filterMangaByGenre = async (
  UserQuery: string | undefined
): Promise<MangaResponse[] | null> => {
  const response = await apiRequest<MangaResponse[]>(
    "GET",
    `/filter/genre/?genres=${UserQuery}`
  );

  return response;
};

// language filter
export const filterMangaByLanguage = async (
  UserQuery: string | undefined
): Promise<MangaResponse[] | null> => {
  const response = await apiRequest<MangaResponse[]>(
    "GET",
    `/filter/language/?language=${UserQuery}`
  );

  return response;
};

// publication year filter
export const filterMangaByPublicationYear = async (
  UserQuery: string | undefined
): Promise<MangaResponse[] | null> => {
  const response = await apiRequest<MangaResponse[]>(
    "GET",
    `/filter/year/?year=${UserQuery}`
  );

  return response;
};
