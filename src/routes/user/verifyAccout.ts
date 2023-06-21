import { Router } from "express";

import DB from "../../../database/postgresDB";
import { User } from "../../../database/postgresDB/models/User/User";
import { sendErrorRes, sendSuccessRes } from "../../../src/utils/sendRes";
export default function (router: Router) {
  return router.get(
    "/api/v1/auth/confirm/:confirmationCode",
    async (req, res) => {
      const { confirmationCode } = req.params;

      try {
        const transaction = await DB.transaction();

        //find the user using the confirmation code
        const user = await User.findOne({
          where: { confirmationCode },
          transaction,
        });

        if (!user) {
          await transaction.rollback();
          return res.status(404).json({
            data: {},
            message: { type: "failed", content: "User not found!" },
          });
        }

        //update user's status to active
        await user.update({
          status: "Active",
        });

        await user.save({ transaction });
        await transaction.commit();

        //send response
        sendSuccessRes(res, {
          data: {},
          message: {
            type: "success",
            content: "Account activated! Please log in.",
          },
        })
        // res.status(200).json({
        //   data: {},
        //   message: {
        //     type: "success",
        //     content: "Account activated! Please log in.",
        //   },
        // });
      } catch (err) {
        sendErrorRes(err, res)
        // throw new Error(err);
      }
    }
  );
}
