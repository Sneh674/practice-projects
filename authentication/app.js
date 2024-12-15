const express=require("express")
const morgan=require("morgan")
const createError=require("http-errors")
require("dotenv").config()
require("./helpers/init_mongodb.js")
const authRoute=require("./routes/auth.route")
const {verifyAccessToken}=require("./helpers/jwt_helper.js")
const client=require("./helpers/init_redis.js")

// client.SET('foo','bar')

// client.GET('foo',(err,value)=>{
//     if(err){console.log(err.message)}
//     console.log(value)
// })

const app= express();

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get("/",verifyAccessToken,async(req,res,next)=>{
    res.send("hello")
})
app.use("/auth",authRoute)

app.use(async(req,res,next)=>{
    // const error=new Error("Not found");
    // error.status=404;
    // next(error)
    next(createError.NotFound("This route doesn't exist"))
})
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status||500,
            message: err.message
        }
    })
})

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{console.log(`server running at port: ${PORT}`)})