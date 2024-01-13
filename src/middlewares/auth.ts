import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { UnathorizatedError } from "../utils/errors/unauthorizted-err";

export const authenticateUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader: string = req.headers.authorization!;
  const token: string = authHeader && authHeader.split(" ")[1];
  let payload;
  try {
    payload = jwt.verify(token, "secret-key");
  } catch (error) {
    return next(new UnathorizatedError("Вы не вышло в аккаунт"));
  }
  req.user = payload as User;
  return next();
};
