import apiRequest from "../../utils/api-request";
import { MangaResponse } from "../../types/manga-types";

export const searchManga = async (
  UserQuery: string
): Promise<MangaResponse[] | null> => {
  const response = await apiRequest<MangaResponse[]>(
    "GET",
    `/filter/search/?query=${UserQuery}`
  );

  return response;
};
