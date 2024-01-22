import type { NextFunction, Request, Response } from "express";
import type { ValidationError } from "express-validator";
import { validationResult } from "express-validator";
import { HTTP_STATUS_CODES } from "../constant/StatusError";

const errorFormatter = ({ msg, ...rest }: ValidationError) => ({
  ...rest,
  msg: msg === "Invalid value" ? "Некорректное значение" : msg,
});

export const getValidationErrors = (req: Request) =>
  validationResult(req).formatWith(errorFormatter);

const validateErrorsHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = getValidationErrors(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res
    .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
    .json(errors.array());
};

export default validateErrorsHandler;
