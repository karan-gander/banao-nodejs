import dotenv from 'dotenv'
import connectionDB from "./DB/connection.js"
import { app } from './app.js'
dotenv.config({
    path:"./env"

})

connectionDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`app is running on port ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log("connection is faild " ,error)
})