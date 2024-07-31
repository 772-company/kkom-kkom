import { PostTeamIdAuthSignupResponse } from "./type";
import { LoginInputValue } from "./type/request";

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
      let errorMessage = "로그인을 다시 시도해 주세요";
      switch (response.status) {
        case 400:
          errorMessage =
            errorData.message || "이메일 혹은 비밀번호를 확인해주세요.";
          break;
        default:
          errorMessage;
          break;
      }
      return errorMessage;
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
