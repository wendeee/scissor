import { Request, Response } from "express";
import dotEnv from "dotenv";

import { redisClient } from "../../database/redisDB/redis.config";
import { ShortenURLForm } from "../../src/types/index";
import DB from "../../database/postgresDB";
import { validateURL } from "../../src/routes/url/utils";
import {
  generateUniqueId,
  generateRandomString,
} from "../../src/routes/url/utils";
import { sendSuccessRes, sendErrorRes } from "../../src/utils/sendRes";
import { URLService } from "../../database/postgresDB/models/URL/UrlService";

dotEnv.config();

export async function createShortURL(req: Request, res: Response) {
  //@ts-ignore
  const user = req.user;
  const userId = user.id;

  const { longURL, customName } = req.body as ShortenURLForm;

  try {
    let customUrl: string | object;
    if (!userId) {
      throw new Error("You must be logged in!");
    }

    // Validate if longURL is a correct URL
    const isValidURL = await validateURL(longURL);

    if (!isValidURL) {
      throw new Error("{400} URL is not valid");
    }

    //check if a shortURL exist for the longurl if no custom name was provided
    if (!customName) {
      const cachedShortURL = await redisClient.get(longURL);

      console.log("CACHED DATA: ", cachedShortURL);

      if (cachedShortURL) {
        customUrl = cachedShortURL;
        sendSuccessRes(res, {
          data: { customUrl },
          message: {
            type: "success",
            content: "ShortUrl generated successfully from cache!!",
          },
        });
      }
    }

    const transaction = await DB.transaction();

    //check Node env
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.BASE_URL_PROD
        : process.env.BASE_URL_DEV;

    // console.log("BASEURL: ", baseUrl);
    // const baseUrl = `http://localhost:3001/`;

    let UrlCode: any;
    let shortURL: string;

    //check if user entered a custom name
    if (customName) {
      //check if custom name has been taken
      const customNameIsTaken = await URLService.findOne({
        where: { customName },
        transaction,
      });

      if (customNameIsTaken) {
        await transaction.rollback();
        throw new Error(
          "{403} Custom name has already been taken. Choose another"
        );
      }

      UrlCode = customName;
      shortURL = `${baseUrl}${UrlCode}`;
    } else {
      //check if there's any short url associated with this long url
      // const UrlCodeInDB = await URLService.findOne({
      //   where: { longURL },
      //   transaction,
      // });
      // customUrl = UrlCodeInDB.shortURL;
      // if (UrlCodeInDB) {
      //   return sendSuccessRes(res, {
      //     data: { customUrl },
      //     message: { type: "success", content: "Short url generated!" },
      //   });
      //   // return res.status(200).json(UrlCodeInDB.shortURL);
      // }

      //if none, generate a short url code
      const randomString = await generateRandomString();

      const uniqueId = await generateUniqueId();

      UrlCode = `${uniqueId}${randomString}`;

      shortURL = `${baseUrl}${UrlCode}`;
      //cache shorturl if there's no custom name
      await redisClient.set(longURL, shortURL);
    }

    customUrl = await URLService.create(
      {
        longURL,
        shortURL,
        UrlCode,
        createdBy: userId,
        clickHistory: [],
      },
      { transaction }
    );

    await transaction.commit();
    sendSuccessRes(res, {
      data: { customUrl },
      message: { type: "success", content: "Short URL created!" },
    });
  } catch (err) {
    sendErrorRes(err, res);
  }
}
