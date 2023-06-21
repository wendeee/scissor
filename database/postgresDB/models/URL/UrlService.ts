import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    Sequelize,
  } from "sequelize";
  
  import { Uuidv4 } from "../../../utils/model";
  
 export interface ClickHistoryItem{
    location: string;
    timestamp: Date
 }
  
  export class URLService extends Model<
    InferAttributes<URLService>,
    InferCreationAttributes<URLService>
  > {
    declare id: CreationOptional<string>;
    declare createdBy: string;
    declare longURL: string;
    declare shortURL: string;
    declare UrlCode: string;
    declare customName?: string;
    declare clicks: number;
    declare clickHistory: ClickHistoryItem[]
  }
  
  export default function initURLService(DB: Sequelize) {
    URLService.init(
      {
        id: {
          ...Uuidv4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
        },
        createdBy: {
            ...Uuidv4,
            allowNull: false
        },
        longURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shortURL: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        UrlCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clicks: {
          type: DataTypes.REAL,
          allowNull: true,
          defaultValue: 0
        },
        clickHistory: {
          type: DataTypes.ARRAY(DataTypes.JSONB),
          allowNull: false
        }
      },
      {
        sequelize: DB,
        timestamps: true,
      }
    );
    return URLService;
  }
  