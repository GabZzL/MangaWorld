import { z } from "zod";

export const MangaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  volume: z.number().int().min(1, "Volume must be at least 1"),
  author: z.string().min(1, "Author is required"),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  lenguage: z.string().min(1, "Language is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  price: z.number().min(0, "Price cannot be negative"),
  publicationYear: z.number().int().min(1900, "Publication year must be valid"),
  addedDate: z.date().default(() => new Date()),
});

// define TypeScript Type from Schema
type CreateMangaDto = z.infer<typeof MangaSchema>;
