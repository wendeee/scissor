import { Router } from "express";

import qrcode from "qrcode";
import { redisClient } from "../../../database/redisDB/redis.config";

import DB from "../../../database/postgresDB";
import { QRCode } from "../../../database/postgresDB/models/QRCode/QRCode";
import { URLService } from "../../../database/postgresDB/models/URL/UrlService";
import { authenticate } from "../../../src/utils/middleware";
import { cloudinary } from "../../../utils/cloudinary.config";
import { sendSuccessRes, sendErrorRes } from "../../../src/utils/sendRes";

export default function (router: Router) {
  return router.post("/api/v1/url/qrcode", authenticate, async (req, res) => {
    //@ts-ignore
    const user = req.user;
    const userId = user.id;
    const { shortURL } = req.body;
    try {
      if (!userId) {
        throw new Error("You must be logged in!");
      }
      const transaction = await DB.transaction();
      //
      let url;
      url = await URLService.findOne({
        where: { shortURL, createdBy: userId },
        transaction,
      });
      if (!url) {
        // Check if the short URL exists in the cache
        const cachedShortURL = await redisClient.get(shortURL);

        url = cachedShortURL;
        if (!cachedShortURL) {
          await transaction.rollback();
          return res.status(404).json({
            data: {},
            message: { type: "error", content: "URL not found" },
          });
        }
      }

      const existingQRCode = await QRCode.findOne({
        where: { shortURL },
        transaction,
      });

      if (existingQRCode) {
        const { qrcodeurl } = existingQRCode;

        return res.status(200).json({
          data: { url: url.shortURL, qrcodeurl },
          message: { type: "success", content: "QR code already generated" },
        });
      }

      //generate qrcode for shorturl
      const qrCodeForShortURL = await qrcode.toDataURL(url.shortURL);

      const qrCodeBuffer = Buffer.from(
        qrCodeForShortURL.split(",")[1],
        "base64"
      );
      // Save the QR code image to Cloudinary
      const uploadResult = await uploadQRCodeImage(qrCodeBuffer);

      async function uploadQRCodeImage(imageBuffer: Buffer): Promise<any> {
        return new Promise((resolve, reject) => {
          const uploadOptions = {
            folder: "qrcodes",
          };

          cloudinary.uploader
            .upload_stream(uploadOptions, (error: any, result: any) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            })
            .end(imageBuffer);
        });
      }
      // Get the Cloudinary URL of the QR code image
      const qrCodeImageUrl = uploadResult.secure_url;
      //update urlservice model
      await QRCode.create(
        {
          shortURL: shortURL,
          qrcodeurl: qrCodeImageUrl,
          createdBy: userId,
        },
        { transaction }
      );
      await url.update({
        qrcodeurl: qrCodeImageUrl,
      });
      await url.save({ transaction });
      await transaction.commit();

      sendSuccessRes(res, {
        data: { url: url.shortURL, qrCodeImageUrl },
        message: { type: "success", content: "QRCode generated!" },
      });

      res.status(200).json({ data: url.shortURL, qrCodeImageUrl });
    } catch (err) {
      sendErrorRes(err, res);
    }
  });
}
