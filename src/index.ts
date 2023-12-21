/// <reference path="./express.d.ts" />

import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { createUser, loginUser } from "./controllers/Auth";
import handleError from "./middlewares/sendError";
import { initDb } from "./models";
import { User } from "./models/User";
import { router } from "./routes/index";
dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", createUser);
app.post("/sign-in", loginUser);

app.use("/", router);

initDb();
app.use(handleError);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
