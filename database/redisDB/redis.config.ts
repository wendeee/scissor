import * as redis from "redis";
import dotEnv from "dotenv";

dotEnv.config();

const REDIS_USERNAME = process.env.REDIS_USERNAME || "default";
const REDIS_PORT = process.env.REDIS_PORT_PROD || 6379;
const REDIS_HOST = process.env.REDIS_HOST_PROD || "127.0.0.1";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD_PROD || null;
export const redisClient = redis.createClient({
  url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
});

export async function connectToRedis() {
  try {
    await redisClient.connect();
    redisClient.on("connect", () => {
      console.log("REDIS CONNECTED");
    });

    redisClient.on("error", () => {
      console.log("REDIS DISCONNECTED!");
    });

    // await redisClient.disconnect();
  } catch (err) {
    console.log(err);
  }
}
