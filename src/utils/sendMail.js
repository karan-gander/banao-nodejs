import nodemailer from "nodemailer";
import { customError } from "./ErrorHandler.js";

export const sendMail = async (option) => {
  console.log(option)
  console.log("proccess", process.env)
 try {
     const transporter = nodemailer.createTransport({
       host: process.env.SMTP_SERVER,
       port: parseInt(process.env.SMTP_PORT),
       secure: false,
       auth: {
         user: process.env.SMTP_USERNAME,
         pass: process.env.SMTP_PASSWORD,
       },
       logger:true,
       debug:true
     });

    //  console.log("transporter ",transporter)
     if(!transporter) throw new customError(400,"Error while creating transporter")
    
    const sendEmail = await transporter.sendMail({
        from:process.env.SMTP_USERNAME,
        to:option.to,
        subeject:option.subeject,
        html:option.message
    })
    if(!sendEmail){
        throw new customError(400,"Error while sending email");
    }
    
    return true

   
 } catch (error) {
    
    console.log("Error while sending email",error)
 }


};
