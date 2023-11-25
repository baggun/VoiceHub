import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Script from "@models/script.model";
import Voice from "@models/voice.model";
import ScriptLike from "@models/script_like.model";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await dbConnect();

    const script = await Script.findById(id);

    if (script) {
      const likes = await ScriptLike.find({ script: id }, { user: true, _id: false })
        .populate({
          path: "user",
          select: ["user_id", "user_nickname"],
        })
        .lean();

        const voices = await Voice.find({ script: id, deleted: { $ne: true } }, "-comments")
        .populate({
          path: "author",
          select: ["user_id", "user_nickname", "user_profile"],
        })
        .sort("-createdAt")
        .limit(5)
        .lean();

      return Response.json({
        success: true,
        script,
        voices,
        likes,
      });
    }

    return Response.json(
      {
        success: false,
        message: `${id}에 해당하는 대사가 없습니다.`,
      },
      {
        status: 400,
      },
    );
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
