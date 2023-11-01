import User from "@models/user.model";
import dbConnect from "@lib/db/dbConnect";
import bcrypt from "bcrypt";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { id, email, password, nickname } = await request.json();

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const user = new User({
    user_id: id,
    user_nickname: nickname,
    user_email: email,
    user_pw: hashedPassword,
  });

  try {
    await user.save();
    return new Response("User has been created", {
      status: 201,
    });
  } catch (err: any) {
    return new Response(err.message, {
      status: 500,
    });
  }
};
