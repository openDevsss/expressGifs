import { Router } from "express";
import { createTag } from "../controllers/Tag";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.post("/", authenticateUserToken, createTag);

export default router;
