import { Router } from "express";
import commentRoutes from "./Comment";
import gifRoutes from "./Gif";
import tagRoutes from "./Tag";
import userRoutes from "./User";
import likeRoutes from "./Like";
import subscribeRoutes from "./Subscriptions";
import mailRoutes from "./EmailMailer";

const router = Router();

router.use("/gifs", gifRoutes);
router.use("/users", userRoutes);
router.use("/tags", tagRoutes);
router.use("/comments", commentRoutes);
router.use("/likes", likeRoutes);
router.use("/subs", subscribeRoutes);
router.use("/verification", mailRoutes);

export { router };
