import dbConnect from "@/lib/dpConnect";

import UserModel from "@/models/user";

import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/lib/resend";

export async function POST(request: Request) {
  await dbConnect();

  try {
   const{userName, email,password}= await request.json()

 const existingUserVerifiedByUsername =await UserModel.findOne(
    {
        userName,
        isVarified:true
    }
 ) 

 if(existingUserVerifiedByUsername){
    return Response.json({
        success:false,
        message:"user already registor"
    },{status:400})
 }

const existingUserVerifiedByEmail=await UserModel.findOne({email})
const verifyCode= Math.floor(100000 + Math.random() * 900000).toString()
if(existingUserVerifiedByEmail){

        if(existingUserVerifiedByEmail.isVarified){
            return Response.json({
                success:false,
                message:"user already exist with this email"
        
            },{status:400})
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)
            existingUserVerifiedByEmail.password=hashedPassword;
            existingUserVerifiedByEmail.verifyCode=verifyCode;
            existingUserVerifiedByEmail.verifyCodeExpiry= new Date(Date.now()+3600000)
            await existingUserVerifiedByEmail.save();
        }
}
else{

    const hasedPassword= await bcrypt.hash(password,10);
    const expirydate = new Date()
    expirydate.setHours(expirydate.getHours()+1)
   const newUser= new UserModel({
        userName,
    email,
    password:hasedPassword,
    verifyCode,
    verifyCodeExpiry:expirydate,
    isVarified:false,
    isAcceptingMessage:true,
    messages:[],


    })
    await newUser.save()
}

//send verification email
const emailResponse= await sendVerificationEmail(
    email,
    userName,
    verifyCode
)
if(!emailResponse.success){
    return Response.json({
        success:false,
        message:emailResponse.message

    },{status:500})
}

return Response.json({
    success:true,
    message:"email send succesfully please verify your email"

},{status:201})


  } catch (error) {
    console.error("error registration user", error);
    return Response.json(
      {
        success: false,
        message: "error registrstion user",
      },
      {
        status: 500,
      }
    );
  }
}
