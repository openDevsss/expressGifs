import { Router } from "express";
import { authenticateUserToken } from "../middlewares/auth";
import { getEmailCode } from "../controllers/EmailMailer";

const router = Router();

router.get("/send-code", authenticateUserToken, getEmailCode);

export default router;
