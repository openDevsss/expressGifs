import { Router } from "express";
import { createTag, getAllTags } from "../controllers/Tag";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/", authenticateUserToken, getAllTags);
router.post("/", authenticateUserToken, createTag);

export default router;
