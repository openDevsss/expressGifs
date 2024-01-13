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

    const responseData = {
      id: comment.id,
      comment_text: comment.comment_text,
      gifId: comment.gifId,
      userId: comment.userId,
      updatedAt: comment.updatedAt,
      createdAt: comment.createdAt,
    };

    return res.status(201).json({
      message: "You have successfully left your comment",
      data: responseData,
    });
  } catch (err) {
    return next(err);
  }
};
