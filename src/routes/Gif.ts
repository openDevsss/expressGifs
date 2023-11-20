import { Router } from "express";
import {
  createGif,
  getAllGifs,
  getGifById,
  getGifsCurrentUser,
} from "../controllers/Gif";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/", getAllGifs);
router.get("/me", authenticateUserToken, getGifsCurrentUser);
router.post("/", authenticateUserToken, createGif);
router.get("/:id", getGifById);

export default router;
