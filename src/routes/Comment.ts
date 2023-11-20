import { Router } from "express";
import { addCommentForGif } from "../controllers/Comment";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.post("/", authenticateUserToken, addCommentForGif);

export default router;
