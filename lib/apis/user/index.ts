import { SendEmailInputValue } from "@/app/(auth)/reset-password/_components/modal-send-email";
import { ResetPasswordInputValue } from "@/app/(auth)/reset-password/_components/reset-password-form";
import { getCookie } from "cookies-next";

import { myFetch } from "../myFetch";
import { instance } from "../myFetch/instance";
import {
  GetTeamIdUserGroups,
  GetTeamIdUserHistoryResponse,
  GetTeamIdUserResponse,
  PatchTeamIdUserPasswordResponse,
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
    const response = await instance<GetTeamIdUserHistoryResponse>(
      `/user/history`,
      {
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
    redirectUrl: `${process.env.NEXT_PUBLIC_REDIRECT_URL}`,
  };
  try {
    const response =
      await myFetch<PostTeamIdUserSendResetPasswordEmailResponse>(
        `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user/send-reset-password-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(data: {
  password: string;
  passwordConfirmation: string;
  token: string;
}): Promise<PatchTeamIdUserResetPasswordResponse | string> {
  try {
    const response = await myFetch<PatchTeamIdUserResetPasswordResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user/reset-password`,
      {
        method: "PATCH",
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

export async function modalResetPassword(
  data: ResetPasswordInputValue,
): Promise<PatchTeamIdUserPasswordResponse | string> {
  try {
    const response = await myFetch<PatchTeamIdUserPasswordResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user/password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
}
