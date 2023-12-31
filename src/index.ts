/// <reference path="./types/express.d.ts" />

import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { createUser, loginUser } from "./controllers/Auth";
import handleError from "./middlewares/sendError";
import { initDb } from "./models";
import { User } from "./models/User";
import { router } from "./routes/index";
import { uploadGif } from "./controllers/Gif";
dotenv.config();

const port = process.env.PORT;
const app: Express = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", createUser);
app.post("/sign-in", loginUser);

app.use("/", router);

router.post("/upload", uploadGif, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  const filePath = req.file.path;
  return res.json({ message: "File uploaded successfully.", filePath });
});

initDb();
app.use(handleError);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
