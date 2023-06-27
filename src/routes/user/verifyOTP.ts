import { Router, RequestHandler } from "express";

import { User } from "../../../database/postgresDB/models/User/User";
import { OTP } from "../../../database/postgresDB/models/OTP";
import DB from "../../../database/postgresDB";
import { sendOTP } from "../otp/utils";
import { sendError, sendErrorRes, sendSuccessRes } from "../../../src/utils/sendRes";
import { compareData, comparePassword } from "../../../database/utils";
import Joi from "joi";
import { hashData } from "../../../database/utils";

export interface VerifyOTPForm {
  otp: number;
  email: string;
}

const formValidation: RequestHandler = (req, res, next) => {
  const body = req.body;

  const schema = Joi.object({
    otp: Joi.number().required(),
    email: Joi.string().required(),
  } as Record<keyof VerifyOTPForm, any>);

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
    "/api/v1/auth/verify-otp",
    formValidation,
    async (req, res) => {
      try {
        const { otp, email } = req.body;
        const transaction = await DB.transaction();

        const OtpData = await OTP.findOne({ where: { email }, transaction });

        if (!OtpData) {
          await transaction.rollback();
          throw new Error("OTP row data not found");
        }

        //check if otp has expired
        if (!(OtpData.expiresAt < new Date(Date.now()))) {
          const isValidOTP = await compareData(otp.toString(), OtpData.otp);
          console.log("ISVALIDOTP: ", isValidOTP);
          if (isValidOTP) {
            res.status(200).json({
              data: {},
              message: {
                type: "success",
                content: "OTP Verified successfully!",
              },
            });
          } else {
            res.status(400).json({
              data: {},
              message: { type: "success", content: "Incorrect OTP!" },
            });
          }
        } else {
          await OtpData.destroy({ transaction });

          sendSuccessRes(res, {
            data: {},
            message: {
              type: "success",
              content: "OTP has expired. Resend OTP!",
            },
          })
          // res.status(400).json({
          //   data: {},
          //   message: {
          //     type: "success",
          //     content: "OTP has expired. Resend OTP!",
          //   },
          // });
        }
      } catch (err) {
        sendErrorRes(err, res)
        // res.status(500).json({
        //   data: {},
        //   message: {
        //     type: "error",
        //     content: "An error occurred while trying to verify your otp!",
        //   },
        // });
      }
    }
  );
}
