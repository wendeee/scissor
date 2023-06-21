// import { hashPassword } from "../../../../database/utils";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import * as nodemailer from "nodemailer";

import { Transaction } from "sequelize";
import { User } from "../../../database/postgresDB/models/User/User";
// import { sendError } from "../../../utils/sendRes";

export async function signJwtToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export async function loginUser(arg: {
  user: User;
  transaction: Transaction;
  req: Request;
  res: Response;
}) {
  const { user, transaction, req, res } = arg;

  //assign token after login
  const token = await signJwtToken(user.id);
  return { token };
}
const { EMAIL_USER, EMAIL_PASS } = process.env;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
    // user:"snipitservice@gmail.com",
    // pass: 'qbzexdfbszzlgomt',
  },
});

// const mailOptions = {
//   from: process.env.EMAIL_USER,
//   to: 'recipient@example.com',
//   subject: 'Hello',
//   text: 'Hello, this is a test email.',
// };



// export async function sendEmail(
//   name: string,
//   email: string,
//   confirmationCode?: string,
//   htmlText?: string,
 
// ) {
//   transporter.sendMail({
//     from: EMAIL_USER,
//   //@ts-ignore
//   to: email,
//   subject: 'Please confirm your email',
//   html: `<h1>Email Confirmation</h1>
//   <h2>Hello ${name}</h2>
//   <p>Thank you for signing up on snipit. Please confirm your email by clicking on the following link</p>
//   <a href=http://localhost:3001/api/v1/auth/confirm/${confirmationCode}> Click here</a>
//   </div>`
//   }).catch((err) => {
//     console.log(err)
//     throw new Error(err.message)
//   })
// }

export async function sendEmail(mailOptions: object){
  transporter.sendMail(mailOptions).catch((err) => {
    console.log(err)
    throw new Error(err.message)
  })
}

// const mailOptions = {
//   from: EMAIL_USER,
//   //@ts-ignore
//   to: email,
//   subject: 'Please confirm your email',
//   html: `<h1>Email Confirmation</h1>
//   <h2>Hello ${name}</h2>
//   <p>Thank you for signing up on snipit. Please confirm your email by clicking on the following link</p>
//   <a href=http://localhost:3001/api/v1/auth/confirm/${confirmationCode}> Click here</a>
//   </div>`
// }
