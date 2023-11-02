import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

    const user = await User.deleteOne({
      _id: session.user.oid,
      user_pw: password,
    });

    if (!user || (user.acknowledged && user.deletedCount === 0)) {
      throw new Error("사용자 검색 실패");
    }

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
