import { hash, compare } from "bcrypt";
import * as crypto from "crypto";

// import { User } from "../postgresDB/models/User/User";

/**
 * @name hashPassword
 * @description Hash password using bcrypt
 * @param {string} password password to be hashed by bcrypt
 * @returns `Promise<string>`
 */

//hash password
export async function hashPassword(password: string): Promise<string> {
  const getHashPassword = await hash(password, Number(process.env.SALT_ROUNDS));
  return getHashPassword;
}

export async function hashData(data: string): Promise<string> {
  const hashedData = await hashPassword(data);
  return hashedData;
}
//compare password
/**
 * @name comparePassword
 * @description Compare passwords
 * @param {string} password, hashPassword - Password to compare with hashed password
 * @returns {Promise<boolean>}
 */

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isValidPassword = await compare(password, hashedPassword);
  return isValidPassword;
}
export async function compareData(
  data: string,
  hashedData: string
): Promise<boolean> {
  const matchData = await comparePassword(data, hashedData);
  return matchData;
}

export async function generatePasswordResetToken() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  crypto.createHash("sha256").update(resetToken).digest("hex");
}
