import { Router, RequestHandler } from "express"
import Joi from 'joi'
import { sendSuccessRes, sendErrorRes, sendError } from "../../../src/utils/sendRes"
import {User} from '../../../database/postgresDB/models/User/User'
import DB from "../../../database/postgresDB"
import { hashPassword } from "../../../database/utils"

export interface ResetPasswordForm{
    email: string;
    password: string;  //new password
    confirmPassword: string; //confirm new password
}

const formValidation: RequestHandler = (req, res, next) => {
    const body = req.body;
  
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(7)
      .max(32).required(),
      confirmPassword: Joi.string()
      .min(7)
      .max(32)
      .valid(Joi.ref("password"))
      .required(),
    } as Record<keyof ResetPasswordForm, any>);
  
    const validate = schema.validate(body);
  
    if (validate.error) {
      return sendError(res, {
        message: {
          content: validate.error.message || "Invalid credentials",
          type: "error",
        },
        status: 400,
      });
    }
    next();
  };
 export default function(router: Router){
    return router.post(
        "/api/v1/auth/reset-password",
        formValidation,
        async (req, res) => {
            const { email, password, confirmPassword } = req.body as ResetPasswordForm;
            try{
                const transaction = await DB.transaction();

                //check for user
                const user = await User.findOne({
                    where: {email}, transaction
                })

                if(!user){
                    await transaction.rollback();
                    throw new Error("{404} Account does not exist!")
                }

                //hashpassword
                const hashedPassword = await hashPassword(password)

                await user.update({
                    password: hashedPassword
                })

                await user.save({transaction})

                await transaction.commit();

                sendSuccessRes(res, {data: {}, message: {type: 'success', content: 'Password updated!'}})
            }catch(err){
                sendErrorRes(err, res)
            }
        }
    )
 }