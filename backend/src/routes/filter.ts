import { Router } from "express";
import { searchManga, filterMangaByGenre } from "../handlers/filter";

const router = Router();

// search manga(by name and author)
router.get("/search", searchManga);
// filter manga by genre(/genre?genres=Comedy, Action, ...)
router.get("/genre", filterMangaByGenre);

const filterRoutes = router;
export default filterRoutes;
