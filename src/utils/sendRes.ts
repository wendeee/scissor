
import { Response } from 'express';
import type { MessageObject } from '../types';

export type Message = MessageObject | MessageObject[]

export function sendError(
    res: Response,
    payload: { status?: number; message: Message; trace?: any }
  ): void {
    const { message, status = 500, trace } = payload;
  
    if (!res.headersSent) {
      const sessionId = (
        res.req.cookies?.token ||
        (res.req.headers.Authorization as string) ||
        (res.req.headers.authorization as string)
      )?.replace(/Bearer\s+/i, "");
  
      res
        .set("$user", "")
        .set("$token", sessionId)
        .status(status)
        .send({
          error: trace || {},
          status,
          message: [message].flat().filter(Boolean),
          setHeader: {
            token: sessionId,
          },
        });
    }
  
    res.end();
  }