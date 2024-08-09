import mongoose from "mongoose";
import bycrpt from "bcrypt";
import { customError } from "../utils/ErrorHandler.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    expires: 500,
  },
});

otpSchema.methods.verifyOtp = async function (email, otp) {
  if (this.email !== email) throw new customError(400, "email does not match");
  const compareOtp = await bycrpt.compare(otp, this.otp);
  return compareOtp;
};

otpSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) next();
  bycrpt.hash(this.otp.toString(), 10);
  next()
});


export const Otp = mongoose.model("Otp",otpSchema);
