"use server";

import { GetTeamIdUserResponse } from "@/lib/apis/type";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const getAccessToken = () => getCookie("accessToken", { cookies });

export async function getUser(): Promise<GetTeamIdUserResponse> {
  const accessToken = getAccessToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("네트워크 오류 발생");
    }

    const data: GetTeamIdUserResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
