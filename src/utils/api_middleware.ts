import dbConnect from "@/lib/db/dbConnect";
import type { NextRequest } from "next/server.js";

export const connectDB = async (req: NextRequest, params: unknown, next: () => void) => {
  await dbConnect();
  return next();
};
