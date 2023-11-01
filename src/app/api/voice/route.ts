import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Voice from "@models/voice.model";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag: string = searchParams.get("tag") || "";
  const skip: number = parseInt(searchParams.get("skip") as string) || 0;
  const limit: number = parseInt(searchParams.get("limit") as string) || 10;

  let query: any = {};

  // !! 단일 검색만 됨.
  if (tag) {
    query.tags = tag;
  }

  try {
    await dbConnect();

    const voices = await Voice.find(query, "-comments")
      .populate({
        path: "author",
        select: ["user_id", "user_nickname"],
      })
      .sort("createdAt")
      .limit(10)
      .skip(skip * limit)
      .lean();

    return Response.json({
      success: true,
      message: `목소리`,
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
      }
    );
  }
}
