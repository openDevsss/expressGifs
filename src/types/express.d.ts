import { User } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user: User;
      file: any;
      validatedData: any;
    }
  }
}
