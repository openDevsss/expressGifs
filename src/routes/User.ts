import { Router } from "express";
import { getAllUsers, getCurrentUser } from "../controllers/User";
import { authenticateUserToken } from "../middlewares/auth";
// import { createUser, loginUser } from "../controllers/Auth";

const router = Router();

router.get("/", authenticateUserToken, getAllUsers);
router.get("/me", authenticateUserToken, getCurrentUser);

export default router;
