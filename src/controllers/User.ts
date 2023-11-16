import { RequestHandler } from "express";
import { User } from "../models/User";

export const getAllUsers: RequestHandler = (req, res, next) => {
  User.findAll({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser: RequestHandler = (req, res, next) => {
  const { id } = req.user;
  User.findByPk(id)
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      next(err);
    });
};

export const updateCurrentUser: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  const { nickname, avatar, email } = req.body;
  try {
    const user = await User.update(
      { nickname, avatar, email },
      { where: { id } }
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
};
