import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js"
const app = express()
app.use(cors({
    origin:"*",
    Credential:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/v1/user",userRoutes)



app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({ statusCode: err.statusCode, message: err.message });
    } else {
      console.error(err.stack);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export {app}