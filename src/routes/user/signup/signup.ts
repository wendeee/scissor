import Joi from "joi";

import { hashPassword } from "../../../../database/utils";
import * as nodemailer from "nodemailer";
// import jwt from "jsonwebtoken";
import { Router, RequestHandler } from "express";
import {
  sendError,
  sendErrorRes,
  sendSuccessRes,
} from "../../../utils/sendRes";
import DB from "../../../../database/postgresDB";
import { User } from "../../../../database/postgresDB/models/User/User";
import { signJwtToken, sendEmail } from "../utils";

//create sign up interface
export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const formValidation: RequestHandler = (req, res, next) => {
  const body = req.body;

  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(85)

      .required(),
    email: Joi.string().min(3).max(150),

    password: Joi.string().min(8).max(32),

    confirmPassword: Joi.string()
      .min(8)
      .max(32)
      .valid(Joi.ref("password"))
      .required(),
  } as Record<keyof SignUpForm, any>);

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
    "/api/v1/auth/signup",
    formValidation,
    async (req, res) => {
      try {
        const transaction = await DB.transaction();

        let { name, email, password, confirmPassword } = req.body;

        email = email?.toLowerCase()?.trim();

        // //find if user with email already exist in the database

        const userInDB = await User.findOne({
          where: { email: email },
          transaction,
        });
        console.log(userInDB);

        const hashedPassword = await hashPassword(password);
        const token = await signJwtToken({ email });

        if (userInDB) {
          await transaction.rollback();
          throw new Error("Email is already taken.");
        } else {
          //create a new user
          const user = await User.create({
            name,

            email,
            password: hashedPassword,
            confirmationCode: token,
          });

          const modifiedResponse = { ...user.get() };
          delete modifiedResponse.password;

          await transaction.commit();

          sendSuccessRes(res, {
            data: {
              modifiedResponse,
            },
            message: {
              type: "success",
              content:
                "User has been successfully registered. Please confirm your email.",
            },
          });

          const baseUrl =
            process.env.NODE_ENV === "production"
              ? process.env.BASE_URL_PROD
              : process.env.BASE_URL_DEV;
          //send verification email
          let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Please confirm your email",
            html: `<h1>Email Confirmation</h1>
          <h2>Hello ${user.name}</h2>
          <p>Thank you for signing up on snipit. Please confirm your email by clicking on the following link</p>
           <a href=${baseUrl}api/v1/auth/confirm/${user.confirmationCode}> Click here</a>
         </div>`,
          };

          await sendEmail(mailOptions);
        }
      } catch (err) {
        sendErrorRes(err, res);
      }
    }
  );
}
