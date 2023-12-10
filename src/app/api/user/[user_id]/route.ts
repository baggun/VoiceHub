import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import Follow from "@models/follow.model";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;
  const session = await getServerSession(authOptions);

  try {
    await dbConnect();

    const user: any = await User.findOne(
      { user_id },
      {
        user_id: true,
        user_nickname: true,
        user_email: true,
        user_desc: true,
        user_profile: true,
      }
    ).lean();

    if (!user || !user._id) {
      return Response.json(
        {
          success: false,
          message: `${user_id}를 찾을 수 없습니다.`,
        },
        {
          status: 404,
        }
      );
    }

    user.isFollowed = false;
    // 로그인 중에 이 API를 호출했다면 팔로우 여부도 포함함.
    if (session && session.user) {
      const followStatus = await Follow.findOne({
        user: session.user.oid,
        target: user._id,
      });
      if (followStatus) {
        user.isFollowed = true;
      }
    }

    user.followers = await Follow.countDocuments({ target: user._id }).lean();
    user.followings = await Follow.countDocuments({ user: user._id }).lean();

    return Response.json({
      success: true,
      message: `${user_id} 정보 가져오기`,
      user: user,
    });
  } catch (err: any) {
    return Response.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
