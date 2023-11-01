import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import Post from "@models/post.model";
import PostLike from "@models/post_like.model";

export async function GET(
  request: NextRequest,
  { params }: { params: { user_id: string } }
) {
  const { user_id } = params;

  try {
    await dbConnect();

    const user = await User.findOne({ user_id }, { _id: true, user_id: true });

    if (!user || !user._id) {
      return Response.json(
        {
          success: false,
          message: `${user_id}를 찾을 수 없습니다.`,
        },
        {
          status: 400,
        }
      );
    }

    // 사용자가 좋아요한 PostLike 데이터 가져오기
    const likedPostIds = await PostLike.find({
      user: user._id,
    }).distinct("post");

    // 일치하는 Post 가져오기
    const userLikedPosts = await Post.aggregate([
      {
        $match: { _id: { $in: likedPostIds } },
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
          "author._id": 1,
          "author.user_id": 1,
          "author.user_nickname": 1,
          "author.user_profile": 1,
          createdAt: 1,
          commentCount: { $size: "$comments" },
          _id: 1,
        },
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);

    return Response.json({
      success: true,
      message: `${user.user_id}'s like posts`,
      data: userLikedPosts,
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
