import User from "@models/user.model";
import dbConnect from "@lib/db/dbConnect";
import bcrypt from "bcrypt";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { id, email, password, nickname } = await request.json();
  try {
    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = new User({
      user_id: id,
      user_nickname: nickname,
      user_email: email,
      user_pw: hashedPassword,
    });

    const userStatus = await user.save();

    if (!userStatus) {
      const err = new Error("실패");
      return Response.json(
        {
          success: true,
          err,
        },
        {
          status: 400,
        },
      );
    }

    return Response.json(
      {
        success: true,
      },
      {
        status: 201,
      },
    );
  } catch (err: any) {
    if (err.code === 11000 && err.keyPattern) {
      // 중복 에러를 처리
      let data = { message: "에러가 발생했습니다.", error: id };
      if (Object.keys(err.keyPattern).length > 0) {
        const duplicatedKey = Object.keys(err.keyPattern)[0];
        switch (duplicatedKey) {
          case "user_id":
            data = { message: "이미 존재하는 아이디입니다.", error: "id" };
            break;
          case "user_email":
            data = { message: "이미 존재하는 이메일입니다.", error: "email" };
            break;
          case "user_nickname":
            data = { message: "이미 존재하는 닉네임입니다.", error: "nickname" };
            break;
        }
      }
      return Response.json(
        {
          success: false,
          ...data,
        },
        {
          status: 400,
        },
      );
    }

    // 기타 오류 처리
    return Response.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}
