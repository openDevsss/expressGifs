import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Role } from "../models/Role";
export const sequelize = new Sequelize(
  "postgres://postgres:kirill@localhost:5432/gifs",
  {
    models: [Role, User],
  }
);
