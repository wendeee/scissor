import { Router, Request, Response } from "express";
import { authenticate } from "../../../src/utils/middleware";
import DB from "../../../database/postgresDB";
import { URLService } from "../../../database/postgresDB/models/URL/UrlService";
import { sendSuccessRes, sendErrorRes } from "../../../src/utils/sendRes";

export default function (router: Router) {
  return router.get(
    "/api/v1/url/history",
    authenticate,
    async (req: Request, res: Response) => {
      //@ts-ignore
      const user = req.user;
      const userId = user.id;

      try {
        if (!userId) {
          res.status(401).json({
            data: {},
            message: { type: "error", content: "You must be logged in!" },
          });
        }

        const transaction = await DB.transaction();

        const generatedUrlHistory = await URLService.findAll({
            where: {createdBy: userId}, transaction
        })

       const generatedShortUrl =  generatedUrlHistory.map((el) => ({
        shortURL: el.shortURL,
        longURL: el.longURL,
        numberOfClicksOnShortUrl: el.clicks,
        clickLocation: el.clickHistory
       }))

       sendSuccessRes(res, {data: {generatedShortUrl},  message: { type: "success", content: "URL history retrieved!" }})
        // res.status(200).json({
        //     data: { generatedShortUrl },
        //     message: { type: "success", content: "URL history retrieved!" },
        //   });
      } catch (err) {
        sendErrorRes(err, res)
        // res.status(500).json({ error: "Error occurred!", message: err.message });
      }
    }
  );
}
