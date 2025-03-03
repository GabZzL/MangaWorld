export interface CreateMangaQueryParams {
  isData?: boolean;
}

export interface MangaParams {
  id: string;
}

export interface MangaResponse {
  id: number;
  isbn: string;
  title: string;
  volume: number;
  author: string;
  genres: string[];
  language: string;
  stock: number;
  price: number;
  publicationYear: number;
  addedDate: string | Date;
}

export interface HandlerResponse {
  message: string;
}
