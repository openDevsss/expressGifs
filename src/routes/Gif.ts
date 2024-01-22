import { Router } from "express";
import {
  createGif,
  deleteGifById,
  getAllGifs,
  getGifById,
  updateGifById,
} from "../controllers/Gif/Gif";
import { authenticateUserToken } from "../middlewares/auth";
import { validateBySchemaAndExtract } from "../middlewares/validateBySchemaAndExtract";
import { GifsSchema } from "../controllers/Gif/GifSchema";

const router = Router();

router.get("/", validateBySchemaAndExtract(GifsSchema), getAllGifs);
router.post("/", authenticateUserToken, createGif);
router.patch("/", authenticateUserToken, updateGifById);
router.delete("/:id", authenticateUserToken, deleteGifById);
router.get("/:id", getGifById);

export default router;
