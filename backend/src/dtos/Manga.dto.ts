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
  imageUrl: string;
}

export interface UpdateMangaDto extends CreateMangaDto {
  id: string;
}
