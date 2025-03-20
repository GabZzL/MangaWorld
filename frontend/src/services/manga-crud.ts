import apiRequest from "../utils/api-request";
import { MangaResponse } from "../types/manga-types";

// search single manga
export const searchSingleManga = async (
  UserQuery: string | undefined
): Promise<MangaResponse | null> => {
  const response = await apiRequest<MangaResponse>(
    "GET",
    `/inventory/${UserQuery}`
  );

  return response;
};
