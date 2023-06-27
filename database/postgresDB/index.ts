import dotEnv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";
import { getModules } from "../../src/utils";
import envConfigs from "../config/index";
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

//Testing this out
export async function startPostgresDB() {
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

  return new Promise(async (resolve, reject) => {
    if (!dbState.created) {
      return reject(new Error("Error creating Database"));
    }

    try {
      await DB.authenticate();
      await DB.sync();
      console.log("DB Started!");
      dbState.started = true;
      resolve(true);

      // // Set associations here
      // // User and URLService model have a one-to-many relationship:
      // const User = DB.models.User
      // const URLService = DB.models.URLService;

      // User.hasMany(URLService);
      // URLService.belongsTo(User);

      // if (process.env._MIGRATE === "1") {
      //   await DB.getQueryInterface().removeConstraint('Users', 'Users_lastName_key');
      //   await DB.query('ALTER TABLE "Users" DROP CONSTRAINT "Users_lastName_key";');
      // }

      //testing out migration
      if (process.env._MIGRATE === "1") {
        try {
          // Add the new column 'Username' to the 'Users' table
          await DB.getQueryInterface().addColumn('Users', 'status', {
            type: DataTypes.STRING(),
            allowNull: true, // Set the allowNull option as per your requirements
          });
          //REMOVE A COLUMN
          // await DB.getQueryInterface().removeColumn('Users', 'Username');
          console.log('MIGRATION SUCCESSFUL!')
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.log({ Error: error });
      reject(error);
    }
  });
}

  
  // export function startPostgresDB() {
  //   if (dbState.created) {
  //     getModules({
  //       directory: [__dirname, ".", "models"],
  //       exempt: ["setAssociation\\.(?:js|ts)?$", "utils"],
  //     }).forEach((file) => {
  //       const initModel = (file as { default: unknown })?.default;
  
  //       if (typeof initModel === "function") {
  //         initModel(DB);
  //       }
  //     });
  //   }
  
  //   if (dbStarted) {
  //     return Promise.resolve();
  //   }
  
  //   dbStarted = true;
    
  
  //   return new Promise((resolve, reject) => {
  //     if (!dbState.created) {
  //       return reject(new Error("Error creating Database"));
  //     }
  
  //     DB.authenticate()
  //       .then(() => {
  //         DB.sync({
  //           // never hardcode 💣🔥
  //           // force: forceSync,
  //         })
  //           .then(() => {
  //             // console.log("DB: setting association");
  //             console.log("DB Started!");
  //             dbState.started = true
  //             resolve(true)

  //              const migrate = async () => {
  //                 if (process.env._MIGRATE === "1") {
  //                   await DB.getQueryInterface().removeConstraint(
  //                     'Users',
  //                     'Users_lastName_key'
  //                   )

  //                   try {
  //                     await DB.query(
  //                       'ALTER TABLE "Users" DROP CONSTRAINT "Users_lastName_key";'
  //                     );
  //                   } catch (e) {
  //                     console.log(e);
  //                   }
  //                 }
  //               };

  //               await migrate();
  //             // setAssociation()
  //             //   .then(async () => {
  //             // //     console.log("DB: seeding db");
  
  //             // //     // await seedUser();
  
             
  //             // //     // const migrate = async () => {
  //             // //     //   if (process.env._MIGRATE === "1") {
  //             // //     //     // await DB.getQueryInterface().removeConstraint(
  //             // //     //     //   'Users',
  //             // //     //     //   'Users_lastName_key'
  //             // //     //     // )
  
  //             // //     //     try {
  //             // //     //       await DB.query(
  //             // //     //         'ALTER TABLE "Users" DROP CONSTRAINT "Users_lastName_key";'
  //             // //     //       );
  //             // //     //     } catch (e) {
  //             // //     //       console.log(e);
  //             // //     //     }
  //             // //     //   }
  //             // //     // };
  
  //             // //     // await migrate();
  
  //             //     dbState.started = true;
  
  //             //     console.log("DB Started!");
  
  //             //     resolve(true);
  //             //   })
  //             //   .catch((e) => {
  //             //     console.log({ AssociationError: e });
  
  //             //     reject(e);
  //             //   });
  //           })
  //           .catch((e) => {
  //             console.log({ SyncError: e });
  
  //             reject(e);
  //           });
  //       })
  //       .catch((e) => {
  //         console.log({ AuthenticationError: e, message: e.message });
  
  //         reject(e);
  
  //         process.exit(1);
  //       });
  //   });
  // }



  
