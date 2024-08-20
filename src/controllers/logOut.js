import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const userLogOut = asyncHandler((req,res)=>{

    res.status(200).clearCookie("accessToken").json(new ApiResponse(200,"User logged out successfully"))

    
    

})