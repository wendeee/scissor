import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  Sequelize,
} from "sequelize";

import { Uuidv4 } from "../../../utils/model";

export interface ClickHistoryItem {
  location: string;
  timestamp: Date;
}

export class QRCode extends Model<
  InferAttributes<QRCode>,
  InferCreationAttributes<QRCode>
> {
  declare id: CreationOptional<string>;
  declare createdBy: string;
  declare shortURL: string;
  declare qrcodeurl: string;
}

export default function initQRCode(DB: Sequelize) {
  QRCode.init(
    {
      id: {
        ...Uuidv4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      createdBy: {
        ...Uuidv4,
        allowNull: false,
      },

      shortURL: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      qrcodeurl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize: DB,
      timestamps: true,
    }
  );
  return QRCode;
}
