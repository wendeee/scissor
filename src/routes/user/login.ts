import { comparePassword } from "../../../database/utils";
import { Router, RequestHandler } from "express";
import Joi from "joi";
import {
  sendError,
  sendErrorRes,
  sendSuccessRes
  // sendFormattedError,
  // sendSuccess,
} from "../../utils/sendRes";

import DB from "../../../database/postgresDB";
import { User } from "../../../database/postgresDB/models/User/User";
import { loginUser } from "./utils";

export interface loginForm {
  email: string;
  password: string;
}

const formValidation: RequestHandler = (req, res, next) => {
  const body = req.body;

  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
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
  return router.post("/api/v1/auth/login", formValidation, async (req, res) => {
    try {
      const transaction = await DB.transaction();

      const { email, password } = req.body as loginForm;

      //check if user provider is email
      const user = await User.findOne({ where: { email }, transaction });

      if (user.provider !== "email") {
        await transaction.rollback();
        throw new Error(`Please login with ${user.provider}`);
      }

      //compare password
      const isValidPassword = await comparePassword(password, user.password);

      if (!user || !isValidPassword) {
        await transaction.rollback();
        return res.status(400).json("Email or password incorrect!");
      }

      if(user.status.toLowerCase() === 'pending'){
        res.status(401).json({data: {}, message: {type: 'success', content: 'Please confirm your account'}})
      }
      //assign token
      const jwtToken = await loginUser({
        user,
        transaction,
        req,
        res,
      });

      const modifiedResponse = {...user.get()}
      delete modifiedResponse.password;

      sendSuccessRes(res, {data: {modifiedResponse, jwtToken}})
      // res.status(200).json({data: {modifiedResponse, jwtToken}})
    } catch (err) {
      sendErrorRes(err, res)
        // res.status(400).json("Login failed");
    //   throw new Error("Login failed");
    }
  });
}