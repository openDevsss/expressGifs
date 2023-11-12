import { RequestHandler } from "express";
import { Gif } from "../models/Gif";
import { User } from "../models/User";
import { TagGifs } from "../models/TagGifs";

export const getAllGifs: RequestHandler = (req, res, next) => {
  Gif.findAll({
    include: [
      { model: User, attributes: ["nickname", "id", "avatar", "email"] },
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
      tags,
      userId: id,
    });
    res.json(createdGif);
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
