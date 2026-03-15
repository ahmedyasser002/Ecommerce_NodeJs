import { userModel } from "../Models/User.js" ;
import jwt from "jsonwebtoken" ;
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import asyncHandler from "../Middlewares/asyncHandler.js"
import { fileURLToPath } from "url";
import { sendEmail } from "../Email/sendEmail.js";



let signup = asyncHandler( async (req , res)=>{
    if (req.file) {
        req.body.image = req.file.filename;
    }
    let newUser = await userModel.create(req.body);
    sendEmail(req.body.email)
    newUser.password  = undefined ;
    res.status(201).json({message:"user created succsefully" , payload : newUser})

}
)


let signin = asyncHandler(async (req, res) => {
  let founduser = req.founduser;
  if (founduser.provider === "google") {
    return res.status(400).json({
      message: "This account was registered using Google login. Please login with Google.",
    });
  }

  const ismatched = await bcrypt.compare(req.body.password, founduser.password);

  if (!ismatched) {
    return res.status(422).json({ message: "Invalid Password or Email" });
  }

  if (!founduser.isConfirmed) {
    return res.status(401).json({ message: "You cannot log in without verifying your email" });
  }

  const secret_key = process.env.JWT_SECRET;
  const token = jwt.sign(
    { role: founduser.role, email: founduser.email, _id: founduser._id },
    secret_key  );

  res.json({ message: "Hello", data: founduser, token: token });
});


let emailVerification =asyncHandler( async (req,res)=>{
    let email = req.params.email ;
    const email_signature = process.env.EMAIL_Token ;
    let verifiedEmail = jwt.verify(email,email_signature,async(err ,decoded)=>{
        if(err){
            return res.status(401).json({message: "Invalid Token"})
        }

        await userModel.findOneAndUpdate({email:decoded},{isConfirmed:true}) ;
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const htmlFilePath = path.join(__dirname, "..", process.env.HTML_FILE);
        const htmlContent = await fs.promises.readFile(htmlFilePath, "utf-8");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(htmlContent);

    })
})
const googleCallback = (req, res) => {
  const token = jwt.sign(
    {
      id: req.user._id,
      role: req.user.role,
      email: req.user.email,
    },
    process.env.JWT_SECRET  );

  res.json({
    message: "Google login success",token,user: req.user,
  });
};


export {signup , signin ,emailVerification,googleCallback}