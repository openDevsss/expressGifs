import express from "express";
import multer from "multer";
import path from "path";
import { RequestHandler } from "express";
import { Comment } from "../models/Comment";
import { Gif } from "../models/Gif";
import { Tag } from "../models/Tag";
import { User } from "../models/User";
import { BadRequestError } from "../utils/errors/bad-request-err";
import { Like } from "../models/Like";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

export const uploadGif: RequestHandler = upload.single("gif");

export const getAllGifs: RequestHandler = async (_, res, next) => {
  try {
    const gifs = await Gif.findAll({
      include: [
        { model: User, attributes: ["nickname", "id", "avatar", "email"] },
        {
          model: Tag,
          attributes: ["id", "name"],
          through: {
            as: "TagGifs",
            attributes: [],
          },
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "createdAt"],
          include: [{ model: User, attributes: ["id", "nickname", "avatar"] }],
          order: [
            ["createdAt", "ASC"],
            ["id", "ASC"],
          ],
        },
        {
          model: Like,
          attributes: ["id"],
          include: [
            { model: User, attributes: ["nickname", "id", "avatar", "email"] },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json({ data: gifs });
  } catch (err) {
    return next(err);
  }
};

export const getGifById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const currentGif = await Gif.findOne({
      where: { id },
      include: [
        { model: User, attributes: ["nickname", "id", "avatar", "email"] },
        {
          model: Tag,
          attributes: ["id", "name"],
          through: {
            as: "TagGifs",
            attributes: [],
          },
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "createdAt"],
          include: [{ model: User, attributes: ["id", "nickname", "avatar"] }],
        },
      ],
    });

    if (!currentGif) {
      return res.json({ message: `Гифки с id ${id} не найдено` });
    }

    await currentGif.increment("viewers", { by: 1 });

    return res.json({ data: currentGif });
  } catch (err) {
    return next(err);
  }
};

export const createGif: RequestHandler = async (req, res, next) => {
  const { title, description, url, tags } = req.body;
  const { id } = req.user;
  try {
    const createdGif = await Gif.create({
      title,
      description,
      url,
      userId: id,
    });
    if (!createGif) {
      return res.json({ message: "Ошибка при создании гифки" });
    }
    await createdGif.setTags(tags);
    return res.json({ data: createdGif });
  } catch (err) {
    return next(err);
  }
};

export const deleteGifById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const gif = await Gif.findByPk(id);
  if (gif) {
    await gif.destroy();
    res.json({
      message: `товар с id ${id} успешно удален`,
    });
  } else {
    return next(new BadRequestError(`товара с id ${id} не существует`));
  }
  return next();
};
