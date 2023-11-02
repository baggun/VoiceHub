import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import Script from "@/models/script.model";
import ScriptLike from "@models/script_like.model";

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
    const scripts = await ScriptLike.find({ user: user._id }).distinct("script");

    const useLikedScripts = await Script.aggregate([
      {
        $match: { _id: { $in: scripts } },
      },
      {
        $lookup: {
          from: "scriptlikes",
          localField: "_id",
          foreignField: "script",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "voices",
          localField: "_id",
          foreignField: "script",
          as: "voices",
        },
      },
      {
        $project: {
          title: 1,
          script: 1,
          tags: 1,
          createdAt: 1,
          likeCount: { $size: "$likes" },
          voiceCount: { $size: "$voices" },
          _id: 1,
          likedByUser: {
            $in: [user._id, "$likes.user"],
          },
        },
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);

    return Response.json({
      success: true,
      message: `${user.user_id}'s like scripts`,
      data: useLikedScripts,
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
