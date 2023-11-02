import express, { Express } from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/connect";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

sequelize
  .sync({ force: true })
  //   .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: string) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
