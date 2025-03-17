export interface MangaResponse {
  id: number;
  isbn: string;
  title: string;
  volume: number;
  author: string;
  language: string;
  stock: number;
  price: number;
  image_url: string;
  publication_year: number;
  added_date: string;
  genres: string[];
}
