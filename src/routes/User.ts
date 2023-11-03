import { Router } from "express";
import { createUser } from "../controllers/auth";

const router = Router();

router.get("/sign-up", createUser);

export default router;
