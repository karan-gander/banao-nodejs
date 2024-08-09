import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
// import { process_params } from "express/lib/router";

const connectionDB = async ()=>{
    try {
       const connnection = await  mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
    console.log(`\n Databse is connected!! DB HOST ${connnection.connection.host}`)
        
    } catch (error) {
        console.error("error while connecting DB",error.message)
        process.exit(1)
        throw new error
        
    }
}

export default connectionDB