import express, { Express } from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/connect";
import router from "./routes/User";
import { createUser, loginUser } from "./controllers/auth";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();
app.use(express.json());

app.post("/sign-up", createUser);
app.post("/sign-in", loginUser);

sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: string) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
