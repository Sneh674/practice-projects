import { v2 as cloudinary } from "cloudinary";
// import cloudinary from "cloudinary";
import { config } from "./config.js";
import {config as conf} from 'dotenv'

cloudinary.config({ 
    cloud_name: config.cloudname, 
    api_key: config.cloudkey, 
    // api_secret: config.cloudsecret,
    api_secret: "QjY8TI317JQz6Pu4pP1sw77RDA8",
});

export default cloudinary;