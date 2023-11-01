import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Contest from "@models/contest.model";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await dbConnect();

    const contest = await Contest.findById(id);

    if (contest) {
      // 콘텐츠의 hit 증가.
      contest.hit = (contest.hit || 0) + 1;

      await contest.save();

      return Response.json({
        success: true,
        contest,
      });
    } else {
      return Response.json(
        {
          success: false,
          message: `${id}에 해당하는 공모가 없습니다.`,
        },
        {
          status: 400,
        }
      );
    }
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
