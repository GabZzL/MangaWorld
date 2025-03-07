import { Router } from "express";
import {
  searchManga,
  filterMangaByGenre,
  filterMangaByLanguage,
  filterMangaByPublicationYear,
} from "../handlers/filter";

const router = Router();

// search manga(by name and author)
router.get("/search", searchManga);
// filter manga by genre(/genre?genres=Comedy, Action, ...)
router.get("/genre", filterMangaByGenre);
// filter manga by language(/language?language=English, Japanese, ...)
router.get("/language", filterMangaByLanguage);
// filter manga by publication year(/year?year=2020, 2019, ...)
router.get("/year", filterMangaByPublicationYear);

const filterRoutes = router;
export default filterRoutes;
