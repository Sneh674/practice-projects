import {config as conf} from 'dotenv'
import dotenv from 'dotenv'
conf();

const _config={
    port: process.env.PORT,
    databaseURL: process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,//to determine dev or prod environment
    jwtSecret: process.env.JWT_SECRET,
    cloudname: process.env.CLOUDINARY_NAME,
    cloudkey: process.env.CLOUDINARY_API_KEY,
    cloudsecret: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);
//can't be overwritten
//read-only