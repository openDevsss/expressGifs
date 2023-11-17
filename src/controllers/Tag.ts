import { RequestHandler } from "express";
import { Tag } from "../models/Tag";

export const getAllTags: RequestHandler = async (req, res, next) => {
  try {
    const tags = await Tag.findAll({});
    return res.json(tags);
  } catch (err) {
    console.log(err);
  }
};

export const createTag: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  try {
    const tag = await Tag.create({ name });
    res.json(tag);
  } catch (err) {
    console.log(err);
  }
};
