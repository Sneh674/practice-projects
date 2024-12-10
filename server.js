import app from "./src/app.js"

const startServer=()=>{
    const port = process.env.PORT || 3000

    app.listen(port, ()=>{
        console.log(`listening at ${port}`)
    })
}

startServer();