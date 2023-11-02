import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Script from "@/models/script.model";
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

      return Response.json({
        success: true,
        script,
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
