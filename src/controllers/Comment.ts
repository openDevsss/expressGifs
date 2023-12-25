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
    return res.status(201).json({
      message: "Вы успешно оставили свой комментарий",
      comment,
    });
  } catch (err) {
    console.error("Ошибка при добавлении комментария:", err);
    return res
      .status(500)
      .json({ error: "Произошла ошибка при добавлении комментария" });
  }
};
