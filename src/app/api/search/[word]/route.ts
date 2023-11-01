import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Voice from "@models/voice.model";
import Script from "@models/script.model";
import User from "@models/user.model";

export async function GET(
  request: NextRequest,
  { params }: { params: { word: string } }
) {
  const { word } = params;
  const decodedWord = decodeURIComponent(word);
  const RegWord = new RegExp(decodedWord);

  const searchParams = request.nextUrl.searchParams;
  const skip: number = parseInt(searchParams.get("skip") as string) || 0;
  const limit: number = parseInt(searchParams.get("limit") as string) || 10;

  try {
    await dbConnect();
    const voices = await Voice.find({ title: RegWord }, "-comments")
      .populate({
        path: "author",
        select: ["user_id", "user_nickname"],
      })
      .sort("createdAt")
      .limit(10)
      .skip(skip * limit)
      .lean();

    const scripts = await Script.find({ title: RegWord }, "-script")
      .sort("createdAt")
      .limit(10)
      .skip(skip * limit)
      .lean();

    const users = await User.find(
      { user_nickname: RegWord },
      "user_id user_nickname user_email user_profile"
    )
      .sort("user_updatedAt")
      .limit(10)
      .skip(skip * limit)
      .lean();

    return Response.json({
      success: true,
      message: `${decodedWord} 검색 결과`,
      voices,
      scripts,
      users,
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
