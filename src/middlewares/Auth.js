import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { customError } from "../utils/ErrorHandler"
import Jwt from "jsonwebtoken"

export const JWTAuth = asyncHandler(async (req,res,next)=>{

   try {
     const token = req.cookies.accessToken || req.header("Authorization").replace("Bearer"," ")
 
     if(!token) throw new customError(400,"no token required");
 
     const encryptToken = Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
 
     const user = await User.findById(encryptToken._id).select("-password");
 
     if(!user) throw new customError(400,"Invaild custom token");
 
     req.user = user;
     next()
 
   } catch (error) {
    throw new customError(400,error.message);

    
   }
    
    


})