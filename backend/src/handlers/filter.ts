import { RequestHandler } from "express-serve-static-core";
import { QueryResult } from "pg";
import pool from "../db";
import { MangaResponse } from "../types/routes-params";
import {
  SearchMangaQuery,
  MangaByGenreQuery,
  MangaByLanguageQuery,
  MangaByYearQuery,
} from "../types/filter-params";
import { ErrorResponse } from "../types/app-error";

// handler search manga
export const searchManga: RequestHandler<
  {},
  MangaResponse[] | ErrorResponse,
  {},
  SearchMangaQuery
> = async (req, res, next): Promise<void> => {
  const { query } = req.query;

  if (!query) {
    res.status(400).json({ error: "Query parameter is required" });
    return;
  }

  try {
    // Convert user input to `tsquery` format
    const searchQuery = query.replace(/\s+/g, " & ");

    const { rows, rowCount }: QueryResult<MangaResponse> = await pool.query(
      `SELECT 
            m.id, 
            m.isbn, 
            m.title, 
            m.volume, 
            m.author, 
            m.language, 
            m.stock, 
            m.price, 
            m.publication_year, 
            m.added_date, 
            m.image_url,
            COALESCE(json_agg(g.name) FILTER (WHERE g.name IS NOT NULL), '[]') AS genres
        FROM manga m
        LEFT JOIN manga_genre mg ON m.id = mg.manga_id
        LEFT JOIN genre g ON mg.genre_id = g.id
        WHERE m.search_vector @@ to_tsquery('english', $1)
        GROUP BY m.id;`,
      [searchQuery]
    );

    if (rowCount === 0) {
      res.status(404).json({ error: "No results found" });
      return;
    }

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
// handler filter manga by genre
export const filterMangaByGenre: RequestHandler<
  {},
  MangaResponse[] | ErrorResponse,
  {},
  MangaByGenreQuery
> = async (req, res, next): Promise<void> => {
  const { genres } = req.query;

  if (!genres) {
    res.status(400).json({ error: "Genres parameter is required" });
    return;
  }

  // Convert genre list to array
  const genreList = genres.split(",").map((g) => g.trim());

  try {
    const { rows, rowCount }: QueryResult = await pool.query(
      `SELECT 
        m.id, 
        m.isbn, 
        m.title, 
        m.volume, 
        m.author, 
        m.language, 
        m.stock, 
        m.price, 
        m.publication_year, 
        m.added_date,
        m.image_url,
        COALESCE(json_agg(g.name) FILTER (WHERE g.name IS NOT NULL), '[]') AS genres
    FROM manga m
    LEFT JOIN manga_genre mg ON m.id = mg.manga_id
    LEFT JOIN genre g ON mg.genre_id = g.id
    WHERE g.name = ANY($1) -- Use ANY() for proper matching
    GROUP BY m.id
    ORDER BY m.title;`,
      [genreList]
    );

    if (rowCount === 0) {
      res
        .status(404)
        .json({ error: "No mangas found for the selected genres" });
      return;
    }

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
// handler filter manga by language
export const filterMangaByLanguage: RequestHandler<
  {},
  MangaResponse[] | ErrorResponse,
  {},
  MangaByLanguageQuery
> = async (req, res, next): Promise<void> => {
  const { language } = req.query;

  try {
    const { rows, rowCount }: QueryResult<MangaResponse> = await pool.query(
      `
      SELECT 
        m.id,
        m.isbn,
        m.title,
        m.volume,
        m.author,
        m.language,
        m.stock,
        m.price,
        m.publication_year,
        m.added_date,
        m.image_url,
        COALESCE(json_agg(g.name) FILTER (WHERE g.name IS NOT NULL), '[]') AS genres
      FROM manga m
      LEFT JOIN manga_genre mg ON m.id = mg.manga_id
      LEFT JOIN genre g ON mg.genre_id = g.id
      WHERE LOWER(m.language) = LOWER($1)
      GROUP BY m.id
      ORDER BY m.id;
      `,
      [language]
    );

    if (rowCount === 0) {
      res.status(404).json({ error: "Manga not found" });
      return;
    }

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
// handler filter manga by publication year
export const filterMangaByPublicationYear: RequestHandler<
  {},
  MangaResponse[] | ErrorResponse,
  {},
  MangaByYearQuery
> = async (req, res, next): Promise<void> => {
  const { year } = req.query;
  const publicationYear = parseInt(year, 10);

  if (isNaN(publicationYear)) {
    res.status(400).json({ error: "Invalid publication year format" });
    return;
  }

  try {
    const { rows, rowCount }: QueryResult<MangaResponse> = await pool.query(
      `
      SELECT 
        m.id,
        m.isbn,
        m.title,
        m.volume,
        m.author,
        m.language,
        m.stock,
        m.price,
        m.publication_year,
        m.added_date,
        m.image_url,
        COALESCE(json_agg(g.name) FILTER (WHERE g.name IS NOT NULL), '[]') AS genres
      FROM manga m
      LEFT JOIN manga_genre mg ON m.id = mg.manga_id
      LEFT JOIN genre g ON mg.genre_id = g.id
      WHERE m.publication_year = $1
      GROUP BY m.id
      ORDER BY m.id;
      `,
      [publicationYear]
    );

    if (rowCount === 0) {
      res
        .status(404)
        .json({ error: "No mangas found for the specified publication year" });
      return;
    }

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};
