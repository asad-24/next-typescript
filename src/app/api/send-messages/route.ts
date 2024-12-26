import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";

import { Message } from "@/models/user";


export async function POST(request:Request) {
    dbConnect();
     
    const {username, content}= await request.json();

    try {
        const user = await UserModel.findOne(username)
        if(!user){
            return Response.json(
                {
                  success: false,
                  message: "user not found",
                },
                { status: 404 }
              );
        }
        //is user accept the message 

        if(!user.isAcceptingMessage){
            return Response.json(
                {
                  success: false,
                  message: "user is not accpetng the message",
                },
                { status: 403 }
              );
        }

        const newMessages= {content, createdAt:new Date()}
        user.messages.push(newMessages as Message)
        await user.save();

        return Response.json(
            {
              success: false,
              message: "message send succesfull ",
            },
            { status: 200 }
          );
    
    
        
    } catch (error) {
        console.log(" error  adding message", error)
        return Response.json(
            {
              success: false,
              message: "internal server error",
            },
            { status: 500 }
          );
    
    }
}