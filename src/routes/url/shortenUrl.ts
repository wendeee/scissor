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
    customName: Joi.string().optional()
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
  //   async (req, res) => {
  //     //@ts-ignore
  //     const user = req.user;
  //     const userId = user.id;

  //     const { longURL } = req.body as ShortenURLForm;

  //     try {
  //       if (!userId) {
  //         throw new Error("You must be logged in!");
  //       }

  //       const transaction = await DB.transaction();

  //       //validate if longURL is a correct url
  //       const isValidURL = await validateURL(longURL);

  //       if (!isValidURL) {
  //         await transaction.rollback();
  //         throw new Error("URL is not valid");
  //       }
       
  //       const baseUrl = `http://localhost:3001/`

  //       const randomString = await generateRandomString()
        
       
  //         const uniqueId = await generateUniqueId();
        
  //       const UrlCode = `${uniqueId}${randomString}`

  //       // console.log('URLCODE:', UrlCode)
  //       const UrlCodeInDB = await URLService.findOne({
  //         where: { longURL },
  //         transaction,
  //       });

  //       if (UrlCodeInDB) {
  //         //return the associated shortUrl
  //         // await transaction.rollback()
  //         return res.status(200).json(UrlCodeInDB.shortURL) ;
  //       }

  //       // //else create a new short url
  //       const shortURL = `${baseUrl}${UrlCode}`;
  //       // console.log(shortURL)

  //       const customUrl = await URLService.create(
  //         {
  //           longURL,
  //           shortURL,
  //           UrlCode,
  //           createdBy: userId,
  //           linkHistory: []
  //         },
  //         { transaction }
  //       );

  //       await transaction.commit();

  //       res.status(201).json({
  //         data: { customUrl },
  //         message: { type: "success", content: "short url created!" },
  //       });
  //     } catch (err) {
  //       // res.status(500).json(err.message);
  //       throw new Error(err)
  //     }
  //   }
  // );
)}
