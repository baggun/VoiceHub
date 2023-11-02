import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import ScriptLike from "@models/script_like.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json({
      success: false,
      message: "로그인 상태가 아닙니다.",
      isFollowing: false,
    });
  }

  try {
    await dbConnect();
    const isFollowingStatus = await ScriptLike.findOne({
      user: session.user.oid,
      script: id,
    });

    return Response.json({
      success: true,
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

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
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

    const isLikeStatus = await ScriptLike.findOne({
      user: session.user.oid,
      script: id,
    });

    // like 한적이 없기 때문에 like
    if (isLikeStatus === null) {
      const like = new ScriptLike({
        user: session.user.oid,
        script: id,
      });
      const likeStatus = await like.save();
      if (!likeStatus) {
        throw new Error("like 실행 에러");
      }
    }
    // 이미 like 했었다면 삭제
    else {
      const likeStatus = await ScriptLike.deleteOne({
        user: session.user.oid,
        script: id,
      });
      if (!likeStatus) {
        throw new Error("like 제거 에러");
      }
    }

    return Response.json({
      success: true,
      message: `Script 좋아요 ${isLikeStatus === null ? "실행" : "해제"}`,
      result: isLikeStatus === null,
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
