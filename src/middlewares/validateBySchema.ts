import type { Location, Schema } from "express-validator";
import { checkSchema } from "express-validator";
import validateErrorsHandler from "./handleValidateSchema";

export const validateBySchema = (
  schema: Schema,
  defaultLocations?: Location[],
) => [...checkSchema(schema, defaultLocations), validateErrorsHandler];
