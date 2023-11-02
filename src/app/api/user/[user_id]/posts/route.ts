import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import Post from "@models/post.model";

export async function GET(request: NextRequest, { params }: { params: { user_id: string } }) {
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
        },
      );
    }

    const voices = await Post.aggregate([
      {
        $match: { author: user._id },
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
        $sort: { createdAt: 1 },
      },
    ]);

    return Response.json({
      success: true,
      message: `${user.user_id}'s voices`,
      data: voices,
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
