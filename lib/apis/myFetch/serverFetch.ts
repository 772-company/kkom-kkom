"use server";

import { cookies } from "next/headers";

import { MyFetchOptions, responseError } from ".";
import { PostTeamIdAuthRefreshTokenResponse } from "../type";

export async function serverFetch(
  input: string | URL | globalThis.Request,
  init?: MyFetchOptions,
) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (init?.withCredentials === true) {
    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    init = { ...init, headers };
  }

  const res = await fetch(input, init);

  if (res.status === 401) {
    const refreshTokenValue = cookieStore.get("refreshToken")?.value;
    if (refreshTokenValue) {
      const newAccessToken = await fetch(
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
      );
      if (newAccessToken.ok) {
        const newAccessTokenValue: PostTeamIdAuthRefreshTokenResponse =
          await newAccessToken.json();
        const headers = new Headers(init?.headers);
        headers.set(
          "Authorization",
          `Bearer ${newAccessTokenValue.accessToken}`,
        );
        const newInit = { ...init, headers };
        const newRes = await fetch(input, newInit);
        return newRes;
      } else {
        throw new Error("엑세스 토큰 호출 실패");
      }
    } else {
      throw new Error("로그인을 다시 해주세요!");
    }
  } else if (!res.ok) {
    throw responseError(res);
  }
  return res;
}
