import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { withAuth } from "next-auth/middleware";

const secret = process.env.NEXTAUTH_SECRET;

const blockedPaths = ["/auth/login", "/auth/register"];
const protectedPaths = ["/notifications", "/voice/upload", "/setting"];
const matcher = [...blockedPaths, ...protectedPaths];

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;

  if (blockedPaths.some(path => pathname.startsWith(path))) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (protectedPaths.some(path => pathname.startsWith(path))) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
}

export const config = {
  matcher,
};
