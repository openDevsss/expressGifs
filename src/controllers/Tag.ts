import { RequestHandler } from "express";
import { Tag } from "../models/Tag";

export const getAllTags: RequestHandler = async (_, res, next) => {
  try {
    const tags = await Tag.findAll({});
    if (!tags) {
      return res.json({ message: "Ошибка при получении всех картчоек" });
    }
    return res.json(tags);
  } catch (err) {
    return next(err);
  }
};

export const createTag: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  try {
    const tag = await Tag.create({ name });
    return res.json({ data: tag });
  } catch (err) {
    return next(err);
  }
};
