"use server";

import { getErrorMessage, myFetch } from "@/lib/apis";
import { GetTeamIdUserResponse } from "@/lib/apis/type";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const getAccessToken = () => getCookie("accessToken", { cookies });

export async function getUser(): Promise<GetTeamIdUserResponse> {
  const accessToken = getAccessToken();

  try {
    const response = await myFetch(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data: GetTeamIdUserResponse = await response.json();
    return data;
  } catch (error) {
    const errorMessage = await getErrorMessage(error, []);

    throw new Error(errorMessage || "네트워크 오류 발생");
  }
}
