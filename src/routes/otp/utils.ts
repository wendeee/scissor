//generate the otp

//send otp to user's email
import { OTP } from "../../../database/postgresDB/models/OTP";
import DB from "../../../database/postgresDB";
import { User } from "../../../database/postgresDB/models/User/User"
import { sendEmail } from "../user/utils";
import { hashData } from "../../../database/utils";


export async function generateOTP() {
  try {
    let otp: string;
    return (otp = `${Math.floor(10000 + Math.random() * 95000)}`);
  } catch (err) {
    throw new Error("An error occured while generating the otp pin");
  }
}

export async function sendOTP(email) {
  try {
    if (!email) {
      throw new Error("email is missing");
    }
    const transaction = await DB.transaction();
    //delete any otp old record

    const otpInDB = await OTP.findOne({ where: { email }, transaction });
    if (otpInDB) {
      await otpInDB.destroy({ transaction });
    }

    //generate the otp pin to be sent
    const Otp = await generateOTP();
    console.log('OTP: ', Otp)

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP VERIFICATION PIN",
      html: `Your OTP PIN<br> <p style="color: blue; font-size: 20px; letter-spacing: 2px;"><b>${Otp}</b></p> <p>This OTP will expire after 15 minutes</p>`,
    };

    await sendEmail(mailOptions);
    let user = await User.findOne({where: {email}, transaction})
    //hash otp and save new record in database 
   let hashedOTP =  await hashData(Otp)
   
   const otpData = await OTP.create({
    email,
    generatedFor: user.id,
    otp: hashedOTP,
    createdAt: new Date(Date.now()),
    expiresAt: new Date(Date.now() + (15 * 60 * 1000))
   }, {transaction})

   await transaction.commit()
   return otpData;
  } catch (err) {
    throw new Error(err);
  }
}
