// get the urlcode from the params
import { Router } from "express";
import {
  sendError,
  sendErrorRes,
  sendSuccessRes,
} from "../../../src/utils/sendRes";
import DB from "../../../database/postgresDB";
import { URLService } from "../../../database/postgresDB/models/URL/UrlService";
import { run } from "../../../src/utils/getDeviceLocation";

export default function (router: Router) {
  return router.get(
    "/:code",

    async (req, res) => {
      const { code } = req.params;

      try {
        const transaction = await DB.transaction();

        const UrlCodeInDB = await URLService.findOne({
          where: { UrlCode: code },
          transaction,
        });

        if (UrlCodeInDB) {
          const deviceLocationData = await run(req.ip);
          //@ts-ignore
          const clickHistory = `${deviceLocationData.addressRegion}, ${deviceLocationData.addressCountry}`;

          //update click number
          await URLService.update(
            {
              clicks: UrlCodeInDB.clicks + 1,
              clickHistory: [
                ...UrlCodeInDB.clickHistory,
                {
                  timestamp: new Date(),
                  location: clickHistory,
                },
              ],
            },
            {
              where: { UrlCode: code },
            }
          );

          res.redirect(UrlCodeInDB.longURL);
        } else {
          throw new Error("{404} Url not found");
        }
      } catch (err) {
        sendErrorRes(err, res);
        // res.status(500).json(err.message);
        // throw new Error(err);
      }
    }
  );
}
