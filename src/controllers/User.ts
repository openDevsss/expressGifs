import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const getAllUsers: RequestHandler = async (_, res, next) => {
  try {
    const users = await User.findAll({});
    if (!users) {
      return res.json({ message: "Ошибка при получении всех пользователей" });
    }
    return res.json({ data: users });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findByPk(id, { raw: true });
    const token = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
        nickname: user?.nickname,
        roleId: user?.role_id,
      },
      "secret-key"
    );
    const { password, ...userData } = user!;
    if (!user) {
      return res.json({ message: `Пользователя с id ${id} не существует` });
    }
    return res.json({ ...userData, token });
  } catch (err) {
    next(err);
  }
};

export const updateCurrentUser: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  const { nickname, avatar, email } = req.body;
  try {
    const [_, user] = await User.update(
      { nickname, avatar, email },
      { where: { id }, returning: true }
    );
    if (!user) {
      return res.json({ message: "Ошибка при обновлении аккаунта" });
    }
    return res.json([...user][0]);
  } catch (err) {
    next(err);
  }
};
