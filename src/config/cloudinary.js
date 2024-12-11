import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";

cloudinary.config({ 
    cloud_name: config.cloudname, 
    api_key: config.cloudkey, 
    api_secret: config.cloudsecret, // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;