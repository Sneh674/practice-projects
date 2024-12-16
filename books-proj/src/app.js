import express from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler.js'
import userRouter from './user/userRouter.js'
import bookRouter from './book/bookRouter.js'
import cors from 'cors';

const app=express()

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message: "welcome to the apis"})
})

app.use("/api/users",userRouter)
app.use("/api/books",bookRouter)
app.use(globalErrorHandler)

export default app;