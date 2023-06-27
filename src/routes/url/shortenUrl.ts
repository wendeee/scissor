import { authenticate } from "../../../src/utils/middleware";

import { Router, RequestHandler } from "express";
import { sendError } from "../../../src/utils/sendRes";
import DB from "../../../database/postgresDB";
import Joi from "joi";
import { validateURL } from "./utils";
import { generateUniqueId } from "./utils";
import { generateRandomString } from "./utils";
import { createShortURL } from "../../../src/controller/shortenUrl.controller";


import { URLService } from "../../../database/postgresDB/models/URL/UrlService";

// export interface ShortenURLForm {
//   longURL: string;
//   customDomain?: string;
// }
const formValidation: RequestHandler = (req, res, next) => {
  const body = req.body;

  const schema = Joi.object({
    longURL: Joi.string().required(),
    customName: Joi.string().allow("").optional()
  });

  const validate = schema.validate(body);

  if (validate.error) {
    return sendError(res, {
      message: {
        content: validate.error.message || "Invalid credentials",
        type: "error",
      },
      status: 400,
    });
  }
  next();
};

export default function (router: Router) {
  return router.post(
    "/api/v1/url",
    formValidation,
    authenticate,
    createShortURL
)}
