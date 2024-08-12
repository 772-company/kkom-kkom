import { LoginInputValue } from "@/app/(auth)/login/_components/login-form";
import { SignUpInputValue } from "@/app/(auth)/signup/_components/signup-form";

import { myFetch } from "../myFetch";
import {
  PostTeamIdAuthSignInProviderResponse,
  PostTeamIdAuthSigninResponse,
  PostTeamIdAuthSignupResponse,
} from "../type";

// NOTE - 로그인
export async function login(
  data: LoginInputValue,
): Promise<
  | PostTeamIdAuthSigninResponse
  | { details: Record<string, { message: string }> }
> {
  try {
    const response = await myFetch<PostTeamIdAuthSigninResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/auth/signIn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        //withCredentials: true,
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
}

// NOTE - 회원가입
export async function signUp(
  data: SignUpInputValue,
): Promise<
  | PostTeamIdAuthSignupResponse
  | { details: Record<string, { message: string }> }
> {
  try {
    const response = await myFetch<PostTeamIdAuthSignupResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/auth/signUp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
}

// NOTE - 간편 로그인
export async function oauthLogin(
  state: string,
  code: string,
  provider: "KAKAO" | "GOOGLE",
): Promise<PostTeamIdAuthSignInProviderResponse> {
  try {
    const redirectUri =
      provider === "KAKAO"
        ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
        : process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL;
    const response = await myFetch<PostTeamIdAuthSignInProviderResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/auth/signIn/${provider}`,
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
  } catch (error) {
    throw error;
  }
}
