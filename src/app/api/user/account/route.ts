import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import Follow from "@models/follow.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcrypt";

export async function DELETE(request: NextRequest) {
  const { password } = await request.json();
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

    const user = await User.findById(session.user.oid);

    if (!user) throw new Error("로그인 세션 데이터가 올바르지 않습니다.");

    const result = await bcrypt.compare(password, user.user_pw);
    if (!result)
      return Response.json(
        {
          success: false,
          message: "비밀번호가 일치하지 않습니다.",
          error: "password",
        },
        { status: 400 },
      );

    user.user_id = `deleted_user_${session.user.oid}`;
    user.user_nickname = `deleted_user_${session.user.oid}`;
    user.user_email = `deleted_user_${session.user.oid}@baggun.com`;
    user.user_desc = " ";
    user.user_notification = [];
    user.user_profile = "base_profile.png";
    user.user_log = [];
    user.deleted = true;

    await user.save();

    const foll = await Follow.deleteMany({
      $or: [
        { user: session.user.oid },
        { target: session.user.oid }
      ]
    })

    // const res = await User.deleteOne({ _id: session.user.oid });
    // if (!res || !res.deletedCount) throw new Error("계정 삭제 실패");

    return Response.json({
      success: true,
      message: "계정 삭제 완료",
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
