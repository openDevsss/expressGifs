import gifRoutes from "./Gif";
import userRoutes from "./User";
import { Router } from "express";

const router = Router();

router.use("/gifs", gifRoutes);
router.use("/users", userRoutes);

export { router };
