import { Sequelize } from "sequelize-typescript";
import { Role } from "./Role";
import { User } from "./User";
import { Gif } from "./Gif";
import { Tag } from "./Tag";
import { TagGifs } from "./TagGifs";

const sequelize = new Sequelize({
  host: "localhost",
  database: "gifs",
  dialect: "postgres",
  username: "postgres",
  password: "kirill",
});

sequelize.addModels([Role, User, Gif, Tag, TagGifs]);

export const initDb = async () => {
  await sequelize.sync();
};
