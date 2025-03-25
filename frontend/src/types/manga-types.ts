import { HTMLFormMethod } from "react-router";

export interface MangaResponse {
  id: number;
  isbn: string;
  title: string;
  volume: number;
  author: string;
  language: string;
  stock: number;
  price: number;
  image_url: string | null;
  publication_year: number;
  added_date: string;
  genres: string[];
}

export interface MangaActionResponse {
  message: string;
}

export interface LoaderSearchParams {
  params: {
    userQuery: string;
  };
}

export interface LoaderSingleManga {
  params: { id: string };
}

export interface ErrorProps {
  title?: string;
  status?: number;
  message?: string;
  statusText?: string;
}

export type ValidOperations =
  | "search"
  | "filter-genre"
  | "filter-year"
  | "filter-language";

export interface MangaItemProps {
  manga: MangaResponse;
}

export interface MangaFormProps {
  initialData?: MangaResponse | null;
  method: HTMLFormMethod;
}
