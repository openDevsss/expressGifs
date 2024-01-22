import type { Schema } from "express-validator";
import {
  ExtractValidatedDataOptions,
  extractValidatedData,
} from "./ValidateWithRequestData";
import { validateBySchema } from "./validateBySchema";

export const validateBySchemaAndExtract = (
  schema: Schema,
  options?: ExtractValidatedDataOptions,
) => [...validateBySchema(schema), extractValidatedData(options)];
