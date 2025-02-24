import { Router } from "express";
import { getMangas, getMangaById, createManga } from "../handlers/inventory";

const router = Router();

// get all mangas
router.get("/", getMangas);
// get manga by id
router.get("/:id", getMangaById);
// post manga
router.post("/", createManga);

const storeRoutes = router;
export default storeRoutes;
