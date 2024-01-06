import { Sequelize } from "sequelize-typescript";
import { Comment } from "./Comment";
import { Gif } from "./Gif";
import { Role } from "./Role";
import { Tag } from "./Tag";
import { TagGifs } from "./TagGifs";
import { User } from "./User";
import { Like } from "./Like";
import { Subscription } from "./Subscriptions";
import { VerificationCode } from "./VerificationCode";

const sequelize = new Sequelize({
  host: "localhost",
  database: "gifs",
  dialect: "postgres",
  username: "postgres",
  password: "kirill",
  logging: false,
});

sequelize.addModels([
  Role,
  User,
  Gif,
  Tag,
  TagGifs,
  Comment,
  Like,
  Subscription,
  VerificationCode,
]);

export const initDb = async () => {
  await sequelize.sync();
};
