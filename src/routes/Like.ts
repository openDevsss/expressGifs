import { Router } from "express";
import { authenticateUserToken } from "../middlewares/auth";
import { toggleLike } from "../controllers/Like";

const router = Router();

router.put("/", authenticateUserToken, toggleLike);

export default router;
