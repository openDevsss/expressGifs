import type { Schema } from "express-validator";

export interface GetGifsSchema {
  page: number;
  pageSize: number;
  search?: string;
}
export const GifsSchema: Schema = {
  page: {
    isInt: {
      options: {
        min: 1,
      },
    },
    toInt: true,
    in: ["query"],
  },
  pageSize: {
    isInt: {
      options: {
        min: 1,
      },
    },
    toInt: true,
    in: ["query"],
  },
};
