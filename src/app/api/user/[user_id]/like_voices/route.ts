import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import VoiceLike from "@models/voice_like.model";

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

    const voices = await VoiceLike.find({ user: user._id }, "-_id voice")
      .populate({
        path: "voice",
        select: "title voice_src tags author createdAt",
        populate: {
          path: "author",
          select: ["user_id", "user_nickname", "user_profile"],
        },
      })
      .lean();

    return Response.json({
      success: true,
      message: `${user.user_id}'s like voices`,
      data: voices.map(item => {
        return { ...item.voice };
      }),
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
