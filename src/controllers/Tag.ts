import { RequestHandler } from "express";
import { Tag } from "../models/Tag";

export const getAllTags: RequestHandler = async (_, res) => {
  const tags = await Tag.findAll({});
  if (!tags) {
    return res.json({ message: "Error fetching all cards" });
  }
  return res.json(tags);
};

export const createTag: RequestHandler = async (req, res) => {
  const { name } = req.body;

  const tag = await Tag.create({ name });
  return res.json({ data: tag });
};
