import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Script from "@/models/script.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag: string = searchParams.get("tag") || "";
  const skip: number = parseInt(searchParams.get("skip") as string) || 0;
  const limit: number = parseInt(searchParams.get("limit") as string) || 10;

  const session = await getServerSession(authOptions);
  console.log("usss ossd", session);
  let user_oid: any = session?.user.oid || "";

  console.log("usss ossd", user_oid);
  user_oid = !mongoose.Types.ObjectId.isValid(user_oid)
    ? null
    : new mongoose.Types.ObjectId(user_oid);

  console.log("usss od", user_oid);

  let query: any = {};
  if (tag) {
    query.tags = tag;
  }

  try {
    await dbConnect();

    const scripts = await Script.aggregate([
      {
        $match: query,
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
            $in: [user_oid, "$likes.user"],
          },
        },
      },
      {
        $sort: { createdAt: 1 },
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

  try {
    await dbConnect();
    const newScript = new Script({
      title,
      script: script || " ",
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
