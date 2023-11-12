import { authenticateUserToken } from "../middlewares/auth";
import gifRoutes from "./Gif";
import userRoutes from "./User";
import tagRoutes from "./Tag";
import { Router } from "express";

const router = Router();

router.use("/gifs", gifRoutes);
router.use("/users", userRoutes);
router.use("/tags", tagRoutes);

export { router };
