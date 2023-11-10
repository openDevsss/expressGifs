import { Router } from "express";
import {
  createGif,
  getAllGifs,
  getGifsCurrentUser,
  getGifById,
} from "../controllers/Gif";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/", authenticateUserToken, getAllGifs);
router.get("/me", authenticateUserToken, getGifsCurrentUser);
router.get("/:id", authenticateUserToken, getGifById);
router.post("/", authenticateUserToken, createGif);

export default router;
