import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import Voice from "@models/voice.model";

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

    const voices = await Voice.find({ author: user._id }, "title tags voice_src createdAt").populate({
      path: "author",
      select: ["user_id", "user_nickname"],
    });

    return Response.json({
      success: true,
      message: `${user.user_id}'s voices`,
      data: voices,
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
