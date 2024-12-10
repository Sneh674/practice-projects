import {config as conf} from 'dotenv'
conf();

const _config={
    port: process.env.PORT,
};

export const config = Object.freeze(_config);
//can't be overwritten
//read-only