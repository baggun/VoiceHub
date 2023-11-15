import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Contest from "@models/contest.model";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const skip: number = parseInt(searchParams.get("skip") as string) || 0;
  const limit: number = parseInt(searchParams.get("limit") as string) || 10;

  try {
    await dbConnect();

    const contests = await Contest.find()
      .sort("-endDate")
      .skip(skip * limit)
      .limit(limit);

    if (contests) {
      return Response.json({
        success: true,
        message: "contest 데이터들",
        contests: contests,
      });
    } else {
      return Response.json({
        success: false,
        message: "contest 데이터들",
        contests: [],
      });
    }
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

export async function POST(request: NextRequest) {
  console.log(request);
  const body = await request.json();

  console.log(body);

  const { contest, content, thumbnail, company, startDate, endDate } = body;

  try {
    await dbConnect();

    const newContest = new Contest({
      contest,
      content, 
      thumbnail,
      company,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    const contestStatus = await newContest.save();

    if (!contestStatus) {
      const err = new Error("생성 실패");
      throw err;
    }

    return Response.json({
      success: true,
      message: "공모 생성 성공",
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
