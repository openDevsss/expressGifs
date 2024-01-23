import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const createUser: RequestHandler = async (req, res) => {
  const { nickname, password, email, role_id } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    role_id,
    nickname,
    email,
    password: hashPassword,
  });
  return res.json({ data: user });
};

export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
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
      secretKey,
    );
    // eslint-disable-next-line no-shadow, @typescript-eslint/no-unused-vars
    const { password, ...userData } = user.dataValues;
    res.send({ token, ...userData });
  } else {
    return res.status(401).json({ message: "Incorrect credentials" });
  }
  return res.status(401).json({ message: "Неверные учетные данные" });
};
