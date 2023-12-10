import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import PostLike from "@models/post_like.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { addNotification } from "@app/api/notification/route";

export async function POST(
  request: NextRequest,
  { params }: { params: { post_id: string } }
) {
  const { post_id } = params;
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

    const isLike = await PostLike.findOne({
      user: session.user.oid,
      post: post_id,
    });

    if (isLike === null) {
      const like = new PostLike({
        user: session.user.oid,
        post: post_id,
      });
      const likeStatus = await like.save();
      if (!likeStatus) throw new Error("like 실행 에러");

      const post = await likeStatus.populate({ path: "post" });
      await addNotification(
        post.post.author,
        "like-post",
        post_id,
        session.user.oid
      );
    } else {
      const likeStatus = await PostLike.deleteOne({
        user: session.user.oid,
        post: post_id,
      });
      if (!likeStatus) throw new Error("like 실행 에러");
    }
    return Response.json({
      success: true,
      message: `Script 좋아요 ${isLike === null ? "실행" : "해제"}`,
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
