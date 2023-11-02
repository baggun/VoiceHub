import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(request: NextRequest) {
  const { email, nickname, desc } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "로그인 상태가 아닙니다.",
      },
      {
        status: 403,
      },
    );
  }

  try {
    await dbConnect();

    const user = await User.updateOne(
      { _id: session.user.oid },
      {
        user_nickname: nickname,
        user_email: email,
        user_desc: desc,
      },
    );

    if (!user) throw new Error("사용자 검색 실패");

    return Response.json({
      success: true,
      message: "프로필 수정",
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
