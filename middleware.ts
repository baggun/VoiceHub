import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

const secret = process.env.NEXTAUTH_SECRET;

const blockedPaths = ["/auth/login", "/auth/register"];
const protectedPaths = ["/notifications", "/voice/upload", "/setting"];
const matcher = ["/auth/login", "/auth/register", "/notifications", "/voice/upload", "/setting"];

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
