import { RequestHandler, Request } from "express";
import { User } from "../../database/postgresDB/models/User/User";

import DB from "../../database/postgresDB";

import { sendError } from "./sendRes";
import * as jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userInstance?: any;
}


export const authenticate: RequestHandler = async function (
  req: AuthenticatedRequest,
  res,
  next
) {
  const errorRes = (message = "You must be logged in!") => {
    sendError(res, {
      status: 401,
      message: {
        content: message,
        type: "error",
      },
    });
  };

  try {
    let token: string;

    //     //Check if token was passed in the header and then retrieve
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      token = req.headers.cookie.split("=")[1];
    }

    if (!token) {
      return errorRes("No token found!");
    }

    //     //verify token
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED PAYLOAD: ", decodedPayload);
    //@ts-ignore

    //check if user still exist using the token payload
    await DB.transaction(async (transaction) => {
      //@ts-ignore
      const userInstance = await User.findByPk(decodedPayload.id, {
        transaction,
      });

      if (!userInstance) {
        return errorRes("Account does not exist!");
      }
      //@ts-ignore
      req.user = userInstance;
      next();
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return errorRes("Expired Token. Please log in again!");
    } else if (err.name === "JsonWebTokenError") {
      return errorRes("Invalid Token. Please log in again");
    }
    res.json(err);
  }
};
