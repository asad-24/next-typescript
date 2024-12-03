import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

import { ApiResponse } from '@/types/ApiREsponse';
import VerificationEmail from '../../emails/VarificationEmails';

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