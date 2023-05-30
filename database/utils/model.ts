import {DataTypes } from 'sequelize';

export const Uuidv4 = {
    type: DataTypes.UUID(),
    validate: {
        isUUID: {
            args: 4,
            msg: 'Only UUIDv4 is allowed'
        }
    }
}