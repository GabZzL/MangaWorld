export interface CreateMangaDto {
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

export interface UpdateMangaDto {
  isbn?: string;
  title?: string;
  volume?: number;
  author?: string;
  genres?: string[];
  language?: string;
  stock?: number;
  price?: number;
  publicationYear?: number;
  addedDate?: string | Date;
}
