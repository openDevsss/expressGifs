import { Router } from "express";
import { authenticateUserToken } from "../middlewares/auth";
import {
  subscribeToUser,
  unsubscribeFromUser,
} from "../controllers/Subscriptions";

const router = Router();

router.put("/subscribe", authenticateUserToken, subscribeToUser);
router.put("/unsubscribe", authenticateUserToken, unsubscribeFromUser);

export default router;
