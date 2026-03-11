import nodemailer from "nodemailer" ;
import jwt from "jsonwebtoken" ;
import { emailTemplate } from "./emailTemplate.js";

export async function sendEmail (email) {
const user = process.env.EMAIL_USER ;
const pass = process.env.EMAIL_PASS ;
const email_signature = process.env.EMAIL_Token ;


const transporter = nodemailer.createTransport({
 service:"gmail" ,
  auth: {
    user: user,
    pass: pass,
  },
});
let emailToken = jwt.sign(email ,email_signature) ;
(async () => {
  const info = await transporter.sendMail({
    from: '"Ecommerce App" <`${user}`>',
    to: email,
    subject: "Hello from Ecommerce App",
    html: emailTemplate(emailToken)  
  });

  console.log("Message sent:", info.messageId);
})();
}