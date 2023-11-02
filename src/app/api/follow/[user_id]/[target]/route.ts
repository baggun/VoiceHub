import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import Follow from "@models/follow.model";

export async function GET(request: NextRequest, { params }: { params: { user_id: string; target: string } }) {
  const { user_id, target } = params;
  try {
    await dbConnect();

    const myUser = await User.findOne({ user_id: user_id }, { _id: true });
    const targetUser = await User.findOne({ user_id: target }, { _id: true });

    if (!(myUser && targetUser)) {
      return Response.json({
        success: false,
        message: `팔로우 정보 불러오기 실패`,
        isFollowing: false,
      });
    }

    const isFollowingStatus = await Follow.findOne({
      user: myUser,
      target: targetUser,
    });

    return Response.json({
      success: true,
      message: `팔로우 정보 ${user_id} => ${target}`,
      isFollowing: isFollowingStatus !== null,
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
