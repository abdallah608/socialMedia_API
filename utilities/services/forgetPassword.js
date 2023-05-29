import nodemailer from "nodemailer";
import { html } from "./forget.mail.js";
import jwt from "jsonwebtoken"
export const sendForgetEmail = async(options)=>{
    let transporter = nodemailer.createTransport({
        service:process.env.service,
        auth: {
          user: process.env.Email, 
          pass: process.env.Password,
        },
      });
      let token = jwt.sign({email:options.email},process.env.verifyKey)
    console.log(token);
      let info = await transporter.sendMail({
        from: '"Abdallah 👻" <abdallahhassanshaaban@gmail.com>', 
        to: options.email, 
        subject: "Rest forget password", 
        text: "Rest forget password", 
        html:html(options,token)
      });
    
    
}