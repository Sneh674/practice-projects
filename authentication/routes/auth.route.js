const express = require("express");
const router=express.Router()
const createError=require("http-errors")
const User=require("../models/user.model.js")
const {authSchema}=require("../helpers/validation_schema.js")
const {signAccessToken}=require("../helpers/jwt_helper.js")

router.post("/register",async(req,res,next)=>{
    try {
        const {email, password}=req.body;
        const result= await authSchema.validateAsync(req.body)

        const user=await User.findOne({email: result.email})
        if(user){
            throw createError.Conflict("Email already registered")
        }
        const newUser=await User({email: result.email, password: result.password})
        const savedUser= await newUser.save()
        const accessToken=await signAccessToken(savedUser.id)
        // console.log(savedUser._id)
        // console.log(savedUser.id)
        res.send(accessToken)
    } catch (error) {
        if(error.isJoi===true){error.status=422}
        next(error)
    }
})
router.post("/login",async(req,res,next)=>{
    try {
        const result= await authSchema.validateAsync(req.body)
    } catch (error) {
        next(error)
    }
})
router.post("/refresh-token",async(req,res,next)=>{
    res.send("refresh-token route")
})
router.delete("/logout", async(req,res,next)=>{
    res.send("logout route")
})

module.exports=router