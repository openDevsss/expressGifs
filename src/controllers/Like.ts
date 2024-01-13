import { RequestHandler } from "express";
import { Like } from "../models/Like";

export const toggleLike: RequestHandler = async (req, res, next) => {
  const { gifId } = req.body;
  const { id: userId } = req.user;
  try {
    // Проверяем, существует ли лайк
    const existingLike = await Like.findOne({ where: { userId, gifId } });

    if (existingLike) {
      // Если лайк существует, удаляем его
      await Like.destroy({ where: { userId, gifId } });
      return res.json({ message: "Лайк удален" });
    }
    // Если лайка нет, добавляем новый
    const newLike = await Like.create({ userId, gifId });
    return res.json({ message: "Лайк добавлен", like: newLike });
  } catch (err) {
    return next(err);
  }
};
