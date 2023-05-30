import path from "path";
import fs from "fs";
import { Express, Request } from "express";
import { sendError } from "./sendRes";
// import axios from "axios";
export const getModules = (arg: {
    directory: string | string[];
    exempt?: string[];
  }) => {
    const { directory, exempt = [] } = arg;
  
    const output: unknown[] = [];
  
    const dirPath = path.join(...[directory].flat());
  
    const dirContent = fs.readdirSync(dirPath);
  
    if (!dirContent.length) {
      return output;
    }
  
    dirContent
      .filter(
        (file) =>
          !exempt.find((exemptedFile) =>
            new RegExp(`${exemptedFile}`).test(file)
          ) && !file.endsWith(".map")
      )
      .forEach((file) => {
        if (!/\..+$/.test(file)) {
          output.push(
            ...getModules({ directory: path.join(dirPath, file), exempt })
          );
        } else {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          output.push(require(path.join(dirPath, file)));
        }
      });
  
    return output;
  };

/**
 * @name catchAllRoute
 * @description 
 * Throws 404 error for any unregisterd route
 * @param {Express} router
 **/
export const catchAllRoute = (
  router: Express,
  message ="Invalid endpoint!",
  matcher = "*"
) => {
  router.all(matcher, (_, res) => sendError(res, {
    status: 404,
    message: {
      type: "error",
      content: message
    }
  }))
}