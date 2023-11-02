import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Post from "@models/post.model";
import { createTags } from "../tag/route";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag: string = searchParams.get("tag") || "";
  const skip: number = parseInt(searchParams.get("skip") as string) || 0;
  const limit: number = parseInt(searchParams.get("limit") as string) || 10;
  let query: any = {};

  if (tag) {
    query.tags = tag;
  }
  try {
    await dbConnect();

    const posts = await Post.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          title: 1,
          content: 1,
          type: 1,
          tags: 1,
          "author.user_id": 1,
          "author.user_nickname": 1,
          "author.user_profile": 1,
          createdAt: 1,
          commentCount: { $size: "$comments" },
          _id: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 10,
      },
      {
        $skip: skip * limit,
      },
    ]);

    return Response.json({
      success: true,
      message: `포스트 리스트`,
      posts: posts,
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

export async function POST(request: NextRequest) {
  const { title, content, type, tags } = await request.json();
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

    // 기존에 없는 태그라면 생성
    const createTagStatus = await createTags(tags);

    const post = new Post({
      title,
      content,
      type,
      tags,
      author: session.user.oid,
    });
    const postStatus = await post.save();

    if (!postStatus) {
      throw new Error("실패");
    }

    return Response.json({
      success: true,
      message: "작성 완료",
      id: postStatus._id,
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
