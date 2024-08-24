import { LoginInputValue, SignUpInputValue } from "@/type/user";

import instance from "../myFetch/instance";
import {
  PostAuthSignInProviderResponse,
  PostAuthSigninResponse,
  PostAuthSignupResponse,
} from "../type";

// NOTE - 로그인
export async function login(
  data: LoginInputValue,
): Promise<
  PostAuthSigninResponse | { details: Record<string, { message: string }> }
> {
  const response = await instance<PostAuthSigninResponse>("/auth/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

// NOTE - 회원가입
export async function signUp(
  data: SignUpInputValue,
): Promise<
  PostAuthSignupResponse | { details: Record<string, { message: string }> }
> {
  const response = await instance<PostAuthSignupResponse>("/auth/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

// NOTE - 간편 로그인
export async function oauthLogin(
  state: string | null,
  code: string | null,
  provider: "KAKAO" | "GOOGLE",
): Promise<PostAuthSignInProviderResponse> {
  const redirectUri =
    provider === "KAKAO"
      ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
      : process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL;
  const response = await instance<PostAuthSignInProviderResponse>(
    `/auth/signIn/${provider}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state,
        redirectUri,
        token: code,
      }),
    },
  );

  return response;
}
