/// <reference path="./types/express.d.ts" />

import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import { createUser, loginUser } from "./controllers/Auth";
import { uploadGif } from "./controllers/Gif/Gif";
import handleError from "./middlewares/sendError";
import { initDb } from "./models";
import { router } from "./routes/index";
import validateErrorsHandler from "./middlewares/handleValidateSchema";

dotenv.config();

if (!process.env.PORT) {
  console.error("Ошибка: переменная окружения PORT не установлена.");
  process.exit(1);
}

const port = process.env.PORT;
const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.post("/sign-up", createUser);
app.post("/sign-in", loginUser);

app.use(validateErrorsHandler);

app.use("/", router);

router.post("/upload", uploadGif, (req, res) => {
  if (!req.file) {
    console.error("No file uploaded.");
    return res.status(400).json({ message: "No file uploaded." });
  }

  const filePath = req.file.path;
  console.log("File uploaded successfully. Path:", filePath);
  return res
    .status(201)
    .json({ message: "File uploaded successfully.", filePath });
});

initDb();

app.use(handleError);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
