export interface CreateMangaDto {
  isbn: String;
  title: String;
  volume: Number;
  author: String;
  genres: String[];
  language: String;
  stock: Number;
  price: Number;
  publicationYear: Number;
  addedDate: Date;
}
