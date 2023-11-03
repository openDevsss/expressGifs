import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { NotFoundError } from "../utils/errors/not-found-err";

export const createUser: RequestHandler = async (req, res, next) => {
  const { nickname, password, email } = req.body;
  try {
    let hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      nickname,
      email,
      password: hashPassword,
    });
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(`err $${error}`);
  }
};

// need add

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    const matched = await bcrypt.compare(password, user.password);
    if (matched) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
        },
        "secret-key"
      );
      const { password, ...userData } = user.dataValues;
      res.send({ token, ...userData });
    } else {
      return next(new NotFoundError("Проверьте пароль"));
    }
  } else {
    return next(new NotFoundError("Проверьте введенные данные"));
  }
  return next();
};
