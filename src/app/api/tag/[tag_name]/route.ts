import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Contest from "@models/contest.model";
import Tag from "@models/tag.model";

export async function GET(request: NextRequest, { params }: { params: { tag_name: string } }) {
  try {
    await dbConnect();

    const { tag_name } = params;

    const query = tag_name
      ? {
          tag: new RegExp(decodeURIComponent(tag_name)),
        }
      : {};

    const tags = await Tag.find(query, {
      _id: false,
      tag: true,
      weighting: true,
    })
      .sort("-weighting")
      .limit(10)
      .lean();

    return Response.json({
      success: true,
      message: `태그 목록 가져오기`,
      data: tags,
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
