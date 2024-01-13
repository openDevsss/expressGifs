import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const createUser: RequestHandler = async (req, res, next) => {
  const { nickname, password, email, role_id } = req.body;
  try {
    let hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      role_id,
      nickname,
      email,
      password: hashPassword,
    });
    return res.json({ data: user });
  } catch (err) {
    return next(err);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (matched) {
      const secretKey = process.env.JWT_SECRET || "default-secret-key";
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          roleId: user.role_id,
        },
        secretKey
      );
      const { password, ...userData } = user.dataValues;
      res.send({ token, ...userData });
    } else {
      return res.status(401).json({ message: "Incorrect credentials" });
    }
  } catch (err) {
    return next(err);
  }
};
