import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  Sequelize,
} from "sequelize";

import { Uuidv4 } from "../../../utils/model";
import { URLService } from "../URL/UrlService";
import { OTP } from "../OTP";
import { QRCode } from "../QRCode/QRCode";

export type UserProvider = "google" | "email";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare provider: UserProvider;
  declare status: string;
  declare confirmationCode: string;
  // declare passwordResetToken: string;
  // declare passwordResetExpire: Date;
  // declare loginCount?: number;
  // declare avatar?: string;
  // declare avatarColor?: { background: string; text: string };
}

export default function initUser(DB: Sequelize) {
  User.init(
    {
      id: {
        ...Uuidv4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(255),
        unique: false,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING(),
        validate: {
          is: {
            args: /^(?:google|email)$/,
            msg: "Invalid provider!",
          },
        },
        allowNull: false,
        defaultValue: "email",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
      },
      confirmationCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      sequelize: DB,
      timestamps: true,
    }
  );

  //set association
  User.hasMany(URLService, {
    foreignKey: "createdBy",
    onDelete: "CASCADE",
    as: "urls",
  });

  User.hasOne(OTP, {
    foreignKey: "generatedFor",
    onDelete: "CASCADE",
  });

  User.hasMany(QRCode, {
    foreignKey: "createdBy",
    onDelete: "CASCADE",
  });
  return User;
}
