import {config as conf} from 'dotenv'
conf();

const _config={
    port: process.env.PORT,
    databaseURL: process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,//to determine dev or prod environment
    jwtSecret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
//can't be overwritten
//read-only