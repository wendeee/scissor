import { Response } from "express";
import type { MessageObject } from "../types";

export type Message = MessageObject | MessageObject[];

export function sendError(
  res: Response,
  payload: { status?: number; message: Message; trace?: any }
): void {
  const { message, status = 500, trace } = payload;

  if (!res.headersSent) {
    res.status(status).send({
      error: trace || {},
      status,
      message: [message].flat().filter(Boolean),
    });
  }

  res.end();
}

export async function sendSuccessRes(
  res: Response,
  payload: { status?: number; data: any; message?: Message }
): Promise<void> {
  const { data, status = 200, message } = payload;
  if (!res.headersSent) {
    res

      .status(status)
      .header({
        "Access-Control-Allow-Credentials": "true",
      })
      .send({
        data: data,
        status,
        message: [message].flat().filter(Boolean),
      });
  }

  res.end();
}

/**
 * @name sendFormattedError
 * @description
 * Formats error messages sent with the `Error` constructor.
 * @param { any|unknown } err
 * @param { Response } res
 * **/
export function sendErrorRes(
  err: any | unknown,
  res: Response,
  output: Record<string, any> = {}
) {
  if (err) {
    const matchStatus = err.message.match(/^\{\d+\}/g);

    // defined error
    if (matchStatus) {
      const status = Number(matchStatus[0].replace(/\{|\}/g, ""));

      return sendError(res, {
        message: {
          content: err.message.replace(/^\{\d+\}\s/, ""),
          type: "error",
        },
        status,
        trace: output,
      });
    }

    // server error
    sendError(res, {
      message: {
        type: "error",
        content: err.message || "Oops! An error occurred.",
      },
    
    });
  }
}
