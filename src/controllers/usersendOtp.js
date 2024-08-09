import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import otpGenerator from "otp-generator";
import { customError } from "../utils/ErrorHandler.js";
import { Otp } from "../models/otp.js";
import bycrpt from "bcrypt";
import { ApiResponse } from "../utils/Apiresponse.js";
import { sendMail } from "../utils/sendMail.js";

export const userSendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new customError(400, "email is not registred");

  const otp = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  let SendMail = await sendMail({
    to: email,
    subject: "OTP for password reset",
    message: `<h2>Your otp is ${otp}</h2>`,
  });

  console.log("sending on mail", SendMail);
  otp = bycrpt.hash(otp, 10);
  if (!otp) throw new customError(400, "Error while creating otp");
  const OTP = await Otp.create({ email, otp, created_at: new Date() });

  if (!OTP) throw new customError(400, "Error while saving otp");

 

  res.status(200).json(new ApiResponse(200, { savedOtp }, "otp is sends on email check your email..."));
});
