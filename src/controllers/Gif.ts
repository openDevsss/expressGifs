import { RequestHandler } from "express";
import { Gif } from "../models/Gif";
import { Tag } from "../models/Tag";
import { User } from "../models/User";

export const getAllGifs: RequestHandler = (req, res, next) => {
  Gif.findAll({
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
  })
    .then((gifs) => {
      res.json(gifs);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getGifById: RequestHandler = async (req, res, next) => {
  const { gifId } = req.params;
  try {
    const currentGif = Gif.findByPk(gifId);
    res.json(currentGif);
  } catch (err) {
    console.log(err);
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

    await createdGif.setTags(tags);
    return res.json({ data: createdGif });
  } catch (err) {
    console.log(err);
  }
};

export const getGifsCurrentUser: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  try {
    const gifs = await Gif.findAll({
      include: [{ model: User, where: { id } }],
    });
    res.json(gifs);
  } catch (err) {
    next(err);
  }
};
