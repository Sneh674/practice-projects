import mongoose from "mongoose";

// import { User } from "./userTypes.js"
// const userSchema =new mongoose.Schema<User>({
const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true}
},{timestamps: true})

export default mongoose.model("User", userSchema)