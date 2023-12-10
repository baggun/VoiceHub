import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import User from "@models/user.model";
import Voice from "@models/voice.model";
import VoiceLike from "@models/voice_like.model";
// import script from "@models/script.model";
import Follow from "@models/follow.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(
  request: NextRequest,
  { params }: { params: { target: string; title: string } }
) {
  const { target, title } = params;
  const session = await getServerSession(authOptions);

  try {
    await dbConnect();

    const user = await User.findOne({ user_id: target }, { _id: true });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: `올바른 유저의 id 가 아닙니다. ${target}`,
        },
        {
          status: 400,
        }
      );
    }

    const voice: any = await Voice.findOne({ author: user._id, title: title })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: ["user_id", "user_nickname", "user_profile"],
          model: "User",
        },
      })
      .populate({
        path: "author",
        select: ["user_id", "user_nickname", "user_desc", "user_profile"],
        model: "User",
      })
      .populate({
        path: "script",
        model: "Script",
      })
      .lean();

    if (!voice) {
      return Response.json(
        {
          success: false,
          message: `해당하는 글이 없습니다.`,
        },
        {
          status: 400,
        }
      );
    }

    const likes = await VoiceLike.find(
      { voice: voice._id },
      { user: true, _id: false }
    )
      .populate({
        path: "user",
        select: ["user_id", "user_nickname", "user_profile"],
        model: "User",
      })
      .lean();

    let isFollow = false;
    if (session && session.user) {
      const following = await Follow.findOne({
        user: session.user.oid,
        target: user._id,
      });
      if (following) isFollow = true;
    }

    return Response.json({
      success: true,
      message: `목소리`,
      data: voice,
      likes: likes,
      isFollow,
      ddd: session,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { target: string; title: string } }
) {
  const { target, title } = params;
  const session = await getServerSession(authOptions);

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

    const user = await User.findOne({ user_id: target }, { _id: true });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: `올바른 유저의 id 가 아닙니다. ${target}`,
        },
        {
          status: 400,
        }
      );
    }

    const voice: any = await Voice.findOne({ author: user._id, title: title });
    voice.deleted = true;
    await voice.save();

    const d = await VoiceLike.deleteMany({ voice: voice._id });

    return Response.json({
      success: true,
      message: `목소리 삭제`,
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
