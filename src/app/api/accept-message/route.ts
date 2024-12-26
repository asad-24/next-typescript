import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";

import UserModel from "@/models/user";

import { User } from "next-auth";

export async function POST(request: Request) {
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

  const UserId = user._id;

  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      UserId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user status to accept messages ",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "fmessage acceptace status successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update user status to accept messages ");
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept messages ",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
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

  const UserId = user._id;

  try {
    const foundUser = await UserModel.findById(UserId);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update user status to accept messages ",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("failed to update user status to accept messages ");
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept messages ",
      },
      { status: 500 }
    );
  }
}
