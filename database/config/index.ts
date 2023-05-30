import dotEnv from 'dotenv';

import { Dialect } from 'sequelize/types';

dotEnv.config();

const dialect = process.env.DB_DIALECT as Dialect;

const envConfig = {
    development: {
        defaultDB: {
            url: process.env.DEV_DATABASE_URL,
            dialect
        }
    },
    test: {
        defaultDB: {
            url: process.env.TEST_DATABASE_URL,
            dialect
        }
    },
    production: {
        defaultDB: {
            url: process.env.PROD_DATABASE_URL,
            dialect
        }
    }
}

export default envConfig;