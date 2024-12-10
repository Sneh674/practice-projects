import createHttpError from "http-errors";
import userModel from "./userModel.js";
import bcrypt from 'bcrypt'
// import { sign } from 'jsonwebtoken'
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { config } from "../config/config.js";

const createUser=async(req,res,next)=>{ 
    const {name,email,password}=req.body;
    if(!name||!email|!password){
        const error =createHttpError(400,"all fields required")
        return next(error);
    }
    const user= await userModel.findOne({email: email})
    if(user){
        const error = createHttpError (400,"User already exists");
        return next(error);
    }

    // 10 -> SALT ROUNDS
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser =await userModel.create({
        name,
        email,
        password: hashedPassword
    })
    
    const token=sign({sub: newUser._id}, config.jwtSecret, {expiresIn: '7d'})

    res.json({
        id: newUser._id,
        accesstoken: token
    })
}

export {createUser}