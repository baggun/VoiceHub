import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Contest from "@models/contest.model";
import Tag from "@models/tag.model";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const tags = await Tag.find(
      {},
      {
        _id: false,
        tag: true,
        weighting: true,
      },
    )
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

export async function createTags(tags: string[]) {
  if (!tags) return;
  if (!Array.isArray(tags) || tags.length === 0) return false;

  const objTags = tags.map(t => {
    return { tag: t };
  });
  /*
    "tags": [ 
        { "tag": "태그1" },
        { "tag": "태그2" },
        { "tag": "태그3" }
    ]
  */
  try {
    const tagStatus = await Tag.insertMany(objTags, { ordered: false });
    return tagStatus;
  } catch (err) {
    return err;
  }
}
