import { RequestHandler } from "express";
import { Comment } from "../models/Comment";

export const addCommentForGif: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  const { comment_text, gifId } = req.body;
  try {
    const comment = await Comment.create({
      comment_text,
      gifId,
      userId: id,
    });
    if (!comment) {
      return res.json({
        message: "Произошла ошибка при добавление комментария",
      });
    }
    return res.json({ message: "Вы успешно оставили свой комментарий" });
  } catch (err) {
    return next(err);
  }
};
