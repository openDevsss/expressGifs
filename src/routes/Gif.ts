import { Router } from "express";
import {
  createGif,
  deleteGifById,
  getAllGifs,
  getGifById,
} from "../controllers/Gif";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/", getAllGifs);
router.post("/", authenticateUserToken, createGif);
router.delete("/:id", authenticateUserToken, deleteGifById);
router.get("/:id", getGifById);

export default router;
