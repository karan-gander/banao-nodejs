import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { customError } from "../utils/ErrorHandler.js";




export const userLogin = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;

    if(!email&&!password) throw new customError(400,"all fields are required");

    const user =  await User.findOne({email})
    if(!user) throw new customError(400,"User does not found")
    
    const isPasswordCorrect = user.isPasswordCorrect(password);
    if(!isPasswordCorrect) throw new customError(400,"password is not correct");

    const loggedInUser = await User.findById(user.id).select("-password")

    const accessToken = await user.genJWT()
    // console.log(accessToken)
    const options = {
        httpOnly:true,
        secure:true
    }

    res.status(200).cookie("accesstoken",accessToken,options).json(new ApiResponse(200,{loggedInUser,accessToken},"user logged in successfully"));

    
    

})