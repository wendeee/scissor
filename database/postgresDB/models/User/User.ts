import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  Sequelize,
} from "sequelize";

import { Uuidv4 } from "../../../utils/model";

export type UserProvider = "google" | "email";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare confirmed: boolean;
  declare confirmedAt: number;
  declare provider: UserProvider;
  declare loginCount?: number;
  declare avatar?: string;
  declare avatarColor?: { background: string; text: string };
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
      firstName: {
        type: DataTypes.STRING(255),
        unique: false,
        allowNull: false,
      },
      lastName: {
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
      confirmed: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false,
      },
      confirmedAt: {
        type: DataTypes.REAL(),
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
      loginCount: {
        type: DataTypes.REAL(),
        allowNull: false,
        defaultValue: 0,
      }
    },
    {
      sequelize: DB,
      timestamps: true,
    }
  );
}
