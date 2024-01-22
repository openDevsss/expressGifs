import { Router } from "express";
import {
  createGif,
  deleteGifById,
  getAllGifs,
  getGifById,
  updateGifById,
} from "../controllers/Gif/Gif";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/", getAllGifs);
router.post("/", authenticateUserToken, createGif);
router.patch("/", authenticateUserToken, updateGifById);
router.delete("/:id", authenticateUserToken, deleteGifById);
router.get("/:id", getGifById);

export default router;
