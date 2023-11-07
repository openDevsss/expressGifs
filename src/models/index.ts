import { Sequelize } from "sequelize-typescript";
import { Role } from "./Role";
import { User } from "./User";
import { Gif } from "./Gif";

const sequelize = new Sequelize({
  host: "localhost",
  database: "gifs",
  dialect: "postgres",
  username: "postgres",
  password: "kirill",
});

sequelize.addModels([Role, User, Gif]);

export const initDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
};
