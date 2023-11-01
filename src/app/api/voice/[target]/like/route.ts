// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@lib/db/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import VoiceLike from "@models/voice_like.model";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { addNotification } from "@/app/api/notification/route";

export async function POST(
  request: NextRequest,
  { params }: { params: { target: string } }
) {
  const { target } = params;
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
    const isLike = await VoiceLike.findOne({
      user: session.user.oid,
      voice: target,
    });

    // like 한적이 없기 떄문에 like
    if (isLike === null) {
      const like = new VoiceLike({
        user: session.user.oid,
        voice: target,
      });
      const likeStatus = await like.save();
      if (!likeStatus) throw new Error("like 실행 에러");

      const voice = await likeStatus.populate({ path: "voice" });
      await addNotification(
        voice.voice.author,
        "like-voice",
        voice.voice.title,
        session.user.oid
      );
    }
    // 이미 like 했었다면 삭제
    else {
      const likeStatus = await VoiceLike.deleteOne({
        user: session.user.oid,
        voice: target,
      });
      if (!likeStatus) throw new Error("like 제거 에러");
    }

    return Response.json({
      success: true,
      message: `Voice 좋아요 ${isLike === null ? "실행" : "해제"}`,
      result: isLike === null,
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
