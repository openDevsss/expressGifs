import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes/User";
import { createUser, loginUser } from "./controllers/Auth";
import cors from "cors";
import { User } from "./models/User";
import { initDb } from "./models";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

app.use(cors());
app.use(express.json());

app.post("/sign-up", createUser);
app.post("/sign-in", loginUser);

app.use("/", router);

initDb();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
