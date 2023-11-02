import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Post from "@models/post.model";
import PostLike from "@models/post_like.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: NextRequest, { params }: { params: { post_id: string } }) {
  const { post_id } = params;

  try {
    await dbConnect();

    const post: any = await Post.findOne({ _id: post_id })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: ["user_id", "user_nickname", "user_profile"],
        },
      })
      .populate({
        path: "author",
        select: ["user_id", "user_nickname"],
      })
      .lean();

    if (!post) {
      return Response.json({
        success: false,
        message: `해당하는 글이 없습니다.`,
        post: post,
      });
    }

    const likes = await PostLike.find({ post: post._id }, { user: true, _id: false })
      .populate({
        path: "user",
        select: ["user_id", "user_nickname"],
      })
      .lean();

    return Response.json({
      success: true,
      message: `포스트`,
      post: post,
      likes: likes,
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

export async function DELETE(request: NextRequest, { params }: { params: { post_id: string } }) {
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
      },
    );
  }
  try {
    await dbConnect();

    const postStatus = await Post.deleteOne({
      _id: post_id,
      author: session.user.oid,
    });

    if (!postStatus) {
      throw new Error("포스트를 찾을 수 없음");
    }

    if (postStatus.deletedCount) return Response.json({ success: true, message: "삭제 완료" });

    return Response.json({
      success: false,
      message: `삭제 실패. 값이 올바른지 확인해주세요. ${post_id}`,
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
