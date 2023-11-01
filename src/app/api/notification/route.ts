import dbConnect from "@lib/db/dbConnect";
import { NextRequest } from "next/server";
import Contest from "@models/contest.model";
import User from "@models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
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
    const notification: any = await User.findOne(
      { _id: session.user.oid },
      { user_notification: true }
    )
      .populate({
        path: "user_notification",
        populate: {
          path: "target",
          select: ["user_id", "user_nickname", "user_profile"],
        },
      })
      .lean();

    if (notification) {
      return Response.json({
        success: true,
        message: `알림 가져오기`,
        notification: notification.user_notification,
      });
    }

    return Response.json({
      success: false,
      message: "알림 가져오기 실패",
      notification: [],
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

export async function PATCH(request: NextRequest) {
  const { notification_id } = await request.json();
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

    const notification = await User.updateOne(
      { _id: session.user.oid, "user_notification._id": notification_id },
      {
        $set: {
          "user_notification.$.isRead": true,
        },
      }
    );
    if (!notification) throw new Error("알림 읽기 실패");

    return Response.json({
      success: true,
      message:
        notification.modifiedCount && notification.matchedCount
          ? `알림 읽음`
          : "알림 읽기 실패",
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

export async function DELETE(request: NextRequest) {
  const { notification_id } = await request.json();
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

    const notification = await User.updateOne(
      { _id: session.user.oid },
      {
        $pull: {
          user_notification: {
            _id: notification_id,
          },
        },
      }
    );
    if (!notification) throw new Error("알림 삭제 실패");

    return Response.json({
      success: true,
      message:
        notification.modifiedCount && notification.matchedCount
          ? `알림 삭제`
          : "알림 삭제 실패",
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

export async function addNotification(
  user_oid: string,
  noticeType: string,
  message: string,
  target: string
) {
  try {
    const notification = await User.updateOne(
      { _id: user_oid },
      {
        $push: {
          user_notification: {
            noticeType,
            message,
            target,
          },
        },
      }
    );
    return notification;
  } catch (err) {
    return err;
  }
}
