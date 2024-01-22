import type { NextFunction, Request, Response } from "express";
import type { MatchedDataOptions } from "express-validator";
import { matchedData } from "express-validator";

export type ExtractValidatedDataOptions = Partial<MatchedDataOptions>;

export interface RequestWithValidatedData<T = any> extends Request {
  validatedData: T;
}

export const extractValidatedData =
  <T>(options?: Partial<MatchedDataOptions>) =>
  (req: RequestWithValidatedData<T>, res: Response, next: NextFunction) => {
    try {
      const data = options ? matchedData(req, options) : matchedData(req);
      req.validatedData = data as T;
      next();
    } catch (err) {
      next(err);
    }
  };
