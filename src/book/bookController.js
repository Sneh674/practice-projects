import createHttpError from "http-errors";
import { config } from "../config/config.js";

const createBook=async(req,res,next)=>{
    console.log('files', req.files);
    res.json({})
}

export {createBook}