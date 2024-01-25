import { Router } from "express";
import {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateCurrentUser,
} from "../controllers/User/User";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/", authenticateUserToken, getAllUsers);
router.get("/me", authenticateUserToken, getCurrentUser);
router.patch("/me", authenticateUserToken, updateCurrentUser);
router.get("/:id", authenticateUserToken, getUserById);

export default router;
