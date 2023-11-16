import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";

/**
 * 유저 목록들 받아오기
 * TODO : 추천 유저로 변경하기
 * @param request 
 * @returns 
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const user: any = await User.find(
      { deleted: false },
      {
        user_id: true,
        user_nickname: true,
        // user_email: true,
        // user_desc: true,
        user_profile: true,
      },
    ).lean();
 

    return Response.json({
      success: true,
      message: `${user} 정보 가져오기`,
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
      },
    );
  }
}
