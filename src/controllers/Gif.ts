import { RequestHandler } from "express";
import { Gif } from "../models/Gif";
import { Tag } from "../models/Tag";
import { User } from "../models/User";

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
    const currentGif = await Gif.findByPk(id);
    if (!currentGif) {
      return res.json({ message: `Гифки с id ${id} не найдено` });
    }
    return res.json({ data: currentGif });
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
