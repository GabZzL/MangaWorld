import apiRequest from "../utils/api-request";
import { MangaResponse, MangaActionResponse } from "../types/manga-types";

// search single manga
export const searchSingleManga = async (
  userQuery: string | undefined
): Promise<MangaResponse | null> => {
  const response = await apiRequest<MangaResponse>(
    "GET",
    `/inventory/${userQuery}`
  );

  return response;
};
// create new manga
export const createManga = async (
  userQuery: FormData
): Promise<MangaActionResponse | null> => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };

  const response = await apiRequest<MangaActionResponse>(
    "POST",
    `/inventory`,
    userQuery,
    config
  );

  return response;
};

export const updateManga = async (
  id: string | undefined,
  userQuery
): Promise<MangaActionResponse | null> => {
  const config = { headers: { "Content-Type": "application/json" } };

  const response = await apiRequest<MangaActionResponse>(
    "PATCH",
    `/inventory/${id}`,
    userQuery,
    config
  );

  return response;
};

export const deleteManga = async (
  id: string | undefined
): Promise<MangaActionResponse | null> => {
  const config = { headers: { "Content-Type": "application/json" } };

  const response = await apiRequest<MangaActionResponse>(
    "DELETE",
    `/inventory/${id}`,
    config
  );

  return response;
};
