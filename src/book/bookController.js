import createHttpError from "http-errors";
import { config } from "../config/config.js";

const createBook=async(req,res,next)=>{
    res.json({
        message: 'trial'
    })
}

export {createBook}