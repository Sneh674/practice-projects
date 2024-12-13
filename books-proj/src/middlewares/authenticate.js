import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// export interface AuthRequest extends Request {
//     userId: string;
// }

const authenticate=(req,res,next)=>{
    const token=req.header("Authorization");
    if(!token){
        return next(createHttpError(401, "Authorization token is required"))
    }
    const parsedToken = token.split(" ")[1];
    console.log(parsedToken)
    try {
        const decoded = jwt.verify(parsedToken, config.jwtSecret);
        console.log("Decoded token:", decoded);
        // const _req = req as AuthRequest;
        // _req.userId = decoded.sub as string;
        req.userId = decoded.sub;
        console.log("userId", req.userId)
        next();
    } catch (error) {
        return next(createHttpError(401, "Invalid or expired token"));
    }
}

export default authenticate;