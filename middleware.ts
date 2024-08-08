import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const hasRefreshToken = request.cookies.has("refreshToken");
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/reset") ||
    pathname.startsWith("/oauth");

  const isLandingPageOrAuthPage = pathname === "/" || isAuthPage;

  if (hasRefreshToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // NOTE - 로그인 전에 랜딩, 로그인, 회원가입 페이지 외에 다른 페이지에 접근하는 경우
  if (!hasRefreshToken && !isLandingPageOrAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
