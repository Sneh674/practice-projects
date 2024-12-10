import express from 'express'
// import { Request, Response, NextFunction } from 'express'
import createHttpError ,{ HttpError } from "http-errors"
import { config } from './config/config.js'
import globalErrorHandler from './middlewares/globalErrorHandler.js'

const app=express()

app.get("/",(req,res)=>{
    res.json({message: "welcome to the apis"})
})

app.use(globalErrorHandler)

export default app;