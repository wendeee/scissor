import dotEnv from "dotenv";
import express, { RequestHandler } from "express";
import { startDB } from "../database";
import { auth } from "express-openid-connect";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import { catchAllRoute } from "./utils";
// import { config } from "./routes/user/signup/oauth/oauth.config";
import routes from "./routes";

dotEnv.config();

const app = express();
app.use(cors());

const isProduction = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";
const isDevelopment = process.env.NODE_ENV === "development";

startDB()
  .then(() => {
    app.set("trust proxy", true);

    app.use([
      express.json(),
      morgan("combined"),
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
      }),
      // auth(config)
    ]);

    app.use((_req, res, next) => {
      res.setHeader("Access-Control-Max-Age", "600000");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Expose-Headers",
        "authorization,Authorization"
      );
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, *");

      next();
    });

    app.use(routes);

    const port = Number(
      process.env[
        `${
          isProduction ? "PROD" : isTest ? "TEST" : isDevelopment ? "DEV" : ""
        }_PORT`
      ]
    );

    if (!port) {
      throw new Error("Invalid port!");
    }

    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error starting server or database!", { err });

    catchAllRoute(app, "Error starting database or server!");
  });
