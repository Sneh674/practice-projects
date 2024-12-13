import app from "./src/app.js"
import { config } from "./src/config/config.js"
import connectDb from "./src/config/db.js"

const startServer=async()=>{
    await connectDb();
    const port = config.port || 3000

    app.listen(port, ()=>{
        console.log(`listening at ${port}`)
    })
}

startServer();