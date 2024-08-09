import { asyncHandler } from "../utils/asyncHandler.js";
import { customError } from "../utils/ErrorHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/Apiresponse.js";

export const userSignUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password)
    throw new customError(400, "all fields are required");

  const userExist = await User.findOne({ email });

  console.log(userExist);
  if (userExist) throw new customError(400, "user already register");

  const user = await User.create({ email, password });

  const createdUser = await User.findById(user._id).select("-passsword");
  if (!createdUser)
    throw new customError(500, "something went wrong while creating user");

  res
    .status(201)
    .json(new ApiResponse(200, { createdUser }, "user signup successfully"));
});
