import { RequestHandler } from "express";
import { Tag } from "../models/Tag";

export const createTag: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  try {
    const tag = await Tag.create({ name });
    res.json(tag);
  } catch (err) {
    console.log(err);
  }
};
