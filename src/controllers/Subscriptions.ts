// controllers/subscriptionController.ts
import { RequestHandler } from "express";
import { Subscription } from "../models/Subscriptions";
import { User } from "../models/User";

export const subscribeToUser: RequestHandler = async (req, res, next) => {
  const { followeeId } = req.body;
  const { id: followerId } = req.user;

  try {
    // Проверяем, существует ли уже подписка
    const existingSubscription = await Subscription.findOne({
      where: { followerId, followeeId },
    });

    if (existingSubscription) {
      return res
        .status(400)
        .json({ error: "The subscription already exists." });
    }

    // Создаем новую подписку
    const subscription = await Subscription.create({ followerId, followeeId });

    // Обновляем количество подписок для подписчика
    await User.increment("following", { by: 1, where: { id: followerId } });

    // Обновляем количество подписчиков для пользователя
    await User.increment("followers", { by: 1, where: { id: followeeId } });

    return res.status(201).json({
      message: "The subscription has been successfully created.",
      subscription,
    });
  } catch (error) {
    return next(error);
  }
};

export const unsubscribeFromUser: RequestHandler = async (req, res, next) => {
  const { followeeId } = req.body;
  const { id: followerId } = req.user;
  try {
    // Проверяем, существует ли подписка
    const existingSubscription = await Subscription.findOne({
      where: { followerId, followeeId },
    });

    if (!existingSubscription) {
      return res
        .status(400)
        .json({ error: "The subscription does not exist." });
    }

    // Удаляем подписку
    await existingSubscription.destroy();

    // Обновляем количество подписок для подписчика
    await User.decrement("following", { by: 1, where: { id: followerId } });

    // Обновляем количество подписчиков для пользователя
    await User.decrement("followers", { by: 1, where: { id: followeeId } });

    return res.json({
      message: "The subscription has been successfully deleted",
      existingSubscription,
    });
  } catch (error) {
    return next(error);
  }
};
