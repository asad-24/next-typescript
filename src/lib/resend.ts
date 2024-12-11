
import { ApiResponse } from '@/types/ApiREsponse';
import VerificationEmail from '../../emails/VarificationEmails';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env
const resend = new Resend(process.env.RESEND_API_KEY);



export async function sendVerificationEmail(
    verifyCode:string,
    username:string,
    email:string
) :Promise<ApiResponse> {
    
    try{

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'New site verification testing',
            react:VerificationEmail({username, otp:verifyCode}),
          });

        return{success:true, message:"verification email send"}
    }catch(EmailError){
        console.error("Error sending verification",EmailError);
        return{success:false, message:"fail to send verification email"}
    }
    
}