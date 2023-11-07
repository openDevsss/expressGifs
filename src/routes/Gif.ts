import { Router } from "express";
import {
  createGif,
  getAllGifs,
  getCurrentUserGifs,
  getGifById,
} from "../controllers/Gif";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/all-gifs", authenticateUserToken, getAllGifs);
router.post("/my-gifs", authenticateUserToken, getCurrentUserGifs);
router.get("/:id", authenticateUserToken, getGifById);
router.post("/", authenticateUserToken, createGif);

export default router;
