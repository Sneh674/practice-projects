import createHttpError from "http-errors";
import userModel from "./userModel.js";
import bcrypt from 'bcrypt'
// import { sign } from 'jsonwebtoken'
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { config } from "../config/config.js";
import randomstring from 'randomstring';
import nodemailer from 'nodemailer';


const createUser=async(req,res,next)=>{ 
    const {name,email,password}=req.body;
    console.log(req.body);
    if(!name||!email|!password){
        const error =createHttpError(400,"all fields required")
        return next(error);
    }

    try{
        const user= await userModel.findOne({email: email})
        if(user){
            const error = createHttpError (400,"User already exists");
            return next(error);
        }
    }catch(err){
        return next(createHttpError(500, "Error while getting user"))
    }

    // 10 -> SALT ROUNDS
    const hashedPassword = await bcrypt.hash(password, 10)

    let newUser;
    try{
        newUser =await userModel.create({
            name,
            email,
            password: hashedPassword
        })
        
    }catch(err){
        return next(createHttpError(500, "Error while creating user"))
    }

    const token=sign({sub: newUser._id}, config.jwtSecret, {expiresIn: '7d'})
    res.status(201).json({
        id: newUser._id,
        accesstoken: token
    })
}

const loginUser=async(req,res,next)=>{
    const {email, password}=req.body;

    if(!email||!password){
        return next(createHttpError(400, "All fields required"))
    }

    try{
        const existUser= await userModel.findOne({email: email})

        if(!existUser){
            return next(createHttpError(404, "User not found"))
        }else{
            const isMatch=await bcrypt.compare(password, existUser.password)
            if(!isMatch){
                return next(createHttpError(400, "Wrong password"))
            }else{
                //create access token
                const token=sign({sub: existUser._id}, config.jwtSecret, {expiresIn: '7d'})
                res.status(201).json({
                    id: existUser._id,
                    name: existUser.name,
                    accesstoken: token
                })
            }
        }
    }catch(err){
        return next(createHttpError(500, "Error checking for user"))
    }
    // res.json({
    //     message: "Login user",
    // })
}

const forgotPassword=async(req,res,next)=>{
    const {email}=req.body;
    if(!email){return next(createHttpError(400,"Email required"))}
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return next(createHttpError(404, "User not found"));
        }
        let resetToken=''
        try{
            resetToken = randomstring.generate(7); //70-character reset token
            user.resetToken = resetToken;
            user.resetTokenExpires = Date.now() + 3600000; // 1 hour from now
            await user.save();
        }catch(err){
            return next(createHttpError(`Error saving rest token to db: ${err}`))
        }

        // Send the reset token to the user's email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,
                pass: 'dfdt cjdh ozfy yjmd',
            },
            tls: {
                rejectUnauthorized: false,  // This helps if there are certificate issues
            },
            secure: true,
        });

        const mailOptions = {
            from: process.env.MY_EMAIL,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please use the following token: ${resetToken}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(`Error sending email: ${err}`);
                return next(createHttpError(500, "Error sending email"));
            }
            res.status(200).json({ message: 'Password reset token sent to email' });
        });
    } catch (error) {
        console.log(`Error during forgot password: ${error}`)
        return next(createHttpError(500,`${error}`))
    }
}

const resetPassword = async (req, res, next) => {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
        return next(createHttpError(400, "Reset token and new password are required"));
    }

    try {
        // Find the user with the given reset token and ensure it hasn't expired
        const user = await userModel.findOne({
            resetToken,
            resetTokenExpires: { $gt: Date.now() }, // Check if token is still valid
        });

        if (!user) {
            return next(createHttpError(400, "Invalid or expired reset token"));
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token fields
        user.password = hashedPassword;
        user.resetToken = '';
        user.resetTokenExpires = null;

        await user.save();

        res.status(200).json({
            message: "Password has been reset successfully",
        });
    } catch (error) {
        console.error(`Error during password reset: ${error}`);
        return next(createHttpError(500, "Internal server error"));
    }
};

export {createUser, loginUser, forgotPassword, resetPassword}