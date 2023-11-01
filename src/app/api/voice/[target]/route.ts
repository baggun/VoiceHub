import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Voice from "@models/voice.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { createTags } from "../../tag/route";

export async function POST(
  request: NextRequest,
  { params }: { params: { target: string } }
) {
  const session = await getServerSession(authOptions);
  const { target } = params;
  const { voice_src, script, tags } = await request.json();

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "로그인 상태가 아닙니다.",
      },
      {
        status: 403,
      }
    );
  }

  try {
    await dbConnect();

    // 내가 이전에 같은 제목으로 작성한적 있는지 확인
    const isAlreadyExist = await Voice.findOne({
      author: session.user.oid,
      title: target,
    });

    if (isAlreadyExist) {
      return Response.json(
        {
          success: false,
          message: "이미 작성된 제목이라 생성이 불가능합니다.",
        },
        {
          status: 409,
        }
      );
      // TODO : url 데이터를 따로 만들어서 저장하게 할지
    }

    // 기존에 없는 태그라면 생성
    const createTagStatus = await createTags(tags);

    // Voice 생성
    const voice = new Voice({
      author: session.user.oid,
      title: target,
      voice_src,
      script,
      tags,
    });
    const postStatus = await voice.save();

    if (!postStatus) {
      throw new Error("실패");
    }

    return Response.json({
      success: true,
      message: "",
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
