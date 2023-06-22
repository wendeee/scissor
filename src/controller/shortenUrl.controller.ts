import { Router, Request, Response } from "express";
import dotEnv from 'dotenv';

import { ShortenURLForm } from "../../src/types/index";
import DB from "../../database/postgresDB";
import { validateURL } from "../../src/routes/url/utils";
import {
  generateUniqueId,
  generateRandomString,
} from "../../src/routes/url/utils";
import { sendSuccessRes, sendErrorRes } from "../../src/utils/sendRes";
import { URLService } from "../../database/postgresDB/models/URL/UrlService";
dotEnv.config()
export async function createShortURL(req: Request, res: Response) {
  //@ts-ignore
  const user = req.user;
  const userId = user.id;

  const { longURL, customName } = req.body as ShortenURLForm;

  try {
    if (!userId) {
      throw new Error("You must be logged in!");
    }

    const transaction = await DB.transaction();

    // Validate if longURL is a correct URL
    const isValidURL = await validateURL(longURL);

    if (!isValidURL) {
      await transaction.rollback();
      throw new Error("{400} URL is not valid");
    }

    //check Node env
    const baseUrl =
      process.env.NODE_ENV ==="production"
        ? process.env.BASE_URL_PROD
        : process.env.BASE_URL_DEV

    console.log('BASEURL: ', baseUrl)
    // const baseUrl = `http://localhost:3001/`;

    let UrlCode: any;
    let shortURL: string;

    //check if user entered a custom name
    if (customName) {
      //check if custom name has been taken
      const customNameIsAvailable = await URLService.findOne({
        where: { customName },
        transaction,
      });

      if (customNameIsAvailable) {
        await transaction.rollback();
        res.status(403).json({
          data: {},
          message: {
            type: "error",
            content: "Custom name has already been taken. Choose another.",
          },
        });
      }

      UrlCode = customName;
      shortURL = `${baseUrl}${UrlCode}`;
    } else {
      //check if there's any short url associated with this long url
      const UrlCodeInDB = await URLService.findOne({
        where: { longURL },
        transaction,
      });

      if (UrlCodeInDB) {
        return res.status(200).json(UrlCodeInDB.shortURL);
      }

      //if none, generate a short url code
      const randomString = await generateRandomString();

      const uniqueId = await generateUniqueId();

      UrlCode = `${uniqueId}${randomString}`;

      shortURL = `${baseUrl}${UrlCode}`;
    }

    const customUrl = await URLService.create(
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
