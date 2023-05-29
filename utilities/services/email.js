import nodemailer from "nodemailer";
import { html } from "./email-verify.js";
import jwt from "jsonwebtoken"
export const sendEmail = async(options)=>{
    let transporter = nodemailer.createTransport({
        service: process.env.service,
        auth: {
          user: process.env.Email, 
          pass: process.env.Password,
        },
      });

      let token = jwt.sign({email:options.email},process.env.verifyKey)
    
      let info = await transporter.sendMail({
        from: '"Abdallah 👻" <abdallahhassanshaaban@gmail.com>', 
        to: options.email, 
        subject: "Verify Email",
        text: "Verify Email", 
        html: html(token,options)
      });
    
    
}