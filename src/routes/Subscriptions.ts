import { Router } from "express";
import { authenticateUserToken } from "../middlewares/auth";
import {
  subscribeToUser,
  unsubscribeFromUser,
} from "../controllers/Subscriptions";

const router = Router();

router.post("/subscribe", authenticateUserToken, subscribeToUser);
router.post("/unsubscribe", authenticateUserToken, unsubscribeFromUser);

export default router;
