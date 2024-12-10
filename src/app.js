import express from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler.js'
import userRouter from './user/userRouter.js'


const app=express()

app.get("/",(req,res)=>{
    res.json({message: "welcome to the apis"})
})

app.use("/api/users",userRouter)
app.use(globalErrorHandler)

export default app;