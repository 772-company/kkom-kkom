import { LoginInputValue } from "@/app/(auth)/login/_components/login-form";

import { PostTeamIdAuthSignupResponse } from "../type";

// NOTE - 로그인
export async function login(
  data: LoginInputValue,
): Promise<PostTeamIdAuthSignupResponse | string> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/auth/signIn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400) {
        return errorData.message;
      }
      throw new Error("로그인을 다시 시도해 주세요");
    }
    const result: PostTeamIdAuthSignupResponse = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return "무슨 메세지를 리턴해야 함";
  }
}
