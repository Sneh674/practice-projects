import express from 'express'
import { createUser, loginUser, forgotPassword, resetPassword } from './userController.js'

const userRouter=express.Router()

userRouter.post("/register", createUser)
userRouter.post("/login", loginUser)
userRouter.post("/forgotpassword", forgotPassword)
userRouter.post("/resetpassword", resetPassword)

export default userRouter;