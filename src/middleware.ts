import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { getToken } from "next-auth/jwt";
// import { useRouter } from "next/navigation";
import { withAuth } from 'next-auth/middleware';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // const router = useRouter();
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup")
  ) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/auth/login", "/auth/register"],
};
