import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { PostTeamIdAuthRefreshTokenResponse } from "./lib/apis/type";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const hasAccessToken = request.cookies.has("accessToken");
  const hasRefreshToken = request.cookies.has("refreshToken");
  const { pathname } = request.nextUrl;

  // NOTE - 로그인 후 로그인, 회원가입, 비밀번호 재설정 페이지에 접근하는 경우
  if (
    hasAccessToken &&
    (pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/reset"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // NOTE - 로그인 전에 랜딩, 로그인, 회원가입, 비밀번호 재설정 페이지 외에 다른 페이지에 접근하는 경우
  if (
    !hasAccessToken &&
    !(
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname === "/" ||
      pathname.startsWith("/reset")
    )
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // NOTE - accessToken이 만료되어서 refreshToken을 통해 새로운 토큰을 발급해야 하는 경우
  if (!hasAccessToken && hasRefreshToken) {
    const refreshTokenValue = request.cookies.get("refreshToken")?.value;

    // NOTE - Fetch를 사용하여 새로운 accessToken을 발급받는 비동기 작업
    const fetchPromise = fetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshTokenValue,
        }),
      },
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("refresh token 요청 실패");
        }
        const data: PostTeamIdAuthRefreshTokenResponse = await response.json();

        // NextResponse 객체를 만들어 쿠키를 설정
        const nextResponse = NextResponse.next();
        nextResponse.cookies.set("accessToken", data.accessToken);

        return nextResponse;
      })
      .catch((error) => {
        return NextResponse.redirect(new URL("/login", request.url));
      });

    // waitUntil을 사용하여 비동기 작업이 완료될 때까지 기다림
    event.waitUntil(fetchPromise);

    // 비동기 작업이 완료된 후 요청을 계속 진행하도록 합니다.
    // 이때 fetchPromise에서 반환한 NextResponse 객체 사용
    return new Promise((resolve) => {
      fetchPromise.then((nextResponse) => {
        resolve(nextResponse);
      });
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
