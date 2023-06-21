import { Router } from "express";

import qrcode from "qrcode";
import path from "path";
import fs from "fs";

import DB from "../../../database/postgresDB";
import { URLService } from "../../../database/postgresDB/models/URL/UrlService";
import { authenticate } from "../../../src/utils/middleware";
import { cloudinary } from "../../../utils/cloudinary.config";
import { sendSuccessRes, sendErrorRes } from "../../../src/utils/sendRes";

export default function (router: Router) {
  return router.post(
    "/api/v1/url/qrcode/:id",
    authenticate,
    async (req, res) => {
      //@ts-ignore
      const user = req.user;
      const userId = user.id;
      const { id } = req.params;
      try {
        if (!userId) {
          throw new Error("You must be logged in!");
        }
        const transaction = await DB.transaction();
        //
        const url = await URLService.findOne({
          where: { id },
          transaction,
        });

        if (!url) {
          await transaction.rollback();
          return res.status(404).json({
            data: {},
            message: { type: "error", content: "URL not found" },
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
        sendSuccessRes(res, { data: { url: url.shortURL, qrCodeImageUrl}, message: {type: 'success', content: 'QRCode generated!'} })
       
        res.status(200).json({ data: url.shortURL, qrCodeImageUrl });
      } catch (err) {
        sendErrorRes(err, res)
        // console.error("Error generating and saving QR code:", err);
        // res.status(500).json({ error: "Failed to generate and save QR code" });
      }
    }
  );
}
