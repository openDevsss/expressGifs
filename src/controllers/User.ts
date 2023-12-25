import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Subscription } from "../models/Subscriptions";

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

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { raw: true });
    if (!user) {
      return res.json({ message: `Пользователя с id ${id} не существует` });
    }
    const { password, ...userData } = user;
    return res.json(userData);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser: RequestHandler = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Subscription,
          as: "following",
        },
        {
          model: Subscription,
          as: "followers",
        },
      ],
    });

    if (!user) {
      return res.json({ message: `Пользователя с id ${id} не существует` });
    }

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

    const { password, ...userData } = user.get();

    return res.json({ ...userData, token });
  } catch (err) {
    next(err);
  }
};

export const updateCurrentUser: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  const { nickname, avatar, email } = req.body;
  try {
    const [rowsUpdated, [updatedUser]] = await User.update(
      { nickname, avatar, email },
      { where: { id }, returning: true }
    );
    if (rowsUpdated === 0 || !updatedUser) {
      return res.json({ message: "Ошибка при обновлении аккаунта" });
    }
    return res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};
