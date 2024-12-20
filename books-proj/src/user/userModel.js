import mongoose from "mongoose";

// import { User } from "./userTypes.js"
// const userSchema =new mongoose.Schema<User>({
const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    resetToken: {type: String, default: ''},
    resetTokenExpires: {type: Date, default: null}
},{timestamps: true})

export default mongoose.model("User", userSchema)