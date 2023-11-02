import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
export const sequelize = new Sequelize(
  "postgres://postgres:kirill@localhost:5432/gifs",
  {
    models: [User],
  }
);
