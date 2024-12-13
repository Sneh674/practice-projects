const mongoose=require("mongoose")

mongoose.connect(process.env.MONGODB_URL,{dbName: process.env.MONGODB_DBNAME})
.then(()=>{
    console.log("mongo db connected")
})
.catch((err)=>{
    console.log(`mongo db wasn't connected, error: ${err}`)
})

mongoose.connection.on('connected',()=>{
    console.log("mongoose connected to db")
})
mongoose.connection.on('error',(err)=>{
    console.log(`${err}`)
})
mongoose.connection.on('disconnected',()=>{
    console.log("mongoose disconnected to db")
})

process.on('SIGINT', async()=>{
    await mongoose.connection.close();
    process.exit(0)
})