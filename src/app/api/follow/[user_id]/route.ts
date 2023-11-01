import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import Follow from "@models/follow.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { addNotification } from "../../notification/route";

export async function POST(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "로그인 상태가 아닙니다.",
      },
      {
        status: 403,
      }
    );
  }

  try {
    await dbConnect();

    const targetUser = await User.findOne({ user_id: user_id }, { _id: true });

    const isFollow = await Follow.findOne({
      user: session.user.oid,
      target: targetUser._id,
    });

    if (isFollow === null) {
      const follow = new Follow({
        user: session.user.oid,
        target: targetUser._id,
      });
      const followStatus = await follow.save();

      if (!followStatus) throw new Error("실패");

      await addNotification(
        targetUser._id,
        "follow",
        "follow",
        session.user.oid
      );
    } else {
      const followStatus = await Follow.deleteOne({
        user: session.user.oid,
        target: targetUser._id,
      });

      if (!followStatus) throw new Error("실패");
    }

    return Response.json({
      success: true,
      message: `Follow ${isFollow === null ? "성공" : "해제"}`,
      result: isFollow === null,
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
