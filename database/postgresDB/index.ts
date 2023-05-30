import dotEnv from "dotenv";
import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { getModules } from "../../src/utils";
import envConfigs from "../config/index";
// import setAssociation from "./models/setAssociation";
dotEnv.config();

const NODE_ENV = process.env.NODE_ENV as keyof typeof envConfigs;

const config = envConfigs[NODE_ENV].defaultDB;

const [dbtype, username, passwordAndHost, portAndDatabase] =
  config.url.split(":");

  const [password, host] = passwordAndHost.split("@");

  const [port, database] = portAndDatabase.split("/");
  const DB: Sequelize = config?.url
  ? new Sequelize({
      dialect: dbtype as "postgres",
      host,
      port: Number(port),
      username: username.replace(/\/\//, ""),
      password,
      database,
      protocol: config.dialect,
      dialectOptions: process.env.USE_SSL
        ? {
            ssl: {
              required: true,
              rejectUnauthorized: false,
          
            },
          }
        : {},
      pool: {
        max: 45,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    })
  : ({ error: true } as unknown as Sequelize);

  export const dbState = {
    created: DB instanceof Sequelize,
    started: false,
  };
  
  console.log({ dbState });
  
  export default DB;
  
  let dbStarted = false;
  
  export function startPostgresDB() {
    if (dbState.created) {
      getModules({
        directory: [__dirname, ".", "models"],
        exempt: ["setAssociation\\.(?:js|ts)?$", "utils"],
      }).forEach((file) => {
        const initModel = (file as { default: unknown })?.default;
  
        if (typeof initModel === "function") {
          initModel(DB);
        }
      });
    }
  
    if (dbStarted) {
      return Promise.resolve();
    }
  
    dbStarted = true;
    
  
    return new Promise((resolve, reject) => {
      if (!dbState.created) {
        return reject(new Error("Error creating Database"));
      }
  
      // const forceSync =
      //   (process.env.FORCE_SYNC === "1" && process.env.PRODUCTION !== "1") ||
      //   !Object.keys(DB.models).length;
  
      // console.log({ forceSync });
  
      DB.authenticate()
        .then(() => {
          DB.sync({
            // never hardcode 💣🔥
            // force: forceSync,
          })
            .then(() => {
              // console.log("DB: setting association");
  
              // setAssociation()
              //   .then(async () => {
              //     console.log("DB: seeding db");
  
              //     // await seedUser();
  
                  
  
              //     // const migrate = async () => {
              //     //   if (process.env._MIGRATE === "1") {
              //     //     // await DB.getQueryInterface().removeConstraint(
              //     //     //   'Users',
              //     //     //   'Users_lastName_key'
              //     //     // )
  
              //     //     try {
              //     //       await DB.query(
              //     //         'ALTER TABLE "Users" DROP CONSTRAINT "Users_lastName_key";'
              //     //       );
              //     //     } catch (e) {
              //     //       console.log(e);
              //     //     }
              //     //   }
              //     // };
  
              //     // await migrate();
  
              //     dbState.started = true;
  
              //     console.log("DB Started!");
  
              //     resolve(true);
              //   })
              //   .catch((e) => {
              //     console.log({ AssociationError: e });
  
              //     reject(e);
              //   });
            })
            .catch((e) => {
              console.log({ SyncError: e });
  
              reject(e);
            });
        })
        .catch((e) => {
          console.log({ AuthenticationError: e, message: e.message });
  
          reject(e);
  
          process.exit(1);
        });
    });
  }
  
