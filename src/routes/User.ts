import { Router } from "express";
import {
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/User";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/", authenticateUserToken, getAllUsers);
router.get("/me", authenticateUserToken, getCurrentUser);
router.patch("/me", authenticateUserToken, updateCurrentUser);

export default router;
