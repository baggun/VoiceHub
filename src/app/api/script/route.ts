import { NextRequest } from "next/server";

import dbConnect from "@lib/db/dbConnect";
import Script from "@models/script.model";

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

    const scripts = await Script.aggregate([
      {
        $match: {},
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
            $in: ["user_oid", "$likes.user"],
          },
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

    if (scripts) {
      return Response.json({
        success: true,
        message: `대사 리스트`,
        scripts: scripts,
      });
    }
    return Response.json({
      success: false,
      message: `대사 리스트 불러오기 실패`,
      scripts: [],
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

export async function POST(request: NextRequest) {
  const { title, script, tags } = await request.json();

  if (script == "") {
    return Response.json({
      success: true,
      message: "대사 없음",
    });
  }

  try {
    await dbConnect();
    const newScript = new Script({
      title,
      script: script ? script : null,
      tags,
    });
    const scriptStatus = await newScript.save();

    if (!scriptStatus) {
      throw new Error("생성 실패");
    }

    return Response.json({
      success: true,
      message: "대사 생성 성공",
      data: scriptStatus._id,
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
