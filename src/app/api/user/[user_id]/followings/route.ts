import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import Follow from "@models/follow.model";

export async function GET(request: NextRequest, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {
    await dbConnect();

    const user = await User.findOne({ user_id }, { _id: true, user_id: true });

    if (!user || !user._id) {
      return Response.json(
        {
          success: false,
          message: `${user_id}를 찾을 수 없습니다.`,
        },
        {
          status: 400,
        },
      );
    }

    const followers = await Follow.find({ user: user._id }, "-_id target").populate({
      path: "target",
      select: "user_id user_nickname user_profile",
    });

    return Response.json({
      success: true,
      message: `${user.user_id}'s following`,
      data: followers,
    });
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
