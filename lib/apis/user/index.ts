import { SendEmailInputValue } from "@/app/(auth)/reset-password/_components/modal-send-email";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

import { myFetch } from "../myFetch";
import {
  GetTeamIdUserGroups,
  GetTeamIdUserHistoryResponse,
  GetTeamIdUserResponse,
  PatchTeamIdUserResetPasswordResponse,
  PostTeamIdUserSendResetPasswordEmailResponse,
} from "../type";

export async function getUser(): Promise<GetTeamIdUserResponse> {
  try {
    const response = await myFetch<GetTeamIdUserResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user`,
      {
        method: "GET",
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}

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

export async function getUserHistory() {
  try {
    const response = await myFetch<GetTeamIdUserHistoryResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user/history`,
      {
        method: "GET",
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    throw error;
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
