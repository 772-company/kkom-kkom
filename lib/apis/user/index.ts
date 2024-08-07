import { SendEmailInputValue } from "@/app/(auth)/reset-password/_components/modal-send-email";
import { getCookie } from "cookies-next";

import {
  GetTeamIdUserGroups,
  GetTeamIdUserHistoryResponse,
  PatchTeamIdUserResetPasswordResponse,
  PostTeamIdUserSendResetPasswordEmailResponse,
} from "../type";

// NOTE - 유저가 포함한 그룹 조회
export async function gerUserGroups(): Promise<GetTeamIdUserGroups> {
  const accessToken = getCookie("accessToken");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user/groups`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "에러 발생");
    }
    const result: GetTeamIdUserGroups = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * 임시 에러 클래스입니다. 실제 API가 완성되면 수정해야 합니다.
 * @returns
 */
class ResponseError extends Error {
  response: Response;
  constructor(message: string, res: Response) {
    // Error(message)를 만듭니다.
    super(message);
    // Error(message).response에 에러 만들 때 넣어놓은 res를 넣습니다.
    this.response = res;
  }
}

/**
 * 임시 패치입니다. 실제 API가 완성되면 수정해야 합니다.
 * @returns
 */
async function myFetch(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) {
  const res = await fetch(input, init);
  // status가 200 ~ 299 사이가 아니거나 통신을 받아올 수 없으면 에러를 던집니다.
  if (!res.ok) {
    throw new ResponseError("에러가 발생했습니다.", res);
  }
  return res;
}

/**
 * 에러 메시지를 반환하는 함수
 *
 * @param error unknown
 * @returns
 */
async function getErrorMessage(error: unknown, statusCode: number[]) {
  if (error instanceof ResponseError) {
    // 내가 지정해놓은 에러 코드이고 통신이 온 경우
    if (statusCode.includes(error.response.status)) {
      const data = await error.response.json();
      return data;
    }
    // 에러 코드로 지정되어 있지 않는데 통신은 온 경우
    return error.message;
  } else {
    // 기타 통신을 받아올 수 없는 경우 등등
    if (error instanceof Error) return error.message;
    return String(error);
  }
}

export async function getUserHistory(accessToken: string | undefined) {
  try {
    const response = await myFetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user/history`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data: Promise<GetTeamIdUserHistoryResponse> = await response.json();
    return data;
  } catch (error) {
    const errorMessage = await getErrorMessage(error, [401]);
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

// NOTE - 비밀번호 재설정 전 이메일 확인
export async function sendEmail(
  data: SendEmailInputValue,
): Promise<PostTeamIdUserSendResetPasswordEmailResponse | string> {
  const payload = {
    ...data,
    // TODO - 빌드 환경에서만 됨 배포 후 바꾸기
    redirectUrl: "http://localhost:3000",
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user/send-reset-password-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400) {
        return "존재하지 않는 이메일입니다.";
      }
      throw new Error("네트워크 에러 발생");
    }
    const result: PostTeamIdUserSendResetPasswordEmailResponse =
      await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return "다시 시도해 주세요";
  }
}

export async function resetPassword(data: {
  password: string;
  passwordConfirmation: string;
  token: string;
}): Promise<PatchTeamIdUserResetPasswordResponse | string> {
  console.log("ddds", data);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user/reset-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      if (response.status === 400) {
        return "토큰이 만료 되었습니다. 다시 시도해 주세요";
      }
      throw new Error("다시 시도해 주세요");
    }
    const result: PatchTeamIdUserResetPasswordResponse = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return "다시 시도해 주세요";
  }
}
