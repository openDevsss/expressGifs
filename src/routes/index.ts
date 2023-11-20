import { Router } from "express";
import commentRoutes from "./Comment";
import gifRoutes from "./Gif";
import tagRoutes from "./Tag";
import userRoutes from "./User";

const router = Router();

router.use("/gifs", gifRoutes);
router.use("/users", userRoutes);
router.use("/tags", tagRoutes);
router.use("/comments", commentRoutes);

export { router };
