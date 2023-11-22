import { RequestHandler } from "express";
import { Comment } from "../models/Comment";
import { Gif } from "../models/Gif";
import { Tag } from "../models/Tag";
import { User } from "../models/User";
import { BadRequestError } from "../utils/errors/bad-request-err";

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
        },
      ],
    });
    return res.json({ data: gifs });
  } catch (err) {
    next(err);
  }
};

export const getGifById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const currentGif = await Gif.findAll({
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
    return res.json(...currentGif);
  } catch (err) {
    next(err);
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
    next(err);
  }
};

export const getGifsCurrentUser: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  try {
    const gifs = await Gif.findAll({
      include: [{ model: User, where: { id } }],
    });
    return res.json({ data: gifs });
  } catch (err) {
    next(err);
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
