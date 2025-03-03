import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express-serve-static-core";
import { QueryResult } from "pg";
import pool from "../db";
import { CreateMangaDto, UpdateMangaDto } from "../dtos/Manga.dto";
import {
  MangaParams,
  CreateMangaQueryParams,
  MangaResponse,
  HandlerResponse,
} from "../types/routes-params";
import { ErrorResponse } from "../types/app-error";

// handler get all mangas
export const getMangas: RequestHandler<
  {},
  MangaResponse[] | ErrorResponse
> = async (req, res, next): Promise<void> => {
  try {
    const { rows, rowCount }: QueryResult<MangaResponse> = await pool.query(`
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
        COALESCE(json_agg(g.name) FILTER (WHERE g.name IS NOT NULL), '[]') AS genres
      FROM manga m
      LEFT JOIN manga_genre mg ON m.id = mg.manga_id
      LEFT JOIN genre g ON mg.genre_id = g.id
      GROUP BY m.id
      ORDER BY m.id;
    `);

    if (rowCount === 0) {
      res.status(404).json({ error: "No manga found" });
      return;
    }

    res.status(200).json(rows);
  } catch (error) {
    await pool.query("ROLLBACK");
    next(error);
  }
};
// handler get manga by id
export const getMangaById: RequestHandler<
  MangaParams,
  MangaResponse | ErrorResponse,
  {}
> = async (req, res, next): Promise<void> => {
  const mangaId = req.params.id;

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
        COALESCE(json_agg(g.name) FILTER (WHERE g.name IS NOT NULL), '[]') AS genres
      FROM manga m
      LEFT JOIN manga_genre mg ON m.id = mg.manga_id
      LEFT JOIN genre g ON mg.genre_id = g.id
      WHERE m.id = $1
      GROUP BY m.id;
      `,
      [mangaId]
    );

    if (rowCount === 0) {
      res.status(404).json({ error: "Manga not found" });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};
// handler create manga
export const createManga: RequestHandler<
  {},
  HandlerResponse | ErrorResponse,
  CreateMangaDto,
  CreateMangaQueryParams
> = async (req, res, next): Promise<void> => {
  const {
    isbn,
    title,
    volume,
    author,
    genres,
    language,
    stock,
    price,
    publicationYear,
    addedDate,
  } = req.body;

  try {
    await pool.query("BEGIN"); //start transaction

    const mangaInsertQuery = `
      INSERT INTO manga (isbn, title, volume, author, language, stock, price, publication_year, added_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING id;
    `;

    const { rows, rowCount }: QueryResult<MangaResponse> = await pool.query(
      mangaInsertQuery,
      [
        isbn,
        title,
        volume,
        author,
        language,
        stock,
        price,
        publicationYear,
        addedDate,
      ]
    );

    if (rowCount === 0) {
      await pool.query("ROLLBACK");
      res.status(404).json({ error: "Manga not found" });
      return;
    }

    const mangaId = rows[0].id;
    // insert genres
    if (genres.length > 0) {
      const genreInsertQuery = `
      INSERT INTO manga_genre (manga_id, genre_id) 
      SELECT $1, id FROM genre WHERE name = ANY($2::text[])
    `;

      await pool.query(genreInsertQuery, [mangaId, genres]);
    }

    await pool.query("COMMIT"); // commit transaction

    res.status(201).json({ message: "Manga added successfully" });
  } catch (error) {
    await pool.query("ROLLBACK"); // Rollback transaction on error
    next(error);
  }
};
// handler update manga
export const updateManga: RequestHandler<
  MangaParams,
  HandlerResponse | ErrorResponse,
  UpdateMangaDto
> = async (req, res, next): Promise<void> => {
  const mangaId = req.params.id;
  const { genres, ...updatedFields } = req.body;

  try {
    await pool.query("BEGIN");

    // check if the manga exists
    const mangaExists: QueryResult = await pool.query(
      "SELECT id FROM manga WHERE id = $1 FOR UPDATE",
      [mangaId]
    );

    if (mangaExists.rowCount === 0) {
      await pool.query("ROLLBACK");
      res.status(404).json({ error: "Manga not found" });
      return;
    }

    // update dinamically
    const setClauses: string[] = [];
    const values: any[] = [];
    let index = 1;

    Object.entries(updatedFields).forEach(([key, value]) => {
      if (value !== undefined) {
        setClauses.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    });

    // update manga
    if (setClauses.length > 0) {
      await pool.query(
        `UPDATE manga SET ${setClauses.join(", ")} WHERE id = $${index}`,
        [...values, mangaId]
      );
    }

    // genre handling
    if (genres !== undefined) {
      await pool.query(
        `
        WITH deleted AS (
          DELETE FROM manga_genre 
          WHERE manga_id = $1 
          RETURNING 1
        )
        INSERT INTO manga_genre (manga_id, genre_id)
        SELECT $1, id 
        FROM genre 
        WHERE name = ANY($2::text[])
      `,
        [mangaId, genres]
      );
    }

    await pool.query("COMMIT");
    res.status(200).json({ message: "Manga updated successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    next(error);
  }
};
// handler delete manga
export const deleteManga: RequestHandler<
  MangaParams,
  HandlerResponse | ErrorResponse
> = async (req, res, next): Promise<void> => {
  const mangaId = req.params.id;

  try {
    await pool.query("BEGIN");

    await pool.query("DELETE FROM manga_genre WHERE manga_id = $1", [mangaId]);

    const { rowCount }: QueryResult = await pool.query(
      "DELETE FROM manga WHERE id = $1 RETURNING id",
      [mangaId]
    );

    if (rowCount === 0) {
      await pool.query("ROLLBACK");
      res.status(404).json({ error: "Manga not found" });
      return;
    }

    await pool.query("COMMIT");
    res.status(200).json({ message: "Mange deleted successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    next(error);
  }
};
