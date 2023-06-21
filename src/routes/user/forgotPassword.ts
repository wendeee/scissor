import { Router, RequestHandler } from 'express';

import { User } from '../../../database/postgresDB/models/User/User'

import DB from '../../../database/postgresDB';
import { sendOTP } from '../otp/utils';
import { sendError , sendErrorRes, sendSuccessRes } from '../../../src/utils/sendRes';
import Joi from 'joi'

export interface ForgotPasswordForm{
    email: string;
}

const formValidation: RequestHandler = (req, res, next) => {
    const body = req.body;

    const schema = Joi.object({
        email: Joi.string().required()
    } as Record<keyof ForgotPasswordForm, any>)

    const validate = schema.validate(body)

    if(validate.error){
        return sendError(res, {
            message: {
              content: validate.error.message || "Invalid credentials",
              type: "error",
            },
            status: 400,
          });

    }
    next()

}

export default function (router: Router){
    return router.post(
        "/api/v1/auth/forgotPassword",
        formValidation,
        async(req, res) => {
            

            try{
                await DB.transaction(async(transaction) => {
                    const { email } = req.body as ForgotPasswordForm;

                    //check if user still exist in the db
                    const user = await User.findOne({
                        where: { email }, transaction
                    })

                    if(user && user.provider === 'email'){
                        //send otp to user's email
                       const otpData =  await sendOTP(email)
                       console.log('OTPDATA: ', otpData)

                       sendSuccessRes(res, {
                        data: {otpData}, message: {type: 'success', content: 'An OTP has been sent to your email'}
                       })
                    //    res.status(200).json({
                    //     data: {otpData}, message: {type: 'success', content: 'An OTP has been sent to your email'}
                    //    })
                        
                    }else{
                       
                        return res.status(404).json('user not found or forgot password will be handled by oauth provider')
                    }
                })
            }catch(err){
                sendErrorRes(err, res)
                // res.status(500).json(err.message)
            }
        }
    )
}