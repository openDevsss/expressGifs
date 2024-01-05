// controllers/subscriptionController.ts
import { RequestHandler } from "express";
import { User } from "../models/User";
import { Subscription } from "../models/Subscriptions";

export const subscribeToUser: RequestHandler = async (req, res, next) => {
  const { followerId, followeeId } = req.body;

  try {
    // Проверяем, существует ли уже подписка
    const existingSubscription = await Subscription.findOne({
      where: { followerId, followeeId },
    });

    if (existingSubscription) {
      return res.status(400).json({ error: "Подписка уже существует" });
    }

    // Создаем новую подписку
    const subscription = await Subscription.create({ followerId, followeeId });

    // Обновляем количество подписок для подписчика
    await User.increment("following", { by: 1, where: { id: followerId } });

    // Обновляем количество подписчиков для пользователя
    await User.increment("followers", { by: 1, where: { id: followeeId } });

    return res
      .status(201)
      .json({ message: "Подписка успешно создана", subscription });
  } catch (error) {
    next(error);
  }
};

export const unsubscribeFromUser: RequestHandler = async (req, res, next) => {
  const { followerId, followeeId } = req.body;

  try {
    // Проверяем, существует ли подписка
    const existingSubscription = await Subscription.findOne({
      where: { followerId, followeeId },
    });

    if (!existingSubscription) {
      return res.status(400).json({ error: "Подписка не существует" });
    }

    // Удаляем подписку
    await existingSubscription.destroy();

    // Обновляем количество подписок для подписчика
    await User.decrement("following", { by: 1, where: { id: followerId } });

    // Обновляем количество подписчиков для пользователя
    await User.decrement("followers", { by: 1, where: { id: followeeId } });

    return res.json({ message: "Подписка успешно удалена" });
  } catch (error) {
    return next(error);
  }
};
