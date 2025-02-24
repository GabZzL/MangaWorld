import { Request, Response } from "express-serve-static-core";
import { RequestHandler } from "express-serve-static-core";
import pool from "../db";
import { QueryResult } from "pg";
import { CreateMangaDto } from "../dtos/CreateManga.dto";
import { MangaResponse } from "../types/response";
import { CreateMangaQueryParams } from "../types/query-params";

export const getMangas: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response: QueryResult = await pool.query("SELECT * FROM manga");

    if (!response.rows) {
      res.status(500).json({ error: "Unable to access the data" });
      return;
    }

    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: "Database Error" });
  }
};

export async function getMangaById(req: Request, res: Response) {
  const { id } = req.params;
  res.status(200).json(`manga ${id}`);
}

export async function createManga(
  req: Request<{}, {}, CreateMangaDto, CreateMangaQueryParams>,
  res: Response<MangaResponse>
) {
  const id = 1;
  const mangaData = req.body;
  const mangaQuery = req.query;
  const mangaParams = req.params;

  res.status(201).json({ id, ...mangaData });
}
