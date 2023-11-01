import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Post from "@models/post.model";
import { addNotification } from "@/app/api/notification/route";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  request: NextRequest,
  { params }: { params: { post_id: string } }
) {
  const { post_id } = params;
  const { comment } = await request.json();
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

    const comments = await Post.findOneAndUpdate(
      // const comments = await Post.updateOne(
      { _id: post_id },
      {
        $push: {
          comments: {
            user: session.user.oid,
            content: comment,
          },
        },
      }
    );

    if (!comments) {
      return Response.json({
        success: false,
        message: "댓글 입력 실패",
      });
    }

    await addNotification(
      comments.author,
      "comment-post",
      post_id,
      session.user.oid
    );
    return Response.json({
      success: true,
      message:
        comments.modifiedCount && comments.matchedCount
          ? `댓글 생성됨`
          : "댓글 생성 안됨",
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { post_id: string } }
) {
  const { post_id } = params;
  const { user_oid, comment_oid, content } = await request.json();
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

    const comments = await Post.updateOne(
      {
        _id: post_id,
        "comments._id": comment_oid,
        "comments.user_oid": user_oid,
      },
      {
        $set: {
          "comments.$.content": content,
        },
      }
    );

    if (!comments) throw new Error("댓글 수정 실패");

    return Response.json({
      success: true,
      message:
        comments.acknowledged && comments.matchedCount
          ? `댓글 수정`
          : "댓글 수정 실패",
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { post_id: string } }
) {
  const { post_id } = params;
  const { user_oid, comment_oid } = await request.json();
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

    const comments = await Post.updateOne(
      {
        _id: post_id,
        "comments._id": comment_oid,
        "comments.user_oid": user_oid,
      },
      {
        $pull: {
          comments: {
            _id: comment_oid,
          },
        },
      }
    );
    if (!comments) throw new Error("댓글 삭제 실패");

    return Response.json({
      success: true,
      message:
        comments.modifiedCount && comments.matchedCount
          ? `알림 삭제`
          : "알림 삭제 실패",
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
