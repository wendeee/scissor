import { v4 as uuidv4 } from "uuid";
import { Uuidv4 } from "../../../database/utils/model";

import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  CreationOptional,
} from "sequelize";

import { User } from "./User/User";


export class OTP extends Model<
  InferAttributes<OTP>,
  InferCreationAttributes<OTP>
> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare generatedFor: string;
    declare otp: string;
    declare createdAt: Date;
    declare expiresAt: Date;
}

export default function initOTP (DB: Sequelize){
    OTP.init(
        {
            id: {
                ...Uuidv4,
                defaultValue: uuidv4,
                unique: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            generatedFor:{
                ...Uuidv4,
                allowNull: false
            } ,
            otp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE
            }

        }, {
            timestamps: true,
            sequelize: DB
        }
    )
    // OTP.belongsTo(User, {
    //     foreignKey: 'generatedFor'
    // })
    
    return OTP;

}
