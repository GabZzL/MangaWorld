import { Router } from "express";
import upload from "../middleware/upload";
import {
  getMangas,
  getMangaById,
  createManga,
  updateManga,
  deleteManga,
} from "../handlers/inventory";

const router = Router();

// get all mangas
router.get("/", getMangas);
// get manga by id
router.get("/:id", getMangaById);
// post manga
router.post("/", upload.single("image"), createManga);
// update manga
router.patch("/:id", updateManga);
// delete manga
router.delete("/:id", deleteManga);

const storeRoutes = router;
export default storeRoutes;
