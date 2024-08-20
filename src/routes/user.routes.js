import { Router } from "express";
import { userSignUp } from "../controllers/userSignUp.js";
import { userLogin } from "../controllers/userLogin.js";
import { userSendOtp } from "../controllers/usersendOtp.js";
import { userLogOut } from "../controllers/logOut.js";
const router = Router()

router.route("/signup").post(userSignUp)
router.route("/logout").post(userLogOut)
router.route("/signin").post(userLogin)
router.route("/send-otp").post(userSendOtp)



export default router