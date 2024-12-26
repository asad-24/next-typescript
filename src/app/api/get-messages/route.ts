import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";

import UserModel from "@/models/user";

import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request:Request){
    await dbConnect();
    const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "not authenticated ",
      },
      { status: 404 }
    );
  }

  const UserId = new mongoose.Types.ObjectId(user._id);


  try {
    const user =await UserModel.aggregate([
        {$match:{id:UserId}},
        {$unwind:'$message'},
        {$sort:{'message.createdAt':-1}},
        {$group:{_id:'$_id', messages:{$push:'$messages'}}},
    ])

    if(!user || user.length==0){
        return Response.json(
            {
              success: false,
              message: "user not found ",
            },
            { status: 404 }
          );



    }


    return Response.json(
        {
          success: true,
          message: user[0].Messages,
        },
        { status: 200 }
      );
  } catch (error) {
    console.log("unexpectd error ", error)
    return Response.json(
        {
          success: false,
          message: "not authenticated",
        },
        { status: 500 }
      );
  }
}