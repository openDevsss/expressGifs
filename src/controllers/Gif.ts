import { RequestHandler } from "express";
import { Gif } from "../models/Gif";

export const getAllGifs: RequestHandler = (req, res, next) => {
  Gif.findAll({})
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
  console.log("dasdas");
  const { title, description, url } = req.body;
  const currentUser = req.user;
  try {
    const createdGif = await Gif.create({
      title,
      description,
      url,
      userId: currentUser.id,
    });
    res.json(createdGif);
  } catch (err) {
    console.log(err);
  }
};
// FIXME: НЕ РАБОТАЕТ
export const getCurrentUserGifs: RequestHandler = async (req, res, next) => {
  const currentUser = req.user;
  console.log("jh");
  console.log(currentUser);
  try {
    const gifs = await Gif.findAll({
      where: { userId: currentUser.id },
    });
    res.json(gifs);
  } catch (err) {
    next(err);
  }
};
